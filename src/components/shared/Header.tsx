"use client";

import Link from "next/link";
import { ArrowRight, LayoutDashboard, Zap } from "lucide-react";

import { useCurrentUser } from "@/hooks";
import { LogoutButton } from "./Logout";

export default function Header() {
  const {
    data: user,
    isPending: isCheckingAuth,
    isError,
  } = useCurrentUser();

  const isAuthenticated = Boolean(user) && !isError;

  const dashboardHref =
    user?.role === "MENTOR"
      ? "/mentor/dashboard"
      : "/student/dashboard";

  return (
    <header className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-[72px] sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="group flex min-w-0 shrink-0 items-center gap-2.5"
          aria-label="ProjectHub home"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform duration-200 group-hover:scale-105">
            <Zap className="size-5 fill-current" />
          </span>

          <span className="flex min-w-0 flex-col">
            <span className="text-lg font-bold leading-tight tracking-tight text-foreground">
              Project<span className="text-primary">Hub</span>
            </span>
            <span className="hidden text-[11px] leading-4 text-muted-foreground sm:block">
              Build. Submit. Improve.
            </span>
          </span>
        </Link>

        {/* Main navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 md:flex"
        >
          <Link
            href="/"
            className="rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Home
          </Link>

          {isAuthenticated && (
            <Link
              href={dashboardHref}
              className="inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <LayoutDashboard className="size-4" />
              Dashboard
            </Link>
          )}
        </nav>

        {/* Right side actions */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {isCheckingAuth && !isError ? (
            <output
              className="h-9 w-24 animate-pulse rounded-lg bg-muted sm:w-32"
              aria-label="Checking authentication"
            >
              <span className="sr-only">Checking authentication...</span>
            </output>
          ) : isAuthenticated ? (
            <>
              {/* User information */}
              <div className="hidden items-center gap-3 border-r pr-4 sm:flex">
                <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {user.name
                    .trim()
                    .split(/\s+/)
                    .slice(0, 2)
                    .map((part) => part.charAt(0).toUpperCase())
                    .join("")}
                </div>

                <div className="max-w-36">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {user.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user.role === "MENTOR" ? "Mentor" : "Student"}
                  </p>
                </div>
              </div>

              {/* Mobile dashboard shortcut */}
              <Link
                href={dashboardHref}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border px-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted sm:px-3 md:hidden"
              >
                <LayoutDashboard className="size-4" />
                <span className="hidden min-[400px]:inline">Dashboard</span>
              </Link>

              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-flex h-9 items-center justify-center rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:px-4"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="group inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 sm:px-4"
              >
                Register
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}