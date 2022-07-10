const Persons = ({ filteredName, persons, deletePerson }) => {
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
              <div key={person.id} className="flex">
                <p>
                  {person.name} {person.number}
                </p>
                <button className="button delete">delete</button>
              </div>
            ))
        : persons.map((person) => (
            <div key={person.id} className="flex">
              <p data-id={person.id} data-name={person.name}>
                {person.name} {person.number}
              </p>
              <button className="button delete" onClick={deletePerson}>
                delete
              </button>
            </div>
          ))}
    </div>
  );
};

export default Persons;
