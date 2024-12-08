export default function ItemCard({ name, cost, stats, image }) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors">
      <div className="flex items-center space-x-4">
        <img 
          src={image || "/placeholder-item.jpg"} 
          alt={name}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <p className="text-gold-500">Cost: {cost} gold</p>
          <p className="text-gray-300 text-sm">{stats}</p>
        </div>
      </div>
    </div>
  );
} 