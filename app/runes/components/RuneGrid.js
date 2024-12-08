'use client';
import { useEffect, useState } from 'react';
import RuneCard from './RuneCard';

export default function RuneGrid() {
  const [runes, setRunes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);

  useEffect(() => {
    async function fetchRunes() {
      try {
        const response = await fetch('/api/runes');
        if (!response.ok) {
          throw new Error('Failed to fetch runes');
        }
        const data = await response.json();
        setRunes(data);
        setSelectedStyle(data[0]?.id || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRunes();
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

  const selectedRune = runes.find(rune => rune.id === selectedStyle);

  return (
    <div className="space-y-6">
      {/* Rune Style Selector */}
      <div className="flex flex-wrap gap-4">
        {runes.map((rune) => (
          <button
            key={rune.id}
            onClick={() => setSelectedStyle(rune.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
              ${selectedStyle === rune.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
          >
            <img
              src={rune.icon}
              alt={rune.name}
              className="w-6 h-6 rounded"
            />
            <span>{rune.name}</span>
          </button>
        ))}
      </div>

      {/* Selected Rune Path */}
      {selectedRune && (
        <RuneCard rune={selectedRune} />
      )}

      {/* Description */}
      <div className="bg-gray-800 p-6 rounded-lg mt-6">
        <h2 className="text-xl font-bold text-white mb-4">About Runes</h2>
        <p className="text-gray-300">
          Runes are powerful customization options that allow you to enhance your champion's 
          abilities and playstyle. Choose a primary path and combine it with secondary runes 
          to create unique strategies for your champion.
        </p>
      </div>
    </div>
  );
} 