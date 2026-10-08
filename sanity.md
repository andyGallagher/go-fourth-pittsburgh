# Sanity → auto-deploy

Publishing a document in Sanity Studio triggers the GitHub Actions workflow in
`.github/workflows/deploy.yml`, which:

1. Converts any Sanity images not yet on the CDN (`images/fetch-images.js --new`) and
   uploads them to `s3://go-fourth-cdn/dist/` (served from `cdn.gofourthpittsburgh.org`).
2. Rebuilds the static site and syncs it to the `go-fourth-static` S3 bucket.
3. Invalidates CloudFront (`E1CDYQJET2EKSW`).

```
Sanity publish → webhook → GitHub repository_dispatch → Actions (images → build) → S3 + CloudFront
```

## 1. Create a GitHub token

1. Go to GitHub → **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**.
2. **Repository access:** Only select repositories → `andyGallagher/go-fourth-pittsburgh`.
3. **Permissions → Repository permissions → Contents:** Read and write.
4. Set an expiration you're comfortable with (note it — the webhook silently stops working when it expires).
5. Copy the token.

## 2. Create the Sanity webhook

Go to [sanity.io/manage](https://www.sanity.io/manage) → the Go Fourth project → **API → Webhooks → Create webhook**.

| Field        | Value                                                                          |
| ------------ | ------------------------------------------------------------------------------ |
| Name         | `Deploy site`                                                                  |
| URL          | `https://api.github.com/repos/andyGallagher/go-fourth-pittsburgh/dispatches`   |
| Dataset      | `production`                                                                   |
| Trigger on   | Create, Update, Delete                                                         |
| Filter       | _(leave blank)_                                                                |
| Projection   | `{"event_type": "sanity-publish"}`                                             |
| Status       | Enabled                                                                        |
| HTTP method  | `POST`                                                                         |
| API version  | latest                                                                         |
| Drafts       | **Off** — only published changes should deploy                                 |

**HTTP headers:**

| Name            | Value                         |
| --------------- | ----------------------------- |
| `Authorization` | `Bearer <token from step 1>`  |
| `Accept`        | `application/vnd.github+json` |

Save.

## 3. Test it

1. Publish a small change in the Studio.
2. Open the repo's **Actions** tab — a `Deploy` run should appear within a few seconds.
3. The change should be live on https://www.gofourthpittsburgh.org in ~2–3 minutes.

If nothing shows up, check the webhook's **Attempts log** in sanity.io/manage. A `401`/`404`
from GitHub almost always means the token is wrong, expired, or lacks Contents write access
to this repo. GitHub returns `204` on success.

## Other ways to deploy

- Push to `main` — deploys automatically.
- Actions tab → **Deploy** → **Run workflow** — manual deploy.

Rapid successive publishes cancel in-flight builds, so only the latest content gets deployed.
