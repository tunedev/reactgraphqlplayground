const Blog = require('../Model/Blog');
const User = require('../Model/User');

const nonExistingId = async () => {
  const newBlog = new Blog({
    title: 'about to remove it',
    author: 'Does not matter',
    likes: 4,
  });
  await newBlog.save();
  await newBlog.remove();

  return newBlog._id.toString();
};

const blogInDb = async () => {
  const existingBlogs = await Blog.find({});
  return existingBlogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const existingUsers = await User.find({});
  return existingUsers.map((user) => user.toJSON());
};

module.exports = {
  blogInDb,
  nonExistingId,
  usersInDb,
};
