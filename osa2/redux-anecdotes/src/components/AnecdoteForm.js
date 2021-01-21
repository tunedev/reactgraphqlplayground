import React from 'react';
import { connect } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { addAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = (props) => {
  const handleAddAnecdote = (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = '';

    props.addAnecdote(anecdote);

    props.setNotification(`You added new anecdote: ${anecdote}`);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAddAnecdote}>
        <div>
          <input name='anecdote' className='anecdote' />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default connect(null, { addAnecdote, setNotification })(AnecdoteForm);
