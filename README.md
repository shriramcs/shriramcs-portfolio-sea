# Shriram Sapparad — Portfolio

An underwater scroll-story portfolio built with vanilla JS and Vite.

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ and npm

## Run locally

```bash
npm install
npm run dev
```

This starts the Vite dev server (default: http://localhost:5173/) with hot reload.

## Build

```bash
npm run build
```

Outputs a production build to `dist/`.

## Preview the production build

```bash
npm run preview
```

Serves the `dist/` folder locally so you can sanity-check the build before deploying.

## Deploy to GitHub Pages

This repo includes a GitHub Actions workflow ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) that builds and deploys automatically.

### One-time setup

1. Push this repo to GitHub.
2. In the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to the `main` branch (or run the workflow manually from the **Actions** tab).

The site will be published at:

```
https://<your-github-username>.github.io/<repo-name>/
```

### How the base path works

GitHub Pages project sites are served from a `/<repo-name>/` subpath, so the workflow sets the `GITHUB_PAGES_BASE` environment variable to `/<repo-name>/` automatically during the build (see [vite.config.js](vite.config.js)). No manual configuration is needed.

If you deploy locally instead of via Actions, set the base yourself:

```bash
GITHUB_PAGES_BASE=/your-repo-name/ npm run build
```

## Deploy to Cloudflare Pages

Cloudflare Pages serves the site from the domain root, so no `base` path configuration is needed (the default `/` in [vite.config.js](vite.config.js) is used).

This repo includes [wrangler.jsonc](wrangler.jsonc) with `pages_build_output_dir` set to `./dist`. This is required so that `wrangler deploy` (used internally by Cloudflare's dashboard build system and by the `wrangler` CLI) treats the project as a Pages deployment instead of a Worker — without it, you'll hit a `Missing entry-point to Worker script` error.

### Option A — Git integration (dashboard, recommended)

1. Push this repo to GitHub (or GitLab).
2. In the [Cloudflare dashboard](https://dash.cloudflare.com/), go to **Workers & Pages → Create → Pages → Connect to Git** and select this repo.
3. Set the build configuration:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Save and deploy. Cloudflare will rebuild and redeploy automatically on every push to `main`.

### Option B — GitHub Actions

This repo includes [.github/workflows/cloudflare-pages.yml](.github/workflows/cloudflare-pages.yml), which builds and deploys via `cloudflare/pages-action` on every push to `main`.

1. Create a Cloudflare Pages project named `portfolio-sea` (via the dashboard, or it will be created automatically on first deploy).
2. In your GitHub repo, add these secrets under **Settings → Secrets and variables → Actions**:
   - `CLOUDFLARE_API_TOKEN` — a token with **Cloudflare Pages: Edit** permission.
   - `CLOUDFLARE_ACCOUNT_ID` — found in the Cloudflare dashboard sidebar.
3. Push to `main` to trigger the workflow.

### Option C — Manual deploy via Wrangler CLI

```bash
npm run deploy:cloudflare
```

This builds the site and deploys the `dist/` folder using [Wrangler](https://developers.cloudflare.com/workers/wrangler/). On first run, Wrangler will prompt you to log in to Cloudflare.

## Project structure

```
index.html
src/
  main.js
  style.css
  components/
    creatures.js
    particles.js
    reveal.js
```


## Credits

- Idea inspiration: [Jellyfish Challenge](https://codepen.io/pkodmad/pen/KrpbGe) by [PK](https://pkodmad.com/)
