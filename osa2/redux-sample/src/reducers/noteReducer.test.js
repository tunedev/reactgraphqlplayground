import noteReducer from './noteReducers';
import deepFreeze from 'deep-freeze';

describe('noteReducer', () => {
  test('returns new state with action new note', () => {
    const state = [];
    const action = {
      type: 'NEW_NOTE',
      data: {
        content: 'Some real good content',
        id: 2,
        important: true,
      },
    };
    // Enforcing imutability
    deepFreeze(state);
    const newState = noteReducer(state, action);

    expect(newState).toHaveLength(1);
    expect(newState).toContainEqual(action.data);
  });

  test('returns new state with action type TOGGLE_IMPORTANCE', () => {
    const state = [
      {
        content: 'first dummy data with initial importance set to true',
        id: 1,
        important: true,
      },
      {
        content: 'second dummy data with initial importance set to false',
        id: 2,
        important: false,
      },
    ];

    const action = {
      type: 'TOGGLE_IMPORTANCE',
      data: {
        id: 2,
      },
    };

    deepFreeze(state);
    const newState = noteReducer(state, action);
    expect(newState).toHaveLength(2);

    expect(newState).toContainEqual(state[0]);
    expect(newState).toContainEqual({ ...state[1], important: true });
  });
});
