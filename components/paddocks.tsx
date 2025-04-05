import { ReactNode, useState } from 'react';
import {
  IconTrendingDown,
  IconTrendingUp,
  IconPlant,
  IconClock,
  IconHorseshoe,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from '@tabler/icons-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Paddock } from '@/lib/definitions';
import { paddockData } from '@/app/lib/placeholder-data';

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

// Main component for visualizing paddocks with pagination
export function PaddockCards() {
  const [activeTab, setActiveTab] = useState('A');

  // Estado de paginación
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 4, // Tamaño predeterminado menor para que se vea la paginación
  });

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

  // Cálculos de paginación para el sector activo
  const paddocksInActiveTab = paddockData[activeTab] || [];
  const pageCount = Math.ceil(paddocksInActiveTab.length / pagination.pageSize);
  const startIndex = pagination.pageIndex * pagination.pageSize;
  const endIndex = startIndex + pagination.pageSize;
  const currentPageData = paddocksInActiveTab.slice(startIndex, endIndex);

  // Funciones de navegación
  const canPreviousPage = pagination.pageIndex > 0;
  const canNextPage = pagination.pageIndex < pageCount - 1;

  const previousPage = () => {
    if (canPreviousPage) {
      setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex - 1 }));
    }
  };

  const nextPage = () => {
    if (canNextPage) {
      setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex + 1 }));
    }
  };

  const setPageSize = (newSize: string) => {
    setPagination((prev) => ({
      pageIndex: 0, // Reiniciar a la primera página cuando se cambia el tamaño
      pageSize: parseInt(newSize, 10),
    }));
  };

  const setPageIndex = (index: number) => {
    setPagination((prev) => ({ ...prev, pageIndex: index }));
  };

  // Restablecer la paginación al cambiar de pestaña
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setPagination((prev) => ({ ...prev, pageIndex: 0 })); // Volver a la primera página
  };

  return (
    <div className='flex flex-col gap-4'>
      <Tabs
        defaultValue={activeTab}
        onValueChange={handleTabChange}
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
              {currentPageData.map((paddock) => (
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

            {/* Paginación */}
            <div className='flex items-center justify-between px-4 mt-4 mb-2'>
              <div className='text-muted-foreground hidden flex-1 text-sm lg:flex'>
                {pagination.pageIndex * pagination.pageSize + 1} a{' '}
                {Math.min(
                  (pagination.pageIndex + 1) * pagination.pageSize,
                  paddocksInActiveTab.length
                )}{' '}
                de {paddocksInActiveTab.length} potreros
              </div>
              <div className='flex w-full items-center gap-8 lg:w-fit'>
                <div className='hidden items-center gap-2 lg:flex'>
                  <Label
                    htmlFor='items-per-page'
                    className='text-sm font-medium'
                  >
                    Potreros por página
                  </Label>
                  <Select
                    value={`${pagination.pageSize}`}
                    onValueChange={setPageSize}
                  >
                    <SelectTrigger
                      size='sm'
                      className='w-20'
                      id='items-per-page'
                    >
                      <SelectValue placeholder={pagination.pageSize} />
                    </SelectTrigger>
                    <SelectContent side='top'>
                      {[4, 6, 8, 12, 16].map((pageSize) => (
                        <SelectItem key={pageSize} value={`${pageSize}`}>
                          {pageSize}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className='flex w-fit items-center justify-center text-sm font-medium'>
                  Página {pagination.pageIndex + 1} de {pageCount || 1}
                </div>
                <div className='ml-auto flex items-center gap-2 lg:ml-0'>
                  <Button
                    variant='outline'
                    className='hidden h-8 w-8 p-0 lg:flex'
                    onClick={() => setPageIndex(0)}
                    disabled={!canPreviousPage}
                  >
                    <span className='sr-only'>Ir a la primera página</span>
                    <IconChevronsLeft className='size-4' />
                  </Button>
                  <Button
                    variant='outline'
                    className='size-8'
                    size='icon'
                    onClick={previousPage}
                    disabled={!canPreviousPage}
                  >
                    <span className='sr-only'>Ir a la página anterior</span>
                    <IconChevronLeft className='size-4' />
                  </Button>
                  <Button
                    variant='outline'
                    className='size-8'
                    size='icon'
                    onClick={nextPage}
                    disabled={!canNextPage}
                  >
                    <span className='sr-only'>Ir a la página siguiente</span>
                    <IconChevronRight className='size-4' />
                  </Button>
                  <Button
                    variant='outline'
                    className='hidden size-8 lg:flex'
                    size='icon'
                    onClick={() => setPageIndex(pageCount - 1)}
                    disabled={!canNextPage}
                  >
                    <span className='sr-only'>Ir a la última página</span>
                    <IconChevronsRight className='size-4' />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default function Paddocks() {
  return (
    <div className='@container/main flex flex-1 flex-col gap-4 md:gap-6'>
      <div className='px-4 lg:px-6'>
        <PaddockCards />
      </div>
    </div>
  );
}
