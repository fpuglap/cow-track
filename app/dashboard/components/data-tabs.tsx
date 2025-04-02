'use client';

import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Paddocks from '@/components/paddocks';

export function DataTabs() {
  return (
    <Tabs
      defaultValue='potreros'
      className='w-full flex-col justify-start gap-6'
    >
      <div className='flex items-center justify-between px-4 lg:px-6'>
        <Label htmlFor='view-selector' className='sr-only'>
          Vista
        </Label>
        <Select defaultValue='potreros'>
          <SelectTrigger
            className='flex w-fit @4xl/main:hidden'
            size='sm'
            id='view-selector'
          >
            <SelectValue placeholder='Seleccionar vista' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='potreros'>Potreros</SelectItem>
            <SelectItem value='ganado'>Ganado</SelectItem>
            <SelectItem value='informes'>Informes</SelectItem>
          </SelectContent>
        </Select>
        <TabsList className='**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex'>
          <TabsTrigger value='potreros'>
            Potreros <Badge variant='secondary'>5</Badge>
          </TabsTrigger>
          <TabsTrigger value='ganado'>
            Ganado <Badge variant='secondary'>3</Badge>
          </TabsTrigger>
          <TabsTrigger value='informes'>Informes</TabsTrigger>
        </TabsList>
        <div className='flex items-center gap-2'></div>
      </div>
      <TabsContent value='potreros'>
        <Paddocks />
      </TabsContent>
      <TabsContent value='ganado' className='flex flex-col px-4 lg:px-6'>
        <div className='aspect-video w-full flex-1 rounded-lg border border-dashed flex items-center justify-center text-muted-foreground'>
          Información de grupos de ganado en desarrollo
        </div>
      </TabsContent>
      <TabsContent value='informes' className='flex flex-col px-4 lg:px-6'>
        <div className='aspect-video w-full flex-1 rounded-lg border border-dashed flex items-center justify-center text-muted-foreground'>
          Informes y documentos en desarrollo
        </div>
      </TabsContent>
    </Tabs>
  );
}

export default DataTabs;
