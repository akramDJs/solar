import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

describe('App component', () => {
  test('renders home page then enters dashboard', async () => {
    render(<App />);

    // ✅ Home page is visible
    expect(
      screen.getByText(/Welcome to Solar Production/i)
    ).toBeInTheDocument();

    // ✅ Click "Enter Dashboard"
    fireEvent.click(
      screen.getByRole('button', { name: /Enter Dashboard/i })
    );

    // ✅ Dashboard content appears
    await waitFor(() => {
      expect(
        screen.getByText(/Total Installations/i)
      ).toBeInTheDocument();

      expect(
        screen.getByText(/Active Assets/i)
      ).toBeInTheDocument();
    });
  });
});
