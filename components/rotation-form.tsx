'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
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
import { cattleGroups, paddocks } from '@/app/lib/constants';

const RotationFormSchema = z.object({
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
});

const defaultValues = {
  cattle_group: '',
  origin_pasture: '',
  destination_pasture: '',
  days_in_pasture: 0,
  observations: '',
};

export function RotationForm({ onSuccess }: { onSuccess?: () => void }) {
  const form = useForm<z.infer<typeof RotationFormSchema>>({
    resolver: zodResolver(RotationFormSchema),
    defaultValues,
  });

  async function onSubmit(data: z.infer<typeof RotationFormSchema>) {
    // Convert data to FormData to use it with server actions
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    try {
      const result = await createRotationAction({}, formData);

      if (result?.success) {
        toast('Rotation registered', {
          description: 'The rotation has been registered successfully.',
        });
        form.reset();
        if (onSuccess) {
          onSuccess();
        }
      } else if (result?.message) {
        toast('Error', {
          description: result.message,
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast('Error', {
        description: 'An error occurred while registering the rotation.',
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
              <FormLabel>Cattle Group</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
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
              <FormDescription>
                Select the cattle group to be rotated.
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
              <FormLabel>Origin Paddock</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
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
              <FormDescription>
                Paddock where the cattle is currently located.
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
              <FormLabel>Destination Paddock</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
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
              <FormDescription>
                Paddock where the cattle will be moved to.
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
              <FormLabel>Days in Paddock</FormLabel>
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
                Number of days the cattle spent in the origin paddock.
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
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Additional notes about the rotation'
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Additional relevant information about this rotation.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>Add Rotation</Button>
      </form>
    </Form>
  );
}
