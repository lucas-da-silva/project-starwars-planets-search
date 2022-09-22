import React, { useContext, useState } from 'react';
import StarWarsContext from '../contexts/StarWarsContext';
import '../styles/FilterBySort.css';

function FilterBySort() {
  const { sortPlanet, initialOptionsColumn } = useContext(StarWarsContext);
  const [filters, setFilters] = useState({
    column: 'population',
    sort: 'ASC',
  });

  const handleChange = ({ target: { name, value } }) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <section className="filter-by-sort-container">
      <label className="label-filter" htmlFor="column-sort">
        Ordenar
        <select
          name="column"
          value={ filters.column }
          data-testid="column-sort"
          id="column-sort"
          className="select-filter"
          onChange={ handleChange }
        >
          {initialOptionsColumn.map((option) => (
            <option key={ option } value={ option }>{option}</option>
          ))}
        </select>
      </label>
      <div className="radio-inputs-container">
        <label className="label-radio-filter" htmlFor="column-sort-input-asc">
          <input
            type="radio"
            name="sort"
            value="ASC"
            data-testid="column-sort-input-asc"
            id="column-sort-input-asc"
            onChange={ handleChange }
          />
          Ascendente
        </label>
        <label className="label-radio-filter" htmlFor="column-sort-input-desc">
          <input
            type="radio"
            value="DESC"
            name="sort"
            data-testid="column-sort-input-desc"
            id="column-sort-input-desc"
            onChange={ handleChange }
          />
          Descendente
        </label>
      </div>
      <button
        onClick={ () => sortPlanet(filters) }
        type="button"
        className="button-filter"
        data-testid="column-sort-button"
      >
        Ordenar
      </button>
    </section>
  );
}

export default FilterBySort;
