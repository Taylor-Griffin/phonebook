import React from 'react';

const Filter = ({ setFilteredName }) => {
  return (
    <div>
      {' '}
      <label htmlFor="filter">Filter shown with: </label>
      <input
        type="text"
        id="filter"
        onChange={(e) => setFilteredName(e.target.value)}
      />
    </div>
  );
};

export default Filter;
