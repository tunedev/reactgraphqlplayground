import React, { useState } from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ handleLogin }) => {
  const [inputState, setInputState] = useState({ username: '', password: '' });

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    handleLogin(inputState);
    setInputState({ username: '', password: '' });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputState((state) => ({
      ...state,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleLoginSubmit}>
      <h2>Login to the app</h2>
      <label htmlFor='username'>
        Username:
        <input
          type='text'
          name='username'
          id='username'
          placeholder='Enter Username'
          value={inputState.username}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label htmlFor='password'>
        Password:
        <input
          type='password'
          name='password'
          id='password'
          placeholder='Enter password'
          value={inputState.password}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button id='login-btn'>Login</button>
    </form>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
