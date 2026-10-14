# Deploying the coming-soon page and connecting the domain

Branches:

- `main` holds the source of everything: research, lesson plans, tools, and `site/` (the coming-soon page).
- `pages` holds **only** the published files. It is rebuilt from `site/` by `tools/publish_pages.sh`. Nothing from `docs/` or `sources/` is ever on this branch, so it cannot be served.

Publish a change to the page:

```bash
# edit site/index.html on main, commit, then:
tools/publish_pages.sh
```

(Later, when the real app exists, GitHub Actions will build `dist/` and replace this script. See `docs/handoff.md` section 3.)

## One-time setup

Facts below come from GitHub's own docs (read 2026-10-14): [managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) and [verifying a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages).

### 1. Make the repository public (Brianna)

Repository → **Settings** → scroll to **Danger Zone** → **Change visibility** → Public.

### 2. Turn on Pages (done by Claude through the API once the repo is public)

Repository → **Settings** → **Pages** → Source **Deploy from a branch** → Branch `pages`, folder `/ (root)` → under **Custom domain** enter `codepix.briannaimm.com` → **Save**.

Saving the custom domain adds a `CNAME` file to the root of the source branch. The page already ships one with the same name.

### 3. Add the DNS record in Cloudflare (Brianna)

Cloudflare dashboard → choose `briannaimm.com` → **DNS** → **Records** → **Add record**:

| Field | Value |
|---|---|
| Type | `CNAME` |
| Name | `codepix` |
| Target | `briannarimm.github.io` |
| Proxy status | **DNS only** (grey cloud, not orange) |
| TTL | Auto |

Notes:

- The target is your username's `github.io` address with no repository name. GitHub says not to use the `*.pages.github.io` address shown in the Pages settings.
- Keep the cloud grey. With the orange proxy on, GitHub may not be able to issue the HTTPS certificate. (This is our own earlier note from the handoff; GitHub's page above does not discuss Cloudflare. If HTTPS fails, this is the first thing to check.)
- Do not add wildcard records such as `*.briannaimm.com`. GitHub advises against them because they expose you to domain takeovers.
- DNS changes can take up to 24 hours.

### 4. Check it worked

```bash
dig codepix.briannaimm.com +nostats +nocomments +nocmd
```

You should see a `CNAME` to `briannarimm.github.io.` followed by GitHub addresses. Then open https://codepix.briannaimm.com (use http:// until HTTPS is ready).

### 5. Enforce HTTPS (Brianna, after DNS works)

Repository → **Settings** → **Pages** → tick **Enforce HTTPS**. GitHub says the option can take up to 24 hours to appear.

### 6. Optional but recommended: verify the domain (Brianna)

This stops anyone else from claiming `codepix.briannaimm.com` on their own Pages site.

1. GitHub → your profile picture → **Settings** → **Pages** (under Code, planning, and automation) → **Add a domain** → enter `briannaimm.com`.
2. GitHub shows a TXT record. In Cloudflare add a **TXT** record with name `_github-pages-challenge-briannarimm` (Cloudflare appends the domain; GitHub's format is `_github-pages-challenge-USERNAME.example.com`) and paste the value GitHub shows. The value is not in the docs, so copy it from GitHub.
3. Wait, then click **Verify**. Keep the TXT record in place afterward.

## Troubleshooting

- Page shows 404: wait a few minutes after the first publish, then check **Settings → Pages** shows the site as live.
- "Domain not properly configured": the CNAME record is missing, wrong, or not propagated yet. Re-run `dig`.
- Enforce HTTPS is greyed out: DNS has not propagated or the Cloudflare cloud is orange.
- If HTTPS ever breaks on a subdomain that points to the apex domain instead of `briannarimm.github.io`, GitHub warns this causes problems; keep the target as above.
