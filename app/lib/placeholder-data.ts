import { PaddockDataBySector } from '@/lib/definitions';

// Array with user data for seeding
export const users = [
  {
    id: '8d451e49-4a1c-4c43-b6e1-96a85c5b4bd1',
    name: 'Cowrporation',
    email: 'admin@cowrporation.com',
    password: 'Demo_P4ssw0rd!',
  },
];

// Helper to generate rotation data
const cattleGroups = [
  'Breeding Cows 1',
  'Breeding Cows 2',
  'Steers A',
  'Steers B',
  'Calves 2023',
  'Calves 2024',
  'Heifers',
  'Young Heifers',
  'Dairy Cows',
  'Bulls',
];

const paddocks = [
  'North Paddock',
  'South Paddock',
  'East Paddock',
  'West Paddock',
  'Central Paddock',
];

const observations = [
  'Scheduled rotation',
  'Grass depleted',
  'Normal rotation',
  'Water shortage',
  'Urgent rotation',
  'Paddock rest needed',
  'Routine move',
  'Overgrazing prevention',
  'Seasonal adjustment',
  '',
];

// Pre-generated UUIDs for consistent seeding
const uuids = [
  'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
  'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
  'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f',
  'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a',
  'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b',
  'f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c',
  'a7b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d',
  'b8c9d0e1-f2a3-4b4c-5d6e-7f8a9b0c1d2e',
  'c9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f',
  'd0e1f2a3-b4c5-4d6e-7f8a-9b0c1d2e3f4a',
  'e1f2a3b4-c5d6-4e7f-8a9b-0c1d2e3f4a5b',
  'f2a3b4c5-d6e7-4f8a-9b0c-1d2e3f4a5b6c',
  'a3b4c5d6-e7f8-4a9b-0c1d-2e3f4a5b6c7d',
  'b4c5d6e7-f8a9-4b0c-1d2e-3f4a5b6c7d8e',
  'c5d6e7f8-a9b0-4c1d-2e3f-4a5b6c7d8e9f',
  'd6e7f8a9-b0c1-4d2e-3f4a-5b6c7d8e9f0a',
  'e7f8a9b0-c1d2-4e3f-4a5b-6c7d8e9f0a1b',
  'f8a9b0c1-d2e3-4f4a-5b6c-7d8e9f0a1b2c',
  'a9b0c1d2-e3f4-4a5b-6c7d-8e9f0a1b2c3d',
  'b0c1d2e3-f4a5-4b6c-7d8e-9f0a1b2c3d4e',
  'c1d2e3f4-a5b6-4c7d-8e9f-0a1b2c3d4e5f',
  'd2e3f4a5-b6c7-4d8e-9f0a-1b2c3d4e5f6a',
  'e3f4a5b6-c7d8-4e9f-0a1b-2c3d4e5f6a7b',
  'f4a5b6c7-d8e9-4f0a-1b2c-3d4e5f6a7b8c',
  'a5b6c7d8-e9f0-4a1b-2c3d-4e5f6a7b8c9d',
  'b6c7d8e9-f0a1-4b2c-3d4e-5f6a7b8c9d0e',
  'c7d8e9f0-a1b2-4c3d-4e5f-6a7b8c9d0e1f',
  'd8e9f0a1-b2c3-4d4e-5f6a-7b8c9d0e1f2a',
  'e9f0a1b2-c3d4-4e5f-6a7b-8c9d0e1f2a3b',
  'f0a1b2c3-d4e5-4f6a-7b8c-9d0e1f2a3b4c',
  'a1b2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6d',
  'b2c3d4e5-f6a7-4b8c-9d0e-2f3a4b5c6d7e',
  'c3d4e5f6-a7b8-4c9d-0e1f-3a4b5c6d7e8f',
  'd4e5f6a7-b8c9-4d0e-1f2a-4b5c6d7e8f9a',
  'e5f6a7b8-c9d0-4e1f-2a3b-5c6d7e8f9a0b',
  'f6a7b8c9-d0e1-4f2a-3b4c-6d7e8f9a0b1c',
  'a7b8c9d0-e1f2-4a3b-4c5d-7e8f9a0b1c2d',
  'b8c9d0e1-f2a3-4b4c-5d6e-8f9a0b1c2d3e',
  'c9d0e1f2-a3b4-4c5d-6e7f-9a0b1c2d3e4f',
  'd0e1f2a3-b4c5-4d6e-7f8a-0b1c2d3e4f5a',
  'e1f2a3b4-c5d6-4e7f-8a9b-1c2d3e4f5a6b',
  'f2a3b4c5-d6e7-4f8a-9b0c-2d3e4f5a6b7c',
  'a3b4c5d6-e7f8-4a9b-0c1d-3e4f5a6b7c8d',
  'b4c5d6e7-f8a9-4b0c-1d2e-4f5a6b7c8d9e',
  'c5d6e7f8-a9b0-4c1d-2e3f-5a6b7c8d9e0f',
  'd6e7f8a9-b0c1-4d2e-3f4a-6b7c8d9e0f1a',
  'e7f8a9b0-c1d2-4e3f-4a5b-7c8d9e0f1a2b',
  'f8a9b0c1-d2e3-4f4a-5b6c-8d9e0f1a2b3c',
  'a9b0c1d2-e3f4-4a5b-6c7d-9e0f1a2b3c4d',
  'b0c1d2e3-f4a5-4b6c-7d8e-0f1a2b3c4d5e',
];

