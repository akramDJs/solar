//import React from 'react';
import { _CircularProgress, _Box, _Typography } from '@mui/material';

export function LoadingIndicator({ message = 'Loading...' }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="400px"
      gap={2}
    >
      <CircularProgress size={60} />
      <Typography variant="h6" color="textSecondary">
        {message}
      </Typography>
    </Box>
  );
}
