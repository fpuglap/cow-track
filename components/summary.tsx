import React from 'react';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';
import { SummaryCard, SummaryStats } from '@/lib/definitions';

// Esta versión recibe las estadísticas como props
export function Summary({ stats }: { stats: SummaryStats }) {
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
          ? `${stats.urgentRotations} rotación${
              stats.urgentRotations > 1 ? 'es' : ''
            } urgente${stats.urgentRotations > 1 ? 's' : ''} hoy`
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
    <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @3xl/main:grid-cols-3 @5xl/main:grid-cols-4 px-4 lg:px-6 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs'>
      {summaryCards.map((card, index) => (
        <Card key={index} className='@container/card' data-slot='card'>
          <CardHeader>
            <CardDescription>{card.title}</CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums sm:text-3xl'>
              {card.value}
            </CardTitle>
            <CardAction>
              <Badge variant='outline' className={card.badge.class || ''}>
                {card.badge.icon} {card.badge.text}
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
  );
}
