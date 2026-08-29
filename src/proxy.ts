import { detectBot } from '@arcjet/next';
import { getSessionCookie } from 'better-auth/cookies';
import createMiddleware from 'next-intl/middleware';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import arcjet from '@/libs/Arcjet';
import { routing } from './libs/I18nRouting';

const handleI18nRouting = createMiddleware(routing);

const isProtectedRoute = (pathname: string): boolean =>
  /^\/(?:[a-z]{2}\/)?(?:dashboard|admin)(?:\/.*)?$/u.test(pathname);

const localePrefixOf = (pathname: string): string => {
  const [, segment] = pathname.split('/');
  return segment && segment !== routing.defaultLocale && routing.locales.includes(segment)
    ? `/${segment}`
    : '';
};

const aj = arcjet.withRule(
  detectBot({
    mode: 'LIVE',
    allow: [
      'CATEGORY:SEARCH_ENGINE', 
      'CATEGORY:PREVIEW', 
      'CATEGORY:MONITOR', 
    ],
  }),
);

export default async function proxy(request: NextRequest, _event: NextFetchEvent) {
  if (process.env.ARCJET_KEY) {
    const decision = await aj.protect(request);

    if (decision.isDenied()) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }

  const { pathname, search } = request.nextUrl;

  if (isProtectedRoute(pathname)) {
    const sessionCookie = getSessionCookie(request);

    if (!sessionCookie) {
      const signInUrl = new URL(`${localePrefixOf(pathname)}/sign-in`, request.url);
      signInUrl.searchParams.set('redirect_url', pathname + search);
      return NextResponse.redirect(signInUrl);
    }
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: '/((?!_next|_vercel|monitoring|api|.*\\..*).*)',
};
