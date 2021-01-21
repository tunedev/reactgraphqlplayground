const Router = require('express').Router();
const User = require('../Model/User');
const Blog = require('../Model/Blog');
const { request } = require('../app');

Router.post('/reset', async (request, response) => {
  await User.deleteMany({});
  await Blog.deleteMany({});

  return response.status(204).end();
});

module.exports = Router;
