# Railway: My Book Stacks (frontend)

See the **librarianAPI** repo `RAILWAY.md` for full project steps, Postgres restore, and `scripts/heroku-to-railway-db.ps1`.

**Build-time:** `API_BASE_URL`, `CLOUDINARY_NAME`, `CLOUDINARY_UPLOAD_PRESET`, and **`GOOGLE_BOOKS_API_KEY`** must be set on the Railway **frontend** service so Webpack can bake them into the bundle (`webpack/common.config.js`). Without a key, Google Books anonymous quota is tiny and searches often return **429**.

Create a key in [Google Cloud Console](https://console.cloud.google.com/): enable **Books API**, create an API key, restrict it to **Books API** and (for a browser bundle) **HTTP referrers** for your Railway app URL and `http://localhost:*` for local dev. Add the key as variable `GOOGLE_BOOKS_API_KEY`, then redeploy the frontend.

**Current backend URL (regenerate domain if you recreate the service):** set `API_BASE_URL` to the HTTPS origin of **MyBookStacksBackend** / `librarianAPI` with no trailing slash, then redeploy the frontend.
