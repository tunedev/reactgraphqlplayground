const UserRouter = require('express').Router();
const UserController = require('../Controller/User');
const { validateId } = require('../Middleware/validation');

const { create, getAll, login, getUserById } = UserController;

UserRouter.post('/', create)
  .get('/', getAll)
  .post('/login', login)
  .get('/:id', validateId, getUserById);

module.exports = UserRouter;
