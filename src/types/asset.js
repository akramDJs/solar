// Type definitions as JSDoc comments for better IDE support

/**
 * @typedef {'active' | 'inactive' | 'maintenance'} AssetStatus
 */

/**
 * @typedef {Object} SolarAsset
 * @property {string} id
 * @property {string} name
 * @property {number} capacity - in kW
 * @property {string} location
 * @property {AssetStatus} status
 * @property {string} installDate
 * @property {number} efficiency - percentage
 * @property {string} lastMaintenance
 */

/**
 * @typedef {Object} FilterOptions
 * @property {AssetStatus | 'all'} [status]
 * @property {string} [searchQuery]
 */

export {};
