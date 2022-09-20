import React, { useContext, useState } from 'react';
import StarWarsContext from '../contexts/StarWarsContext';

function Filters() {
  const { setFilterByName, setFilterByNumericValues,
    filterByNumericValues } = useContext(StarWarsContext);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    setFilterByNumericValues((prevFilterByNumericValues) => [
      ...prevFilterByNumericValues,
      filters,
    ]);
  };

  let optionsColumn = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];

  if (filterByNumericValues.length) {
    optionsColumn = optionsColumn.filter(
      (option) => filterByNumericValues.some(({ column }) => option !== column),
    );
  }

  return (
    <section>
      <form onSubmit={ handleSubmit }>
        <input
          type="text"
          data-testid="name-filter"
          onChange={ (event) => setFilterByName({ name: event.target.value }) }
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
        <button data-testid="button-filter" type="submit">Filtrar</button>
      </form>
    </section>
  );
}

export default Filters;
