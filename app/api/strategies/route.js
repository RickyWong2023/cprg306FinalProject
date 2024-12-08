import { NextResponse } from 'next/server';

// Sample strategy data
const strategies = [
  {
    id: 1,
    title: "Early Game Wave Management",
    type: "Lane Strategy",
    description: "Learn how to control minion waves effectively in the early game to gain lane advantage.",
    author: "ProPlayer123",
    lastUpdated: "2024-01-15",
    difficulty: "Intermediate",
    tags: ["Wave Control", "Early Game", "Lane Phase"]
  },
  {
    id: 2,
    title: "Vision Control Guide",
    type: "Map Strategy",
    description: "Essential warding spots and vision control techniques for all roles.",
    author: "VisionMaster",
    lastUpdated: "2024-01-14",
    difficulty: "Beginner",
    tags: ["Vision", "Map Control", "Support"]
  },
  {
    id: 3,
    title: "Advanced Jungle Pathing",
    type: "Jungle Strategy",
    description: "Optimize your jungle clear routes and ganking patterns for maximum efficiency.",
    author: "JunglePro",
    lastUpdated: "2024-01-13",
    difficulty: "Advanced",
    tags: ["Jungle", "Pathing", "Ganking"]
  }
];

let strategiesCache = null;
let lastFetchTime = null;
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes cache

async function getAllStrategies() {
  if (strategiesCache && lastFetchTime && (Date.now() - lastFetchTime < CACHE_DURATION)) {
    return strategiesCache;
  }

  // In a real application, this would fetch from a database
  strategiesCache = strategies;
  lastFetchTime = Date.now();

  return strategies;
}

export async function GET() {
  try {
    const strategies = await getAllStrategies();
    return NextResponse.json(strategies);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch strategies data' },
      { status: 500 }
    );
  }
} 