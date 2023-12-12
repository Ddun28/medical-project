const PAGE_URL = process.env.NODE_ENV === 'production'
  ? 'http://localhost:3000/'
  : 'http://localhost:3000/';

  module.exports = {PAGE_URL}