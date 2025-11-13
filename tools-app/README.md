# MLA Tools App (extracted tools)

This folder contains a lightweight static host for the medical tools from the main `MLA-V2` repository — everything except the quiz.

What this scaffold does:
- Loads the repository's `extracted-calculators.js` and exposes a small UI to open each tool.
- Bundles the official QRISK3 files (LGPL v3) for the official algorithm.

Deployment notes:
- This scaffold references `../static/js/v2/extracted-calculators.js` and other original files by default. For a truly standalone app, copy the following paths into `tools-app/static/`:
  - `static/js/v2/extracted-calculators.js`
  - `static/js/v2/modules/*` (except `QuizManager.js`)
  - `static/js/data/*` and `static/anatomy/*` if you require those assets

- QRISK3: this repo already contains the official QRISK3 JS implementation in `static/js/qrisk3/` and those files were copied into `tools-app/static/js/qrisk3/`.
  The QRISK3 implementation is licensed under GNU LGPL v3; include the license text and the disclaimer where required (see `LICENSE-LGPLv3.txt`).

Local testing:
1. Install `http-server` if you don't have it: `npm install -g http-server` (or use the included npm script that uses `npx`).
2. From this folder run:

```powershell
npm install
npx http-server -c-1 -p 5500 .
# then open http://localhost:5500 in your browser
```

To deploy on Vercel, just import this folder as a separate project. If you want a fully self-contained deploy, copy the referenced static assets into `tools-app/static/` so the app doesn't rely on `../static/` paths.
