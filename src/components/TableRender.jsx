import PropTypes from 'prop-types';
import React from 'react';

function TableRender({ planet }) {
  return (
    <tr>
      <td data-testid="planet-name">{planet.name}</td>
      <td>{planet.rotation_period}</td>
      <td>{planet.orbital_period}</td>
      <td>{planet.diameter}</td>
      <td>{planet.climate}</td>
      <td>{planet.gravity}</td>
      <td>{planet.terrain}</td>
      <td>{planet.surface_water}</td>
      <td>{planet.population}</td>
      <td>{planet.films.map((film, index) => <p key={ index }>{film}</p>)}</td>
      <td><p>{planet.created}</p></td>
      <td><p>{planet.edited}</p></td>
      <td><p>{planet.url}</p></td>
    </tr>
  );
}

TableRender.propTypes = {
  planet: PropTypes.shape({
    climate: PropTypes.string,
    created: PropTypes.string,
    diameter: PropTypes.string,
    edited: PropTypes.string,
    films: PropTypes.arrayOf(PropTypes.string),
    gravity: PropTypes.string,
    name: PropTypes.string,
    orbitalPeriod: PropTypes.string,
    population: PropTypes.string,
    rotationPeriod: PropTypes.string,
    surfaceWater: PropTypes.string,
    terrain: PropTypes.string,
    url: PropTypes.string,
  }),
}.isRequired;

export default TableRender;
