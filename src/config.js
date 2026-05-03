/* global __API_BASE_URL__ */
const API_BASE_URL =
  typeof __API_BASE_URL__ !== "undefined"
    ? __API_BASE_URL__
    : "https://librarianapi.herokuapp.com";

export default API_BASE_URL;
