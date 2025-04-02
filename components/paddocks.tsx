import { ReactNode, useState } from 'react';
import {
  IconTrendingDown,
  IconTrendingUp,
  IconPlant,
  IconClock,
  IconHorseshoe,
} from '@tabler/icons-react';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Type definitions
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

type Paddock = ActivePaddock | VacantPaddock | RecoveryPaddock;

type PaddockDataBySector = {
  [sector: string]: Paddock[];
};

interface StatusConfig {
  color: string;
  text: string;
  icon: ReactNode;
}

interface StatusConfigs {
  active: StatusConfig;
  vacant: StatusConfig;
  recovery: StatusConfig;
}

interface SummaryCardBadge {
  icon: ReactNode;
  text: string;
  class?: string;
}

interface SummaryCard {
  title: string;
  value: string | number;
  badge: SummaryCardBadge;
  line1: string;
  line1Icon: ReactNode;
  line1Class?: string;
  line2: string;
}

interface SummaryStats {
  totalPaddocks: number;
  activePaddocks: number;
  vacantPaddocks: number;
  recoveryPaddocks: number;
  urgentRotations: number;
  avgGrassHeight: number;
  totalCattleGroups: number;
}

// Mock data for paddocks
const paddockData: PaddockDataBySector = {
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
      recoveryRate: 'estable',
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
      recoveryRate: 'estable',
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
      recoveryRate: 'estable',
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
      recoveryRate: 'estable',
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
      recoveryRate: 'estable',
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
      recoveryRate: 'estable',
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
      recoveryRate: 'estable',
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

// Mapping of status to visual configurations (with correct Tabler icons)
const statusConfig: StatusConfigs = {
  active: {
    color: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
    text: 'Con Ganado',
    icon: <IconHorseshoe className='size-4' />,
  },
  recovery: {
    color: 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300',
    text: 'En Recuperación',
    icon: <IconClock className='size-4' />,
  },
  vacant: {
    color: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
    text: 'Libre',
    icon: <IconPlant className='size-4' />,
  },
};

// Main component for visualizing paddocks
export function PaddockCards() {
  const [activeTab, setActiveTab] = useState('A');

  // Function to render the footer content based on paddock status
  const renderFooterContent = (paddock: Paddock) => {
    if (paddock.status === 'active') {
      return (
        <>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            {paddock.cattleCount} cabezas de ganado{' '}
            <IconHorseshoe className='size-4' />
          </div>
          <div className='text-muted-foreground'>
            Rotación en {paddock.daysLeft} días • {paddock.area} ha
          </div>
        </>
      );
    }

    if (paddock.status === 'recovery') {
      return (
        <>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Recuperación {paddock.recoveryRate}{' '}
            <IconTrendingUp className='size-4' />
          </div>
          <div className='text-muted-foreground'>
            Listo en {paddock.readyIn} días • {paddock.area} ha
          </div>
        </>
      );
    }

    return (
      <>
        <div className='line-clamp-1 flex gap-2 font-medium'>
          Disponible para uso <IconPlant className='size-4' />
        </div>
        <div className='text-muted-foreground'>
          {paddock.grassHeight >= 70
            ? 'Óptimo para pastoreo'
            : 'Pastoreo posible'}{' '}
          • {paddock.area} ha
        </div>
      </>
    );
  };

  return (
    <div className='flex flex-col gap-4'>
      <Tabs
        defaultValue={activeTab}
        onValueChange={setActiveTab}
        className='w-full'
      >
        <TabsList className='grid w-full grid-cols-4'>
          {Object.keys(paddockData).map((sector) => (
            <TabsTrigger key={sector} value={sector}>
              Sector {sector}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.keys(paddockData).map((sector) => (
          <TabsContent key={sector} value={sector} className='mt-4'>
            <div className='grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @3xl/main:grid-cols-3 @5xl/main:grid-cols-4'>
              {paddockData[sector].map((paddock) => (
                <Card key={paddock.id} className='@container/card'>
                  <CardHeader>
                    <CardDescription>Potrero {paddock.id}</CardDescription>
                    <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                      {paddock.grassHeight}%{' '}
                      <span className='text-sm font-normal'>
                        altura de pasto
                      </span>
                    </CardTitle>
                    <CardAction>
                      <Badge
                        variant='outline'
                        className={statusConfig[paddock.status].color}
                      >
                        {statusConfig[paddock.status].icon}
                        {statusConfig[paddock.status].text}
                      </Badge>
                    </CardAction>
                  </CardHeader>
                  <CardFooter className='flex-col items-start gap-1.5 text-sm'>
                    {renderFooterContent(paddock)}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

// Complete page component with summary cards
export default function Paddocks() {
  // Calculate statistics for summary cards
  const calculateSummaryStats = (): SummaryStats => {
    const allPaddocks = Object.values(paddockData).flat();
    const totalPaddocks = allPaddocks.length;
    const activePaddocks = allPaddocks.filter(
      (p) => p.status === 'active'
    ).length;
    const vacantPaddocks = allPaddocks.filter(
      (p) => p.status === 'vacant'
    ).length;
    const recoveryPaddocks = allPaddocks.filter(
      (p) => p.status === 'recovery'
    ).length;

    const urgentRotations = allPaddocks.filter(
      (p) => p.status === 'active' && p.daysLeft <= 1
    ).length;

    const avgGrassHeight = Math.round(
      allPaddocks.reduce((sum, p) => sum + p.grassHeight, 0) / totalPaddocks
    );

    const totalCattleGroups = allPaddocks.filter(
      (p) => p.status === 'active'
    ).length;

    return {
      totalPaddocks,
      activePaddocks,
      vacantPaddocks,
      recoveryPaddocks,
      urgentRotations,
      avgGrassHeight,
      totalCattleGroups,
    };
  };

  const stats = calculateSummaryStats();

  // Array of data for summary cards
  const summaryCards: SummaryCard[] = [
    {
      title: 'Ocupación de Potreros',
      value: `${stats.activePaddocks}/${stats.totalPaddocks}`,
      badge: {
        icon: <IconTrendingDown />,
        text: `${Math.round(
          (stats.activePaddocks / stats.totalPaddocks) * 100
        )}%`,
      },
      line1: `Disponibles: ${stats.vacantPaddocks} potreros`,
      line1Icon: <IconTrendingUp className='size-4' />,
      line2:
        stats.vacantPaddocks > 0
          ? 'Capacidad actual para más ganado'
          : 'Sin capacidad disponible',
    },
    {
      title: 'Grupos de Ganado',
      value: stats.totalCattleGroups,
      badge: {
        icon: <IconTrendingUp />,
        text: '+1',
      },
      line1: 'Todos asignados',
      line1Icon: <IconTrendingUp className='size-4' />,
      line2: 'Distribución óptima actual',
    },
    {
      title: 'Rotaciones Pendientes',
      value: stats.urgentRotations,
      badge: {
        icon:
          stats.urgentRotations > 0 ? <IconTrendingDown /> : <IconTrendingUp />,
        text: stats.urgentRotations > 0 ? 'Urgente' : 'Al día',
        class:
          stats.urgentRotations > 0 ? 'bg-amber-100 dark:bg-amber-900' : '',
      },
      line1:
        stats.urgentRotations > 0
          ? `${stats.urgentRotations} rotación urgente hoy`
          : 'Sin rotaciones urgentes',
      line1Icon:
        stats.urgentRotations > 0 ? (
          <IconTrendingDown className='size-4' />
        ) : (
          <IconTrendingUp className='size-4' />
        ),
      line1Class: stats.urgentRotations > 0 ? 'text-amber-500' : '',
      line2:
        stats.urgentRotations > 0
          ? 'Requiere atención inmediata'
          : 'Situación controlada',
    },
    {
      title: 'Tasa de Recuperación',
      value: `${stats.avgGrassHeight}%`,
      badge: {
        icon: <IconTrendingUp />,
        text: '+5%',
      },
      line1: 'Mejora en descanso de potreros',
      line1Icon: <IconTrendingUp className='size-4' />,
      line2: 'Supera expectativa mensual',
    },
  ];

  return (
    <div className='@container/main flex flex-1 flex-col gap-4 md:gap-6'>
      <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4'>
        {summaryCards.map((card, index) => (
          <Card key={index} className='@container/card'>
            <CardHeader>
              <CardDescription>{card.title}</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                {card.value}
              </CardTitle>
              <CardAction>
                <Badge variant='outline' className={card.badge.class || ''}>
                  {card.badge.icon}
                  {card.badge.text}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div
                className={`line-clamp-1 flex gap-2 font-medium ${
                  card.line1Class || ''
                }`}
              >
                {card.line1} {card.line1Icon}
              </div>
              <div className='text-muted-foreground'>{card.line2}</div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className='px-4 lg:px-6'>
        <PaddockCards />
      </div>
    </div>
  );
}
