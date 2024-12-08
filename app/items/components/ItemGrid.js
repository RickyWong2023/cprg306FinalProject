'use client';
import { useEffect, useState } from 'react';
import ItemCard from './ItemCard';

const ROLES = {
  ALL: 'All Items',
  FIGHTER: 'Fighter',
  TANK: 'Tank',
  MAGE: 'Mage',
  ASSASSIN: 'Assassin',
  MARKSMAN: 'Marksman',
  SUPPORT: 'Support'
};

const SORT_OPTIONS = {
  PRICE_ASC: 'Price: Low to High',
  PRICE_DESC: 'Price: High to Low',
  NAME_ASC: 'Name: A to Z',
  NAME_DESC: 'Name: Z to A'
};

export default function ItemGrid() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRole, setSelectedRole] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('PRICE_ASC');
  const [priceRange, setPriceRange] = useState([0, 5000]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch('/api/items');
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, []);

  const filteredAndSortedItems = items
    .filter(item => {
      // Role filter
      if (selectedRole !== 'ALL' && !item.roles.includes(selectedRole)) {
        return false;
      }
      // Price filter
      if (item.gold.total < priceRange[0] || item.gold.total > priceRange[1]) {
        return false;
      }
      // Search filter
      if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case 'PRICE_ASC':
          return a.gold.total - b.gold.total;
        case 'PRICE_DESC':
          return b.gold.total - a.gold.total;
        case 'NAME_ASC':
          return a.name.localeCompare(b.name);
        case 'NAME_DESC':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <div className="bg-gray-800 p-4 rounded-lg space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items..."
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Role Filter */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(ROLES).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedRole(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${selectedRole === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Sort and Price Range */}
        <div className="flex flex-wrap gap-4">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none"
          >
            {Object.entries(SORT_OPTIONS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>

          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="0"
              max="5000"
              step="100"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="w-48"
            />
            <span className="text-white">Max: {priceRange[1]}g</span>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredAndSortedItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>

      {/* No Results Message */}
      {filteredAndSortedItems.length === 0 && (
        <div className="text-center text-gray-400 py-8">
          No items found matching your criteria.
        </div>
      )}
    </div>
  );
} 