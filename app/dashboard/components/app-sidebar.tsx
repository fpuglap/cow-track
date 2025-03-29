'use client';

import CowImage from 'public/avatars/cow-track-avatar.png';

import * as React from 'react';
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from '@tabler/icons-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { NavTools } from '@/app/dashboard/components/nav-tools';
import { NavMain } from '@/app/dashboard/components/nav-main';
import { NavSecondary } from '@/app/dashboard/components/nav-secondary';
import { NavUser } from '@/app/dashboard/components/nav-user';

const data = {
  user: {
    name: 'La Esmeralda',
    email: 'esmeralda@admin.com',
    avatar: CowImage.src,
  },
  navMain: [
    {
      title: 'Panel',
      url: '#',
      icon: IconDashboard,
    },
    {
      title: 'Rotaciones',
      url: '#',
      icon: IconListDetails,
    },
    {
      title: 'Análisis',
      url: '#',
      icon: IconChartBar,
    },
    {
      title: 'Potreros',
      url: '#',
      icon: IconFolder,
    },
    {
      title: 'Ganado',
      url: '#',
      icon: IconUsers,
    },
  ],
  navClouds: [
    {
      title: 'Capture',
      icon: IconCamera,
      isActive: true,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Proposal',
      icon: IconFileDescription,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Prompts',
      icon: IconFileAi,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Configuración',
      url: '#',
      icon: IconSettings,
    },
    {
      title: 'Ayuda',
      url: '#',
      icon: IconHelp,
    },
    {
      title: 'Búsqueda',
      url: '#',
      icon: IconSearch,
    },
  ],
  tools: [
    {
      name: 'Alertas',
      url: '#',
      icon: IconDatabase,
    },
    {
      name: 'Calendario',
      url: '#',
      icon: IconReport,
    },
    {
      name: 'Informes',
      url: '#',
      icon: IconFileWord,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='offcanvas' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className='data-[slot=sidebar-menu-button]:!p-1.5'
            >
              <a href='#'>
                <IconInnerShadowTop className='!size-5' />
                <span className='text-base font-semibold'>Cow Track</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavTools items={data.tools} />
        <NavSecondary items={data.navSecondary} className='mt-auto' />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
