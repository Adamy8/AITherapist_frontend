// middleware to add ngrok-skip-browser-warning header to all requests to /api/* and /auth/*

// (Edge runtime)
import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  const response = NextResponse.next();

  // Setting custom header for specific routes
  if (request.url.includes('/api/') || request.url.includes('/auth/')) {
    response.headers.set('ngrok-skip-browser-warning', 'true');
  }

  return response;
}

export const config = {
  matcher: ['/api/*', '/auth/*'],
};

