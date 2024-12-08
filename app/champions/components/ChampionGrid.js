'use client';
import { useEffect, useState } from 'react';
import ChampionCard from './ChampionCard';

const ROLES = {
  ALL: 'All',
  TANK: 'Tank',
  FIGHTER: 'Fighter',
  MAGE: 'Mage',
  ASSASSIN: 'Assassin',
  MARKSMAN: 'Marksman',
  SUPPORT: 'Support'
};

export default function ChampionGrid() {
  const [champions, setChampions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRole, setSelectedRole] = useState(ROLES.ALL);

  useEffect(() => {
    async function fetchChampions() {
      try {
        const response = await fetch('/api/champions');
        if (!response.ok) {
          throw new Error('Failed to fetch champions');
        }
        const data = await response.json();
        setChampions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchChampions();
  }, []);

  const filteredChampions = champions.filter(champion => {
    if (selectedRole === ROLES.ALL) return true;
    return champion.tags.includes(selectedRole);
  });

  const roleStats = Object.values(ROLES).reduce((acc, role) => {
    if (role === ROLES.ALL) {
      acc[role] = champions.length;
    } else {
      acc[role] = champions.filter(champ => champ.tags.includes(role)).length;
    }
    return acc;
  }, {});

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
      {/* Role Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {Object.values(ROLES).map((role) => (
          <button
            key={role}
            onClick={() => setSelectedRole(role)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${selectedRole === role
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
          >
            {role}
            <span className="ml-2 text-xs">
              ({roleStats[role]})
            </span>
          </button>
        ))}
      </div>

      {/* Champions Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
        {filteredChampions.map((champion) => (
          <ChampionCard key={champion.id} champion={champion} />
        ))}
      </div>

      {/* No Results Message */}
      {filteredChampions.length === 0 && (
        <div className="text-center text-gray-400 py-8">
          No champions found for the selected role.
        </div>
      )}
    </div>
  );
} 