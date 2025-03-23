'use server';

import { signIn, signOut } from '@/auth';
import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';

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
