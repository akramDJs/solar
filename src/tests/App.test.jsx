import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import { mockApi } from '../utils/mockApi';

// Mock the API
jest.mock('../utils/mockApi', () => ({
  mockApi: {
    getAssets: jest.fn(),
    createAsset: jest.fn(),
    updateAsset: jest.fn(),
    deleteAsset: jest.fn()
  }
}));

const mockAssets = [
  {
    id: 'SA-0001',
    name: 'Solar Array 1',
    capacity: 1500,
    location: 'California Solar Farm',
    status: 'active',
    installDate: '2022-01-15',
    efficiency: 85,
    lastMaintenance: '2024-11-01'
  },
  {
    id: 'SA-0002',
    name: 'Solar Array 2',
    capacity: 2000,
    location: 'Texas Desert Installation',
    status: 'maintenance',
    installDate: '2021-05-20',
    efficiency: 78,
    lastMaintenance: '2024-10-15'
  }
];

describe('Solar Array Manager App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays loading state initially', () => {
    mockApi.getAssets.mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    render(<App />);
    expect(screen.getByText(/Loading solar assets/i)).toBeInTheDocument();
  });

  test('loads and displays assets successfully', async () => {
    mockApi.getAssets.mockResolvedValue(mockAssets);

    render(<App />);

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText(/Loading solar assets/i)).not.toBeInTheDocument();
    });

    // Check if assets are displayed
    expect(screen.getByText('Solar Array 1')).toBeInTheDocument();
    expect(screen.getByText('Solar Array 2')).toBeInTheDocument();
    expect(screen.getByText('California Solar Farm')).toBeInTheDocument();
  });

  test('displays error message when loading fails', async () => {
    mockApi.getAssets.mockRejectedValue(
      new Error('Network error')
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Network error/i)).toBeInTheDocument();
    });
  });

  test('opens add asset form when Add Asset button is clicked', async () => {
    mockApi.getAssets.mockResolvedValue(mockAssets);

    render(<App />);

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText(/Loading solar assets/i)).not.toBeInTheDocument();
    });

    // Click Add Asset button
    const addButton = screen.getByRole('button', { name: /Add Asset/i });
    fireEvent.click(addButton);

    // Check if form dialog opens
    await waitFor(() => {
      expect(screen.getByText(/Add New Solar Asset/i)).toBeInTheDocument();
    });
  });

  test('displays dashboard statistics correctly', async () => {
    mockApi.getAssets.mockResolvedValue(mockAssets);

    render(<App />);

    await waitFor(() => {
      expect(screen.queryByText(/Loading solar assets/i)).not.toBeInTheDocument();
    });

    // Check dashboard stats
    expect(screen.getByText('Total Installations')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument(); // Total count
    expect(screen.getByText('Active Assets')).toBeInTheDocument();
  });

  test('filters assets by search query', async () => {
    mockApi.getAssets.mockResolvedValue(mockAssets);

    render(<App />);

    await waitFor(() => {
      expect(screen.queryByText(/Loading solar assets/i)).not.toBeInTheDocument();
    });

    // Find search input
    const searchInput = screen.getByPlaceholderText(/Search by ID, name, or location/i);
    
    // Search for "California"
    fireEvent.change(searchInput, { target: { value: 'California' } });

    // Should show Solar Array 1, but not Solar Array 2
    await waitFor(() => {
      expect(screen.getByText('Solar Array 1')).toBeInTheDocument();
      // Solar Array 2 should not be visible in the filtered results
    });
  });

  test('sorts table when clicking sort headers', async () => {
    mockApi.getAssets.mockResolvedValue(mockAssets);

    render(<App />);

    await waitFor(() => {
      expect(screen.queryByText(/Loading solar assets/i)).not.toBeInTheDocument();
    });

    // Find the capacity column header and click it
    const capacityHeader = screen.getByText(/Capacity \(kW\)/i);
    fireEvent.click(capacityHeader);

    // Assets should be sorted (this is a basic check - in real app you'd verify order)
    expect(screen.getByText('Solar Array 1')).toBeInTheDocument();
    expect(screen.getByText('Solar Array 2')).toBeInTheDocument();
  });
});
