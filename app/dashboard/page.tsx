import { Summary } from '@/components/summary';
import { fetchRotations, fetchSummaryStats } from '../lib/data';
import { DataTable } from './components/data-table';
import DataTabs from './components/data-tabs';

export default async function Page() {
  // Fetch rotations for the data table
  const rotations = await fetchRotations();

  // Sort rotations by creation date (most recent first)
  const sortedRotations = rotations.sort((a, b) => {
    if (!a.created_at || !b.created_at) return 0;
    return b.created_at.localeCompare(a.created_at);
  });

  // Map rotations to the format expected by the DataTable component
  const mappedRotations = sortedRotations.map((rotation) => ({
    id: rotation.id,
    group: rotation.cattle_group,
    origin: rotation.origin_pasture,
    destination: rotation.destination_pasture,
    days: rotation.days_in_pasture,
    notes: rotation.observations || '',
    date: rotation.rotation_date,
  }));

  // Fetch real summary stats from the database
  const stats = await fetchSummaryStats();

  console.log('Stats:', stats);

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
