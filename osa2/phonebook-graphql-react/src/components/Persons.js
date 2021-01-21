import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { FIND_PERSON } from '../queries';

const Persons = ({ persons }) => {
  const [person, setPerson] = useState(null);
  const [getPerson, result] = useLazyQuery(FIND_PERSON);

  const showPerson = (name) => {
    getPerson({ variables: { nameToSearch: name } });
  };

  useEffect(() => {
    if (result.data) {
      setPerson(result.data.findPerson);
    }
  }, [result]);

  if (person) {
    return (
      <div>
        <h3>Name: {person.name}</h3>
        {person.phone && <p>Phone: {person.phone}</p>}
        <p>Address: {`${person.address.street}, ${person.address.city}`}</p>
        <button onClick={() => setPerson(null)}>Close</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Persons</h2>
      {persons.map((person) => (
        <div key={person.id}>
          <h3>
            {person.name} {person.phone}
          </h3>
          <button onClick={() => showPerson(person.name)}>Show address</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
