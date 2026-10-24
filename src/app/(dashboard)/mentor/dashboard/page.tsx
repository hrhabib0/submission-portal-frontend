
"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileText,
  RefreshCw,
  Sparkles,
  XCircle,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { getSubmissions } from "@/api/submission.api";
import { useMentorDashboard } from "@/hooks";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Submission, SubmissionStatus } from "@/types/submission.types";

const statItems = [
  {
    key: "total",
    label: "Total Submissions",
    description: "All student projects",
    icon: FileText,
    iconClass: "bg-primary/10 text-primary",
  },
  {
    key: "pending",
    label: "Pending Review",
    description: "Waiting for your review",
    icon: Clock3,
    iconClass: "bg-amber-500/10 text-amber-600",
  },
  {
    key: "approved",
    label: "Approved",
    description: "Successfully reviewed",
    icon: CheckCircle2,
    iconClass: "bg-emerald-500/10 text-emerald-600",
  },
  {
    key: "rejected",
    label: "Rejected",
    description: "Not approved",
    icon: XCircle,
    iconClass: "bg-rose-500/10 text-rose-600",
  },
] as const;

const statusStyles: Record<SubmissionStatus, string> = {
  PENDING: "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  APPROVED: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  REJECTED: "border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-400",
};

export default function MentorDashboardPage() {
  const {
    data: stats,
    isLoading: statsLoading,
    isError: statsError,
    refetch: refetchStats,
  } = useMentorDashboard();

  const {
    data: recentResponse,
    isLoading: submissionsLoading,
    isError: submissionsError,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["submissions", "mentor-dashboard-recent"],
    queryFn: () => getSubmissions({ page: 1, limit: 5 }),
    staleTime: 60_000,
    retry: false,
  });

  const submissions: Submission[] =
    recentResponse?.data.submissions ?? [];

  return (
    <div className="space-y-8">
      {/* Page heading */}
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-xs font-medium text-primary sm:text-sm">
            <Sparkles className="size-3.5" />
            MENTOR WORKSPACE
          </div>

          <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
            Mentor Dashboard
          </h1>

          <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
            Review student projects, share meaningful feedback, and track
            submission progress.
          </p>
        </div>

        <Link
          href="/mentor/submissions"
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
        >
          <FileText className="size-4" />
          Review submissions
          <ArrowRight className="size-4" />
        </Link>
      </section>

      {/* Statistics */}
      <section
        aria-label="Submission statistics"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {statItems.map((item) => {
          const Icon = item.icon;
          const value = stats?.[item.key];

          return (
            <Card
              key={item.key}
              className="rounded-2xl shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-muted-foreground">
                      {item.label}
                    </p>

                    <p className="mt-3 text-3xl font-bold tracking-tight">
                      {statsLoading ? "—" : (value ?? "—")}
                    </p>
                  </div>

                  <div
                    className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${item.iconClass}`}
                  >
                    <Icon className="size-5" />
                  </div>
                </div>

                <p className="mt-3 text-xs leading-5 text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {statsError && (
        <div className="flex flex-col justify-between gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-4 sm:flex-row sm:items-center">
          <p className="text-sm text-destructive">
            Could not load dashboard statistics. Please try again.
          </p>

          <button
            type="button"
            onClick={() => void refetchStats()}
            className="inline-flex items-center gap-2 self-start text-sm font-medium text-destructive hover:underline sm:self-auto"
          >
            <RefreshCw className="size-4" />
            Retry
          </button>
        </div>
      )}

      {/* Recent submissions */}
      <section className="space-y-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Recent Submissions
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              The latest projects submitted by students.
            </p>
          </div>

          <Link
            href="/mentor/submissions"
            className="inline-flex items-center gap-2 self-start rounded-lg border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-muted sm:self-auto"
          >
            View all submissions
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <Card className="overflow-hidden rounded-2xl shadow-sm">
          <CardContent className="p-0">
            {submissionsLoading ? (
              <div className="flex flex-col items-center justify-center gap-3 px-6 py-14">
                <output
                  className="block size-8 animate-spin rounded-full border-2 border-muted border-t-primary"
                  aria-label="Loading recent submissions"
                >
                  <span className="sr-only">
                    Loading recent submissions...
                  </span>
                </output>

                <p className="text-sm text-muted-foreground">
                  Loading recent submissions...
                </p>
              </div>
            ) : submissionsError ? (
              <div className="flex flex-col items-center px-6 py-12 text-center">
                <div className="flex size-11 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                  <FileText className="size-5" />
                </div>

                <h3 className="mt-4 font-semibold">
                  Unable to load submissions
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  Check your connection and try again.
                </p>

                <button
                  type="button"
                  onClick={() => void refetch()}
                  disabled={isFetching}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-50"
                >
                  <RefreshCw
                    className={`size-4 ${isFetching ? "animate-spin" : ""}`}
                  />
                  {isFetching ? "Retrying..." : "Try again"}
                </button>
              </div>
            ) : submissions.length === 0 ? (
              <div className="flex flex-col items-center px-6 py-14 text-center">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FileText className="size-6" />
                </div>

                <h3 className="mt-4 font-semibold">
                  No submissions yet
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                  Student projects will appear here when they are submitted.
                </p>
              </div>
            ) : (
              <div className="divide-y">
                {submissions.map((submission: Submission) => (
                  <article
                    key={submission.id}
                    className="p-5 transition-colors hover:bg-muted/30 sm:p-6"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex min-w-0 items-start gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <FileText className="size-5" />
                        </div>

                        <div className="min-w-0">
                          <h3 className="truncate font-semibold">
                            {submission.projectName}
                          </h3>

                          <p className="mt-1 text-sm text-muted-foreground">
                            {submission.student?.name ?? "Student"}
                            {" · "}
                            {new Date(
                              submission.createdAt,
                            ).toLocaleDateString()}
                          </p>

                          <a
                            href={submission.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                          >
                            View repository
                            <ExternalLink className="size-3.5" />
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-3 sm:justify-end">
                        <Badge
                          variant="outline"
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[submission.status]}`}
                        >
                          {submission.status === "PENDING" && (
                            <Clock3 className="mr-1 size-3" />
                          )}
                          {submission.status === "APPROVED" && (
                            <CheckCircle2 className="mr-1 size-3" />
                          )}
                          {submission.status === "REJECTED" && (
                            <XCircle className="mr-1 size-3" />
                          )}
                          {submission.status}
                        </Badge>

                        <Link
                          href={`/mentor/submissions/${submission.id}`}
                          className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border bg-background px-3 text-sm font-medium transition-colors hover:bg-muted"
                        >
                          Review
                          <ArrowRight className="size-3.5" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Bottom guidance */}
      <section className="relative overflow-hidden rounded-2xl border bg-muted/30 p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold">
              Help students take their next step
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Clear, constructive feedback helps students understand what to
              improve and how to grow.
            </p>
          </div>

          <Link
            href="/mentor/submissions"
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 self-start rounded-lg border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted sm:self-auto"
          >
            Review pending work
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
