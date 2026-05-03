# Railway: My Book Stacks (frontend)

See the **librarianAPI** repo `RAILWAY.md` for full project steps, Postgres restore, and `scripts/heroku-to-railway-db.ps1`.

**Build-time:** `API_BASE_URL`, `CLOUDINARY_NAME`, and `CLOUDINARY_UPLOAD_PRESET` must be set on the Railway **frontend** service so Webpack can bake them into the bundle (`webpack/common.config.js`).

**Current backend URL (regenerate domain if you recreate the service):** set `API_BASE_URL` to the HTTPS origin of **MyBookStacksBackend** / `librarianAPI` with no trailing slash, then redeploy the frontend.
