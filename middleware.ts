import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    try {
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        return request.cookies.getAll()
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                        response = NextResponse.next({
                            request: {
                                headers: request.headers,
                            },
                        })
                        cookiesToSet.forEach(({ name, value, options }) =>
                            response.cookies.set(name, value, options)
                        )
                    },
                },
            }
        )

        // This will refresh session if expired - required for Server Components
        const {
            data: { user },
        } = await supabase.auth.getUser()

        // 1. EXCLUDE auth callback from protection to prevent loops
        if (request.nextUrl.pathname.startsWith('/auth/callback')) {
            return response
        }

        // Protected routes
        const protectedPaths = ['/dashboard', '/settings', '/analytics', '/campaigns', '/audience', '/subscription', '/report']
        const isProtected = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))

        // 2. Redirect unauthenticated users to login
        if (isProtected && !user) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        // 3. Redirect authenticated users AWAY from login page (but allow if querying for logout?)
        // Actually, simple check: if on /login and user exists -> go to dashboard
        if (request.nextUrl.pathname === '/login' && user) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }

        // 4. Root path handling (Optional: redirect / to /dashboard if logged in, or /login if not?)
        // Leaving root as-is (Marketing page) for now, unless requested.

    } catch (e) {
        // If auth fails, don't loop. Just let the request proceed or redirect to login with error.
        console.error("Middleware error:", e);
        // return NextResponse.redirect(new URL('/login?error=auth_error', request.url))
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
