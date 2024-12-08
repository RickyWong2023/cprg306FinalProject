import { NextResponse } from 'next/server';

const RIOT_API_KEY = process.env.RIOT_API_KEY;

let statsCache = null;
let lastFetchTime = null;
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes cache

async function getChampionStats() {
  if (statsCache && lastFetchTime && (Date.now() - lastFetchTime < CACHE_DURATION)) {
    return statsCache;
  }

  try {
    // Get basic champion information
    const championsResponse = await fetch(
      'https://ddragon.leagueoflegends.com/cdn/13.24.1/data/en_US/champion.json'
    );
    const championsData = await championsResponse.json();

    // Get Korean server high-elo data
    const challengerResponse = await fetch(
      'https://kr.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5',
      {
        headers: {
          'X-Riot-Token': RIOT_API_KEY
        }
      }
    );
    const challengerData = await challengerResponse.json();

    // Process data
    const championStats = {};
    Object.values(championsData.data).forEach(champion => {
      championStats[champion.key] = {
        pickRate: Math.random() * 30, // Simulate 0-30% pick rate
        winRate: 45 + Math.random() * 10, // Simulate 45-55% win rate
        banRate: Math.random() * 20, // Simulate 0-20% ban rate
        mastery: Math.random() * 100, // Simulate 0-100% mastery
        rank: Math.floor(Math.random() * 162) + 1 // Simulate rank 1-162
      };
    });

    // Sort and assign actual ranks
    const sortedChampions = Object.entries(championStats)
      .sort((a, b) => (b[1].pickRate + b[1].winRate) - (a[1].pickRate + a[1].winRate));

    sortedChampions.forEach(([key, stats], index) => {
      stats.rank = index + 1;
    });

    const finalStats = Object.fromEntries(sortedChampions);
    statsCache = finalStats;
    lastFetchTime = Date.now();

    return finalStats;
  } catch (error) {
    console.error('Error fetching champion stats:', error);
    throw error;
  }
}

export async function GET() {
  try {
    const stats = await getChampionStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
} 