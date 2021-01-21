import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [inputState, setInputState] = useState({
    title: '',
    url: '',
    author: '',
  });

  const handleCreateBlogSubmit = (event) => {
    event.preventDefault();
    createBlog(inputState);
    setInputState({
      title: '',
      url: '',
      author: '',
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputState((state) => ({
      ...state,
      [name]: value,
    }));
  };
  return (
    <form className='blog-form' onSubmit={handleCreateBlogSubmit}>
      <h2>Create new Blog</h2>
      <label htmlFor='title'>
        Title:
        <input
          type='text'
          name='title'
          id='title'
          className='title'
          placeholder='Enter Title'
          value={inputState.title}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label htmlFor='author'>
        Author:
        <input
          type='text'
          name='author'
          id='author'
          className='author'
          placeholder="Enter Blog's Author"
          value={inputState.author}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label htmlFor='url'>
        url:
        <input
          type='text'
          name='url'
          id='url'
          className='url'
          placeholder='Enter blog Url'
          value={inputState.url}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <button id='create-new-blog'>Create New Blog</button>
    </form>
  );
};

export default BlogForm;
