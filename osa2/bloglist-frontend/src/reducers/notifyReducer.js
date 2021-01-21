const notifier = (state = { message: null, error: false }, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.data;
    default:
      return state;
  }
};

const setNotifyMessage = (data) => ({
  type: 'SET_MESSAGE',
  data,
});

export const emitMessage = (message, error = false, timer = 5000) => {
  return (dispatch) => {
    dispatch(setNotifyMessage({ message, error }));
    setTimeout(() => {
      dispatch(setNotifyMessage({ message: null, error: false }));
    }, timer);
  };
};

export default notifier;
