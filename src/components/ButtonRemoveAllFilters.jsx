import React, { useContext } from 'react';
import StarWarsContext from '../contexts/StarWarsContext';

function ButtonRemoveAllFilters() {
  const { removeAllFilters } = useContext(StarWarsContext);
  return (
    <button
      type="button"
      className="button-filter"
      data-testid="button-remove-filters"
      onClick={ removeAllFilters }
    >
      Remover filtros
    </button>
  );
}

export default ButtonRemoveAllFilters;
