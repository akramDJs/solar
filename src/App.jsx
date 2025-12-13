import { useState, useEffect } from 'react';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Snackbar,
  Alert,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Paper,
} from '@mui/material';
import { Plus, Sun } from 'lucide-react';
import { mockApi } from './utils/mockApi';
import { LoadingIndicator } from './components/LoadingIndicator';
import { ErrorAlert } from './components/ErrorAlert';
import { SolarArrayTable } from './components/SolarArrayTable';
import { AssetForm } from './components/AssetForm';
import { DeleteConfirmation } from './components/DeleteConfirmation';
import { Dashboard } from './components/Dashboard';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff9800', // Solar orange
    },
    secondary: {
      main: '#ffc107',
    },
  },
});

export default function App() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editingAsset, setEditingAsset] = useState(undefined);
  const [deletingAsset, setDeletingAsset] = useState(undefined);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Initial data load
  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await mockApi.getAssets();
      setAssets(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load assets');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAsset = async (asset) => {
    try {
      setFormLoading(true);
      const newAsset = await mockApi.createAsset(asset);
      setAssets((prev) => [...prev, newAsset]);
      setFormOpen(false);
      setEditingAsset(undefined);
      showSnackbar('Asset created successfully', 'success');
    } catch (err) {
      showSnackbar(err instanceof Error ? err.message : 'Failed to create asset', 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateAsset = async (asset) => {
    try {
      setFormLoading(true);
      const updatedAsset = await mockApi.updateAsset(asset.id, asset);
      setAssets((prev) => prev.map((a) => (a.id === asset.id ? updatedAsset : a)));
      setFormOpen(false);
      setEditingAsset(undefined);
      showSnackbar('Asset updated successfully', 'success');
    } catch (err) {
      showSnackbar(err instanceof Error ? err.message : 'Failed to update asset', 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteAsset = async () => {
    if (!deletingAsset) return;

    try {
      setDeleteLoading(true);
      await mockApi.deleteAsset(deletingAsset.id);
      setAssets((prev) => prev.filter((a) => a.id !== deletingAsset.id));
      setDeleteDialogOpen(false);
      setDeletingAsset(undefined);
      showSnackbar('Asset deleted successfully', 'success');
    } catch (err) {
      showSnackbar(err instanceof Error ? err.message : 'Failed to delete asset', 'error');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleEditClick = (asset) => {
    setEditingAsset(asset);
    setFormOpen(true);
  };

  const handleDeleteClick = (asset) => {
    setDeletingAsset(asset);
    setDeleteDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingAsset(undefined);
    setFormOpen(true);
  };

  const handleFormSubmit = (asset) => {
    if (editingAsset) {
      handleUpdateAsset(asset);
    } else {
      handleCreateAsset(asset);
    }
  };

  const handleFormCancel = () => {
    setFormOpen(false);
    setEditingAsset(undefined);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setDeletingAsset(undefined);
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        {/* App Bar */}
        <AppBar position="static">
          <Toolbar>
            <Sun size={32} style={{ marginRight: '16px' }} />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Solar Array Manager
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Plus size={20} />}
              onClick={handleAddNew}
              disabled={loading}
            >
              Add Asset
            </Button>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container maxWidth="xl" sx={{ py: 4 }}>
          {loading && <LoadingIndicator message="Loading solar assets..." />}

          {error && <ErrorAlert message={error} onRetry={loadAssets} />}

          {!loading && !error && (
            <>
              <Dashboard assets={assets} />
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Solar Installations
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                  Manage your renewable energy assets. Track capacity, status, and maintenance
                  schedules.
                </Typography>
                <SolarArrayTable
                  assets={assets}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                />
              </Paper>
            </>
          )}
        </Container>

        {/* Asset Form Dialog */}
        <AssetForm
          open={formOpen}
          asset={editingAsset}
          loading={formLoading}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />

        {/* Delete Confirmation Dialog */}
        <DeleteConfirmation
          open={deleteDialogOpen}
          assetName={deletingAsset?.name || ''}
          loading={deleteLoading}
          onConfirm={handleDeleteAsset}
          onCancel={handleDeleteCancel}
        />

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}
