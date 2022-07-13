import axios from 'axios';
import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import { create, update } from './services/phoneServices';
import Notification from './components/Notification';
const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredName, setFilteredName] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [message, setMessage] = useState(null);
  const [errorStyle, setErrorStyle] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/persons')
      .then((res) => {
        setPersons(res.data);
      })
      .catch((error) => {
        postMessage('Retrieving data failed');
        setErrorStyle(true);
      });
  }, [message]);

  const handleChange = (e) => {
    e.target.id === 'name'
      ? setNewName(e.target.value)
      : setNewNumber(e.target.value);
  };
  const postMessage = (message, name) => {
    setMessage(`${message} ${name}`);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };
  const updateNumber = () => {
    const personToChange = persons.find((person) => person.name === newName);

    const changedPerson = {
      ...personToChange,
      number: newNumber,
    };
    const id = personToChange.id;
    try {
      update(id, changedPerson).then((returnedPerson) => {
        const removePerson = persons.filter((person) => person.id !== id);
        setPersons(removePerson);
        postMessage('Number changed for', personToChange.name);
      });
    } catch {
      setMessage('Already deleted', newName);
      return;
    }
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
        postMessage('Added new number for', newName);
        setErrorStyle(false);
        updateNumber();
        return;
      }
    }

    create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      postMessage('Added', newName);
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
        axios.delete(`http://localhost:3001/api/persons/${personId}`);
      } catch (err) {
        console.log(err);
      }
      const filteredPersons = persons.filter((person) => {
        return person.id !== +personId;
      });

      postMessage('Deleted', personName);
      setErrorStyle(false);

      setPersons(filteredPersons);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} errorStyle={errorStyle} />
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
