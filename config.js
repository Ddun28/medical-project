const PAGE_URL = process.env.NODE_ENV === 'production'
  ? 'https://medical-project-kx19.onrender.com'
  : 'http://localhost:3000/';

  module.exports = {PAGE_URL}