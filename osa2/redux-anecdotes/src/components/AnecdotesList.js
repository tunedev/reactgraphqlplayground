import React from 'react';
import { connect } from 'react-redux';
import { increaseVote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import Anecdote from './Anecdote';

const AnecdotesList = (props) => {
  // const dispatch = useDispatch();
  // const anecdotes = useSelector(
  //   (state) =>
  //     state.filterText === ''
  //       ? state.anecdotes
  //       : state.anecdotes.filter((anecdote) =>
  //           anecdote.content
  //             .toLowerCase()
  //             .includes(state.filterText.toLowerCase())
  //         )
  // .map((anecdote) => {
  //   const searchText = new RegExp(state.filterText, 'gi');
  //   const replaceWith = <Em text={state.filterText} />;
  //   return {
  //     ...anecdote,
  //     content: anecdote.content.replace(searchText, replaceWith),
  //   };
  // })
  // );

  const vote = (id) => {
    props.increaseVote(id);

    props.setNotification(
      `You voted for anecdote: ${
        props.anecdotes.find((anecdote) => anecdote.id === id).content
      }`
    );
  };

  return (
    <div>
      {props.anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleVote={() => {
              vote(anecdote.id);
            }}
          />
        ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    anecdotes:
      state.filterText === ''
        ? state.anecdotes
        : state.anecdotes.filter((anecdote) =>
            anecdote.content
              .toLowerCase()
              .includes(state.filterText.toLowerCase())
          ),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increaseVote: (id) => dispatch(increaseVote(id)),
    setNotification: (message) => dispatch(setNotification(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdotesList);
