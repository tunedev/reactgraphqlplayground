const Blog = require('../Model/Blog');
const User = require('../Model/User');
const Comment = require('../Model/Comment');

class BlogController {
  static getAll = async (request, response) => {
    const blogs = await Blog.find({}).populate('userId').populate('comments');

    response.status(200).json(blogs.map((blog) => blog.toJSON()));
  };

  static async createNew(request, response) {
    const { title, author, url, likes } = request.body;
    const user = request.user;

    if (!title || !url) {
      return response.status(400).json({ message: 'Invalid request body' });
    }

    const blog = new Blog({
      title,
      author,
      url,
      likes,
      userId: user.id,
    });

    const result = await blog.save();
    const blogOwner = await User.findById(user.id);

    blogOwner.blogs = blogOwner.blogs.concat(result.id);
    blogOwner.save();

    response.status(201).json(result.toJSON());
  }

  static async getOne(request, response) {
    const id = request.params.id;
    const blog = await Blog.findById(id).populate('comments');

    if (!blog) {
      return response.status(404).json({
        success: 'Fail',
        message: `Blog with id: ${id} is not in our record`,
      });
    }
    return response.status(200).json(blog.toJSON());
  }

  static async deleteById(request, response) {
    const { blog } = request;
    await blog.delete();

    const blogOwner = await User.findById(request.user.id);
    blogOwner.blogs = blogOwner.blogs.filter(
      (blogId) => blogId !== request.params.id
    );
    blogOwner.save();

    return response.status(204).end();
  }

  static async updateById(request, response) {
    const id = request.params.id;
    const { title, url, likes } = request.body;
    const blog = await Blog.findByIdAndUpdate(
      id,
      { title, url, likes },
      { new: true }
    );

    console.log(blog);

    response.status(200).json(blog);
  }

  static async increaseLike(request, response) {
    const id = request.params.id;
    const blog = await Blog.findById(id);

    blog.likes += 1;

    await blog.save();

    response.status(200).json({ data: blog });
  }

  static async addComment(request, response) {
    const id = request.params.id;
    const { body } = request.body;

    if (!body) {
      return response
        .status(400)
        .json({ message: 'Comment body cannot be empty' });
    }

    const comment = new Comment({
      body,
      blogId: id,
    });

    const blog = await Blog.findById(id);
    await comment.save();

    blog.comments = blog.comments.concat(comment.id);
    blog.populate('comments').execPopulate();
    await blog.save();

    return response.status(200).json(blog);
  }
}

module.exports = BlogController;
