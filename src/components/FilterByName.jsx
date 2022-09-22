import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import StarWarsContext from '../contexts/StarWarsContext';
import '../styles/FilterByName.css';

function FilterByName() {
  const { addNameFilter } = useContext(StarWarsContext);
  return (
    <div className="input-group">
      <input
        type="text"
        className="name-filter"
        placeholder="Nome do planeta"
        aria-label="Nome do planeta"
        data-testid="name-filter"
        onChange={ ({ target: { value } }) => addNameFilter(value) }
        aria-describedby="basic-addon1"
      />
      <span className="input-group-text">
        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
      </span>
    </div>
  );
}

export default FilterByName;
