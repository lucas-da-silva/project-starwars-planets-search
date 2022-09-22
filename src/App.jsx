import React from 'react';
import Filters from './components/Filters';
import Table from './components/Table';
import StarWarsProvider from './contexts/StarWarsProvider';
import './styles/App.css';

function App() {
  return (
    <StarWarsProvider>
      <main className="main-container">
        <div className="logo-container">
          <img
            className="logo-star-wars"
            src="./logo-star-wars.png"
            alt="Logo Star Wars"
          />
        </div>
        <Filters />
        <Table />
      </main>
    </StarWarsProvider>
  );
}

export default App;
