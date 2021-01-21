import { addNew, getAll } from '../service/anecdote';
// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
// ];

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   };
// };

// const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const { id } = action.data;
      const anecdoteToBeVotedFor = state.find((anecdote) => anecdote.id === id);

      return state.map((anecdote) =>
        anecdote.id === id
          ? { ...anecdoteToBeVotedFor, votes: anecdoteToBeVotedFor.votes + 1 }
          : anecdote
      );
    case 'ADD_ANECDOTE':
      return [...state, { ...action.data }];
    case 'INIT':
      return action.data;
    default:
      return state;
  }
};

export const increaseVote = (id) => ({
  type: 'VOTE',
  data: { id },
});

export const initializeAnecdote = () => async (dispatch) => {
  const data = await getAll();
  dispatch({
    type: 'INIT',
    data,
  });
};

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const data = await addNew(content);
    dispatch({
      type: 'ADD_ANECDOTE',
      data,
    });
  };
};

export default reducer;
