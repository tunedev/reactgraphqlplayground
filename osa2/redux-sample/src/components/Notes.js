import React from 'react';
import { connect } from 'react-redux';
import { toggleImportanceOf } from '../reducers/noteReducers';
import Note from './Note';

const Notes = (props) => {
  // const notes = useSelector((state) => {
  //   if (state.filter === 'ALL') return state.notes;
  //   return state.filter === 'IMPORTANT'
  //     ? state.notes.filter((note) => note.important)
  //     : state.notes.filter((note) => !note.important);
  // });
  // const notes = () => {
  //   if (props.filter === 'ALL') return props.notes;
  //   return props.filter === 'IMPORTANT'
  //     ? props.notes.filter((note) => note.important)
  //     : props.notes.filter((note) => !note.important);
  // };

  return (
    <ul>
      {props.notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          handleClick={() => {
            props.toggleImportanceOf(note.id);
          }}
        />
      ))}
    </ul>
  );
};

const mapStateToProps = (state) => {
  if (state.filter === 'ALL') return { notes: state.notes };
  return {
    notes:
      state.filter === 'IMPORTANT'
        ? state.notes.filter((note) => note.important)
        : state.notes.filter((note) => !note.important),
  };
};

const mapDispatchToProps = {
  toggleImportanceOf,
};

const connectedNotes = connect(mapStateToProps, mapDispatchToProps)(Notes);

export default connectedNotes;
