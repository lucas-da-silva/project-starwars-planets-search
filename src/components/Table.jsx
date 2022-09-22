import React, { useContext } from 'react';
import StarWarsContext from '../contexts/StarWarsContext';
import TableRender from './TableRender';

function Table() {
  const { planets, filterByNumericValues, removeFilter } = useContext(StarWarsContext);

  return (
    <section>
      {filterByNumericValues.map(({ column, comparison, number }, index) => (
        <div data-testid="filter" key={ index }>
          <p>{`${column} ${comparison} ${number}`}</p>
          <button
            onClick={ () => removeFilter(index) }
            type="button"
          >
            Remover
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
          {planets.map((planet) => (
            <TableRender key={ planet.name } planet={ planet } />
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Table;
