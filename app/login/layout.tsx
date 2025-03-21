import './theme.module.css';
import { ModeToggle } from '../dashboard/components/mode-toggle';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='relative'>
      <div className='absolute top-4 right-4 z-50'>
        <ModeToggle />
      </div>
      <main>{children}</main>
    </div>
  );
}
