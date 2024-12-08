import Link from 'next/link';

export default function TierRow({ tier, champions, championStats }) {
  const tierColors = {
    S: 'bg-red-500',
    A: 'bg-orange-500',
    B: 'bg-yellow-500',
    C: 'bg-green-500',
    D: 'bg-blue-500'
  };

  const getChampionStats = (champion) => {
    const stats = championStats[champion.key] || {};
    return {
      pickRate: stats.pickRate || 0,
      banRate: stats.banRate || 0,
      presence: (stats.pickRate || 0) + (stats.banRate || 0)
    };
  };

  if (champions.length === 0) return null;

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-start space-x-4">
        {/* Tier Label */}
        <div className={`${tierColors[tier]} w-16 h-16 flex items-center justify-center rounded-lg`}>
          <span className="text-3xl font-bold text-white">{tier}</span>
        </div>

        {/* Champions Grid */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {champions.map((champion) => {
            const stats = getChampionStats(champion);
            return (
              <Link 
                key={champion.id}
                href={`/champions/${champion.id}`}
                className="group relative"
              >
                <div className="bg-gray-700 rounded-lg p-2 hover:bg-gray-600 transition-colors">
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${champion.id}.png`}
                    alt={champion.name}
                    className="w-12 h-12 mx-auto rounded-full"
                  />
                  <p className="text-center text-sm mt-1 text-white truncate">
                    {champion.name}
                  </p>
                  {/* Tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute z-10 w-48 p-2 bg-gray-900 rounded-lg shadow-lg left-full top-0 ml-2 pointer-events-none">
                    <p className="text-sm font-semibold text-white">{champion.name}</p>
                    <p className="text-xs text-gray-400">{champion.title}</p>
                    <div className="mt-2 space-y-1 text-xs">
                      <p className="text-blue-400">Pick Rate: {stats.pickRate.toFixed(1)}%</p>
                      <p className="text-red-400">Ban Rate: {stats.banRate.toFixed(1)}%</p>
                      <p className="text-purple-400">Presence: {stats.presence.toFixed(1)}%</p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
} 