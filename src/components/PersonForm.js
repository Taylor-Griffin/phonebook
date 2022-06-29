import React from 'react';

const PersonForm = ({ handleSubmit, handleChange, newName, newNumber }) => {
  return (
    <div>
      {' '}
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
    </div>
  );
};

export default PersonForm;
