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
