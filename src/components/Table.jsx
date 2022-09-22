import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import StarWarsContext from '../contexts/StarWarsContext';
import '../styles/Table.css';
import TableRender from './TableRender';

const HIGH_VALUE = 1;
const LOWER_VALUE = -1;

function Table() {
  const { planets, filterByName, filterByNumericValues,
    removeFilter, filterBySort } = useContext(StarWarsContext);

  const filterNumericPlanets = (planet, column, comparison, number) => {
    if (comparison === 'maior que') return Number(planet[column]) > Number(number);
    if (comparison === 'menor que') return Number(planet[column]) < Number(number);
    if (comparison === 'igual a') return Number(planet[column]) === Number(number);
  };

  const sortPlanets = (planetsToSort, column, sort) => {
    if (sort === 'ASC') {
      return planetsToSort.sort(
        (a, b) => {
          if (a[column] === 'unknown') return HIGH_VALUE;
          if (b[column] === 'unknown') return LOWER_VALUE;
          return a[column] - b[column];
        },
      );
    }
    if (sort === 'DESC') {
      return planetsToSort.sort(
        (a, b) => {
          if (a[column] === 'unknown') return HIGH_VALUE;
          if (b[column] === 'unknown') return LOWER_VALUE;
          return b[column] - a[column];
        },
      );
    }
  };

  let filteredPlanets = planets;

  if (filterByName.name) {
    const nameFilter = filterByName.name.toLowerCase();
    filteredPlanets = filteredPlanets.filter(
      ({ name }) => name.toLowerCase().includes(nameFilter),
    );
  }

  if (filterByNumericValues.length) {
    filteredPlanets = filteredPlanets.filter((planet) => {
      let value = true;
      filterByNumericValues.forEach(({ column, comparison, number }) => {
        if (planet[column] === 'unknown') value = false;
        const result = filterNumericPlanets(planet, column, comparison, number);
        if (!result) value = false;
      });
      return value;
    });
  }

  if (filterBySort.order) {
    const { order: { column, sort } } = filterBySort;
    filteredPlanets = sortPlanets(filteredPlanets, column, sort);
  }

  return (
    <section className="table-container">
      <div className="created-filters-container">
        {filterByNumericValues.map(({ column, comparison, number }, index) => (
          <div className="filter" data-testid="filter" key={ index }>
            <p>{`${column} ${comparison} ${number}`}</p>
            <button
              onClick={ () => removeFilter(index) }
              type="button"
            >
              <FontAwesomeIcon className="icon-trash" icon="fa-solid fa-trash" />
            </button>
          </div>
        ))}
      </div>
      <table className="table-planets" id="table-planets">
        <thead id="table-head">
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
