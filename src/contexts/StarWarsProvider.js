import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import apiStarWars from '../services/apiStarWars';
import StarWarsContext from './StarWarsContext';

const initialOptionsColumn = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
];

function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState({});
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [filterBySort, setFilterBySort] = useState({});
  const [optionsColumn, setOptionsColumn] = useState(initialOptionsColumn);

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
      const newOptionsColumn = initialOptionsColumn.filter(
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
    setOptionsColumn(initialOptionsColumn);
  };

  const sortPlanet = (filtersSort) => {
    setFilterBySort({ order: filtersSort });
  };

  const contextType = {
    planets,
    filterByName,
    filterByNumericValues,
    removeFilter,
    sortPlanet,
    filterBySort,
    addNameFilter,
    addNumericFilter,
    optionsColumn,
    initialOptionsColumn,
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
