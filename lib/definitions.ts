import { ReactNode } from 'react';

export type RotationItem = {
  id: string;
  group: string;
  origin: string;
  destination: string;
  days: number;
  notes?: string | null;
  date: string;
};

type PaddockStatus = 'active' | 'vacant' | 'recovery';

interface BasePaddock {
  id: string;
  status: PaddockStatus;
  grassHeight: number;
  area: number;
}

interface ActivePaddock extends BasePaddock {
  status: 'active';
  cattleCount: number;
  daysLeft: number;
}

interface VacantPaddock extends BasePaddock {
  status: 'vacant';
  recoveryRate: string;
  readyIn: number;
}

interface RecoveryPaddock extends BasePaddock {
  status: 'recovery';
  recoveryRate: string;
  readyIn: number;
}

export type Paddock = ActivePaddock | VacantPaddock | RecoveryPaddock;

export type PaddockDataBySector = {
  [sector: string]: Paddock[];
};

// Interfaces
export interface SummaryCardBadge {
  icon: ReactNode;
  text: string;
  class?: string;
}

export interface SummaryCard {
  title: string;
  value: string | number;
  badge: SummaryCardBadge;
  line1: string;
  line1Icon: ReactNode;
  line1Class?: string;
  line2: string;
}

export interface SummaryStats {
  totalPaddocks: number;
  activePaddocks: number;
  vacantPaddocks: number;
  recoveryPaddocks: number;
  urgentRotations: number;
  avgGrassHeight: number;
  totalCattleGroups: number;
}

export interface SummaryProps {
  stats: SummaryStats;
}
