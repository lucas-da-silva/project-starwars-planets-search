import React from 'react';
import '../styles/Filters.css';
import ButtonRemoveAllFilters from './ButtonRemoveAllFilters';
import FilterByName from './FilterByName';
import FilterByNumeric from './FilterByNumeric';
import FilterBySort from './FilterBySort';

function Filters() {
  return (
    <section className="container-all-filters">
      <form className="form-container">
        <FilterByName />
        <section className="filters-container">
          <FilterByNumeric />
          <FilterBySort />
          <ButtonRemoveAllFilters />
        </section>
      </form>
    </section>
  );
}

export default Filters;
