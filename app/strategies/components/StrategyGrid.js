'use client';
import { useEffect, useState } from 'react';
import StrategyCard from './StrategyCard';

export default function StrategyGrid() {
  const [strategies, setStrategies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStrategies() {
      try {
        const response = await fetch('/api/strategies');
        if (!response.ok) {
          throw new Error('Failed to fetch strategies');
        }
        const data = await response.json();
        setStrategies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStrategies();
  }, []);

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {strategies.map((strategy) => (
        <StrategyCard key={strategy.id} strategy={strategy} />
      ))}
    </div>
  );
} 