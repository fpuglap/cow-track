// auth.ts with fixed types
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

// Type for user from database
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

// Function to get a user from the database
async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        // Validate credentials using Zod
        const parsedCredentials = z
          .object({
            email: z.string().email('Invalid email'),
            password: z
              .string()
              .min(6, 'Password must be at least 6 characters'),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);

          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        console.log('Invalid credentials');
        return null;
      },
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
    }),
  ],
  // Configure session handling
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // Additional callbacks for customizing JWT and session handling
  callbacks: {
    // Add custom information to the JWT token
    async jwt({ token, user }) {
      // TypeScript is complaining because it doesn't know user has an id
      // We need to explicitly cast or check if the property exists
      if (user && 'id' in user) {
        token.id = user.id;
        // You can add additional user properties here
      }
      return token;
    },
    // Customize the session object available to the client
    async session({ session, token }) {
      if (token && session.user) {
        // TypeScript is complaining because it doesn't know token has an id
        // We need to explicitly check if the property exists
        if ('id' in token) {
          session.user.id = token.id as string;
        }
        // Extend the session with additional properties if needed
      }
      return session;
    },
  },
});
