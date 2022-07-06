import React from 'react';

const PersonForm = ({ handleSubmit, handleChange, newName, newNumber }) => {
  return (
    <>
      {' '}
      <form onSubmit={handleSubmit}>
        <div className="flex-input">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            onChange={handleChange}
            value={newName}
          />
        </div>
        <div className="flex-input">
          <label htmlFor="number" maxLength="10">
            Number:
          </label>

          <input type="text" onChange={handleChange} value={newNumber} />
        </div>

        <div>
          <button type="submit" className="button">
            add
          </button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
