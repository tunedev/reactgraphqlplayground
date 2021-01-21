import React from 'react';

const PersonForm = ({
  handleNumberChange,
  handleNameChange,
  newNumber,
  newName,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:{' '}
        <input
          type='text'
          placeholder='Enter Name here'
          required
          onChange={handleNameChange}
          value={newName}
        />
      </div>
      <div>
        Number:{' '}
        <input
          type='tel'
          placeholder='Enter Number here'
          onChange={handleNumberChange}
          required
          value={newNumber}
        />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

export default PersonForm;
