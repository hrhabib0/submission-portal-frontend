
"use client";

import { Menu, Bell } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AuthUser } from "@/types/auth.types";


interface DashboardHeaderProps {
  user: AuthUser;
  onMenuClick: () => void;
}

export default function DashboardHeader({
  user,
  onMenuClick,
}: DashboardHeaderProps) {
  const initials = user.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Open navigation"
          onClick={onMenuClick}
        >
          <Menu size={20} />
        </Button>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900">
            Welcome back, {user.name}
          </p>
          <p className="hidden text-xs text-slate-500 sm:block">
            Here's an overview of your workspace.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          title="Notifications coming soon"
        >
          <Bell size={19} />
        </Button>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
          {initials || "U"}
        </div>
      </div>
    </header>
  );
}
