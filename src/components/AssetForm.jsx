import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions, 
  Button,
  TextField,
  MenuItem,
  Grid,
  CircularProgress
} from '@mui/material';

export function AssetForm({ open, asset, loading, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    capacity: '',
    location: '',
    status: 'active',
    installDate: '',
    efficiency: '',
    lastMaintenance: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (asset) {
      setFormData({
        name: asset.name,
        capacity: String(asset.capacity),
        location: asset.location,
        status: asset.status,
        installDate: asset.installDate,
        efficiency: String(asset.efficiency),
        lastMaintenance: asset.lastMaintenance
      });
    } else {
      setFormData({
        name: '',
        capacity: '',
        location: '',
        status: 'active',
        installDate: new Date().toISOString().split('T')[0],
        efficiency: '',
        lastMaintenance: new Date().toISOString().split('T')[0]
      });
    }
    setErrors({});
  }, [asset, open]);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.capacity || Number(formData.capacity) <= 0) {
      newErrors.capacity = 'Capacity must be greater than 0';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.efficiency || Number(formData.efficiency) < 0 || Number(formData.efficiency) > 100) {
      newErrors.efficiency = 'Efficiency must be between 0 and 100';
    }

    if (!formData.installDate) {
      newErrors.installDate = 'Install date is required';
    }

    if (!formData.lastMaintenance) {
      newErrors.lastMaintenance = 'Last maintenance date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const submitData = {
      ...(asset ? { id: asset.id } : {}),
      name: formData.name,
      capacity: Number(formData.capacity),
      location: formData.location,
      status: formData.status,
      installDate: formData.installDate,
      efficiency: Number(formData.efficiency),
      lastMaintenance: formData.lastMaintenance
    };

    onSubmit(submitData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Dialog open={open} onClose={loading ? undefined : onCancel} maxWidth="md" fullWidth>
      <DialogTitle>
        {asset ? 'Edit Solar Asset' : 'Add New Solar Asset'}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Asset Name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Capacity (kW)"
              type="number"
              value={formData.capacity}
              onChange={(e) => handleChange('capacity', e.target.value)}
              error={!!errors.capacity}
              helperText={errors.capacity}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Location"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              error={!!errors.location}
              helperText={errors.location}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Status"
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              disabled={loading}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
              <MenuItem value="maintenance">Maintenance</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Install Date"
              type="date"
              value={formData.installDate}
              onChange={(e) => handleChange('installDate', e.target.value)}
              error={!!errors.installDate}
              helperText={errors.installDate}
              disabled={loading}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Efficiency (%)"
              type="number"
              value={formData.efficiency}
              onChange={(e) => handleChange('efficiency', e.target.value)}
              error={!!errors.efficiency}
              helperText={errors.efficiency}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Last Maintenance"
              type="date"
              value={formData.lastMaintenance}
              onChange={(e) => handleChange('lastMaintenance', e.target.value)}
              error={!!errors.lastMaintenance}
              helperText={errors.lastMaintenance}
              disabled={loading}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} /> : null}
        >
          {loading ? 'Saving...' : asset ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
