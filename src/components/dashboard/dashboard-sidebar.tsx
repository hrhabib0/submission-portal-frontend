"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderOpen,
  PlusCircle,
  Zap,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import type { AuthUser } from "@/types/auth.types";
import { LogoutButton } from "../shared/Logout";

interface DashboardSidebarProps {
  user: AuthUser;
  mobileOpen: boolean;
  onClose: () => void;
}

export default function DashboardSidebar({
  user,
  mobileOpen,
  onClose,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const isMentor = user.role === "MENTOR";

  const dashboardHref = isMentor
    ? "/mentor/dashboard"
    : "/student/dashboard";

  const navigation = isMentor
    ? [
        {
          label: "Dashboard",
          href: "/mentor/dashboard",
          icon: LayoutDashboard,
        },
        {
          label: "Review Submissions",
          href: "/mentor/submissions",
          icon: FolderOpen,
        },
      ]
    : [
        {
          label: "Dashboard",
          href: "/student/dashboard",
          icon: LayoutDashboard,
        },
        {
          label: "My Submissions",
          href: "/student/submissions",
          icon: FolderOpen,
        },
        {
          label: "Submit Project",
          href: "/student/submissions/new",
          icon: PlusCircle,
        },
      ];

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-background transition-transform duration-200 lg:static lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b px-5">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2.5 rounded-md text-lg font-bold tracking-tight text-foreground outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Zap size={19} />
            </span>
            <span className="text-lg font-bold tracking-tight">
              Project<span className="text-primary">Hub</span>
            </span>
          </Link>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 text-muted-foreground hover:text-foreground lg:hidden"
            aria-label="Close sidebar"
            onClick={onClose}
          >
            <X size={18} />
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-6">
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Workspace
          </p>

          <nav className="space-y-1">
            {navigation.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== dashboardHref &&
                  pathname.startsWith(`${item.href}/`)) ||
                (item.href === "/student/submissions" &&
                  pathname.startsWith("/student/submissions/") &&
                  pathname !== "/student/submissions/new");

              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {active && (
                    <span className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-primary" />
                  )}

                  <Icon
                    size={18}
                    strokeWidth={active ? 2.2 : 1.8}
                    className={
                      active
                        ? "text-primary"
                        : "text-muted-foreground transition-colors group-hover:text-foreground"
                    }
                  />

                  <span className="flex-1">{item.label}</span>
                </Link>
              );
            })}

            <div className="my-4 border-t" />

            <LogoutButton
              className="w-full justify-start gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
            />
          </nav>
        </div>

        {/* Signed-in user */}
        <div className="shrink-0 border-t p-4">
          <div className="rounded-xl border bg-muted/30 p-3.5">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Signed in as
            </p>

            <p className="mt-1.5 truncate text-sm font-semibold text-foreground">
              {user.name}
            </p>

            <div className="mt-2.5 flex items-center gap-2">
              <span
                className={`flex size-7 items-center justify-center rounded-lg ${
                  isMentor
                    ? "bg-violet-500/10 text-violet-600 dark:text-violet-400"
                    : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                }`}
              >
                {isMentor ? (
                  <FolderOpen size={14} />
                ) : (
                  <LayoutDashboard size={14} />
                )}
              </span>

              <div className="min-w-0">
                <p className="text-xs font-medium text-foreground">
                  {isMentor ? "Mentor account" : "Student account"}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  ProjectHub workspace
                </p>
              </div>

              <span className="ml-auto size-2 shrink-0 rounded-full bg-emerald-500" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
