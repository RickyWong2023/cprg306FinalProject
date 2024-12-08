export default function RuneCard({ rune }) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
      <div className="flex items-start space-x-4">
        <div className="relative">
          <img 
            src={rune.icon}
            alt={rune.name}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <div className="absolute -bottom-1 -right-1 bg-blue-500 text-xs px-2 py-0.5 rounded-full">
            Primary
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-bold text-white">{rune.name}</h3>
          
          <div className="mt-4 grid grid-cols-3 gap-2">
            {rune.slots[0].runes.map((keystone) => (
              <div key={keystone.id} className="group relative">
                <img
                  src={keystone.icon}
                  alt={keystone.name}
                  className="w-12 h-12 rounded-lg mx-auto hover:ring-2 hover:ring-blue-500 transition-all cursor-pointer"
                />
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute z-10 w-48 p-2 bg-gray-900 rounded-lg shadow-lg -left-16 top-full mt-2 pointer-events-none">
                  <p className="text-sm font-semibold text-white">{keystone.name}</p>
                  <p className="text-xs text-gray-400 mt-1">{keystone.shortDesc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            {rune.slots.slice(1).map((slot, index) => (
              <div key={index} className="flex space-x-2">
                {slot.runes.map((rune) => (
                  <div key={rune.id} className="group relative">
                    <img
                      src={rune.icon}
                      alt={rune.name}
                      className="w-8 h-8 rounded-lg hover:ring-2 hover:ring-blue-500 transition-all cursor-pointer"
                    />
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute z-10 w-48 p-2 bg-gray-900 rounded-lg shadow-lg -left-16 top-full mt-2 pointer-events-none">
                      <p className="text-sm font-semibold text-white">{rune.name}</p>
                      <p className="text-xs text-gray-400 mt-1">{rune.shortDesc}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 