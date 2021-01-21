import blogService from '../services/blogs';
import { emitMessage } from './notifyReducer';

const GET_ALL = 'GET_ALL';
const ADD_NEW_BLOG = 'ADD_NEW_BLOG';
const REMOVE_A_BLOG = 'REMOVE_A_BLOG';
const ADJUST_A_BLOG = 'ADJUST_A_BLOG';
const GET_SINGLE_BLOG = 'GET_SINGLE_BLOG';

const blogListReducer = (state = { blogs: [], blog: null }, action) => {
  switch (action.type) {
    case GET_ALL:
      return { ...state, blogs: action.data };
    case ADD_NEW_BLOG:
      return { ...state, blogs: [...state.blog, action.data] };
    case REMOVE_A_BLOG:
      return {
        ...state,
        blogs: state.blogs.filter((blog) => blog.id !== action.blogId),
      };
    case ADJUST_A_BLOG:
      return {
        ...state,
        blogs: state.blogs.map((blog) =>
          blog.id === action.blogId ? action.data : blog
        ),
        blog: state.blog.id === action.blogId ? action.data : state.blog,
      };
    case GET_SINGLE_BLOG:
      return {
        ...state,
        blog: action.data,
      };
    default:
      return state;
  }
};

export const getAll = () => {
  return async (dispatch) => {
    const { data, error } = await blogService.getAll();
    if (error) {
      dispatch(emitMessage(error.message, true));
    }
    dispatch({
      type: GET_ALL,
      data,
    });
  };
};

export const createNewBlog = ({ title, url, author }) => {
  return async (dispatch) => {
    const { data, error } = await blogService.createBlog({
      title,
      url,
      author,
    });
    if (error) {
      dispatch(emitMessage(error.message, true));
    } else {
      dispatch({
        type: ADD_NEW_BLOG,
        data,
      });
      dispatch(
        emitMessage(
          `successfully added new blog ${data.title.toUpperCase()} by ${data.author.toUpperCase()}`
        )
      );
    }
  };
};

export const deleteBlog = (blogId) => {
  return async (dispatch) => {
    const { error } = await blogService.deleteBlog(blogId);

    if (error) {
      dispatch(emitMessage(error.message, true));
    } else {
      dispatch({
        type: REMOVE_A_BLOG,
        blogId,
      });
    }
  };
};

export const likeBlog = (blogId) => {
  return async (dispatch) => {
    const { data, error } = await blogService.likeBlog(blogId);
    if (error) {
      dispatch(emitMessage(error.message, true));
    } else {
      dispatch({
        type: ADJUST_A_BLOG,
        blogId,
        data,
      });
      dispatch(
        emitMessage(`Added Like to ${data.title.toUpperCase()} successfully`)
      );
    }
  };
};

export const getSingleBlog = (blogId) => {
  console.log('i am being dispatched');
  return async (dispatch) => {
    const { data, error } = await blogService.getSingleBlog(blogId);
    console.log('Single Blog info ->', data);
    if (error) {
      dispatch(emitMessage(error.message, true));
    } else {
      dispatch({
        type: GET_SINGLE_BLOG,
        data,
      });
    }
  };
};

export const blogComment = (id, body) => {
  return async (dispatch) => {
    const { data, error } = await blogService.addComment(id, body);
    console.log('DATA ->', data);
    if (error) {
      dispatch(emitMessage(error.message, true));
    } else {
      dispatch({
        type: ADJUST_A_BLOG,
        blogId: id,
        data,
      });
      dispatch(
        emitMessage(
          `Comment has been added to ${data.title.toUpperCase()} successfully`
        )
      );
    }
  };
};

export default blogListReducer;
