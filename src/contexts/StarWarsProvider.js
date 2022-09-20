import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import apiStarWars from '../services/apiStarWars';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState({});
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      const newPlanets = await apiStarWars();
      setPlanets(newPlanets);
    };
    fetchPlanets();
  }, []);

  const contextType = {
    planets,
    filterByName,
    setFilterByName,
    filterByNumericValues,
    setFilterByNumericValues,
  };

  return (
    <StarWarsContext.Provider value={ contextType }>
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default StarWarsProvider;
