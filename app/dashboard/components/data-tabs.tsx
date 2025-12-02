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
      defaultValue='paddocks'
      className='w-full flex-col justify-start gap-6'
    >
      <div className='flex items-center justify-between px-4 lg:px-6'>
        <Label htmlFor='view-selector' className='sr-only'>
          View
        </Label>
        <Select defaultValue='paddocks'>
          <SelectTrigger
            className='flex w-fit @4xl/main:hidden'
            size='sm'
            id='view-selector'
          >
            <SelectValue placeholder='Select view' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='paddocks'>Paddocks</SelectItem>
            <SelectItem value='cattle'>Cattle</SelectItem>
            <SelectItem value='reports'>Reports</SelectItem>
          </SelectContent>
        </Select>
        <TabsList className='**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex'>
          <TabsTrigger value='paddocks'>
            Paddocks <Badge variant='secondary'>5</Badge>
          </TabsTrigger>
          <TabsTrigger value='cattle'>
            Cattle <Badge variant='secondary'>3</Badge>
          </TabsTrigger>
          <TabsTrigger value='reports'>Reports</TabsTrigger>
        </TabsList>
        <div className='flex items-center gap-2'></div>
      </div>
      <TabsContent value='paddocks'>
        <Paddocks />
      </TabsContent>
      <TabsContent value='cattle' className='flex flex-col px-4 lg:px-6'>
        <div className='aspect-video w-full flex-1 rounded-lg border border-dashed flex items-center justify-center text-muted-foreground'>
          Cattle group management coming soon
        </div>
      </TabsContent>
      <TabsContent value='reports' className='flex flex-col px-4 lg:px-6'>
        <div className='aspect-video w-full flex-1 rounded-lg border border-dashed flex items-center justify-center text-muted-foreground'>
          Reports and documents coming soon
        </div>
      </TabsContent>
    </Tabs>
  );
}

export default DataTabs;
