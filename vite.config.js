import { defineConfig } from 'vite';

// When deploying to GitHub Pages as a project site (https://<user>.github.io/<repo>/),
// the base must match the repository name. Set it via the GITHUB_PAGES_BASE env var
// (the deploy workflow does this automatically), or hardcode it if you prefer.
export default defineConfig({
  base: process.env.GITHUB_PAGES_BASE || '/',
});
