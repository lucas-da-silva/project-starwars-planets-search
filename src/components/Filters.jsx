import React, { useContext, useEffect, useState } from 'react';
import StarWarsContext from '../contexts/StarWarsContext';

function Filters() {
  const { addNameFilter, addNumericFilter, optionsColumn, sortPlanet,
    removeAllFilters, initialOptionsColumn } = useContext(StarWarsContext);
  const [filters, setFilters] = useState({
    column: 'population',
    comparison: 'maior que',
    number: 0,
  });
  const [filtersSort, setFiltersSort] = useState({
    column: 'population',
    sort: 'ASC',
  });

  const handleChange = ({ target: { name, value } }) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleChangeSort = ({ target: { name, value } }) => {
    setFiltersSort((prevFiltersSort) => ({
      ...prevFiltersSort,
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
          onChange={ ({ target: { value } }) => addNameFilter(value) }
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
        <label htmlFor="column-sort">
          Ordenar
          <select
            name="column"
            value={ filtersSort.column }
            data-testid="column-sort"
            id="column-sort"
            onChange={ handleChangeSort }
          >
            {initialOptionsColumn.map((option) => (
              <option key={ option } value={ option }>{option}</option>
            ))}
          </select>
        </label>
        <label htmlFor="column-sort-input-asc">
          <input
            type="radio"
            name="sort"
            value="ASC"
            data-testid="column-sort-input-asc"
            id="column-sort-input-asc"
            onChange={ handleChangeSort }
          />
          Ascendente
        </label>
        <label htmlFor="column-sort-input-desc">
          <input
            type="radio"
            value="DESC"
            name="sort"
            data-testid="column-sort-input-desc"
            id="column-sort-input-desc"
            onChange={ handleChangeSort }
          />
          Descendente
        </label>
        <button
          onClick={ () => sortPlanet(filtersSort) }
          type="button"
          data-testid="column-sort-button"
        >
          Ordenar
        </button>
      </form>
    </section>
  );
}

export default Filters;
