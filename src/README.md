# Solar Array Manager

A comprehensive React-based web application for managing renewable energy assets. Track, monitor, and manage solar panel installations with a modern, responsive interface.

![Solar Array Manager](https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800)

## Features

### Core Functionality

- ✅ **CRUD Operations**: Create, Read, Update, and Delete solar assets
- ✅ **Real-time Dashboard**: View key metrics and statistics at a glance
- ✅ **Advanced Filtering**: Search by ID, name, location, and filter by status
- ✅ **Sorting**: Sort by any column (ID, name, capacity, location, status, etc.)
- ✅ **Pagination**: Efficiently handle 800+ assets with configurable page sizes
- ✅ **Responsive Design**: Mobile-friendly interface using Material-UI

### Data Management

- 📊 Manages ~800 solar installation records
- ⏱️ Simulates API latency (2 second delay) for realistic testing
- 🔄 Loading states and error handling
- ⚠️ Delete confirmations to prevent accidental data loss
- 📝 Form validation with helpful error messages

### User Experience

- 🎨 Modern Material-UI design with custom solar-themed colors
- 📱 Fully responsive layout for desktop, tablet, and mobile
- 🔔 Toast notifications for user actions
- 🎯 Intuitive icons from Lucide React
- ♿ Accessible components with proper ARIA labels

## Technology Stack

- **React** 18+ with TypeScript
- **Material-UI** (MUI) for component library
- **Lucide React** for icons
- **React Testing Library** and Jest for testing
- **Mock API** with simulated network delays

## Getting Started

### Prerequisites

- Node.js 16+ and npm (or yarn/pnpm)
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd solar-array-manager
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

   The app will open at [http://localhost:3000](http://localhost:3000)

### Running Tests

```bash
npm test
```

Run tests in watch mode:

```bash
npm test -- --watch
```

Generate coverage report:

```bash
npm test -- --coverage
```

### Building for Production

```bash
npm run build
```

The optimized production build will be in the `build/` directory.

## Project Structure

```
solar-array-manager/
├── src/
│   ├── components/
│   │   ├── AssetForm.tsx           # Create/Edit asset modal form
│   │   ├── Dashboard.tsx           # Statistics dashboard
│   │   ├── DeleteConfirmation.tsx  # Delete confirmation dialog
│   │   ├── ErrorAlert.tsx          # Error message display
│   │   ├── LoadingIndicator.tsx    # Loading spinner
│   │   └── SolarArrayTable.tsx     # Main data table with filters
│   ├── types/
│   │   └── asset.ts                # TypeScript type definitions
│   ├── utils/
│   │   └── mockApi.ts              # Mock API with 800+ assets
│   ├── tests/
│   │   └── App.test.tsx            # Test suite
│   ├── App.tsx                     # Main application component
│   └── index.tsx                   # Application entry point
├── package.json
└── README.md
```

## Usage Guide

### Viewing Assets

- Browse the table of solar installations
- View dashboard statistics including total capacity, active assets, and maintenance needs
- Use pagination controls to navigate through pages

### Adding a New Asset

1. Click the **"Add Asset"** button in the top-right
2. Fill in the form:
   - Asset Name
   - Capacity (kW)
   - Location
   - Status (Active/Inactive/Maintenance)
   - Install Date
   - Efficiency (%)
   - Last Maintenance Date
3. Click **"Create"** to save

### Editing an Asset

1. Click the **edit icon** (pencil) next to any asset
2. Modify the fields you want to change
3. Click **"Update"** to save changes

### Deleting an Asset

1. Click the **delete icon** (trash) next to any asset
2. Confirm the deletion in the dialog
3. The asset will be removed from the list

### Filtering and Searching

- **Search**: Type in the search box to filter by ID, name, or location
- **Status Filter**: Use the dropdown to filter by Active, Inactive, or Maintenance status
- **Sorting**: Click any column header to sort by that field (click again to reverse order)

### Pagination

- Use the pagination controls at the bottom of the table
- Choose rows per page: 10, 25, 50, or 100
- Navigate between pages using arrow buttons

## API Simulation

The application uses a mock API (`/utils/mockApi.ts`) that simulates real backend behavior:

- **Latency**: 2-second delay for GET requests, 1 second for create/update
- **Data**: 800 pre-generated solar asset records
- **Error Handling**: Includes commented-out error simulation (10% failure rate)
- **Persistence**: Changes persist in memory during the session

To test error handling, uncomment the `simulateFailure()` calls in `mockApi.ts`.

## Key Components

### SolarArrayTable

Main table component featuring:

- Column sorting
- Search functionality
- Status filtering
- Pagination
- Edit/Delete actions

### AssetForm

Modal form for creating and editing assets with:

- Full validation
- Date pickers
- Status dropdown
- Real-time error messages

### Dashboard

Statistics panel showing:

- Total installations
- Active assets count
- Total capacity in MW
- Assets requiring maintenance

## Testing

The application includes automated tests covering:

- Initial loading state
- Successful data loading
- Error handling
- Add asset functionality
- Dashboard statistics
- Search/filter functionality
- Table sorting

Tests use React Testing Library and Jest with mocked API calls.

## Future Enhancements

Potential improvements for production deployment:

- 🔐 Real backend API integration with authentication
- 📊 Advanced charts and graphs (using Recharts)
- 📍 Map view of solar installations
- 📈 Performance metrics and energy output tracking
- 🔔 Maintenance scheduling and alerts
- 📤 Export data to CSV/Excel
- 🌙 Dark mode support
- 🔍 Advanced filtering (date ranges, capacity ranges)
- 📱 Progressive Web App (PWA) capabilities

## User Story

> **As a renewable energy manager**, I want to manage the list of solar installations in a table, so that I can track their capacity, status, and maintenance needs efficiently.

This application fulfills this requirement by providing an intuitive interface to view, create, update, and delete solar assets, with powerful filtering and sorting capabilities to manage large datasets effectively.

## License

MIT License - feel free to use this project for learning or as a starting point for your own applications.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

For questions or issues, please open an issue on GitHub.

---

Built with ⚡ by renewable energy enthusiasts
