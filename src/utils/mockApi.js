// Generate mock data for ~800 solar installations
const locations = [
  'California Solar Farm', 'Texas Desert Installation', 'Arizona Array Site',
  'Nevada Solar Park', 'New Mexico Grid', 'Colorado Mountain Array',
  'Oregon Coast Installation', 'Washington Valley Site', 'Utah Desert Farm',
  'Idaho Solar Grid', 'Montana Plains Array', 'Wyoming Solar Park'
];

const statuses = ['active', 'inactive', 'maintenance'];

const generateMockAssets = (count) => {
  const assets = [];
  
  for (let i = 1; i <= count; i++) {
    const installYear = 2018 + Math.floor(Math.random() * 7);
    const maintYear = 2022 + Math.floor(Math.random() * 3);
    
    assets.push({
      id: `SA-${String(i).padStart(4, '0')}`,
      name: `Solar Array ${i}`,
      capacity: Math.floor(Math.random() * 5000) + 100, // 100-5100 kW
      location: locations[Math.floor(Math.random() * locations.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      installDate: `${installYear}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      efficiency: Math.floor(Math.random() * 30) + 70, // 70-100%
      lastMaintenance: `${maintYear}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
    });
  }
  
  return assets;
};

// In-memory data store
let mockAssets = generateMockAssets(800);

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Simulate random failures (10% chance)
const simulateFailure = () => {
  if (Math.random() < 0.1) {
    throw new Error('Network error: Unable to connect to server');
  }
};

export const mockApi = {
  async getAssets() {
    await delay(2000); // 2 second delay
    // Uncomment to test error handling:
    // simulateFailure();
    return [...mockAssets];
  },

  async createAsset(asset) {
    await delay(1000);
    // simulateFailure();
    
    const newAsset = {
      ...asset,
      id: `SA-${String(mockAssets.length + 1).padStart(4, '0')}`
    };
    
    mockAssets = [...mockAssets, newAsset];
    return newAsset;
  },

  async updateAsset(id, updates) {
    await delay(800);
    // simulateFailure();
    
    const index = mockAssets.findIndex(a => a.id === id);
    if (index === -1) {
      throw new Error(`Asset with id ${id} not found`);
    }
    
    const updatedAsset = { ...mockAssets[index], ...updates };
    mockAssets = [
      ...mockAssets.slice(0, index),
      updatedAsset,
      ...mockAssets.slice(index + 1)
    ];
    
    return updatedAsset;
  },

  async deleteAsset(id) {
    await delay(800);
    // simulateFailure();
    
    const index = mockAssets.findIndex(a => a.id === id);
    if (index === -1) {
      throw new Error(`Asset with id ${id} not found`);
    }
    
    mockAssets = mockAssets.filter(a => a.id !== id);
  }
};
