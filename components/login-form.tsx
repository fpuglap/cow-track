'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';
import { useActionState } from 'react';

// Define the prop types for the LoginForm component
type LoginFormProps = React.HTMLAttributes<HTMLDivElement>;

export function LoginForm({ className, ...props }: LoginFormProps) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  // Pre-fill demo credentials for easy access
  const defaultEmail = 'admin@cowrporation.com';
  const defaultPassword = 'Demo_P4ssw0rd!';

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className='overflow-hidden py-0'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <form className='p-6 md:p-8' action={formAction}>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col items-center text-center'>
                <h1 className='text-2xl font-bold'>Welcome back</h1>
                <p className='text-balance text-muted-foreground'>
                  Sign in to your Cow Track account
                </p>
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='email@example.com'
                  defaultValue={defaultEmail}
                  required
                />
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Password</Label>
                  <a
                    href='#'
                    className='ml-auto text-sm underline-offset-2 hover:underline'
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  defaultValue={defaultPassword}
                  required
                />
              </div>

              {/* Show error message if authentication fails */}
              {errorMessage === 'Invalid credentials.' && (
                <div className='text-red-500 text-sm'>
                  Invalid credentials. Please check your email and password.
                </div>
              )}

              <input type='hidden' name='redirectTo' value={callbackUrl} />
              <Button
                type='submit'
                className='w-full cursor-pointer'
                disabled={isPending}
              >
                {isPending ? 'Signing in...' : 'Sign in'}
              </Button>

              <div className='text-center text-sm'>
                Don&apos;t have an account?{' '}
                <a href='#' className='underline underline-offset-4'>
                  Sign up
                </a>
              </div>
            </div>
          </form>
          <div className='relative block w-full overflow-hidden h-96 sm:h-[450px] lg:h-[600px]'>
            <Image
              className='absolute inset-0 h-full w-full object-cover'
              src='https://images.unsplash.com/photo-1583364428520-fa6c5013c0c3?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              alt='Login image'
              width={500}
              height={500}
              decoding='async'
              priority
              style={{ color: 'transparent' }}
            />
          </div>
        </CardContent>
      </Card>
      <div className='text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary'>
        By clicking continue, you agree to our{' '}
        <a href='#'>Terms of Service</a> and{' '}
        <a href='#'>Privacy Policy</a>.
      </div>
    </div>
  );
}
