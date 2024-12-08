import Link from 'next/link';

export default function ChampionCard({ champion }) {
  return (
    <Link href={`/champions/${champion.id}`} className="block">
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all hover:scale-105">
        <div className="aspect-square relative">
          <img 
            src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${champion.id}.png`}
            alt={champion.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-1 right-1 flex gap-1">
            {champion.tags.map((tag, index) => (
              <span 
                key={index}
                className="bg-black/60 text-[10px] px-1.5 py-0.5 rounded text-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="p-2">
          <h3 className="text-sm font-bold text-white truncate">{champion.name}</h3>
          <p className="text-xs text-gray-400 truncate">{champion.title}</p>
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-300">
              {champion.info.difficulty > 7 ? 'Hard' : 
               champion.info.difficulty > 4 ? 'Moderate' : 'Easy'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
} 