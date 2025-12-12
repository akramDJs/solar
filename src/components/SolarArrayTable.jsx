import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  Box,
  TextField,
  MenuItem,
  InputAdornment
} from '@mui/material';
import { Edit2, Trash2, Search } from 'lucide-react';

export function SolarArrayTable({ assets, onEdit, onDelete }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filters, setFilters] = useState({
    status: 'all',
    searchQuery: ''
  });

  // Filtering
  const filteredAssets = assets.filter(asset => {
    // Status filter
    if (filters.status && filters.status !== 'all' && asset.status !== filters.status) {
      return false;
    }

    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      return (
        asset.id.toLowerCase().includes(query) ||
        asset.name.toLowerCase().includes(query) ||
        asset.location.toLowerCase().includes(query)
      );
    }

    return true;
  });

  // Sorting
  const sortedAssets = [...filteredAssets].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    let comparison = 0;
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      comparison = aValue.localeCompare(bValue);
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      comparison = aValue - bValue;
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });

  // Pagination
  const paginatedAssets = sortedAssets.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleSort = (field) => {
    const isAsc = sortField === field && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortField(field);
  };

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      case 'maintenance':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      {/* Filters */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          placeholder="Search by ID, name, or location..."
          value={filters.searchQuery}
          onChange={(e) => {
            setFilters(prev => ({ ...prev, searchQuery: e.target.value }));
            setPage(0);
          }}
          sx={{ flexGrow: 1, minWidth: '250px' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} />
              </InputAdornment>
            )
          }}
        />
        <TextField
          select
          label="Filter by Status"
          value={filters.status}
          onChange={(e) => {
            setFilters(prev => ({ ...prev, status: e.target.value }));
            setPage(0);
          }}
          sx={{ minWidth: '180px' }}
        >
          <MenuItem value="all">All Statuses</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
          <MenuItem value="maintenance">Maintenance</MenuItem>
        </TextField>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortField === 'id'}
                  direction={sortField === 'id' ? sortDirection : 'asc'}
                  onClick={() => handleSort('id')}
                >
                  ID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortField === 'name'}
                  direction={sortField === 'name' ? sortDirection : 'asc'}
                  onClick={() => handleSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={sortField === 'capacity'}
                  direction={sortField === 'capacity' ? sortDirection : 'asc'}
                  onClick={() => handleSort('capacity')}
                >
                  Capacity (kW)
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortField === 'location'}
                  direction={sortField === 'location' ? sortDirection : 'asc'}
                  onClick={() => handleSort('location')}
                >
                  Location
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortField === 'status'}
                  direction={sortField === 'status' ? sortDirection : 'asc'}
                  onClick={() => handleSort('status')}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={sortField === 'efficiency'}
                  direction={sortField === 'efficiency' ? sortDirection : 'asc'}
                  onClick={() => handleSort('efficiency')}
                >
                  Efficiency (%)
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortField === 'installDate'}
                  direction={sortField === 'installDate' ? sortDirection : 'asc'}
                  onClick={() => handleSort('installDate')}
                >
                  Install Date
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedAssets.map((asset) => (
              <TableRow
                key={asset.id}
                hover
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{asset.id}</TableCell>
                <TableCell>{asset.name}</TableCell>
                <TableCell align="right">{asset.capacity.toLocaleString()}</TableCell>
                <TableCell>{asset.location}</TableCell>
                <TableCell>
                  <Chip
                    label={asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}
                    color={getStatusColor(asset.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">{asset.efficiency}%</TableCell>
                <TableCell>{asset.installDate}</TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        onClick={() => onEdit(asset)}
                        color="primary"
                      >
                        <Edit2 size={18} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        onClick={() => onDelete(asset)}
                        color="error"
                      >
                        <Trash2 size={18} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={sortedAssets.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}
