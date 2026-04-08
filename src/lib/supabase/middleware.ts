import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Routes that require a regular authenticated user
const PROTECTED_ROUTES = ["/bookmarks"];

// Admin sub-pages that are always reachable once logged in (bypass MFA check)
const ADMIN_AUTH_ONLY = ["/admin/login", "/admin/mfa"];

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return supabaseResponse;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: Array<{ name: string; value: string; options?: CookieOptions }>) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const pathname = request.nextUrl.pathname;

  // ── Admin routes ──────────────────────────────────────────────────────────
  if (pathname.startsWith("/admin")) {
    // Allow login page without auth
    if (pathname === "/admin/login") {
      // If already logged in as admin, redirect to dashboard
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();
        if (profile?.role === "admin") {
          return NextResponse.redirect(new URL("/admin", request.url));
        }
      }
      return supabaseResponse;
    }

    // All other admin pages require authentication
    if (!user) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Verify admin role
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || profile.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // MFA check — skip for the MFA verify/setup pages themselves
    if (!ADMIN_AUTH_ONLY.some((p) => pathname.startsWith(p))) {
      const { data: aalData } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

      if (aalData) {
        // MFA enrolled but not yet verified this session
        if (aalData.nextLevel === "aal2" && aalData.currentLevel !== "aal2") {
          return NextResponse.redirect(new URL("/admin/mfa", request.url));
        }
        // No MFA enrolled yet — force setup
        if (aalData.currentLevel === "aal1" && aalData.nextLevel === "aal1") {
          const { data: factors } = await supabase.auth.mfa.listFactors();
          const hasVerified = factors?.totp?.some((f) => f.status === "verified");
          if (!hasVerified) {
            return NextResponse.redirect(new URL("/admin/mfa/setup", request.url));
          }
        }
      }
    }

    return supabaseResponse;
  }

  // ── Regular protected routes ───────────────────────────────────────────────
  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  if (isProtected && !user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/login" && user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return supabaseResponse;
}
