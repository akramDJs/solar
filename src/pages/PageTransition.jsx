import { Box } from '@mui/material';

export default function PageTransition({ children, show }) {
  return (
    <Box
      sx={{
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 400ms ease, transform 400ms ease',
      }}
    >
      {children}
    </Box>
  );
}
