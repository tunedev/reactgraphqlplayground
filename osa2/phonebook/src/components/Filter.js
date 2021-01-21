import React from 'react';

const Filter = ({ filterText, handleFilterChange }) => {
  return (
    <form>
      Filter Contact with:{' '}
      <input
        type='text'
        placeholder='search with name'
        value={filterText}
        onChange={handleFilterChange}
      />
    </form>
  );
};

export default Filter;
