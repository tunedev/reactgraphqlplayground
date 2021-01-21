import {
  saveUser,
  userLogin,
  allUsers,
  getSingleUser,
} from '../services/users';
import blogService from '../services/blogs';
import { emitMessage } from './notifyReducer';
const userReducer = (
  state = { user: null, users: [], userInfo: null },
  action
) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.data };
    case 'CLEAR_USER':
      return { ...state, user: null };
    case 'ADD_USERS':
      return { ...state, users: action.data };
    case 'SET_USER_INFO':
      return { ...state, userInfo: action.data };
    default:
      return state;
  }
};

export const setUser = (user) => {
  blogService.setToken(user.token);
  return {
    type: 'SET_USER',
    data: user,
  };
};

export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem('user');
    dispatch({
      type: 'CLEAR_USER',
    });
    dispatch(emitMessage('Logout was successful'));
  };
};

export const login = (credentials) => {
  return async (dispatch) => {
    const { data, error } = await userLogin(credentials);
    if (error) {
      dispatch(emitMessage(error.message, true));
    } else {
      dispatch(setUser(data));
      saveUser(data);
      dispatch(emitMessage(`${data.user.name} login successful`));
    }
  };
};

export const getAllUsers = () => {
  return async (dispatch) => {
    const { data, error } = await allUsers();
    if (error) {
      dispatch(emitMessage(error.message, true));
    } else {
      dispatch({
        type: 'ADD_USERS',
        data,
      });
    }
  };
};

export const getUserInfo = (id) => {
  return async (dispatch) => {
    const { data, error } = await getSingleUser(id);
    console.log('Actions creator log ->', data);
    if (error) {
      dispatch(emitMessage(error.message, true));
    } else {
      dispatch({
        type: 'SET_USER_INFO',
        data,
      });
    }
  };
};

export default userReducer;
