const jwt = require('jsonwebtoken');
const Blog = require('../Model/Blog');

const retrieveTokenFrom = (request) => {
  const authObj = request.get('authorization');
  if (authObj && authObj.toLowerCase().startsWith('bearer ')) {
    return authObj.substring(7);
  }
  return null;
};

exports.authorize = async (request, response, next) => {
  const token = retrieveTokenFrom(request);

  if (!token) {
    return response
      .status(403)
      .json({ message: 'Token must be provided to complete this request' });
  }

  try {
    const decodedToken = await jwt.verify(token, process.env.SECRET);

    if (!decodedToken) {
      return response.status(403).json({ message: 'Invalid Token' });
    }
    request.user = decodedToken;
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }

  return next();
};

exports.isOwner = async (request, response, next) => {
  const { id } = request.params;
  const blog = await Blog.findById(id);

  if (!blog) {
    return response.status(404).json({ message: 'blog not found' });
  } else if (blog.userId.toString() === request.user.id.toString()) {
    request.blog = blog;
    return next();
  }
  return response.status(403).json({
    message: 'You are not permited to make this request',
  });
};
