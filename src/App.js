import { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '230-324-0987' },
  ]);
  const [filteredName, setFilteredName] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const handleChange = (e) => {
    e.target.id === 'name'
      ? setNewName(e.target.value)
      : setNewNumber(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const listOfPeople = persons.map((person) => person.name);
    if (listOfPeople.includes(newName)) {
      window.alert(`${newName} already exists in the phonebook`);
      return;
    }

    setPersons([
      ...persons,
      {
        name: newName,
        number: newNumber,
      },
    ]);
    setNewName('');
    setNewNumber('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilteredName={setFilteredName} />

      <h2>Add a new contact</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <Persons filteredName={filteredName} persons={persons} />
    </div>
  );
};

export default App;
