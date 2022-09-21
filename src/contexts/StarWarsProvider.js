import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import apiStarWars from '../services/apiStarWars';
import StarWarsContext from './StarWarsContext';

const INITIAL_OPTIONS_COLUMN = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
];

function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState({});
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [optionsColumn, setOptionsColumn] = useState(INITIAL_OPTIONS_COLUMN);

  useEffect(() => {
    const fetchPlanets = async () => {
      const newPlanets = await apiStarWars();
      setPlanets(newPlanets);
    };
    fetchPlanets();
  }, []);

  const addNameFilter = (name) => {
    setFilterByName({ name });
  };

  const addNumericFilter = (filters) => {
    setFilterByNumericValues((prevFilterByNumericValues) => [
      ...prevFilterByNumericValues,
      filters,
    ]);
  };

  useEffect(() => {
    if (filterByNumericValues.length) {
      const newOptionsColumn = INITIAL_OPTIONS_COLUMN.filter(
        (option) => filterByNumericValues.some(({ column }) => option !== column),
      );
      setOptionsColumn(newOptionsColumn);
    }
  }, [filterByNumericValues]);

  const removeFilter = (indexFilter) => {
    const filters = filterByNumericValues.filter((_, index) => index !== indexFilter);
    setFilterByNumericValues(filters);
  };

  const removeAllFilters = () => {
    setFilterByNumericValues([]);
    setOptionsColumn(INITIAL_OPTIONS_COLUMN);
  };

  const contextType = {
    planets,
    filterByName,
    filterByNumericValues,
    removeFilter,
    addNameFilter,
    addNumericFilter,
    optionsColumn,
    removeAllFilters,
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
