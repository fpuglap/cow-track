// types/next-auth.d.ts
import 'next-auth';
import { DefaultSession, DefaultJWT } from 'next-auth';

// Extend the session interface
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    name: string;
    email: string;
    // Do not include password in the Session type
    // password: string;
  }
}

// Extend the JWT interface
declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
  }
}
