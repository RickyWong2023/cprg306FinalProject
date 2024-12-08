import { NextResponse } from 'next/server';

const DDRAGON_VERSION = '13.24.1';
const BASE_URL = `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}`;

let runesCache = null;
let lastFetchTime = null;
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour cache

async function getAllRunes() {
  if (runesCache && lastFetchTime && (Date.now() - lastFetchTime < CACHE_DURATION)) {
    return runesCache;
  }

  try {
    const response = await fetch(`${BASE_URL}/data/en_US/runesReforged.json`);
    const data = await response.json();
    
    // Transform rune data and fix image URLs
    const runes = data.map(path => ({
      id: path.id,
      key: path.key,
      name: path.name,
      icon: `${BASE_URL}/img/${path.icon}`,
      slots: path.slots.map(slot => ({
        ...slot,
        runes: slot.runes.map(rune => ({
          ...rune,
          icon: `${BASE_URL}/img/${rune.icon}`,
          shortDesc: sanitizeDescription(rune.shortDesc)
        }))
      }))
    }));

    runesCache = runes;
    lastFetchTime = Date.now();

    return runes;
  } catch (error) {
    console.error('Error fetching runes:', error);
    throw error;
  }
}

function sanitizeDescription(desc) {
  return desc
    .replace(/<[^>]*>/g, '')
    .replace(/\r?\n|\r/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function GET() {
  try {
    const runes = await getAllRunes();
    return NextResponse.json(runes);
  } catch (error) {
    console.error('Fetch error details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch runes data' },
      { status: 500 }
    );
  }
} 