// Generate 50 rotation records
function generateRotations() {
  const rotations = [];
  const startDate = new Date('2025-01-01');

  for (let i = 0; i < 50; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i * 2);

    const originIndex = i % paddocks.length;
    let destIndex = (originIndex + 1 + (i % 3)) % paddocks.length;
    if (destIndex === originIndex) destIndex = (destIndex + 1) % paddocks.length;

    rotations.push({
      id: uuids[i],
      cattle_group: cattleGroups[i % cattleGroups.length],
      origin_pasture: paddocks[originIndex],
      destination_pasture: paddocks[destIndex],
      rotation_date: date.toISOString().split('T')[0],
      days_in_pasture: 5 + (i % 25),
      observations: observations[i % observations.length],
    });
  }

  return rotations;
}

export const rotations = generateRotations();

// Mock data for paddocks
export const paddockData: PaddockDataBySector = {
  A: [
    {
      id: 'A1',
      status: 'active',
      grassHeight: 85,
      area: 8.5,
      cattleCount: 15,
      daysLeft: 3,
    },
    {
      id: 'A2',
      status: 'vacant',
      grassHeight: 75,
      area: 7.2,
      recoveryRate: '+2%',
      readyIn: 0,
    },
    {
      id: 'A3',
      status: 'recovery',
      grassHeight: 40,
      area: 9.1,
      recoveryRate: '+5%',
      readyIn: 7,
    },
    {
      id: 'A4',
      status: 'vacant',
      grassHeight: 80,
      area: 6.8,
      recoveryRate: 'stable',
      readyIn: 0,
    },
    {
      id: 'A5',
      status: 'recovery',
      grassHeight: 45,
      area: 8.9,
      recoveryRate: '+3%',
      readyIn: 5,
    },
    {
      id: 'A6',
      status: 'vacant',
      grassHeight: 70,
      area: 7.5,
      recoveryRate: '+1%',
      readyIn: 0,
    },
    {
      id: 'A7',
      status: 'active',
      grassHeight: 75,
      area: 8.3,
      cattleCount: 12,
      daysLeft: 2,
    },
    {
      id: 'A8',
      status: 'recovery',
      grassHeight: 35,
      area: 6.7,
      recoveryRate: '+4%',
      readyIn: 8,
    },
  ],
  B: [
    {
      id: 'B1',
      status: 'recovery',
      grassHeight: 45,
      area: 7.8,
      recoveryRate: '+3%',
      readyIn: 6,
    },
    {
      id: 'B2',
      status: 'vacant',
      grassHeight: 80,
      area: 8.4,
      recoveryRate: 'stable',
      readyIn: 0,
    },
    {
      id: 'B3',
      status: 'active',
      grassHeight: 70,
      area: 9.2,
      cattleCount: 18,
      daysLeft: 4,
    },
    {
      id: 'B4',
      status: 'vacant',
      grassHeight: 75,
      area: 7.1,
      recoveryRate: '+1%',
      readyIn: 0,
    },
    {
      id: 'B5',
      status: 'recovery',
      grassHeight: 40,
      area: 8.7,
      recoveryRate: '+4%',
      readyIn: 7,
    },
    {
      id: 'B6',
      status: 'vacant',
      grassHeight: 85,
      area: 6.9,
      recoveryRate: 'stable',
      readyIn: 0,
    },
    {
      id: 'B7',
      status: 'recovery',
      grassHeight: 50,
      area: 7.5,
      recoveryRate: '+2%',
      readyIn: 5,
    },
    {
      id: 'B8',
      status: 'active',
      grassHeight: 75,
      area: 8.1,
      cattleCount: 14,
      daysLeft: 3,
    },
  ],
  C: [
    {
      id: 'C1',
      status: 'active',
      grassHeight: 75,
      area: 8.8,
      cattleCount: 16,
      daysLeft: 2,
    },
    {
      id: 'C2',
      status: 'vacant',
      grassHeight: 80,
      area: 7.6,
      recoveryRate: 'stable',
      readyIn: 0,
    },
    {
      id: 'C3',
      status: 'recovery',
      grassHeight: 45,
      area: 9.3,
      recoveryRate: '+3%',
      readyIn: 6,
    },
    {
      id: 'C4',
      status: 'vacant',
      grassHeight: 75,
      area: 6.5,
      recoveryRate: '+1%',
      readyIn: 0,
    },
    {
      id: 'C5',
      status: 'recovery',
      grassHeight: 40,
      area: 8.2,
      recoveryRate: '+4%',
      readyIn: 7,
    },
    {
      id: 'C6',
      status: 'vacant',
      grassHeight: 85,
      area: 7.7,
      recoveryRate: 'stable',
      readyIn: 0,
    },
    {
      id: 'C7',
      status: 'active',
      grassHeight: 70,
      area: 9.0,
      cattleCount: 15,
      daysLeft: 4,
    },
    {
      id: 'C8',
      status: 'recovery',
      grassHeight: 50,
      area: 7.3,
      recoveryRate: '+2%',
      readyIn: 5,
    },
  ],
  D: [
    {
      id: 'D1',
      status: 'vacant',
      grassHeight: 80,
      area: 8.6,
      recoveryRate: 'stable',
      readyIn: 0,
    },
    {
      id: 'D2',
      status: 'recovery',
      grassHeight: 45,
      area: 7.9,
      recoveryRate: '+3%',
      readyIn: 6,
    },
    {
      id: 'D3',
      status: 'vacant',
      grassHeight: 75,
      area: 8.5,
      recoveryRate: '+1%',
      readyIn: 0,
    },
    {
      id: 'D4',
      status: 'active',
      grassHeight: 70,
      area: 9.4,
      cattleCount: 17,
      daysLeft: 3,
    },
    {
      id: 'D5',
      status: 'recovery',
      grassHeight: 40,
      area: 7.2,
      recoveryRate: '+4%',
      readyIn: 7,
    },
    {
      id: 'D6',
      status: 'vacant',
      grassHeight: 85,
      area: 8.0,
      recoveryRate: 'stable',
      readyIn: 0,
    },
    {
      id: 'D7',
      status: 'active',
      grassHeight: 75,
      area: 7.4,
      cattleCount: 13,
      daysLeft: 2,
    },
    {
      id: 'D8',
      status: 'recovery',
      grassHeight: 50,
      area: 8.9,
      recoveryRate: '+2%',
      readyIn: 5,
    },
  ],
};
