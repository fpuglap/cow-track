'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { useIsMobile } from '@/hooks/use-mobile';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export const description = 'Interactive area chart for cattle rotations';

// Sample data with simple field names: rotation, recovery
const chartData = [
  { date: '2024-04-01', rotation: 222, recovery: 150 },
  { date: '2024-04-02', rotation: 97, recovery: 180 },
  { date: '2024-04-03', rotation: 167, recovery: 120 },
  { date: '2024-04-04', rotation: 242, recovery: 260 },
  { date: '2024-04-05', rotation: 373, recovery: 290 },
  { date: '2024-04-06', rotation: 301, recovery: 340 },
  { date: '2024-04-07', rotation: 245, recovery: 180 },
  { date: '2024-04-08', rotation: 409, recovery: 320 },
  { date: '2024-04-09', rotation: 59, recovery: 110 },
  { date: '2024-04-10', rotation: 261, recovery: 190 },
  { date: '2024-04-11', rotation: 327, recovery: 350 },
  { date: '2024-04-12', rotation: 292, recovery: 210 },
  { date: '2024-04-13', rotation: 342, recovery: 380 },
  { date: '2024-04-14', rotation: 137, recovery: 220 },
  { date: '2024-04-15', rotation: 120, recovery: 170 },
  { date: '2024-04-16', rotation: 138, recovery: 190 },
  { date: '2024-04-17', rotation: 446, recovery: 360 },
  { date: '2024-04-18', rotation: 364, recovery: 410 },
  { date: '2024-04-19', rotation: 243, recovery: 180 },
  { date: '2024-04-20', rotation: 89, recovery: 150 },
  { date: '2024-04-21', rotation: 137, recovery: 200 },
  { date: '2024-04-22', rotation: 224, recovery: 170 },
  { date: '2024-04-23', rotation: 138, recovery: 230 },
  { date: '2024-04-24', rotation: 387, recovery: 290 },
  { date: '2024-04-25', rotation: 215, recovery: 250 },
  { date: '2024-04-26', rotation: 75, recovery: 130 },
  { date: '2024-04-27', rotation: 383, recovery: 420 },
  { date: '2024-04-28', rotation: 122, recovery: 180 },
  { date: '2024-04-29', rotation: 315, recovery: 240 },
  { date: '2024-04-30', rotation: 454, recovery: 380 },
  { date: '2024-05-01', rotation: 165, recovery: 220 },
  { date: '2024-05-02', rotation: 293, recovery: 310 },
  { date: '2024-05-03', rotation: 247, recovery: 190 },
  { date: '2024-05-04', rotation: 385, recovery: 420 },
  { date: '2024-05-05', rotation: 481, recovery: 390 },
  { date: '2024-05-06', rotation: 498, recovery: 520 },
  { date: '2024-05-07', rotation: 388, recovery: 300 },
  { date: '2024-05-08', rotation: 149, recovery: 210 },
  { date: '2024-05-09', rotation: 227, recovery: 180 },
  { date: '2024-05-10', rotation: 293, recovery: 330 },
  { date: '2024-05-11', rotation: 335, recovery: 270 },
  { date: '2024-05-12', rotation: 197, recovery: 240 },
  { date: '2024-05-13', rotation: 197, recovery: 160 },
  { date: '2024-05-14', rotation: 448, recovery: 490 },
  { date: '2024-05-15', rotation: 473, recovery: 380 },
  { date: '2024-05-16', rotation: 338, recovery: 400 },
  { date: '2024-05-17', rotation: 499, recovery: 420 },
  { date: '2024-05-18', rotation: 315, recovery: 350 },
  { date: '2024-05-19', rotation: 235, recovery: 180 },
  { date: '2024-05-20', rotation: 177, recovery: 230 },
  { date: '2024-05-21', rotation: 82, recovery: 140 },
  { date: '2024-05-22', rotation: 81, recovery: 120 },
  { date: '2024-05-23', rotation: 252, recovery: 290 },
  { date: '2024-05-24', rotation: 294, recovery: 220 },
  { date: '2024-05-25', rotation: 201, recovery: 250 },
  { date: '2024-05-26', rotation: 213, recovery: 170 },
  { date: '2024-05-27', rotation: 420, recovery: 460 },
  { date: '2024-05-28', rotation: 233, recovery: 190 },
  { date: '2024-05-29', rotation: 78, recovery: 130 },
  { date: '2024-05-30', rotation: 340, recovery: 280 },
  { date: '2024-05-31', rotation: 178, recovery: 230 },
  { date: '2024-06-01', rotation: 178, recovery: 200 },
  { date: '2024-06-02', rotation: 470, recovery: 410 },
  { date: '2024-06-03', rotation: 103, recovery: 160 },
  { date: '2024-06-04', rotation: 439, recovery: 380 },
  { date: '2024-06-05', rotation: 88, recovery: 140 },
  { date: '2024-06-06', rotation: 294, recovery: 250 },
  { date: '2024-06-07', rotation: 323, recovery: 370 },
  { date: '2024-06-08', rotation: 385, recovery: 320 },
  { date: '2024-06-09', rotation: 438, recovery: 480 },
  { date: '2024-06-10', rotation: 155, recovery: 200 },
  { date: '2024-06-11', rotation: 92, recovery: 150 },
  { date: '2024-06-12', rotation: 492, recovery: 420 },
  { date: '2024-06-13', rotation: 81, recovery: 130 },
  { date: '2024-06-14', rotation: 426, recovery: 380 },
  { date: '2024-06-15', rotation: 307, recovery: 350 },
  { date: '2024-06-16', rotation: 371, recovery: 310 },
  { date: '2024-06-17', rotation: 475, recovery: 520 },
  { date: '2024-06-18', rotation: 107, recovery: 170 },
  { date: '2024-06-19', rotation: 341, recovery: 290 },
  { date: '2024-06-20', rotation: 408, recovery: 450 },
  { date: '2024-06-21', rotation: 169, recovery: 210 },
  { date: '2024-06-22', rotation: 317, recovery: 270 },
  { date: '2024-06-23', rotation: 480, recovery: 530 },
  { date: '2024-06-24', rotation: 132, recovery: 180 },
  { date: '2024-06-25', rotation: 141, recovery: 190 },
  { date: '2024-06-26', rotation: 434, recovery: 380 },
  { date: '2024-06-27', rotation: 448, recovery: 490 },
  { date: '2024-06-28', rotation: 149, recovery: 200 },
  { date: '2024-06-29', rotation: 103, recovery: 160 },
  { date: '2024-06-30', rotation: 446, recovery: 400 },
];

