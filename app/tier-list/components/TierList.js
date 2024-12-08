'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const ROLES = [
  { id: 'All', label: 'All' },
  { id: 'Fighter', label: 'Top' },
  { id: 'Tank', label: 'Jungle' },
  { id: 'Mage', label: 'Mid' },
  { id: 'Marksman', label: 'Bot' },
  { id: 'Support', label: 'Support' }
];

export default function TierList({ champions }) {
  const [selectedRole, setSelectedRole] = useState('All');
  const [championStats, setChampionStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/statistics');
        const data = await response.json();
        setChampionStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  const filteredChampions = champions
    .filter(champion => selectedRole === 'All' || champion.tags.includes(selectedRole))
    .map(champion => ({
      ...champion,
      stats: championStats?.[champion.key] || {
        pickRate: 0,
        winRate: 0,
        banRate: 0,
        mastery: 0,
        rank: 999
      }
    }))
    .sort((a, b) => a.stats.rank - b.stats.rank);

  return (
    <div className="space-y-6">
      {/* Role Filter */}
      <div className="flex flex-wrap gap-2">
        {ROLES.map((role) => (
          <button
            key={role.id}
            onClick={() => setSelectedRole(role.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${selectedRole === role.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
          >
            {role.label}
          </button>
        ))}
      </div>

      {/* Champions Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-7 gap-4 p-4 bg-gray-700 text-sm font-medium">
          <div className="col-span-2">Champion</div>
          <div>Pick Rate</div>
          <div>Win Rate</div>
          <div>Ban Rate</div>
          <div>Mastery</div>
          <div>Trend</div>
        </div>

        {/* Champions List */}
        <div className="divide-y divide-gray-700">
          {filteredChampions.map((champion, index) => (
            <Link 
              key={champion.id}
              href={`/champions/${champion.id}`}
              className="grid grid-cols-7 gap-4 p-4 hover:bg-gray-700 transition-colors"
            >
              {/* Champion Info */}
              <div className="col-span-2 flex items-center space-x-3">
                <span className="text-gray-400 w-6">{index + 1}</span>
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${champion.id}.png`}
                  alt={champion.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium">{champion.name}</span>
              </div>

              {/* Stats */}
              <div className="flex items-center">
                <div className="w-24 bg-blue-500/20 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500"
                    style={{ width: `${champion.stats.pickRate}%` }}
                  />
                </div>
                <span className="ml-2 text-sm">{champion.stats.pickRate.toFixed(1)}%</span>
              </div>

              <div className="flex items-center">
                <div className="w-24 bg-green-500/20 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500"
                    style={{ width: `${champion.stats.winRate}%` }}
                  />
                </div>
                <span className="ml-2 text-sm">{champion.stats.winRate.toFixed(1)}%</span>
              </div>

              <div className="flex items-center">
                <div className="w-24 bg-red-500/20 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-500"
                    style={{ width: `${champion.stats.banRate}%` }}
                  />
                </div>
                <span className="ml-2 text-sm">{champion.stats.banRate.toFixed(1)}%</span>
              </div>

              <div className="flex items-center">
                <div className="w-24 bg-purple-500/20 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-500"
                    style={{ width: `${champion.stats.mastery}%` }}
                  />
                </div>
                <span className="ml-2 text-sm">{champion.stats.mastery.toFixed(1)}%</span>
              </div>

              <div className="flex items-center">
                <span className={`text-sm ${champion.stats.rank <= 10 ? 'text-yellow-500' : 'text-gray-400'}`}>
                  Rank {champion.stats.rank}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 