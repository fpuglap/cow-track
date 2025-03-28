'use server';

import { signIn, signOut } from '@/auth';
import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { createRotation } from './data';

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
  cattle_group: z.string().min(1, 'El grupo de ganado es requerido'),
  origin_pasture: z.string().min(1, 'El potrero de origen es requerido'),
  destination_pasture: z.string().min(1, 'El potrero de destino es requerido'),
  rotation_date: z.string().optional(),
  days_in_pasture: z.coerce
    .number()
    .int()
    .min(0, 'Los días deben ser un número positivo'),
  observations: z.string().optional(),
  urgent: z.boolean().default(false),
});

// Type for rotation form errors
export type RotationFormState = {
  errors?: {
    cattle_group?: string[];
    origin_pasture?: string[];
    destination_pasture?: string[];
    days_in_pasture?: string[];
    observations?: string[];
    urgent?: string[];
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
    urgent:
      formData.get('urgent') === 'on' || formData.get('urgent') === 'true',
  });

  // Return validation errors if any
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan campos requeridos. No se pudo crear la rotación.',
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
    urgent,
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
      urgent,
    });

    // Only revalidate the dashboard to refresh the data
    revalidatePath('/dashboard');

    // Return success state instead of redirecting
    return {
      message: 'Rotación creada exitosamente.',
      success: true,
    };
  } catch (error) {
    return {
      message: 'Error de base de datos: No se pudo crear la rotación.',
      success: false,
    };
  }
}
