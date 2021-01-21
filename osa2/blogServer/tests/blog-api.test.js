const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
const bcrypt = require('bcryptjs');

const api = request(app);
const Blog = require('../Model/Blog');
const User = require('../Model/User');

const {
  initialBlogs,
  listWithOneBlog: blog,
  initialUsers,
} = require('./testConstants');

beforeAll(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  initialBlogs.forEach(async (blog) => {
    const newBlog = new Blog(blog);
    await newBlog.save();
  });
  initialUsers.forEach(async (user) => {
    user.hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = new User(user);
    await newUser.save();
  });
});

describe('/Blogs', () => {
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs');

    const titles = response.body.map((r) => r.title);

    expect(titles).toContain(initialBlogs[0].title);
  });

  test('each blogs has a property "id" in place of "_id"', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
  });
});

describe('routes with the Authorization feature', () => {
  const baseUrl = '/api/blogs';
  test('user needs token to create a blog', async () => {
    const response = await api
      .post(baseUrl)
      .send(blog[0])
      .expect(403)
      .expect('Content-Type', /application\/json/);

    expect(response.body.message).toBe(
      'Token must be provided to complete this request'
    );
  });
});

describe('/api/Blogs', () => {
  let token = '';
  const baseUrl = '/api/blogs';
  test('get user credential for successive tests', async () => {
    const user1LoginDetails = await api
      .post('/api/users/login')
      .send(initialUsers[0])
      .expect(200);

    token = user1LoginDetails.body.token;
  });
  test('confirm a new valid blog can be added', async () => {
    await api
      .post(baseUrl)
      .send(blog[0])
      .set({ Authorization: `Bearer ${token}` })
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');

    const titles = response.body.map((blog) => blog.title);
    expect(titles).toContain(blog[0].title);
  });

  test('blog without title and url is not added', async () => {
    const blog = {
      author: 'Edsger W. Dijkstra',
      likes: 5,
    };

    const response = await api
      .post(baseUrl)
      .send(blog)
      .set({ Authorization: `Bearer ${token}` })
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
  test('likes defaults to 0 if not provided', async () => {
    const newBlog = {
      title: 'blog without likes initial likes',
      author: 'some author',
      url: 'https://reactpatterns.com/',
    };
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `Bearer ${token}` })
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(response.body.likes).toBeDefined();
    expect(response.body.likes).toEqual(0);
  });
});

// describe('/api/blogs/:id', () => {
//   test('delete a blog endpoint', async () => {
//     const blog = {
//       title: 'dummy blog for testing purpose',
//       url: 'https://reactpatterns.com/',
//       author: 'some author',
//     };
//     const postResponse = await api
//       .post('/api/blogs')
//       .send(blog)
//       .expect(201)
//       .expect('Content-Type', /application\/json/);

//     // await api.delete(`/api/blogs/${postResponse.body.id}`).expect(200);

//     // await api.get(`/api/blogs/${postResponse.body.id}`).expect(404);
//   });
// });

afterAll(() => {
  mongoose.connection.close();
});
