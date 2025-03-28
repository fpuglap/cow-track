'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { createRotationAction } from '@/app/lib/actions';

// Lista de grupos de ganado disponibles
const cattleGroups = [
  'Vacas Cría 1',
  'Vacas Cría 2',
  'Novillos A',
  'Novillos B',
  'Terneros 2022',
  'Terneros 2023',
  'Vaquillos',
  'Vaquillos Jóvenes',
  'Vacas Lecheras',
  'Toros',
];

// Lista de potreros disponibles
const paddocks = [
  'Potrero Norte',
  'Potrero Sur',
  'Potrero Este',
  'Potrero Oeste',
  'Potrero Central',
];

const RotationFormSchema = z.object({
  cattle_group: z.string({
    required_error: 'El grupo de ganado es requerido',
  }),
  origin_pasture: z.string({
    required_error: 'El potrero de origen es requerido',
  }),
  destination_pasture: z.string({
    required_error: 'El potrero de destino es requerido',
  }),
  days_in_pasture: z.coerce
    .number()
    .int()
    .min(0, 'Los días deben ser un número positivo'),
  observations: z.string().optional(),
  urgent: z.boolean().default(false),
});

export function RotationForm() {
  const form = useForm<z.infer<typeof RotationFormSchema>>({
    resolver: zodResolver(RotationFormSchema),
    defaultValues: {
      cattle_group: '',
      origin_pasture: '',
      destination_pasture: '',
      days_in_pasture: 0,
      observations: '',
      urgent: false,
    },
  });

  async function onSubmit(data: z.infer<typeof RotationFormSchema>) {
    // Convertir a FormData para usar con server actions
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    try {
      // Llamar a la server action
      const result = await createRotationAction({}, formData);

      if (result?.success) {
        toast('Rotación registrada', {
          description: 'La rotación ha sido registrada exitosamente.',
        });
        // Resetear el formulario
        form.reset();
      } else if (result?.message) {
        toast('Error', {
          description: result.message,
        });
      }
    } catch (error) {
      toast('Error', {
        description: 'Ocurrió un error al registrar la rotación.',
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='grid w-full gap-6'
      >
        <FormField
          control={form.control}
          name='cattle_group'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grupo de ganado</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Seleccionar grupo de ganado' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {cattleGroups.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Selecciona el grupo de ganado que será rotado.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='origin_pasture'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Potrero origen</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Seleccionar potrero origen' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {paddocks.map((paddock) => (
                    <SelectItem key={paddock} value={paddock}>
                      {paddock}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Potrero donde se encuentra actualmente el ganado.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='destination_pasture'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Potrero destino</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Seleccionar potrero destino' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {paddocks.map((paddock) => (
                    <SelectItem key={paddock} value={paddock}>
                      {paddock}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Potrero hacia donde será trasladado el ganado.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='days_in_pasture'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Días en potrero</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  min='0'
                  {...field}
                  onChange={(e) =>
                    field.onChange(parseInt(e.target.value) || 0)
                  }
                />
              </FormControl>
              <FormDescription>
                Cantidad de días que el ganado estuvo en el potrero de origen.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='observations'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observaciones</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Notas adicionales sobre la rotación'
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Información adicional relevante sobre esta rotación.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='urgent'
          render={({ field }) => (
            <FormItem className='flex flex-row items-start gap-3 rounded-md border p-4 shadow-xs'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className='flex flex-col gap-1'>
                <FormLabel className='leading-snug'>
                  Marcar como urgente
                </FormLabel>
                <FormDescription className='leading-snug'>
                  Indica que esta rotación debe realizarse con prioridad.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <Button type='submit'>Registrar Rotación</Button>
      </form>
    </Form>
  );
}
