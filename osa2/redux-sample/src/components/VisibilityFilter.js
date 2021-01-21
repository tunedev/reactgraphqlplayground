import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const VisibilityFilter = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setFilter(e.target.value.toUpperCase()));
  };
  return (
    <div>
      all{' '}
      <input type='radio' name='filter' value='all' onChange={handleChange} />
      important{' '}
      <input
        type='radio'
        name='filter'
        value='important'
        onChange={handleChange}
      />
      nonimportant{' '}
      <input
        type='radio'
        name='filter'
        value='nonimportant'
        onChange={handleChange}
      />
    </div>
  );
};

export default VisibilityFilter;
