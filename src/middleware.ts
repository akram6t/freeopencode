import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { route_admin, route_auth } from "./routes";

export async function middleware(req: NextRequest) {
    // const token = null;
    // const role = '';
    const url = req.nextUrl.clone();
    const pathname = url.pathname;

    if (route_auth.some(route => pathname.startsWith(`/${route}`))) {
        // check if token or not.
        // url.pathname = "/auth/signin";
        // return NextResponse.redirect(url);
    }

    if (route_admin.some(route => pathname.startsWith(`/${route}`))) {
        // check token and role is admin
    }


    // // Redirect to login if no token
    // if (!token) {
    //     url.pathname = "/auth/signin";
    //     return NextResponse.redirect(url);
    // }

    // Role-based route protection
    // const roleRequiredRoutes = {
    //     "/admin": "admin", // Only "admin" role can access "/admin"
    //     "/user": "user",   // Only "user" role can access "/user"
    // };

    // const pathname = req.nextUrl.pathname;
    // const requiredRole = Object.keys(roleRequiredRoutes).find((route) =>
    //     pathname.startsWith(route)
    // );

    // if (requiredRole && token.role !== roleRequiredRoutes[requiredRole]) {
    //     // Redirect unauthorized users
    //     url.pathname = "/unauthorized"; // Replace with your unauthorized page
    //     return NextResponse.redirect(url);
    // }

    return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
    matcher: ["/admin/:path*", "/login", "/sinup" ] // Protect routes under /admin and /user
};