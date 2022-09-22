import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import apiStarWars from '../services/apiStarWars';
import StarWarsContext from './StarWarsContext';

const initialOptionsColumn = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
];

const HIGH_VALUE = 1;
const LOWER_VALUE = -1;

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

  const contextType = {
    planets: filteredPlanets,
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
