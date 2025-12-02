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
    required_error: 'Cattle group is required',
  }),
  origin_pasture: z.string({
    required_error: 'Origin paddock is required',
  }),
  destination_pasture: z.string({
    required_error: 'Destination paddock is required',
  }),
  days_in_pasture: z.coerce
    .number()
    .int()
    .min(0, 'Days must be a positive number'),
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
        toast('Rotation updated', {
          description: 'The rotation has been updated successfully.',
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
      console.error('Error updating rotation:', error);
      toast('Error', {
        description: 'An error occurred while updating the rotation.',
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
            <FormLabel className='mb-1.5'>Cattle Group</FormLabel>
            <FormField
              control={form.control}
              name='cattle_group'
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select cattle group' />
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
                    <FormLabel className='mb-1.5'>Origin Paddock</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Select origin paddock' />
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
                    <FormLabel className='mb-1.5'>Destination Paddock</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Select destination paddock' />
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
                    <FormLabel className='mb-1.5'>Date</FormLabel>
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
                    <FormLabel className='mb-1.5'>Days in Paddock</FormLabel>
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
                <FormLabel className='mb-1.5'>Notes</FormLabel>
                <FormControl>
                  {isMobile ? (
                    <Input
                      {...field}
                      placeholder='Additional notes about the rotation'
                    />
                  ) : (
                    <Textarea
                      {...field}
                      placeholder='Additional notes about the rotation'
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
        <Button onClick={form.handleSubmit(onSubmit)}>Save</Button>
        <DrawerClose asChild>
          <Button variant='outline'>Close</Button>
        </DrawerClose>
      </DrawerFooter>
    </Form>
  );
}
