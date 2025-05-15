import { getToken } from "next-auth/jwt";
import withAuth from "next-auth/middleware";
import { NextResponse, NextRequest } from "next/server";

export default withAuth(
  async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const isAuth = await getToken({ req: request });
    const protectedRoutes = ["/profile"];

    const isAuthRoute = pathname.startsWith("/auth");
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );

    // If the user is not authenticated and tries to access a protected route
    if (!isAuth && isProtectedRoute) {
      console.log("Redirecting to registration:", request.url);
      return NextResponse.redirect(new URL("/auth/register", request.url));
    }

    // If the user is authenticated and tries to access an auth route
    if (isAuthRoute && isAuth) {
      console.log("Redirecting to profile:", request.url);
      return NextResponse.redirect(new URL("/profile", request.url));
    }

    // Allow access to other routes
    return NextResponse.next();
  },
  {
    callbacks: {
      async authorized() {
        return true; // You can add more complex logic here if needed
      },
    },
  }
);

// Define the routes that the middleware will apply to
export const config = {
  matcher: ["/profile/:path*", "/auth/:path*"],
};
