import { Suspense } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";


export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <DashboardLayout>{children}</DashboardLayout>
    </Suspense>
  );
}