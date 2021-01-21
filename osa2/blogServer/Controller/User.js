const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Model/User');

class UserController {
  static async create(request, response) {
    const { username, name, password } = request.body;

    if (!username || !password) {
      return response
        .status(400)
        .json({ error: 'username and password must be provided' });
    } else if (username.trim().length < 3 || password.trim().length < 3) {
      return response.status(400).json({
        message: 'username and password must have atleast three characters',
      });
    }

    const usernameExist = await User.findOne({ username });
    if (usernameExist) {
      return response.status(409).json({
        message: `Username: ${username} already exist in kindly provide another one`,
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      hashedPassword,
    });

    const savedUser = await user.save();

    return response.status(201).json(savedUser);
  }

  static async getAll(request, response) {
    const allUsers = await User.find({}).populate('blogs');

    return response.status(200).send(allUsers);
  }

  static async getUserById(request, response) {
    const user = await User.findById(request.params.id).populate('blogs');
    console.log('User ->', user);

    return response.status(200).json(user);
  }

  static async login(request, response) {
    const { username, password } = request.body;

    if (!username || !password) {
      return response
        .status(400)
        .json({ message: 'username and password must be provided' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return response.status(401).json({
        message: 'invalid username or password',
      });
    }
    if (!bcrypt.compareSync(password, user.hashedPassword)) {
      return response.status(401).json({
        message: 'invalid username or password',
      });
    }
    const token = jwt.sign(
      { username: user.username, id: user._id },
      process.env.SECRET
    );

    return response.status(200).send({
      token,
      user: {
        ...user.toJSON(),
      },
    });
  }
}

module.exports = UserController;
