export default function ChampionCard({ name, role, difficulty, image }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <div className="aspect-w-16 aspect-h-9 relative">
        <img 
          src={image || "/placeholder-champion.jpg"} 
          alt={name}
          className="object-cover w-full h-48"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-white">{name}</h3>
        <div className="mt-2 space-y-1">
          <p className="text-gray-300">Role: {role}</p>
          <p className="text-gray-300">Difficulty: {difficulty}</p>
        </div>
      </div>
    </div>
  );
} 