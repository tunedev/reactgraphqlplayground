import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const anecdote = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const App = () => {
  const [selected, setSelected] = useState(0);
  const [votes, setVote] = useState(
    Array.apply(null, new Array(anecdote.length)).map(
      Number.prototype.valueOf,
      0
    )
  );
  const [highestVote, setHighestVote] = useState(0);

  const nextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdote.length));
  };

  const increaseVote = () => {
    const copyOfVotes = [...votes];
    copyOfVotes[selected]++;
    if (copyOfVotes[selected] > highestVote) {
      setHighestVote(copyOfVotes[selected]);
    }
    setVote(copyOfVotes);
  };

  const indexOfHighestVote = votes.findIndex((vote) => vote === highestVote);

  return (
    <div className='container'>
      <h1>{anecdote[selected]}</h1>
      <p>has {votes[selected]} votes</p>
      <button onClick={increaseVote}>Vote</button>
      <button onClick={nextAnecdote}>Next Anecdote</button>
      {highestVote > 0 ? (
        <div>
          <h1>Anecdotes with the most votes</h1>
          <h1>{anecdote[indexOfHighestVote]}</h1>
          <p>has {highestVote} votes</p>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
