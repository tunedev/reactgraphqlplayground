const BlogRouter = require('express').Router();
const {
  updateById,
  increaseLike,
  getAll,
  createNew,
  getOne,
  deleteById,
  addComment,
} = require('../Controller/Blog');
const { authorize, isOwner } = require('../Middleware/authorization');

BlogRouter.get('/', getAll).post('/', authorize, createNew);
BlogRouter.get('/:id', getOne)
  .patch(':/id', authorize, updateById)
  .patch('/:id/like', authorize, increaseLike)
  .delete('/:id', authorize, isOwner, deleteById)
  .post('/:id/comments', addComment);

module.exports = BlogRouter;
