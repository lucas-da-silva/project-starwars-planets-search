import { findAllByRole, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import {
  BUTTON_FILTER, COLUMN_FILTER, COMPARISON_FILTER, NAME_FILTER, TABLE_HEADERS, VALUE_FILTER
} from './utils/constants';
import mockData from './utils/mockData';

const planets = mockData.results;

describe('Tests for all aplication', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));

    render(<App />);
  });
  
  it('should have inputs to filter by name and numeric values', () => {
    expect(screen.getByTestId(NAME_FILTER)).toBeInTheDocument();
    expect(screen.getByTestId(COLUMN_FILTER)).toBeInTheDocument();
    expect(screen.getByTestId(COMPARISON_FILTER)).toBeInTheDocument();
    expect(screen.getByTestId(VALUE_FILTER)).toBeInTheDocument();
    expect(screen.getByTestId(BUTTON_FILTER)).toBeInTheDocument();
  });

  it('should have a table with headers and their respective values', () => {    
    TABLE_HEADERS.forEach((header) => {
      expect(screen.getByRole('columnheader', { name: header })).toBeInTheDocument();
    });
  });

  it('should have 10 planets in the table', () => {
    planets.forEach(({ name }) => {
      expect(screen.getByRole('cell', { name })).toBeInTheDocument();
    });
  });

  it('is possible to filter by the name of the planets', async () => {
    const planetFiltered = mockData.results[0];
    
    userEvent.type(screen.getByTestId(NAME_FILTER), planetFiltered.name);
    
    planets.forEach(({ name }, index) => {
      if (index === 0) {
        expect(screen.getByRole('cell', { name })).toBeInTheDocument();
      } else {
        expect(screen.queryByRole('cell', { name })).not.toBeInTheDocument();
      }
    });
  });

  it('filtering the planets by numerical value, maior que', () => {
    const maxPopulation = 4500000000;
    const filteredPlanet = mockData.results[8];

    userEvent.selectOptions(screen.getByTestId(COLUMN_FILTER), 'population');
    userEvent.selectOptions(screen.getByTestId(COMPARISON_FILTER), 'maior que');
    userEvent.type(screen.getByTestId(VALUE_FILTER), maxPopulation);
    userEvent.click(screen.getByTestId(BUTTON_FILTER));

    expect(screen.getByRole('cell', { name: filteredPlanet.name })).toBeInTheDocument();
  })
});
