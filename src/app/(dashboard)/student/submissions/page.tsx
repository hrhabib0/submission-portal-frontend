"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  GitBranchPlus,
  Plus,
  RefreshCw,
  FolderOpen,
  Clock3,
  CheckCircle2,
  XCircle,
  MessageSquareText,
} from "lucide-react";

import type { Submission, SubmissionStatus } from "@/types/submission.types";
import { useMySubmissions } from "@/hooks";
import { Button } from "@/components/ui/button";

const statusStyles: Record<SubmissionStatus, string> = {
  PENDING: "bg-amber-500/10 text-amber-600 ring-amber-500/20",
  APPROVED: "bg-emerald-500/10 text-emerald-600 ring-emerald-500/20",
  REJECTED: "bg-destructive/10 text-destructive ring-destructive/20",
};

const statusIcons = {
  PENDING: Clock3,
  APPROVED: CheckCircle2,
  REJECTED: XCircle,
};

function StatusBadge({ status }: { status: SubmissionStatus }) {
  const Icon = statusIcons[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[status]}`}
    >
      <Icon className="size-3.5" />
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function MySubmissionsPage() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data: response,
    isPending,
    isError,
    refetch,
    isFetching,
  } = useMySubmissions(page, limit);

  const submissions: Submission[] = response?.data ?? [];
  const meta = response?.meta;
  const totalPages = Math.max(meta?.totalPages ?? 1, 1);
  const total = meta?.total ?? submissions.length;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 pb-8">
      {/* Back navigation */}
      <Link
        href="/student/dashboard"
        className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
        Back to dashboard
      </Link>

      {/* Page heading */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary">
            <FolderOpen className="size-3.5" />
            YOUR WORKSPACE
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              My Submissions
            </h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
              Track your projects, monitor review status, and read feedback
              from your mentors.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 min-[400px]:flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={() => void refetch()}
            disabled={isFetching}
            className="gap-2"
          >
            <RefreshCw
              className={`size-4 ${isFetching ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>

          <Button
            nativeButton={false}
            render={
              <Link href="/student/submissions/new">
                <Plus className="size-4" />
                New project
              </Link>
            }
            className="gap-2">
          </Button>
        </div>
      </section>

      {/* Submission statistics */}
      {!isPending && !isError && (
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-muted-foreground">
                Total submissions
              </p>
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FolderOpen className="size-4" />
              </div>
            </div>
            <p className="mt-3 text-2xl font-bold tracking-tight text-foreground">
              {total}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              All your submitted projects
            </p>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-muted-foreground">
                On this page
              </p>
              <div className="flex size-9 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600">
                <GitBranchPlus className="size-4" />
              </div>
            </div>
            <p className="mt-3 text-2xl font-bold tracking-tight text-foreground">
              {submissions.length}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Projects in this view
            </p>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-muted-foreground">
                Current page
              </p>
              <div className="flex size-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600">
                <MessageSquareText className="size-4" />
              </div>
            </div>
            <p className="mt-3 text-2xl font-bold tracking-tight text-foreground">
              {page}
              <span className="ml-1 text-base font-medium text-muted-foreground">
                / {totalPages}
              </span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Browse your submission history
            </p>
          </div>
        </div>
      )}

      {/* Loading state */}
      {isPending ? (
        <div className="flex min-h-64 items-center justify-center rounded-2xl border bg-card">
          <div className="text-center">
            <output
              className="mx-auto block size-8 animate-spin rounded-full border-2 border-muted border-t-primary"
              aria-label="Loading submissions"
            >
              <span className="sr-only">Loading submissions...</span>
            </output>
            <p className="mt-4 text-sm font-medium text-foreground">
              Loading your submissions
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Please wait while we fetch your projects.
            </p>
          </div>
        </div>
      ) : isError ? (
        /* Error state */
        <div className="rounded-2xl border border-destructive/20 bg-card px-6 py-12 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
            <RefreshCw className="size-5" />
          </div>
          <h2 className="mt-4 font-semibold text-foreground">
            Could not load submissions
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
            Something went wrong while loading your projects. Check your
            connection and try again.
          </p>
          <Button
            type="button"
            variant="outline"
            className="mt-5 gap-2"
            onClick={() => void refetch()}
            disabled={isFetching}
          >
            <RefreshCw
              className={`size-4 ${isFetching ? "animate-spin" : ""}`}
            />
            Try again
          </Button>
        </div>
      ) : submissions.length === 0 ? (
        /* Empty state */
        <div className="rounded-2xl border border-dashed bg-card px-6 py-14 text-center sm:py-16">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <GitBranchPlus className="size-7" />
          </div>

          <h2 className="mt-5 text-lg font-semibold text-foreground">
            No submissions yet
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            Your projects will appear here after you submit them for mentor
            review. Ready to share what you have built?
          </p>

          <Button
            nativeButton={false}
            render={
              <Link href="/student/submissions/new">
                <Plus className="size-4" />
                Submit your first project
              </Link>
            }
            className="mt-6 gap-2">
            
          </Button>
        </div>
      ) : (
        <>
          {/* Submission cards */}
          <section className="space-y-4">
            {submissions.map((submission) => (
              <article
                key={submission.id}
                className="rounded-2xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
              >
                {/* Project heading and links */}
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                  <div className="min-w-0 space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="break-words text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                        {submission.projectName}
                      </h2>
                      <StatusBadge status={submission.status} />
                    </div>

                    <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Clock3 className="size-3.5" />
                      Submitted {formatDate(submission.createdAt)}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <a
                      href={submission.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      <GitBranchPlus className="size-4 text-muted-foreground" />
                      Repository
                      <ExternalLink className="size-3.5 text-muted-foreground" />
                    </a>

                    <a
                      href={submission.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      Live demo
                      <ExternalLink className="size-3.5 text-muted-foreground" />
                    </a>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-5">
                  <h3 className="text-sm font-semibold text-foreground">
                    Project description
                  </h3>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
                    {submission.description}
                  </p>
                </div>

                {/* Mentor feedback */}
                <div className="mt-6 border-t pt-5">
                  <div className="flex items-center gap-2">
                    <MessageSquareText className="size-4 text-primary" />
                    <h3 className="text-sm font-semibold text-foreground">
                      Mentor feedback
                    </h3>
                    {submission.feedback?.length ? (
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                        {submission.feedback.length}
                      </span>
                    ) : null}
                  </div>

                  {submission.feedback?.length ? (
                    <div className="mt-4 space-y-3">
                      {submission.feedback.map((feedback) => (
                        <div
                          key={feedback.id}
                          className="rounded-xl border bg-muted/30 p-4"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="text-sm font-semibold text-foreground">
                              {feedback.mentor.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(feedback.createdAt)}
                            </p>
                          </div>
                          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                            {feedback.comment}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      No mentor feedback yet. Feedback will appear here once
                      your mentor reviews your project.
                    </p>
                  )}
                </div>
              </article>
            ))}
          </section>

          {/* Pagination */}
          <div className="flex flex-col gap-4 rounded-2xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p className="text-sm text-muted-foreground">
              Page <span className="font-semibold text-foreground">{page}</span>{" "}
              of <span className="font-semibold text-foreground">{totalPages}</span>
              {meta ? ` · ${total} submissions total` : ""}
            </p>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                disabled={page <= 1 || isFetching}
                onClick={() => setPage((current) => current - 1)}
                className="flex-1 gap-2 sm:flex-none"
              >
                <ArrowLeft className="size-4" />
                Previous
              </Button>

              <Button
                type="button"
                variant="outline"
                disabled={page >= totalPages || isFetching}
                onClick={() => setPage((current) => current + 1)}
                className="flex-1 gap-2 sm:flex-none"
              >
                Next
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}