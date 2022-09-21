import React, { useContext } from 'react';
import StarWarsContext from '../contexts/StarWarsContext';
import TableRender from './TableRender';

function Table() {
  const { planets, filterByName, filterByNumericValues,
    removeFilter } = useContext(StarWarsContext);

  const filterNumericPlanets = (planet, column, comparison, number) => {
    switch (comparison) {
    case 'maior que':
      return Number(planet[column]) > Number(number);
    case 'menor que':
      return Number(planet[column]) < Number(number);
    case 'igual a':
      return Number(planet[column]) === Number(number);
    default: return false;
    }
  };

  let filteredPlanets = planets;

  if (filterByName.name) {
    filteredPlanets = filteredPlanets.filter(
      ({ name }) => name.includes(filterByName.name),
    );
  }

  if (filterByNumericValues.length) {
    filteredPlanets = filteredPlanets.filter((planet) => {
      let value = true;
      filterByNumericValues.forEach(({ column, comparison, number }) => {
        if (planet[column] === 'unknown') {
          value = false;
        }
        const result = filterNumericPlanets(planet, column, comparison, number);
        if (!result) {
          value = false;
        }
      });
      return value;
    });
  }

  return (
    <section>
      {filterByNumericValues.map(({ column, comparison, number }, index) => (
        <div data-testid="filter" key={ index }>
          <p>{`${column} ${comparison} ${number}`}</p>
          <button
            onClick={ () => removeFilter(index) }
            type="button"
          >
            remover
          </button>
        </div>
      ))}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlanets.map((planet) => (
            <TableRender key={ planet.name } planet={ planet } />
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Table;
