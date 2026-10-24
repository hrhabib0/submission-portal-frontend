
"use client";

import Link from "next/link";
import {
  CheckCircle2,
  Clock3,
  FileText,
  XCircle,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getSubmissions } from "@/api/submission.api";
import { useMentorDashboard } from "@/hooks";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Submission } from "@/types/submission.types";


const statItems = [
  {
    key: "total",
    label: "Total Submissions",
    icon: FileText,
    color: "text-blue-600",
  },
  {
    key: "pending",
    label: "Pending Review",
    icon: Clock3,
    color: "text-amber-600",
  },
  {
    key: "approved",
    label: "Approved",
    icon: CheckCircle2,
    color: "text-emerald-600",
  },
  {
    key: "rejected",
    label: "Rejected",
    icon: XCircle,
    color: "text-red-600",
  },
] as const;

const statusStyles = {
  PENDING: "bg-amber-100 text-amber-800",
  APPROVED: "bg-emerald-100 text-emerald-800",
  REJECTED: "bg-red-100 text-red-800",
};

export default function MentorDashboardPage() {
  const {
    data: stats,
    isLoading: statsLoading,
    isError: statsError,
  } = useMentorDashboard();

  const {
    data: recentResponse,
    isLoading: submissionsLoading,
    isError: submissionsError,
    refetch,
  } = useQuery({
    queryKey: ["submissions", "mentor-dashboard-recent"],
    queryFn: () => getSubmissions({ page: 1, limit: 5 }),
    staleTime: 60_000,
    retry: false,
  });

  const submissions = recentResponse?.data.submissions ?? [];

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Mentor Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Review student projects and track submission progress.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statItems.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.key}>
              <CardContent className="flex items-center justify-between p-5">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="text-3xl font-bold">
                    {statsLoading
                      ? "—"
                      : stats?.[item.key] ?? "—"}
                  </p>
                </div>

                <div className="rounded-xl bg-muted p-3">
                  <Icon className={`size-5 ${item.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {statsError && (
        <p className="text-sm text-destructive">
          Could not load dashboard statistics. Check your mentor
          authentication and API connection, then refresh the page.
        </p>
      )}

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">
              Recent Submissions
            </h2>
            <p className="text-sm text-muted-foreground">
              The latest projects submitted by students.
            </p>
          </div>

          <Link
            href="/mentor/submissions"
            className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            View all submissions
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <Card>
          <CardContent className="p-0">
            {submissionsLoading ? (
                <output
                    className="mx-auto block h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600"
                    aria-label="Loading submissions"
                >
                    Loading recent submissions...
                </output>
            ) : submissionsError ? (
              <div className="space-y-3 p-6">
                <p className="text-sm text-destructive">
                  Could not load submissions.
                </p>
                <button
                  type="button"
                  onClick={() => void refetch()}
                  className="text-sm font-medium underline underline-offset-4"
                >
                  Try again
                </button>
              </div>
            ) : submissions.length === 0 ? (
              <p className="p-6 text-sm text-muted-foreground">
                No submissions yet. New student projects will appear here.
              </p>
            ) : (
              <div className="divide-y">
                {submissions.map((submission:Submission) => (
                  <div
                    key={submission.id}
                    className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0 space-y-1">
                      <h3 className="truncate font-semibold">
                        {submission.projectName}
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        {submission.student?.name ?? "Student"}
                        {" · "}
                        {new Date(
                          submission.createdAt,
                        ).toLocaleDateString()}
                      </p>

                      <a
                        href={submission.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
                      >
                        View repository
                        <ExternalLink className="size-3.5" />
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge
                        className={statusStyles[submission.status]}
                      >
                        {submission.status}
                      </Badge>

                      <Link
                        href={`/mentor/submissions/${submission.id}`}
                        className="rounded-md border px-3 py-2 text-sm font-medium hover:bg-muted"
                      >
                        Review
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
