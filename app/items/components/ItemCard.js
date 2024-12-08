export default function ItemCard({ item }) {
  const roleColors = {
    FIGHTER: 'text-orange-400',
    TANK: 'text-emerald-400',
    MAGE: 'text-purple-400',
    ASSASSIN: 'text-red-400',
    MARKSMAN: 'text-yellow-400',
    SUPPORT: 'text-blue-400',
    ALL: 'text-gray-400'
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors">
      <div className="flex items-start space-x-3">
        <img 
          src={item.squareImage}
          alt={item.name}
          className="w-12 h-12 object-cover rounded"
        />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-white">{item.name}</h3>
          <div className="flex items-center mt-1">
            <span className="text-gold-400 text-xs">{item.gold.total} gold</span>
          </div>
        </div>
      </div>

      {/* Role Tags */}
      <div className="mt-3 flex flex-wrap gap-2">
        {item.roles.map((role) => (
          <span 
            key={role}
            className={`px-2 py-0.5 rounded-full text-xs ${roleColors[role]} bg-gray-900`}
          >
            {role.toLowerCase()}
          </span>
        ))}
      </div>

      {/* Stats */}
      {item.stats && Object.keys(item.stats).length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-700">
          <div className="grid grid-cols-2 gap-1">
            {Object.entries(item.stats).map(([key, value]) => (
              value !== 0 && (
                <div key={key} className="text-xs text-gray-300">
                  {formatStatName(key)}: {formatStatValue(key, value)}
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Build Paths */}
      {(item.builds_from?.length > 0 || item.builds_into?.length > 0) && (
        <div className="mt-3 pt-3 border-t border-gray-700">
          {item.builds_from?.length > 0 && (
            <div className="mb-2">
              <span className="text-xs text-gray-400">Builds From:</span>
              <div className="flex gap-1 mt-1">
                {item.builds_from.map((component) => (
                  <img
                    key={component.id}
                    src={component.image}
                    alt="Component"
                    className="w-8 h-8 rounded"
                  />
                ))}
              </div>
            </div>
          )}
          {item.builds_into?.length > 0 && (
            <div>
              <span className="text-xs text-gray-400">Builds Into:</span>
              <div className="flex gap-1 mt-1">
                {item.builds_into.map((upgrade) => (
                  <img
                    key={upgrade.id}
                    src={upgrade.image}
                    alt="Upgrade"
                    className="w-8 h-8 rounded"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function formatStatName(stat) {
  const statNames = {
    FlatHPPoolMod: 'Health',
    FlatMPPoolMod: 'Mana',
    PercentHPPoolMod: 'Health %',
    PercentMPPoolMod: 'Mana %',
    FlatHPRegenMod: 'HP Regen',
    FlatMPRegenMod: 'Mana Regen',
    FlatArmorMod: 'Armor',
    FlatPhysicalDamageMod: 'Attack Damage',
    FlatMagicDamageMod: 'Ability Power',
    FlatMovementSpeedMod: 'Movement Speed',
    PercentMovementSpeedMod: 'Movement Speed %',
    FlatAttackSpeedMod: 'Attack Speed',
    PercentAttackSpeedMod: 'Attack Speed %',
    FlatCritChanceMod: 'Critical Chance',
    FlatSpellBlockMod: 'Magic Resist'
  };
  return statNames[stat] || stat;
}

function formatStatValue(stat, value) {
  if (stat.includes('Percent')) {
    return `${(value * 100).toFixed(0)}%`;
  }
  return value.toFixed(stat.includes('Speed') ? 2 : 0);
} 