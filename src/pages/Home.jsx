import { Box, Button, Typography, Container } from '@mui/material';
import { Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          gap: 3,
        }}
      >
        <Sun size={64} color="#ff9800" />

        <Typography variant="h3" fontWeight={600}>
          Welcome to Solar Production
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Monitor and manage your renewable energy assets efficiently.
        </Typography>

        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={() => navigate('/app')}
          sx={{ mt: 2, px: 4, py: 1.5 }}
        >
          Enter Dashboard
        </Button>
      </Box>
    </Container>
  );
}
