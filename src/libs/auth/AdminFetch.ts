'use client';

import { signOut } from '@/libs/auth/AuthClient';

/**
 * Fetch wrapper for admin/dashboard API calls. Signs the user out and
 * redirects to sign-in when the session has expired or is otherwise invalid,
 * instead of silently leaving the caller with an unhandled 401.
 * @param input Request URL or Request object, same as `fetch`.
 * @param init Request options, same as `fetch`.
 * @returns The underlying fetch `Response`.
 */
export async function adminFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const response = await fetch(input, init);

  if (response.status === 401) {
    await signOut();
    window.location.href = '/sign-in';
  }

  return response;
}
