const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filterText;
    default:
      return state;
  }
};

export const setFilter = (filterText) => ({
  type: 'SET_FILTER',
  filterText,
});

export default filterReducer;
