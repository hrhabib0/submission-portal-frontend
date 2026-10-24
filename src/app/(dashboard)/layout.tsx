
"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useCurrentUser } from "@/hooks";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import DashboardHeader from "@/components/dashboard/dashboard-header";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data: user, isPending, isError } = useCurrentUser();

  const isWrongRole =
    !!user &&
    ((user.role === "STUDENT" && pathname.startsWith("/mentor")) ||
      (user.role === "MENTOR" && pathname.startsWith("/student")));

  useEffect(() => {
    if (isError) {
      router.replace("/login");
      return;
    }

    if (isWrongRole && user) {
      router.replace(
        user.role === "STUDENT"
          ? "/student/dashboard"
          : "/mentor/dashboard",
      );
    }
  }, [isError, isWrongRole, user, router]);

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      {user && !isWrongRole && (
        <DashboardSidebar
          user={user}
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />
      )}

      <div className="min-w-0 flex-1">
        {user && !isWrongRole ? (
          <DashboardHeader
            user={user}
            onMenuClick={() => setMobileOpen(true)}
          />
        ) : (
          <header className="flex h-16 items-center border-b border-slate-200 bg-white px-6">
            <p className="text-sm text-slate-500">
              {isError
                ? "Redirecting to login..."
                : isWrongRole
                  ? "Redirecting to your dashboard..."
                  : isPending
                    ? "Loading your dashboard..."
                    : "Preparing your dashboard..."}
            </p>
          </header>
        )}

        <main className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
