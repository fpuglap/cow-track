import { fetchRotations } from '../lib/data';
import { ChartAreaInteractive } from './components/chart-area-interactive';
import { DataTable } from './components/data-table';
import { SectionCards } from './components/section-cards';

export default async function Page() {
  const rotations = await fetchRotations();

  const mappedRotations = rotations.map((rotation) => ({
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
        <SectionCards />
        <div className='px-4 lg:px-6'>
          <ChartAreaInteractive />
        </div>
        <DataTable data={mappedRotations} />
      </div>
    </div>
  );
}
