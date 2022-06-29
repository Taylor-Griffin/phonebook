import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '' }]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const handleChange = (e) => {
    e.target.id === 'name'
      ? setNewName(e.target.value)
      : setNewNumber(e.target.value);
    console.log(e.target);
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
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            onChange={handleChange}
            value={newName}
          />
          <div>
            <label htmlFor="number">Number:</label>

            <input type="text" onChange={handleChange} value={newNumber} />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
