//import React from 'react';
import { Alert, AlertTitle, Button, Box } from '@mui/material';
import { RefreshCw } from 'lucide-react';

export function ErrorAlert({ message, onRetry }) {
  return (
    <Box sx={{ maxWidth: 600, margin: '40px auto' }}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {message}
        {onRetry && (
          <Button
            startIcon={<RefreshCw size={16} />}
            onClick={onRetry}
            sx={{ mt: 2 }}
            variant="outlined"
            color="error"
          >
            Retry
          </Button>
        )}
      </Alert>
    </Box>
  );
}
