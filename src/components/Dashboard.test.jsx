//import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { _Dashboard } from './Dashboard';

describe('Dashboard component', () => {
  const assets = [
    { id: 1, status: 'active', capacity: 500, efficiency: 90 },
    { id: 2, status: 'maintenance', capacity: 300, efficiency: 80 },
    { id: 3, status: 'active', capacity: 200, efficiency: 70 },
  ];

  it('renders all statistic titles', () => {
    render(<Dashboard assets={assets} />);

    expect(screen.getByText('Total Installations')).toBeInTheDocument();
    expect(screen.getByText('Active Assets')).toBeInTheDocument();
    expect(screen.getByText('Total Capacity')).toBeInTheDocument();
    expect(screen.getByText('Maintenance Required')).toBeInTheDocument();
  });

  it('renders correct values for statistics', () => {
    render(<Dashboard assets={assets} />);

    expect(screen.getByText('3')).toBeInTheDocument(); // Total Installations
    expect(screen.getByText('2')).toBeInTheDocument(); // Active Assets
    expect(screen.getByText('1.0 MW')).toBeInTheDocument(); // Total Capacity (1000/1000 MW)
    expect(screen.getByText('1')).toBeInTheDocument(); // Maintenance Required
  });
});
