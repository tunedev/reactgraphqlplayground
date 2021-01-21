import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Users from './components/Users';
import Blogs from './components/Blogs';
import Blog from './components/Blog';
import User from './components/User';
import { getAll, createNewBlog } from './reducers/blogListReducer';
import { setUser, login, logout } from './reducers/usersReducer';
import './App.css';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import Menu from './components/Menu';

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userRelated);
  const { message, error } = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(getAll());
    const userDataJson = window.localStorage.getItem('user');
    if (userDataJson) {
      const user = JSON.parse(userDataJson);
      dispatch(setUser(user));
    }
  }, [dispatch]);

  const blogFormRef = useRef();

  const handleLogin = async (credentials) => {
    dispatch(login(credentials));
  };

  const createBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility();
    const { title, url, author } = newBlog;
    dispatch(createNewBlog({ title, url, author }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <Notification message={message} error={error} />
      <Menu handleLogout={handleLogout} handleLogin={handleLogin} user={user} />
      <h2>Blogs</h2>
      {user ? (
        <div>
          <h3>Logged in as {user.user.name}</h3>
        </div>
      ) : null}

      <Togglable buttonLabel='create new blog'>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <Switch>
        <Route exact path='/'>
          <Blogs />
        </Route>
        <Route path='/blogs/:id'>
          <Blog />
        </Route>
        <Route exact path='/users'>
          <Users />
        </Route>
        <Route path='/users/:id'>
          <User />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
