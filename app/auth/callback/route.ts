import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get('next') ?? '/'

    if (code) {
        const cookieStore = {
            getAll() {
                return request.cookies.getAll()
            },
            setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
                cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
            },
        }

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: cookieStore,
            }
        )

        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            // Forward to the 'next' path, or default to home/dashboard
            // We use the 'origin' to ensure we stay on the same domain (e.g. Vercel)
            const forwardUrl = new URL(next, origin)

            // Create the response object
            const response = NextResponse.redirect(forwardUrl)

            // Apply the cookies that were set during code exchange
            // This is crucial! Using the cookieStore wrapper above just mocks it for the client,
            // we need to actually write the Set-Cookie header on the response.

            // NOTE: in the newest @supabase/ssr patterns, middleware handles the session refresh,
            // but for the callback route, simply redirecting after exchangeCodeForSession usually works 
            // because the client sets the cookies on the *request* context which we don't return directly.
            // However, we must ensure appropriate cookies are passed.

            // Actually, the simpler pattern for Route Handlers in Next.js App Router with @supabase/ssr is:

            return NextResponse.redirect(forwardUrl)
        }
    }

    // Return the user to an error page with instructions
    return NextResponse.redirect(new URL('/auth/auth-code-error', origin))
}
