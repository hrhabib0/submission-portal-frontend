
"use client";

import Link from "next/link";
import { LogOut, Zap } from "lucide-react";

import { useCurrentUser, useLogout } from "@/hooks";
// import { logoutUser } from "@/api/auth.api";

export default function Header() {
  const {
    data: user,
    isPending: isCheckingAuth,
    isError,
  } = useCurrentUser();
  
  const logoutMutation = useLogout();

  const isAuthenticated = Boolean(user) && !isError;

  const dashboardHref =
    user?.role === "MENTOR"
      ? "/mentor/dashboard"
      : "/student/dashboard";

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label="Project Portal home"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Zap className="size-5" />
          </span>

          <span className="flex flex-col">
            <span className="text-base font-bold tracking-tight">
              Project<span className="text-primary">Portal</span>
            </span>
            <span className="hidden text-[11px] text-muted-foreground sm:block">
              Submit. Review. Improve.
            </span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav
          className="hidden items-center gap-6 md:flex"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>

          {isAuthenticated && (
            <Link
              href={dashboardHref}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
          )}
        </nav>

        {/* Authentication actions */}
        <div className="flex items-center gap-2">
          {isCheckingAuth && !isError ? (
            <output
              className="h-9 w-28 animate-pulse rounded-md bg-muted"
              aria-label="Checking authentication"
            />
          ) : isAuthenticated ? (
            <>
              <div className="hidden text-right sm:block">
                <p className="max-w-36 truncate text-sm font-semibold">
                  {user.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user.role === "MENTOR" ? "Mentor" : "Student"}
                </p>
              </div>

              <Link
                href={dashboardHref}
                className="inline-flex h-9 items-center rounded-md border px-3 text-sm font-medium transition-colors hover:bg-muted md:hidden"
              >
                Dashboard
              </Link>

                <button
                    type="button"
                    onClick={() => logoutMutation.mutate()}
                    disabled={logoutMutation.isPending}
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-md border px-3 text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <LogOut className="size-4" />
                    <span className="hidden sm:inline">
                        {logoutMutation.isPending ? "Logging out..." : "Logout"}
                    </span>
                </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors hover:bg-muted"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
