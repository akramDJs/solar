import { Box, Typography, Button } from '@mui/material';
import { Sun } from 'lucide-react';

export default function Home({ onEnter }) {
  return (
    <Box
      sx={{
        textAlign: 'center',
        mt: 12,
      }}
    >
      <Sun size={64} color="#ff9800" />
      <Typography variant="h3" gutterBottom>
        Welcome to Solar Production
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Monitor and manage your renewable energy assets efficiently.
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={onEnter}
      >
        Enter Dashboard
      </Button>
    </Box>
  );
}
