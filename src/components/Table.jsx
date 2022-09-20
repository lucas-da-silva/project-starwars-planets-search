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
      const { column, comparison, number } = filterByNumericValues[0];
      switch (comparison) {
      case 'maior que':
        return Number(planet[column]) > Number(number);
      case 'menor que':
        return Number(planet[column]) < Number(number);
      case 'igual a':
        return Number(planet[column]) === Number(number);
      default: return false;
      }
      // let value = true;
      // filterByNumericValues.forEach(({ column, comparison, number }) => {
      //   switch (comparison) {
      //   case 'greater':
      //     value = Number(planet[column]) > Number(number);
      //     break;
      //   case 'less':
      //     value = Number(planet[column]) < Number(number);
      //     break;
      //   case 'equal':
      //     value = Number(planet[column]) === Number(number);
      //     break;
      //   default: return false;
      //   }
      // });
    });
  }

  return (
    <section>
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
