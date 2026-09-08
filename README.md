# Deepvault: The Hollow Crown

A self-contained browser game prepared for GitHub Pages.

## Publishing

The site entry point is `index.html` at the repository root. `.nojekyll` disables Jekyll processing, so the HTML game is served directly.

For branch-based publishing, open **Settings → Pages**, select **Deploy from a branch**, choose **main** and **/(root)**, and save.

Expected site address after publishing is enabled:

https://chad04220.github.io/Deep-Vault/

## Local play

Open `index.html` in a modern browser with WebGL enabled, or serve the repository with a local HTTP server:

```sh
python -m http.server 8000
```

Then open http://localhost:8000/.

Game saves are stored locally by the browser. A hosted copy and a locally opened copy have separate browser storage.
