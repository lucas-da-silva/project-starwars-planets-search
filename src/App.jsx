import React from 'react';
import Filters from './components/Filters';
import Table from './components/Table';
import StarWarsProvider from './contexts/StarWarsProvider';

function App() {
  return (
    <StarWarsProvider>
      <main>
        <Filters />
        <Table />
      </main>
    </StarWarsProvider>
  );
}

export default App;
