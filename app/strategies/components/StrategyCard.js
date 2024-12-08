export default function StrategyCard({ strategy }) {
  const difficultyColors = {
    Beginner: 'text-green-400',
    Intermediate: 'text-yellow-400',
    Advanced: 'text-red-400'
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-white">{strategy.title}</h3>
        <span className={`text-sm font-medium ${difficultyColors[strategy.difficulty]}`}>
          {strategy.difficulty}
        </span>
      </div>
      
      <div className="mt-2">
        <span className="text-blue-400 text-sm">{strategy.type}</span>
      </div>

      <p className="mt-4 text-gray-300">{strategy.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {strategy.tags.map((tag, index) => (
          <span 
            key={index}
            className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
        <div className="text-sm text-gray-400">
          By <span className="text-blue-400">{strategy.author}</span>
        </div>
        <div className="text-xs text-gray-500">
          Updated: {new Date(strategy.lastUpdated).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
} 