// Keep same structure as original with Spanish labels
const chartConfig = {
  rotation: {
    label: 'Rotaciones',
    color: 'var(--primary)',
  },
  recovery: {
    label: 'Recuperación (%)',
    color: 'var(--primary)',
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState('90d');

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange('7d');
    }
  }, [isMobile]);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date('2024-06-30');
    let daysToSubtract = 90;
    if (timeRange === '30d') {
      daysToSubtract = 30;
    } else if (timeRange === '7d') {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className='@container/card'>
      <CardHeader>
        <CardTitle>Rotaciones - Recuperación</CardTitle>
        <CardDescription>
          <span className='hidden @[540px]/card:block'>
            Total de los últimos 3 meses
          </span>
          <span className='@[540px]/card:hidden'>Últimos 3 meses</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type='single'
            value={timeRange}
            onValueChange={setTimeRange}
            variant='outline'
            className='hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex'
          >
            <ToggleGroupItem value='90d'>Últimos 3 meses</ToggleGroupItem>
            <ToggleGroupItem value='30d'>Últimos 30 días</ToggleGroupItem>
            <ToggleGroupItem value='7d'>Últimos 7 días</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className='flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden'
              size='sm'
              aria-label='Select a value'
            >
              <SelectValue placeholder='Últimos 3 meses' />
            </SelectTrigger>
            <SelectContent className='rounded-xl'>
              <SelectItem value='90d' className='rounded-lg'>
                Últimos 3 meses
              </SelectItem>
              <SelectItem value='30d' className='rounded-lg'>
                Últimos 30 días
              </SelectItem>
              <SelectItem value='7d' className='rounded-lg'>
                Últimos 7 días
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[250px] w-full'
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id='fillrotation' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-rotation)'
                  stopOpacity={1.0}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-rotation)'
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id='fillrecovery' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-recovery)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-recovery)'
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('es-ES', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 10}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('es-ES', {
                      month: 'short',
                      day: 'numeric',
                    });
                  }}
                  indicator='dot'
                />
              }
            />
            <Area
              dataKey='recovery'
              type='natural'
              fill='url(#fillrecovery)'
              stroke='var(--color-recovery)'
              stackId='a'
            />
            <Area
              dataKey='rotation'
              type='natural'
              fill='url(#fillrotation)'
              stroke='var(--color-rotation)'
              stackId='a'
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
