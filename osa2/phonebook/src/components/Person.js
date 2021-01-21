import React from 'react';

const Person = ({ person, handleDelete }) => {
  return (
    <div>
      <h3 style={{ textTransform: 'uppercase' }}>
        {person.name} <button onClick={handleDelete}>Delete</button>
      </h3>
      <p>{person.number}</p>
    </div>
  );
};

export default Person;
