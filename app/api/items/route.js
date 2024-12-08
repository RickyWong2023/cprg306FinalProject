import { NextResponse } from 'next/server';

const DDRAGON_VERSION = '13.24.1';
const BASE_URL = `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}`;

let itemsCache = null;
let lastFetchTime = null;
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour cache

const ROLE_TAGS = {
  FIGHTER: ['Damage', 'Health', 'Armor', 'Magic Resist'],
  TANK: ['Health', 'Armor', 'Magic Resist', 'Health Regen'],
  MAGE: ['Ability Power', 'Mana', 'Magic Penetration'],
  ASSASSIN: ['Damage', 'Lethality', 'Magic Penetration'],
  MARKSMAN: ['Damage', 'Critical Strike', 'Attack Speed'],
  SUPPORT: ['Health', 'Mana Regen', 'Ability Haste']
};

async function getAllItems() {
  if (itemsCache && lastFetchTime && (Date.now() - lastFetchTime < CACHE_DURATION)) {
    return itemsCache;
  }

  try {
    const response = await fetch(`${BASE_URL}/data/en_US/item.json`);
    const data = await response.json();
    
    // Transform data and add image URLs
    const items = Object.entries(data.data).map(([id, item]) => {
      // Add role tags based on item stats and tags
      const roles = determineRoles(item);
      
      return {
        id,
        ...item,
        squareImage: `${BASE_URL}/img/item/${id}.png`,
        roles,
        // Add build paths
        builds_from: item.from ? item.from.map(fromId => ({
          id: fromId,
          image: `${BASE_URL}/img/item/${fromId}.png`
        })) : [],
        builds_into: item.into ? item.into.map(intoId => ({
          id: intoId,
          image: `${BASE_URL}/img/item/${intoId}.png`
        })) : []
      };
    });

    // Filter out non-purchasable items
    const purchasableItems = items.filter(item => 
      item.gold.purchasable && 
      !item.tags.includes('Consumable') &&
      !item.tags.includes('Trinket')
    );

    itemsCache = purchasableItems;
    lastFetchTime = Date.now();

    return purchasableItems;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
}

function determineRoles(item) {
  const roles = [];
  const stats = item.stats || {};
  const tags = item.tags || [];

  // Check each role's criteria
  if ((stats.FlatPhysicalDamageMod || stats.FlatHPPoolMod) && 
      (stats.FlatArmorMod || stats.FlatSpellBlockMod)) {
    roles.push('FIGHTER');
  }

  if (stats.FlatHPPoolMod && (stats.FlatArmorMod || stats.FlatSpellBlockMod)) {
    roles.push('TANK');
  }

  if (stats.FlatMagicDamageMod || tags.includes('SpellDamage')) {
    roles.push('MAGE');
  }

  if ((stats.FlatPhysicalDamageMod && tags.includes('Stealth')) || 
      tags.includes('Assassin')) {
    roles.push('ASSASSIN');
  }

  if (stats.FlatPhysicalDamageMod && 
      (stats.FlatCritChanceMod || stats.PercentAttackSpeedMod)) {
    roles.push('MARKSMAN');
  }

  if (tags.includes('GoldPer') || tags.includes('Vision') || 
      item.description.includes('heal') || item.description.includes('shield')) {
    roles.push('SUPPORT');
  }

  return roles.length > 0 ? roles : ['ALL'];
}

export async function GET() {
  try {
    const items = await getAllItems();
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch items data' },
      { status: 500 }
    );
  }
} 