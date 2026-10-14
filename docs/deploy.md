# Deploying the coming-soon page

Live address (target): **https://dev.briannaimm.com/CodePix/**
Fallback that always works: https://briannarimm.github.io/CodePix/

Branches:

- `main` holds the source of everything: research, lesson plans, tools, and `site/` (the coming-soon page).
- `pages` holds **only** the published files. `tools/publish_pages.sh` rebuilds it from `site/`. Nothing from `docs/` or `sources/` is ever on this branch, so it cannot be served. Run the script from `main`.

Publish a change:

```bash
# edit site/index.html on main, commit, then:
tools/publish_pages.sh
```

Later, GitHub Actions will build `dist/` and replace this script (see `docs/handoff.md` section 3). Pages settings: Deploy from a branch, branch `pages`, folder `/ (root)`.

## How the `dev.briannaimm.com/CodePix` address works

Facts from GitHub's docs (read 2026-10-14):

- A **user site** lives in a repository named after your account followed by `.github.io` (lowercase). Here that is `briannarimm.github.io` ([creating a Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)).
- If the user site has a custom domain, that same domain is used for all project sites owned by the same account, so a project repo `CodePix` appears at `<custom domain>/CodePix` ([about custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)).
- A custom domain set on an **ordinary project repo** applies only to that repo. The docs do not describe it serving other repos.
- To have no custom domain on a project, remove it from that repo's Pages settings. The `CodePix` repo already has none.

Current state (checked 2026-10-14):

| Piece | State |
|---|---|
| `CodePix` repo | Pages from `pages` branch, no custom domain, HTTPS enforced, live at `briannarimm.github.io/CodePix/` |
| `brianna-imm-site` repo | Project repo with custom domain `dev.briannaimm.com`, live at `dev.briannaimm.com/` |
| `dev.briannaimm.com` DNS | Resolves (Cloudflare) |
| `dev.briannaimm.com/CodePix/` | **404**, because `brianna-imm-site` is a project repo, not the user site |

**To make `dev.briannaimm.com/CodePix/` work:** rename the repository `brianna-imm-site` to `briannarimm.github.io` (repo **Settings → General → Repository name**). It then becomes the user site, and its custom domain `dev.briannaimm.com` is used for every project site, including `CodePix`. Expect a few minutes for Pages to rebuild. Anything linked to the old repo name will redirect.

The `codepix.briannaimm.com` subdomain from the first attempt is no longer used. Delete the Cloudflare record for `codepix` if you added one (there was none when checked).

## Rules for the site while it lives under `/CodePix/`

- Links must work under the path `/CodePix/`. The page uses no root-absolute links except the 404 page's link back to `/CodePix/`. Note that the repo name is case-sensitive in the address.
- `robots.txt` has no effect on a project path (crawlers read only the domain root). The page's `<meta name="robots" content="noindex">` does the work.
- Do not add a `CNAME` file to `site/`: publishing it would set a custom domain on this repo again and override the user-site domain.
