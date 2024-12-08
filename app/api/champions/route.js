import { NextResponse } from 'next/server';

const DDRAGON_VERSION = '13.24.1';
const BASE_URL = `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}`;

let championsCache = null;
let lastFetchTime = null;
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour cache

async function getAllChampionsData() {
  if (championsCache && lastFetchTime && (Date.now() - lastFetchTime < CACHE_DURATION)) {
    return championsCache;
  }

  try {
    const response = await fetch(`${BASE_URL}/data/en_US/champion.json`);
    const data = await response.json();
    const champions = data.data;

    const detailedChampions = await Promise.all(
      Object.keys(champions).map(async (championId) => {
        const detailResponse = await fetch(
          `${BASE_URL}/data/en_US/champion/${championId}.json`
        );
        const detailData = await detailResponse.json();
        const champion = detailData.data[championId];

        return {
          ...champion,
          passive: {
            ...champion.passive,
            image: {
              ...champion.passive.image,
              full: champion.passive.image.full
            }
          },
          spells: champion.spells.map(spell => ({
            ...spell,
            id: spell.id,
            image: {
              ...spell.image,
              full: spell.image.full
            }
          }))
        };
      })
    );

    championsCache = detailedChampions;
    lastFetchTime = Date.now();

    return detailedChampions;
  } catch (error) {
    console.error('Error fetching champions data:', error);
    throw error;
  }
}

async function getChampionById(championId) {
  try {
    const response = await fetch(
      `${BASE_URL}/data/en_US/champion/${championId}.json`
    );
    const data = await response.json();
    const champion = data.data[championId];

    return {
      ...champion,
      passive: {
        ...champion.passive,
        image: {
          ...champion.passive.image,
          full: champion.passive.image.full
        }
      },
      spells: champion.spells.map(spell => ({
        ...spell,
        id: spell.id,
        image: {
          ...spell.image,
          full: spell.image.full
        }
      }))
    };
  } catch (error) {
    console.error('Error fetching champion data:', error);
    throw error;
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const championData = await getChampionById(id);
      if (!championData) {
        return NextResponse.json({ error: 'Champion not found' }, { status: 404 });
      }
      return NextResponse.json(championData);
    }

    const allChampions = await getAllChampionsData();
    return NextResponse.json(allChampions);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch champion data' },
      { status: 500 }
    );
  }
}