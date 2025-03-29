import { updateRotationAction } from '@/app/lib/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { DrawerFooter, DrawerClose } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cattleGroups, paddocks } from '@/app/lib/constants';
import { useIsMobile } from '@/hooks/use-mobile';
import { RotationItem } from '@/lib/definitions';

const UpdateRotationSchema = z.object({
  id: z.string(),
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
  rotation_date: z.string().optional(),
});

export function UpdateRotationForm({
  item,
  onSuccess,
}: {
  item: RotationItem;
  onSuccess?: () => void;
}) {
  const isMobile = useIsMobile();

  const form = useForm<z.infer<typeof UpdateRotationSchema>>({
    resolver: zodResolver(UpdateRotationSchema),
    defaultValues: {
      id: item.id,
      cattle_group: item.group,
      origin_pasture: item.origin,
      destination_pasture: item.destination,
      days_in_pasture: item.days,
      observations: item.notes || '',
      rotation_date: item.date,
    },
  });

  async function onSubmit(data: z.infer<typeof UpdateRotationSchema>) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    try {
      const result = await updateRotationAction({}, formData);

      if (result?.success) {
        toast('Rotación actualizada', {
          description: 'La rotación ha sido actualizada exitosamente.',
        });
        if (onSuccess) {
          onSuccess();
        }
      } else if (result?.message) {
        toast('Error', {
          description: result.message,
        });
      }
    } catch (error) {
      console.error('Error al actualizar la rotación:', error);
      toast('Error', {
        description: 'Ocurrió un error al actualizar la rotación.',
      });
    }
  }

  return (
    <Form {...form}>
      <div className='px-4 text-sm overflow-y-auto py-4'>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-4'
        >
          <div className='flex flex-col gap-3'>
            <FormLabel className='mb-1.5'>Grupo de Ganado</FormLabel>
            <FormField
              control={form.control}
              name='cattle_group'
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className='w-full'>
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
              )}
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-3'>
              <FormField
                control={form.control}
                name='origin_pasture'
                render={({ field }) => (
                  <FormItem className='space-y-0'>
                    <FormLabel className='mb-1.5'>Potrero Origen</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className='w-full'>
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
                    <FormMessage className='pt-1 text-xs' />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex flex-col gap-3'>
              <FormField
                control={form.control}
                name='destination_pasture'
                render={({ field }) => (
                  <FormItem className='space-y-0'>
                    <FormLabel className='mb-1.5'>Potrero Destino</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className='w-full'>
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
                    <FormMessage className='pt-1 text-xs' />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-3'>
              <FormField
                control={form.control}
                name='rotation_date'
                render={({ field }) => (
                  <FormItem className='space-y-0'>
                    <FormLabel className='mb-1.5'>Fecha</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        readOnly
                        className='text-gray-600 dark:text-gray-300 cursor-not-allowed'
                      />
                    </FormControl>
                    <FormMessage className='pt-1 text-xs' />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex flex-col gap-3'>
              <FormField
                control={form.control}
                name='days_in_pasture'
                render={({ field }) => (
                  <FormItem className='space-y-0'>
                    <FormLabel className='mb-1.5'>Días en Potrero</FormLabel>
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
                    <FormMessage className='pt-1 text-xs' />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name='observations'
            render={({ field }) => (
              <FormItem className='space-y-0'>
                <FormLabel className='mb-1.5'>Observaciones</FormLabel>
                <FormControl>
                  {isMobile ? (
                    <Input
                      {...field}
                      placeholder='Notas adicionales sobre la rotación'
                    />
                  ) : (
                    <Textarea
                      {...field}
                      placeholder='Notas adicionales sobre la rotación'
                      className='resize-none max-h-40 overflow-y-auto'
                    />
                  )}
                </FormControl>
                <FormMessage className='pt-1 text-xs' />
              </FormItem>
            )}
          />
        </form>
      </div>
      <DrawerFooter>
        <Button onClick={form.handleSubmit(onSubmit)}>Guardar</Button>
        <DrawerClose asChild>
          <Button variant='outline'>Cerrar</Button>
        </DrawerClose>
      </DrawerFooter>
    </Form>
  );
}
