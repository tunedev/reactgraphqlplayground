import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import Togglable from './Togglable';

const Menu = ({ user, handleLogin, handleLogout }) => {
  return (
    <nav>
      <Link to='/'>Blogs</Link> <Link to='/users'>users</Link>{' '}
      {user ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Togglable buttonLabel='Login'>
          <LoginForm handleLogin={handleLogin} />
        </Togglable>
      )}
    </nav>
  );
};

// {
//   user ? (
//     <div>
//       <h3>Logged in as {user.user.name}</h3>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   ) : (
//     <Togglable buttonLabel='Login'>
//       <LoginForm handleLogin={handleLogin} />
//     </Togglable>
//   );
// }

export default Menu;
