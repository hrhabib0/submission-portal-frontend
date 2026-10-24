
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderOpen,
  PlusCircle,
  Zap,
  X,
  LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { AuthUser } from "@/types/auth.types";
import { useLogout } from "@/hooks";
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
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:static lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
          <Link
            href={"/"}
            className="flex items-center gap-2 text-lg font-bold tracking-tight text-slate-900"
            onClick={onClose}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Zap size={18} />
            </span>
            ProjectHub
          </Link>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Close sidebar"
            onClick={onClose}
          >
            <X size={20} />
          </Button>
        </div>

        <div className="px-4 py-5">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Workspace
          </p>

          <nav className="space-y-1">
            {navigation.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !==
                  (isMentor
                    ? "/mentor/dashboard"
                    : "/student/dashboard") &&
                  pathname.startsWith(item.href));

              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
            <LogoutButton />
          </nav>
        </div>

        <div className="mt-auto border-t border-slate-200 p-4">
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs font-medium text-slate-500">
              Signed in as
            </p>
            <p className="mt-1 truncate text-sm font-semibold text-slate-800">
              {user.name}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {isMentor ? "Mentor account" : "Student account"}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
