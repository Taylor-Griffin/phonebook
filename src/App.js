import axios from 'axios';
import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import create from './services/phoneServices';
const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredName, setFilteredName] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((res) => {
      setPersons(res.data);
    });
  }, []);
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

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    create(personObject).then((response) => {
      setPersons(persons.concat(response.data));
    });

    // setPersons([
    //   ...persons,
    //   {
    //     name: newName,
    //     number: newNumber,
    //   },
    // ]);
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
