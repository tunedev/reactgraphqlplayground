import React, { useState } from 'react';

const CommentForm = ({ addComment }) => {
  const [inputState, setInputState] = useState({
    body: '',
  });

  const handleAddCommentSubmit = (event) => {
    event.preventDefault();
    addComment(inputState);
    setInputState({
      body: '',
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
    <form className='blog-form' onSubmit={handleAddCommentSubmit}>
      <h2>Add Comment</h2>
      <label htmlFor='body'>
        Body:
        <input
          type='text'
          name='body'
          id='body'
          className='body'
          placeholder='Enter Comment Body'
          value={inputState.body}
          onChange={handleInputChange}
        />
      </label>
      <button id='add-new-comment'>Add Comment</button>
    </form>
  );
};

export default CommentForm;
