import axios from 'axios';
const baseUrl = '/api/users';

export const userLogin = async (credentials) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, credentials);

    return { data: response.data };
  } catch (error) {
    return { error: error.response.data };
  }
};

export const saveUser = async (user) => {
  await window.localStorage.setItem('user', JSON.stringify(user));
};

export const clearCachedUser = () => {
  window.localStorage.removeItem('user');
};

export const allUsers = async () => {
  try {
    const response = await axios.get(baseUrl);
    return { data: response.data };
  } catch (error) {
    return { error: error.response.data };
  }
};

export const getSingleUser = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    console.log('Response from getSingleUser func ->', response);
    return { data: response.data };
  } catch (error) {
    return { error: error.response.data };
  }
};
