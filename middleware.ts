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
        // https://supabase.com/docs/guides/auth/server-side/nextjs
        const {
            data: { user },
        } = await supabase.auth.getUser()

        // Protected routes
        const protectedPaths = ['/dashboard', '/settings', '/analytics', '/campaigns', '/audience', '/subscription', '/report']
        const isProtected = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))

        if (isProtected && !user) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        if (request.nextUrl.pathname === '/login' && user) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    } catch (e) {
        // If you are here, a Supabase client could not be created!
        // This is likely because the environment variables are not set.
        // We should allow the request to proceed to avoid breaking the app completely,
        // but protected routes won't work as expected.
        console.error("Middleware error:", e);
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
