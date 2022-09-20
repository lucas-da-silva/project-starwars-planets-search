import React, { useContext } from 'react';
import StarWarsContext from '../contexts/StarWarsContext';

function Filters() {
  const { setFilterByName } = useContext(StarWarsContext);
  return (
    <section>
      <form>
        <input
          type="text"
          data-testid="name-filter"
          onChange={ (e) => setFilterByName({ name: e.target.value }) }
        />
      </form>
    </section>
  );
}

export default Filters;
