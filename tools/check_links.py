#!/usr/bin/env python3
"""Check that every URL in sources/registry.json still answers (handoff section 9.4).

For each source it requests the page URL (fragment removed) and, if the source names one, its mirror
(the publisher's raw source file that tools/verify_facts.py falls back to). It sends HEAD first and falls
back to GET when a server refuses or mishandles HEAD. Requests are spaced out per host and carry a clear
User-Agent.

Results:
    OK           the server answered with a status below 400
    DEAD         the server answered 400 or above, even to GET
    UNREACHABLE  no HTTP answer at all: DNS failure, refused connection, timeout, or a proxy that refused
                 the tunnel (common in sandboxes with a network policy; that is not proof the link is dead)

Exit status: 1 if any verified source (or its mirror) is DEAD; 2 if none is dead but some verified URL is
UNREACHABLE (use --allow-unreachable to accept that, for example in a sandbox); 0 otherwise.
Unverified and rejected sources are checked and reported but never fail the run.

Usage:
    python3 tools/check_links.py                    check everything, print every result
    python3 tools/check_links.py --quiet            print only problems and the summary
    python3 tools/check_links.py --allow-unreachable
    python3 tools/check_links.py --src py-docs-venv
"""
import argparse, json, pathlib, socket, sys, time, urllib.error, urllib.parse, urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
REGISTRY = ROOT / "sources" / "registry.json"
UA = "CodePixLinkCheck/1.0 (+https://github.com/briannarimm/CodePix; checks citation links)"
TIMEOUT = 25
PER_HOST_GAP = 1.0          # seconds between requests to the same host
RETRY_STATUS = {429, 500, 502, 503, 504}
HEAD_FALLBACK = {400, 403, 404, 405, 406, 409, 410, 429, 501}

_last_hit = {}


def polite_wait(url: str) -> None:
    host = urllib.parse.urlsplit(url).netloc
    gap = time.monotonic() - _last_hit.get(host, -PER_HOST_GAP)
    if gap < PER_HOST_GAP:
        time.sleep(PER_HOST_GAP - gap)
    _last_hit[host] = time.monotonic()


class _NoRedirectBody(urllib.request.HTTPRedirectHandler):
    """Follow redirects (the default) but keep the method for HEAD."""
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        new = super().redirect_request(req, fp, code, msg, headers, newurl)
        if new is not None and req.get_method() == "HEAD":
            new = urllib.request.Request(new.full_url, headers=dict(req.header_items()), method="HEAD")
        return new


OPENER = urllib.request.build_opener(_NoRedirectBody())


def request(url: str, method: str):
    """Return (status, detail). status is an int HTTP code, or 0 when there was no HTTP answer."""
    polite_wait(url)
    req = urllib.request.Request(url, method=method, headers={"User-Agent": UA, "Accept": "*/*"})
    try:
        with OPENER.open(req, timeout=TIMEOUT) as r:
            if method == "GET":
                r.read(65536)
            return r.status, r.geturl()
    except urllib.error.HTTPError as e:
        return e.code, str(e.reason)
    except urllib.error.URLError as e:
        reason = str(e.reason)
        if "Tunnel connection failed" in reason:
            reason += " (the proxy refused the tunnel; likely a network policy, not a dead link)"
        return 0, reason
    except (socket.timeout, TimeoutError):
        return 0, "timed out"
    except (ConnectionError, OSError) as e:
        return 0, str(e)


def check(url: str):
    status, detail = request(url, "HEAD")
    if status in HEAD_FALLBACK or status == 0 and "Tunnel" not in detail:
        status, detail = request(url, "GET")
    if status in RETRY_STATUS:
        time.sleep(3)
        status, detail = request(url, "GET")
    if status == 0:
        return "UNREACHABLE", status, detail
    return ("OK" if status < 400 else "DEAD"), status, detail


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--quiet", action="store_true", help="print only problems and the summary")
    ap.add_argument("--allow-unreachable", action="store_true", help="do not fail when a verified URL gets no HTTP answer")
    ap.add_argument("--src", help="check one source id only")
    a = ap.parse_args()

    sources = json.loads(REGISTRY.read_text(encoding="utf-8"))["sources"]
    if a.src:
        sources = [s for s in sources if s["id"] == a.src]
        if not sources:
            print(f"no source with id {a.src}")
            return 2

    targets, seen = [], set()
    for s in sources:
        for kind, url in (("page", s["url"].split("#")[0]), ("mirror", s.get("mirror", ""))):
            if url and (url, s["id"]) not in seen:
                seen.add((url, s["id"]))
                targets.append((s, kind, url))

    counts = {"OK": 0, "DEAD": 0, "UNREACHABLE": 0}
    dead_verified, unreachable_verified = [], []
    for s, kind, url in targets:
        result, status, detail = check(url)
        counts[result] += 1
        verified = s["status"] == "verified"
        if result != "OK" and verified:
            (dead_verified if result == "DEAD" else unreachable_verified).append((s["id"], kind, url))
        if result != "OK" or not a.quiet:
            tag = "" if verified else f" [{s['status']}; does not fail the run]"
            shown = status if status else "---"
            print(f"{result:11} {shown:>3}  {s['id']} ({kind}) {url}{tag}" + ("" if result == "OK" else f"\n            {detail}"))

    print(f"\nchecked {len(targets)} URLs from {len(sources)} sources: "
          f"{counts['OK']} ok, {counts['DEAD']} dead, {counts['UNREACHABLE']} unreachable")
    if dead_verified:
        print(f"FAIL: {len(dead_verified)} dead URL(s) on verified sources")
        return 1
    if unreachable_verified and not a.allow_unreachable:
        print(f"FAIL: {len(unreachable_verified)} verified URL(s) got no HTTP answer "
              "(rerun with network access, or pass --allow-unreachable)")
        return 2
    print("ALL LINKS OK" if not unreachable_verified else "no dead links (some unreachable URLs allowed)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
