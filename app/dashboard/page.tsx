import { Summary } from '@/components/summary';
import { fetchRotations } from '../lib/data';
import { DataTable } from './components/data-table';
import DataTabs from './components/data-tabs';
import { SummaryStats } from '@/lib/definitions';
import { paddockData } from '../lib/placeholder-data';

export default async function Page() {
  const rotations = await fetchRotations();

  const sortedRotations = rotations.sort((a, b) => {
    if (!a.created_at || !b.created_at) return 0;
    return b.created_at.localeCompare(a.created_at);
  });

  const mappedRotations = sortedRotations.map((rotation) => ({
    id: rotation.id,
    group: rotation.cattle_group,
    origin: rotation.origin_pasture,
    destination: rotation.destination_pasture,
    days: rotation.days_in_pasture,
    notes: rotation.observations || '',
    date: rotation.rotation_date,
  }));

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

  return (
    <div className='@container/main flex flex-1 flex-col gap-2'>
      <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
        <Summary stats={stats} />
        <DataTable data={mappedRotations} />
        <DataTabs />
      </div>
    </div>
  );
}
