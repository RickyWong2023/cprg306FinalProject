'use client';
import { useEffect, useState } from 'react';

export default function ChampionDetail({ params }) {
  const [champion, setChampion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChampion() {
      try {
        const response = await fetch(`/api/champions?id=${params.id}`);
        const data = await response.json();
        setChampion(data);
      } catch (error) {
        console.error('Error fetching champion:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchChampion();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!champion) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-red-500">Champion not found</h1>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="relative h-96">
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`}
            alt={champion.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <h1 className="text-4xl font-bold text-white">{champion.name}</h1>
            <p className="text-xl text-gray-300">{champion.title}</p>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Lore</h2>
            <p className="text-gray-300">{champion.lore}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">Abilities</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/passive/${champion.passive.image.full}`}
                    alt={champion.passive.name}
                    className="w-12 h-12 rounded"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-blue-400">
                      Passive - {champion.passive.name}
                    </h3>
                    <p className="text-gray-300 text-sm">{champion.passive.description}</p>
                  </div>
                </div>

                {champion.spells.map((spell, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/spell/${spell.id}.png`}
                      alt={spell.name}
                      className="w-12 h-12 rounded"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-blue-400">
                        {spell.name}
                      </h3>
                      <p className="text-gray-300 text-sm">{spell.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">Combat Info</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-gray-300">Attack: {champion.info.attack}</div>
                    <div className="text-gray-300">Defense: {champion.info.defense}</div>
                    <div className="text-gray-300">Magic: {champion.info.magic}</div>
                    <div className="text-gray-300">Difficulty: {champion.info.difficulty}</div>
                  </div>
                </div>
                {Object.entries(champion.stats).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-400">{formatStatName(key)}:</span>
                    <span className="text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatStatName(stat) {
  const statNames = {
    hp: 'Health',
    hpperlevel: 'Health per Level',
    mp: 'Mana',
    mpperlevel: 'Mana per Level',
    movespeed: 'Movement Speed',
    armor: 'Armor',
    armorperlevel: 'Armor per Level',
    spellblock: 'Magic Resist',
    spellblockperlevel: 'Magic Resist per Level',
    attackrange: 'Attack Range',
    attackdamage: 'Attack Damage',
    attackdamageperlevel: 'Attack Damage per Level',
    attackspeed: 'Attack Speed',
    attackspeedperlevel: 'Attack Speed per Level'
  };
  return statNames[stat] || stat;
} 