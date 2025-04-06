'use client';

import { useThemeConfig } from '@/components/theme/active-theme';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const DEFAULT_THEMES = [
  {
    name: 'Base',
    value: 'default',
  },
  {
    name: 'Azul',
    value: 'blue',
  },
  {
    name: 'Verde',
    value: 'green',
  },
  {
    name: 'Ámbar',
    value: 'amber',
  },
];

const SCALED_THEMES = [
  {
    name: 'Base',
    value: 'default-scaled',
  },
  {
    name: 'Azul',
    value: 'blue-scaled',
  },
];

const MONO_THEMES = [
  {
    name: 'Mono',
    value: 'mono-scaled',
  },
];

export function ThemeSelector() {
  const { activeTheme, setActiveTheme } = useThemeConfig();

  return (
    <div className='flex items-center gap-2'>
      <Label htmlFor='theme-selector' className='sr-only'>
        Tema
      </Label>
      <Select value={activeTheme} onValueChange={setActiveTheme}>
        <SelectTrigger
          id='theme-selector'
          size='sm'
          className='justify-start *:data-[slot=select-value]:w-12'
        >
          <span className='text-muted-foreground hidden sm:block'>Tema:</span>
          <span className='text-muted-foreground block sm:hidden'>Tema</span>
          <SelectValue placeholder='Seleccionar tema' />
        </SelectTrigger>
        <SelectContent align='end'>
          <SelectGroup>
            <SelectLabel>Base</SelectLabel>
            {DEFAULT_THEMES.map((theme) => (
              <SelectItem key={theme.name} value={theme.value}>
                {theme.name}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Escalado</SelectLabel>
            {SCALED_THEMES.map((theme) => (
              <SelectItem key={theme.name} value={theme.value}>
                {theme.name}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Mono</SelectLabel>
            {MONO_THEMES.map((theme) => (
              <SelectItem key={theme.name} value={theme.value}>
                {theme.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
