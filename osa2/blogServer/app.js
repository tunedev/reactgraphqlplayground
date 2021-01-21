const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const { mongoUri } = require('./utils/config');

const blogRouter = require('./Routes/BlogRouter');
const userRouter = require('./Routes/UserRouter');

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', require('./Routes/TestingRouter'));
}

module.exports = app;
