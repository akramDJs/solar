import React from 'react';
import { Box, Paper, Grid, Typography } from '@mui/material';
import { Sun, Zap, AlertCircle, TrendingUp } from 'lucide-react';

export function Dashboard({ assets }) {
  const activeAssets = assets.filter(a => a.status === 'active').length;
  const totalCapacity = assets.reduce((sum, a) => sum + a.capacity, 0);
  const maintenanceNeeded = assets.filter(a => a.status === 'maintenance').length;
  const avgEfficiency = assets.length > 0
    ? Math.round(assets.reduce((sum, a) => sum + a.efficiency, 0) / assets.length)
    : 0;

  const stats = [
    {
      title: 'Total Installations',
      value: assets.length,
      icon: Sun,
      color: '#ff9800'
    },
    {
      title: 'Active Assets',
      value: activeAssets,
      icon: Zap,
      color: '#4caf50'
    },
    {
      title: 'Total Capacity',
      value: `${(totalCapacity / 1000).toFixed(1)} MW`,
      icon: TrendingUp,
      color: '#2196f3'
    },
    {
      title: 'Maintenance Required',
      value: maintenanceNeeded,
      icon: AlertCircle,
      color: '#f44336'
    }
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}
            >
              <Box
                sx={{
                  backgroundColor: `${stat.color}20`,
                  borderRadius: '50%',
                  p: 1.5,
                  display: 'flex'
                }}
              >
                <Icon size={28} color={stat.color} />
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">
                  {stat.title}
                </Typography>
                <Typography variant="h5">
                  {stat.value}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
}
