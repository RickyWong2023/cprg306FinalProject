'use client';
import { useEffect, useState } from 'react';
import TierList from './components/TierList';

export default function TierListPage() {
  const [champions, setChampions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChampions() {
      try {
        const response = await fetch('/api/champions');
        const data = await response.json();
        setChampions(data);
      } catch (error) {
        console.error('Error fetching champions:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchChampions();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Champion Tier List</h1>
      <TierList champions={champions} />
    </div>
  );
} 