/* global __GOOGLE_BOOKS_API_KEY__ */

/**
 * Google Books API volumes URL. Pass-through queries without a key work but hit
 * strict anonymous quotas (often 429). Set GOOGLE_BOOKS_API_KEY at build time.
 */
export function buildBooksVolumesUrl(query) {
  const q = encodeURIComponent(query);
  const base = `https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=40`;
  const key =
    typeof __GOOGLE_BOOKS_API_KEY__ !== "undefined"
      ? __GOOGLE_BOOKS_API_KEY__
      : "";
  if (key && String(key).trim() !== "") {
    return `${base}&key=${encodeURIComponent(key)}`;
  }
  return base;
}

export function hasGoogleBooksApiKey() {
  const key =
    typeof __GOOGLE_BOOKS_API_KEY__ !== "undefined"
      ? __GOOGLE_BOOKS_API_KEY__
      : "";
  return Boolean(key && String(key).trim() !== "");
}
