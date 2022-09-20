import PropTypes from 'prop-types';
import React from 'react';

function TableRender({ planet }) {
  return (
    <tr>
      <td>{planet.name}</td>
      <td>{planet.rotation_period}</td>
      <td>{planet.orbital_period}</td>
      <td>{planet.diameter}</td>
      <td>{planet.climate}</td>
      <td>{planet.gravity}</td>
      <td>{planet.terrain}</td>
      <td>{planet.surface_water}</td>
      <td>{planet.population}</td>
      <td>{planet.films}</td>
      <td>{planet.created}</td>
      <td>{planet.edited}</td>
      <td>{planet.url}</td>
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
