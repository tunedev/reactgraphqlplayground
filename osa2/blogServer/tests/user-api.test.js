const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../Model/User');
const app = require('../app');
const supertest = require('supertest');

const api = supertest(app);

beforeAll(async () => {
  await User.deleteMany({});

  const hashedPassword = await bcrypt.hash('sekret', 10);
  const user = new User({
    username: 'root',
    hashedPassword,
    name: 'root user',
  });

  await user.save();
});

describe('User', () => {
  const newUser = {
    username: 'newUser',
    password: 'somePassword',
    name: 'new user',
  };
  test('Adding of new user', async () => {
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
  });

  test('existing unique username', async () => {
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(409)
      .expect('Content-Type', /application\/json/);

    expect(response.body.message).toEqual(
      'Username: newUser already exist in kindly provide another one'
    );
  });
});

afterAll(() => {
  mongoose.connection.close();
});
