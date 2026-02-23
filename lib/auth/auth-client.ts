// this file is for client-side authentication logic,
// such as hooks and functions to interact with the auth system.

import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  
});

export const { useSession, signIn, signUp, signOut } = authClient;
