const initialState = {
  message: '',
  error: false,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.data;
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

export const resetNotification = () => ({
  type: 'RESET',
});

export const notifyError = (message) => ({
  type: 'SET_MESSAGE',
  data: {
    message,
    error: true,
  },
});

export const notify = (message) => ({
  type: 'SET_MESSAGE',
  data: {
    message,
    error: false,
  },
});

let timeOutId;
export const setNotification = (message, duration = 5, error = false) => {
  return (dispatch) => {
    console.log('timeout id ->', timeOutId);
    clearTimeout(timeOutId);
    if (error) {
      dispatch(notifyError(message));
    }
    dispatch(notify(message));
    timeOutId = setTimeout(() => {
      dispatch(resetNotification());
    }, duration * 1000);
  };
};

export default notificationReducer;
