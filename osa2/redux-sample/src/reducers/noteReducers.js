import { getAll, newNote } from '../service/notes';

const noteReducer = (state = [], action) => {
  // console.log('Action', action);
  switch (action.type) {
    case 'NEW_NOTE':
      return [...state, action.data];
    case 'TOGGLE_IMPORTANCE':
      const { id } = action.data;
      const noteToToggle = state.find((item) => item.id === id);
      const changedNote = {
        ...noteToToggle,
        important: !noteToToggle.important,
      };
      return state.map((item) => (item.id === id ? changedNote : item));
    case 'INIT_NOTES':
      return action.data;
    default:
      return state;
  }
};

export const initializeNotes = () => {
  return async (dispatch) => {
    const data = await getAll();
    dispatch({
      type: 'INIT_NOTES',
      data,
    });
  };
};

// const generateId = () => Number((Math.random() * 1000000).toFixed(0));

export const createNote = (content) => {
  return async (dispatch) => {
    const data = await newNote(content);
    dispatch({
      type: 'NEW_NOTE',
      data,
    });
  };
};

export const toggleImportanceOf = (id) => ({
  type: 'TOGGLE_IMPORTANCE',
  data: { id },
});

export default noteReducer;
