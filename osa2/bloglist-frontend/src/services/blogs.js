import axios from 'axios';
const baseUrl = '/api/blogs';

const token = { value: null };

const setToken = (newToken) => {
  token.value = `Bearer ${newToken}`;
};

const config = () => ({ headers: { Authorization: token.value } });

const getAll = () => {
  const request = axios.get(baseUrl);
  return request
    .then((response) => {
      return { data: response.data };
    })
    .catch((error) => {
      return { error: error.response.data };
    });
};

const createBlog = async (blog) => {
  const auth = config();
  console.log('auth =>', auth);
  try {
    const response = await axios.post(baseUrl, blog, auth);
    return { data: response.data };
  } catch (error) {
    return { error: error.response.data };
  }
};

const likeBlog = async (blogId) => {
  const auth = config();
  try {
    const response = (await axios.patch(`${baseUrl}/${blogId}/like`, {}, auth))
      .data;
    return { data: response.data };
  } catch (error) {
    return { error: error.response.data };
  }
};

const deleteBlog = async (blogId) => {
  const auth = config();
  try {
    const response = await axios.delete(`${baseUrl}/${blogId}`, auth);
    if (response.status === 204) {
      return { data: { message: 'Success' } };
    }
  } catch (error) {
    return { error: error.response.data };
  }
};

const getSingleBlog = async (blogId) => {
  try {
    const response = await axios.get(`${baseUrl}/${blogId}`);
    return { data: response.data };
  } catch (error) {
    return { error: error.response.data };
  }
};

const addComment = async (blogId, commentBody) => {
  try {
    const response = await axios.post(`${baseUrl}/${blogId}/comments`, {
      body: commentBody,
    });
    return { data: response.data };
  } catch (error) {
    return { error: error.response.data };
  }
};

export default {
  getAll,
  setToken,
  createBlog,
  likeBlog,
  deleteBlog,
  getSingleBlog,
  addComment,
};
