import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../reducers/usersReducer';

const Users = () => {
  const { users } = useSelector((state) => state.userRelated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return users.length > 0 ? (
    <table>
      <thead>
        <tr>
          <th>
            <h1>Users</h1>
          </th>
          <th>
            <h4>Blogs created</h4>
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : null;
};

export default Users;
