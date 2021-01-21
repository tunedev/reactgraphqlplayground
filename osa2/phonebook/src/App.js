import React, { useState, useEffect } from 'react';
import Person from './components/Person.js';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Notification from './components/notification';
import { getAll, create, deleteOne, update } from './services/person';

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterText, setFilterText] = useState('');
  const [notifyMessage, setNotifyMessage] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    getAll().then((initialValue) => {
      setPersons(initialValue);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPersonObj = {
      name: newName,
      number: newNumber,
    };

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (existingPerson) {
      console.log('updating instead');
      setNotifyMessage(`${newName} have been updated successfully`);
      setTimeout(() => {
        setNotifyMessage(null);
      }, 2000);
      update(existingPerson.id, newPersonObj).then((response) => {
        setPersons(
          persons.map((person) =>
            person.id === existingPerson.id ? response : person
          )
        );
      });
      return;
    }

    setNotifyMessage(`Added ${newName.toUpperCase()}`);
    setTimeout(() => {
      setNotifyMessage(null);
    }, 5000);
    create(newPersonObj).then((response) => {
      setPersons(persons.concat(response));
      setNewName('');
      setNewNumber('');
    });
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const deletePerson = (id) => {
    const personObj = persons.find((person) => person.id === id);
    deleteOne(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch((error) => {
        setNotifyMessage(
          `Information of ${personObj.name} has already been removed from server`
        );
        setError(true);
        setTimeout(() => {
          setNotifyMessage(null);
          setError(false);
        }, 5000);
        setPersons(persons.filter((person) => person.id !== id));
      });
  };

  const personsToDisplay =
    filterText === ''
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filterText.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifyMessage} error={error} />
      <Filter handleFilterChange={handleFilterChange} filterText={filterText} />
      <h2>Add new</h2>
      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      {personsToDisplay.map((person, index) => (
        <Person
          key={index}
          person={person}
          handleDelete={() => deletePerson(person.id)}
        />
      ))}
    </div>
  );
}

export default App;
