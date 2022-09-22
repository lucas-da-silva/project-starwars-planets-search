import React, { useContext } from 'react';
import StarWarsContext from '../contexts/StarWarsContext';
import '../styles/ButtonRemoveAllFilters.css';

function ButtonRemoveAllFilters() {
  const { removeAllFilters } = useContext(StarWarsContext);
  return (
    <button
      type="button"
      className="remove-all-filter"
      data-testid="button-remove-filters"
      style={ { margin: 0 } }
      onClick={ removeAllFilters }
    >
      Remover filtros
    </button>
  );
}

export default ButtonRemoveAllFilters;
