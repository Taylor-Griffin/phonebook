import React from 'react';

const Persons = ({ filteredName, persons }) => {
  return (
    <div>
      {filteredName.length
        ? persons
            .filter((person) =>
              person.name
                .toLocaleLowerCase()
                .includes(filteredName.toLocaleLowerCase())
            )
            .map((person) => (
              <p key={person.name}>
                {person.name} {person.number}
              </p>
            ))
        : persons.map((person) => (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          ))}
    </div>
  );
};

export default Persons;
