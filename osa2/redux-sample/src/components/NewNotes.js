import React from 'react';
import { createNote } from '../reducers/noteReducers';
import { connect } from 'react-redux';

const NewNote = (props) => {
  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = '';

    props.createNote(content);
  };

  return (
    <form onSubmit={addNote}>
      <input type='text' name='note' />
      <button>Add Note</button>
    </form>
  );
};

const mapDispatchToProps = {
  createNote,
};

const connectedNewNote = connect(null, mapDispatchToProps)(NewNote);
export default connectedNewNote;
