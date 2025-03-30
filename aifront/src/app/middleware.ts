// middleware to add ngrok-skip-browser-warning header to all requests to /api/* and /auth/*

import { NextResponse } from 'next/server';

export function middleware(request: Request) {
    // Check if the request is targeting the /api/* route
    if (request.url.includes('/api/') || request.url.includes('/auth/')) {
        const response = NextResponse.next();
        
        // Set the custom header for every request to /api/*
        response.headers.set('ngrok-skip-browser-warning', 'true');
        
        return response;
    }

    return NextResponse.next();
}
