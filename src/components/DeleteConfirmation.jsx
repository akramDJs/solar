//import React from 'react';
import {
  _Dialog,
  _DialogTitle,
  _DialogContent,
  _DialogContentText,
  _DialogActions,
  _Button,
  _CircularProgress,
} from '@mui/material';
import { _AlertTriangle } from 'lucide-react';

export function DeleteConfirmation({ open, assetName, loading, onConfirm, onCancel }) {
  return (
    <Dialog open={open} onClose={loading ? undefined : onCancel}>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <AlertTriangle size={24} color="#f44336" />
        Confirm Delete
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete <strong>{assetName}</strong>? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} /> : null}
        >
          {loading ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
