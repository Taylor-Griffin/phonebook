import axios from 'axios';
import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import { create, update } from './services/phoneServices';
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

  const updateNumber = () => {
    const personToChange = persons.find((person) => person.name === newName);

    const changedPerson = {
      ...personToChange,
      number: newNumber,
    };
    const id = personToChange.id;

    update(id, changedPerson).then((returnedPerson) => {
      setPersons(
        persons.map((person) => (person.id !== id ? person : returnedPerson))
      );
    });
  };

  const addPerson = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    const listOfPeople = persons.map((person) => person.name);

    if (listOfPeople.includes(newName)) {
      if (
        window.confirm(
          `${newName} already exists in the phonebook, replace the old number with a new one?`
        )
      ) {
        updateNumber();
        return;
      }
    }

    create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName('');
      setNewNumber('');
    });
  };

  const deletePerson = (e) => {
    let personId = e.target.previousElementSibling.getAttribute('data-id');
    const personName =
      e.target.previousElementSibling.getAttribute('data-name');

    if (window.confirm(`Delete ${personName} ?`)) {
      try {
        axios.delete(`http://localhost:3001/persons/${personId}`);
      } catch (err) {
        console.log(err);
      }
      const filteredPersons = persons.filter((person) => {
        return person.id !== +personId;
      });
      setPersons(filteredPersons);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilteredName={setFilteredName} />

      <h2>Add a new contact</h2>
      <PersonForm
        handleSubmit={addPerson}
        handleChange={handleChange}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <Persons
        filteredName={filteredName}
        deletePerson={deletePerson}
        persons={persons}
      />
    </div>
  );
};

export default App;
