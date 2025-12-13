import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';

vi.mock('../utils/mockApi', () => ({
  mockApi: {
    getAssets: vi.fn(() =>
      Promise.resolve([
        { id: 1, status: 'active', capacity: 500, efficiency: 90 },
        { id: 2, status: 'maintenance', capacity: 300, efficiency: 80 },
      ])
    ),
  },
}));

describe('App component', () => {
  it('renders app without crashing', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Total Installations')).toBeInTheDocument();
      expect(screen.getByText('Active Assets')).toBeInTheDocument();
    });
  });
});
