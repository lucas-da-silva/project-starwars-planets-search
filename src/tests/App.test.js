import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import {
  BUTTON_FILTER, BUTTON_REMOVE_FILTERS, COLUMN_FILTER, COLUMN_SORT, COLUMN_SORT_BUTTON, COLUMN_SORT_INPUT_ASC,
  COLUMN_SORT_INPUT_DESC, COMPARISON_FILTER, NAME_FILTER, TABLE_HEADERS,
  VALUE_FILTER
} from './utils/constants';
import mockData from './utils/mockData';

const planets = mockData.results;
const maxPopulation = '4500000000';
const minDiameter = '5000';
const equalSurfaceWater = '12';

describe('Tests for all aplication', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));

    render(<App />);

    userEvent.clear(screen.getByTestId(VALUE_FILTER));
  });
  
  it('should have inputs to filter by name and numeric values', () => {
    expect(screen.getByTestId(NAME_FILTER)).toBeInTheDocument();
    expect(screen.getByTestId(COLUMN_FILTER)).toBeInTheDocument();
    expect(screen.getByTestId(COMPARISON_FILTER)).toBeInTheDocument();
    expect(screen.getByTestId(VALUE_FILTER)).toBeInTheDocument();
    expect(screen.getByTestId(BUTTON_FILTER)).toBeInTheDocument();
    expect(screen.getByTestId(BUTTON_REMOVE_FILTERS)).toBeInTheDocument();
    expect(screen.getByTestId(COLUMN_SORT)).toBeInTheDocument();
    expect(screen.getByTestId(COLUMN_SORT_INPUT_ASC)).toBeInTheDocument();
    expect(screen.getByTestId(COLUMN_SORT_INPUT_DESC)).toBeInTheDocument();
    expect(screen.getByTestId(COLUMN_SORT_BUTTON)).toBeInTheDocument();
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
    const { name } = mockData.results.find(
      ({ population }) => population > Number(maxPopulation)
    );

    userEvent.selectOptions(screen.getByTestId(COLUMN_FILTER), 'population');
    userEvent.selectOptions(screen.getByTestId(COMPARISON_FILTER), 'maior que');
    userEvent.type(screen.getByTestId(VALUE_FILTER), maxPopulation);
    userEvent.click(screen.getByTestId(BUTTON_FILTER));

    expect(screen.getByRole('cell', { name })).toBeInTheDocument();
  });

  it('filtering the planets by numerical value, menor que', () => {
    const { name } = mockData.results.find(
      ({ diameter }) => diameter < Number(minDiameter)
    );

    userEvent.selectOptions(screen.getByTestId(COLUMN_FILTER), 'diameter');
    userEvent.selectOptions(screen.getByTestId(COMPARISON_FILTER), 'menor que');
    userEvent.type(screen.getByTestId(VALUE_FILTER), minDiameter);
    userEvent.click(screen.getByTestId(BUTTON_FILTER));

    expect(screen.getByRole('cell', { name })).toBeInTheDocument();
  });
  
  it('filtering the planets by numerical value, igual a', () => {
    const { name } = mockData.results.find(
      ({ surface_water }) => surface_water === equalSurfaceWater
    );

    userEvent.selectOptions(screen.getByTestId(COLUMN_FILTER), 'surface_water');
    userEvent.selectOptions(screen.getByTestId(COMPARISON_FILTER), 'igual a');
    userEvent.type(screen.getByTestId(VALUE_FILTER), equalSurfaceWater);
    userEvent.click(screen.getByTestId(BUTTON_FILTER));
    
    expect(screen.getByRole('cell', { name })).toBeInTheDocument();
  });
  
  it('is possible to sort the planets by population, sort by growing', () => {
    userEvent.selectOptions(screen.getByTestId(COLUMN_SORT), 'population');
    userEvent.click(screen.getByTestId(COLUMN_SORT_INPUT_ASC));
    userEvent.click(screen.getByTestId(COLUMN_SORT_BUTTON));
    
    const sortedPlanets = planets.sort((a, b) => {
      if (a.population === 'unknown') return 1;
      if (b.population === 'unknown') return -1;
      return Number(a.population) - Number(b.population);
    });
    sortedPlanets.forEach(({ name }) => {
      expect(screen.getByRole('cell', { name })).toBeInTheDocument();
    });
  });

  it('is possible to sort the planets by population, sort by decreasing', () => {
    userEvent.selectOptions(screen.getByTestId(COLUMN_SORT), 'population');
    userEvent.click(screen.getByTestId(COLUMN_SORT_INPUT_DESC));
    userEvent.click(screen.getByTestId(COLUMN_SORT_BUTTON));
    
    const sortedPlanets = planets.sort((a, b) => {
      if (a.population === 'unknown') return 1;
      if (b.population === 'unknown') return -1;
      return Number(b.population) - Number(a.population);
    });
    sortedPlanets.forEach(({ name }) => {
      expect(screen.getByRole('cell', { name })).toBeInTheDocument();
    });
  });

  it('sort the planets by surface_water, sort by growing', () => {
    userEvent.selectOptions(screen.getByTestId(COLUMN_SORT), 'surface_water');
    userEvent.click(screen.getByTestId(COLUMN_SORT_INPUT_ASC));
    userEvent.click(screen.getByTestId(COLUMN_SORT_BUTTON));
    
    const sortedPlanets = planets.sort((a, b) => {
      if (a.surface_water === 'unknown') return 1;
      if (b.surface_water === 'unknown') return -1;
      return Number(a.surface_water) - Number(b.surface_water);
    });
    sortedPlanets.forEach(({ name }) => {
      expect(screen.getByRole('cell', { name })).toBeInTheDocument();
    });
  });

  it('is possible to remove one filter', () => {
    userEvent.selectOptions(screen.getByTestId(COLUMN_FILTER), 'population');
    userEvent.selectOptions(screen.getByTestId(COMPARISON_FILTER), 'maior que');
    userEvent.type(screen.getByTestId(VALUE_FILTER), maxPopulation);
    userEvent.click(screen.getByTestId(BUTTON_FILTER));

    expect(screen.getByText(`population maior que ${maxPopulation}`)).toBeInTheDocument();
    
    userEvent.click(screen.getByTestId('filter').lastChild);
    expect(screen.queryByText(`population maior que ${maxPopulation}`)).not.toBeInTheDocument();
  });

  it('is possible to remove all the filters', () => {
    userEvent.selectOptions(screen.getByTestId(COLUMN_FILTER), 'population');
    userEvent.selectOptions(screen.getByTestId(COMPARISON_FILTER), 'maior que');
    userEvent.type(screen.getByTestId(VALUE_FILTER), maxPopulation);
    userEvent.click(screen.getByTestId(BUTTON_FILTER));

    userEvent.clear(screen.getByTestId(VALUE_FILTER));
    
    userEvent.selectOptions(screen.getByTestId(COLUMN_FILTER), 'diameter');
    userEvent.selectOptions(screen.getByTestId(COMPARISON_FILTER), 'menor que');
    userEvent.type(screen.getByTestId(VALUE_FILTER), minDiameter);
    userEvent.click(screen.getByTestId(BUTTON_FILTER));
    
    userEvent.clear(screen.getByTestId(VALUE_FILTER));
    userEvent.click(screen.getByTestId(BUTTON_REMOVE_FILTERS));
    
    expect(screen.queryByText(`population maior que ${maxPopulation}`)).not.toBeInTheDocument();
    expect(screen.queryByText(`diameter menor que ${minDiameter}`)).not.toBeInTheDocument();
  });
});
