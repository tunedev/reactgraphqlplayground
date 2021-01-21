import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../reducers/usersReducer';

const User = () => {
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.userRelated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo(id));
  }, [id, dispatch]);

  console.log('user Info', userInfo);

  return userInfo ? (
    <div>
      <h1>{userInfo.name}</h1>
      <h4>added blogs</h4>
      <ul>
        {userInfo.blogs.length > 0 ? (
          userInfo.blogs.map((blog) => <li key={blog.id}>{blog.title}</li>)
        ) : (
          <h6>User has has not added any blog yet</h6>
        )}
      </ul>
    </div>
  ) : (
    <h3>Loading...</h3>
  );
};

export default User;
