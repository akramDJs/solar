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
  Paper,
} from '@mui/material';
import { Plus, Sun } from 'lucide-react';

import { mockApi } from '../utils/mockApi';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorAlert from '../components/ErrorAlert';
import SolarArrayTable from '../components/SolarArrayTable';
import AssetForm from '../components/AssetForm';
import DeleteConfirmation from '../components/DeleteConfirmation';
import Dashboard from '../components/Dashboard';

export default function DashboardPage() {
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
      setError('Failed to load assets');
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
      showSnackbar('Asset created successfully', 'success');
    } catch {
      showSnackbar('Failed to create asset', 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateAsset = async (asset) => {
    try {
      setFormLoading(true);
      const updated = await mockApi.updateAsset(asset.id, asset);
      setAssets((prev) =>
        prev.map((a) => (a.id === asset.id ? updated : a))
      );
      setFormOpen(false);
      setEditingAsset(undefined);
      showSnackbar('Asset updated successfully', 'success');
    } catch {
      showSnackbar('Failed to update asset', 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteAsset = async () => {
    if (!deletingAsset) return;

    try {
      setDeleteLoading(true);
      await mockApi.deleteAsset(deletingAsset.id);
      setAssets((prev) =>
        prev.filter((a) => a.id !== deletingAsset.id)
      );
      setDeleteDialogOpen(false);
      setDeletingAsset(undefined);
      showSnackbar('Asset deleted successfully', 'success');
    } catch {
      showSnackbar('Failed to delete asset', 'error');
    } finally {
      setDeleteLoading(false);
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* App Bar */}
      <AppBar position="static">
        <Toolbar>
          <Sun size={28} style={{ marginRight: 12 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Solar Array Manager
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Plus size={18} />}
            onClick={() => setFormOpen(true)}
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

            <Paper sx={{ p: 3, mt: 3 }}>
              <Typography variant="h5" gutterBottom>
                Solar Installations
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 3 }}
              >
                Manage your renewable energy assets. Track capacity, status,
                and maintenance schedules.
              </Typography>

              <SolarArrayTable
                assets={assets}
                onEdit={(asset) => {
                  setEditingAsset(asset);
                  setFormOpen(true);
                }}
                onDelete={(asset) => {
                  setDeletingAsset(asset);
                  setDeleteDialogOpen(true);
                }}
              />
            </Paper>
          </>
        )}
      </Container>

      {/* Asset Form */}
      <AssetForm
        open={formOpen}
        asset={editingAsset}
        loading={formLoading}
        onSubmit={(asset) =>
          editingAsset
            ? handleUpdateAsset(asset)
            : handleCreateAsset(asset)
        }
        onCancel={() => {
          setFormOpen(false);
          setEditingAsset(undefined);
        }}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmation
        open={deleteDialogOpen}
        assetName={deletingAsset?.name || ''}
        loading={deleteLoading}
        onConfirm={handleDeleteAsset}
        onCancel={() => {
          setDeleteDialogOpen(false);
          setDeletingAsset(undefined);
        }}
      />

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
