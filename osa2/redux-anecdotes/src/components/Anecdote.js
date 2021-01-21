import React from 'react';

const Anecdote = ({ anecdote, handleVote }) => (
  <div key={anecdote.id}>
    <div>{anecdote.content}</div>
    <div>
      has {anecdote.votes}
      <button onClick={handleVote}>vote</button>
    </div>
  </div>
);

export default Anecdote;
