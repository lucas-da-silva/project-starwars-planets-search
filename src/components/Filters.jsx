import React, { useContext, useEffect, useState } from 'react';
import StarWarsContext from '../contexts/StarWarsContext';

function Filters() {
  const { addNameFilter, addNumericFilter, optionsColumn,
    removeAllFilters } = useContext(StarWarsContext);
  const [filters, setFilters] = useState({
    column: 'population',
    comparison: 'maior que',
    number: 0,
  });

  const handleChange = ({ target: { name, value } }) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      column: optionsColumn[0],
    }));
  }, [optionsColumn]);

  return (
    <section>
      <form>
        <input
          type="text"
          data-testid="name-filter"
          onChange={ (event) => addNameFilter(event.target.value) }
        />
        <label htmlFor="column-filter">
          Coluna
          <select
            name="column"
            value={ filters.column }
            data-testid="column-filter"
            id="column-filter"
            onChange={ handleChange }
          >
            {optionsColumn.map((option) => (
              <option key={ option } value={ option }>{option}</option>
            ))}
          </select>
        </label>
        <label htmlFor="comparison-filter">
          Operador
          <select
            name="comparison"
            value={ filters.comparison }
            data-testid="comparison-filter"
            id="comparison-filter"
            onChange={ handleChange }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <input
          type="number"
          name="number"
          data-testid="value-filter"
          value={ filters.number }
          onChange={ handleChange }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ () => addNumericFilter(filters) }
        >
          Filtrar
        </button>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ removeAllFilters }
        >
          Remover filtros
        </button>
      </form>
    </section>
  );
}

export default Filters;
