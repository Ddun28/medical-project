const PAGE_URL = process.env.NODE_ENV === 'production'
  ? 'http://localhost:3000/'
  : 'https://medical-project-kx19.onrender.com';

  module.exports = {PAGE_URL}