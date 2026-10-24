"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Menu, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { AuthUser } from "@/types/auth.types";

interface DashboardHeaderProps {
  user: AuthUser;
  onMenuClick: () => void;
}

export default function DashboardHeader({
  user,
  onMenuClick,
}: DashboardHeaderProps) {
  const pathname = usePathname();

  const initials = user.name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const isMentor = user.role === "MENTOR";
  const profileHref = isMentor ? "/mentor/profile" : "/student/profile";

  const pageTitle = pathname.includes("/submissions/new")
    ? "Submit Project"
    : pathname.includes("/submissions")
      ? isMentor
        ? "Review Submissions"
        : "My Submissions"
      : pathname.includes("/profile")
        ? "My Profile"
        : "Dashboard";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/85 px-4 backdrop-blur-xl sm:px-6">
      {/* Left: menu and page information */}
      <div className="flex min-w-0 items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="-ml-2 shrink-0 text-muted-foreground hover:text-foreground lg:hidden"
          aria-label="Open navigation"
          onClick={onMenuClick}
        >
          <Menu size={20} />
        </Button>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="truncate text-sm font-semibold tracking-tight text-foreground sm:text-base">
              {pageTitle}
            </h1>

            <span className="hidden rounded-md border bg-muted/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-flex">
              {isMentor ? "MENTOR" : "STUDENT"}
            </span>
          </div>

          <p className="mt-0.5 hidden truncate text-xs text-muted-foreground sm:block">
            Welcome back, {user.name}. Here's your workspace overview.
          </p>
        </div>
      </div>

      {/* Right: notifications and profile */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground hover:text-foreground"
          aria-label="Notifications"
          title="Notifications coming soon"
        >
          <Bell size={19} strokeWidth={1.8} />
        </Button>

        <div className="h-7 w-px bg-border" />

        <Link
          href={profileHref}
          aria-label="Go to your profile"
          title="My profile"
          className="group flex items-center gap-2 rounded-full outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <div className="flex size-9 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-xs font-bold text-primary transition-all group-hover:border-primary/40 group-hover:bg-primary/15 sm:size-10">
            {initials || <UserRound size={17} />}
          </div>

          <div className="hidden min-w-0 text-left md:block">
            <p className="max-w-32 truncate text-sm font-medium text-foreground transition-colors group-hover:text-primary">
              {user.name}
            </p>
            <p className="text-xs text-muted-foreground">
              View profile
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
}
