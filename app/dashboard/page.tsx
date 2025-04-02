import { fetchRotations } from '../lib/data';
import { ChartAreaInteractive } from './components/chart-area-interactive';
import { DataTable } from './components/data-table';
import DataTabs from './components/data-tabs';
import { SectionCards } from './components/section-cards';

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

  return (
    <div className='@container/main flex flex-1 flex-col gap-2'>
      <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
        <DataTable data={mappedRotations} />
        <DataTabs />
      </div>
    </div>
  );
}
