import React, { useContext, useEffect, useState } from 'react';
import StarWarsContext from '../contexts/StarWarsContext';
import '../styles/FilterByNumeric.css';

function FilterByNumeric() {
  const { addNumericFilter, optionsColumn } = useContext(StarWarsContext);
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
    <section className="filter-by-numeric-cotainer">
      <label className="label-filter" htmlFor="column-filter">
        Coluna
        <select
          name="column"
          value={ filters.column }
          data-testid="column-filter"
          id="column-filter"
          className="select-filter"
          onChange={ handleChange }
        >
          {optionsColumn.map((option) => (
            <option key={ option } value={ option }>{option}</option>
          ))}
        </select>
      </label>
      <label className="label-filter" htmlFor="comparison-filter">
        Operador
        <select
          name="comparison"
          value={ filters.comparison }
          className="select-filter"
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
        className="value-filter"
        data-testid="value-filter"
        value={ filters.number }
        onChange={ handleChange }
      />
      <button
        data-testid="button-filter"
        type="button"
        className="button-filter"
        onClick={ () => addNumericFilter(filters) }
      >
        Filtrar
      </button>
    </section>
  );
}

export default FilterByNumeric;
