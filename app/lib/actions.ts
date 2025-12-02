'use server';

import { signIn, signOut } from '@/auth';
import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { createRotation, updateRotation } from './data';

/**
 * Server action for user authentication
 */
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', formData);

    // If successful, redirect to dashboard
    redirect('/dashboard');
  } catch (error) {
    // Check if it's a credentials error
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

/**
 * Server action for signing out
 */
export async function logout() {
  await signOut({ redirectTo: '/login' });
}

// Validation schema for rotations
const RotationSchema = z.object({
  cattle_group: z.string().min(1, 'Cattle group is required'),
  origin_pasture: z.string().min(1, 'Origin paddock is required'),
  destination_pasture: z.string().min(1, 'Destination paddock is required'),
  rotation_date: z.string().optional(),
  days_in_pasture: z.coerce
    .number()
    .int()
    .min(0, 'Days must be a positive number'),
  observations: z.string().optional(),
});

// Type for rotation form errors
export type RotationFormState = {
  errors?: {
    cattle_group?: string[];
    origin_pasture?: string[];
    destination_pasture?: string[];
    days_in_pasture?: string[];
    observations?: string[];
  };
  message?: string | null;
  success?: boolean;
};

/**
 * Server action to create a rotation
 */
export async function createRotationAction(
  prevState: RotationFormState,
  formData: FormData
) {
  // Validate form data
  const validatedFields = RotationSchema.safeParse({
    cattle_group: formData.get('cattle_group'),
    origin_pasture: formData.get('origin_pasture'),
    destination_pasture: formData.get('destination_pasture'),
    days_in_pasture: formData.get('days_in_pasture'),
    observations: formData.get('observations'),
  });

  // Return validation errors if any
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing required fields. Could not create rotation.',
      success: false,
    };
  }

  // Extract validated data
  const {
    cattle_group,
    origin_pasture,
    destination_pasture,
    days_in_pasture,
    observations,
  } = validatedFields.data;

  // Generate current date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  try {
    // Create rotation in database with today's date
    await createRotation({
      cattle_group,
      origin_pasture,
      destination_pasture,
      rotation_date: today,
      days_in_pasture,
      observations: observations || '',
    });

    // Only revalidate the dashboard to refresh the data
    revalidatePath('/dashboard');

    // Return success state instead of redirecting
    return {
      message: 'Rotation created successfully.',
      success: true,
    };
  } catch (error) {
    console.error('Error creating rotation:', error);
    return {
      message: 'Database error: Could not create rotation.',
      success: false,
    };
  }
}

/**
 * Server action to update a rotation
 */
export async function updateRotationAction(
  prevState: RotationFormState,
  formData: FormData
) {
  // Create a schema that includes the ID for update
  const UpdateRotationSchema = RotationSchema.extend({
    id: z.string().min(1, 'ID is required for update'),
  });

  // Validate form data
  const validatedFields = UpdateRotationSchema.safeParse({
    id: formData.get('id'),
    cattle_group: formData.get('cattle_group'),
    origin_pasture: formData.get('origin_pasture'),
    destination_pasture: formData.get('destination_pasture'),
    days_in_pasture: formData.get('days_in_pasture'),
    observations: formData.get('observations'),
    rotation_date: formData.get('rotation_date'),
  });

  // Return validation errors if any
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing required fields. Could not update rotation.',
      success: false,
    };
  }

  // Extract validated data
  const {
    id,
    cattle_group,
    origin_pasture,
    destination_pasture,
    days_in_pasture,
    observations,
    rotation_date,
  } = validatedFields.data;

  try {
    // Update rotation in database
    await updateRotation({
      id,
      cattle_group,
      origin_pasture,
      destination_pasture,
      rotation_date: rotation_date || '', // Pass the existing date
      days_in_pasture,
      observations: observations || '',
    });

    // Revalidate the dashboard to refresh the data
    revalidatePath('/dashboard');

    // Return success state
    return {
      message: 'Rotation updated successfully.',
      success: true,
    };
  } catch (error) {
    console.error('Error updating rotation:', error);
    return {
      message: 'Database error: Could not update rotation.',
      success: false,
    };
  }
}
