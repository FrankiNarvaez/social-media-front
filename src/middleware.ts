import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const protectedRoutes = [ '/chat', '/create', '/other-profile', '/homepage', '/profile/path:*', '/settings'];
    const currentPath = request.nextUrl.pathname;

    if(protectedRoutes.includes(currentPath)) {
        const token = request.cookies.get('token');
        if(!token){
            const loginUrl = new URL('/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/chat', '/create', '/other-profile', '/homepage', '/profile/:path*', '/settings']
}