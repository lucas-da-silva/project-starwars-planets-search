import React, { useContext } from 'react';
import StarWarsContext from '../contexts/StarWarsContext';
import TableRender from './TableRender';

function Table() {
  const { planets, filterByName, filterByNumericValues } = useContext(StarWarsContext);

  let filteredPlanets = planets;
  if (filterByName.name) {
    filteredPlanets = planets.filter(({ name }) => name.includes(filterByName.name));
  }
  if (filterByNumericValues.length) {
    filteredPlanets = planets.filter((planet) => {
      let value = true;
      filterByNumericValues.forEach(({ column, comparison, number }) => {
        switch (comparison) {
        case 'maior que':
          if (Number(planet[column]) <= Number(number)) {
            value = false;
          }
          break;
        case 'menor que':
          if (Number(planet[column]) >= Number(number)) {
            value = false;
          }
          break;
        case 'igual a':
          if (Number(planet[column]) !== Number(number)) {
            value = false;
          }
          break;
        default: return false;
        }
      });
      return value;
    });
  }

  return (
    <section>
      {filterByNumericValues.map(({ column, comparison, number }, index) => (
        <div key={ index }>
          <p>{`${column} ${comparison} ${number}`}</p>
          <button type="button">remover</button>
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
