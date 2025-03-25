import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function SectionCards() {
  return (
    <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4'>
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Ocupación de Potreros</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            3/7
          </CardTitle>
          <CardAction>
            <Badge variant='outline'>
              <IconTrendingDown />
              43%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Disponibles: 4 potreros <IconTrendingUp className='size-4' />
          </div>
          <div className='text-muted-foreground'>
            Capacidad actual para más ganado
          </div>
        </CardFooter>
      </Card>
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Grupos de Ganado</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            5
          </CardTitle>
          <CardAction>
            <Badge variant='outline'>
              <IconTrendingUp />
              +1
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Todos asignados <IconTrendingUp className='size-4' />
          </div>
          <div className='text-muted-foreground'>
            Distribución óptima actual
          </div>
        </CardFooter>
      </Card>
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Rotaciones Pendientes</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            1
          </CardTitle>
          <CardAction>
            <Badge variant='outline' className='bg-amber-100 dark:bg-amber-900'>
              <IconTrendingDown />
              Urgente
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium text-amber-500'>
            1 rotación urgente hoy <IconTrendingDown className='size-4' />
          </div>
          <div className='text-muted-foreground'>
            Requiere atención inmediata
          </div>
        </CardFooter>
      </Card>
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Tasa de Recuperación</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            85%
          </CardTitle>
          <CardAction>
            <Badge variant='outline'>
              <IconTrendingUp />
              +5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Mejora en descanso de potreros <IconTrendingUp className='size-4' />
          </div>
          <div className='text-muted-foreground'>
            Supera expectativa mensual
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
