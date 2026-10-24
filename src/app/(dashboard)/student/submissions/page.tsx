
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
} from "lucide-react";

import { SubmissionStatus } from "@/types/submission.types";
import { useMySubmissions } from "@/hooks";
import { Button } from "@/components/ui/button";

const statusStyles: Record<SubmissionStatus, string> = {
  PENDING: "bg-amber-50 text-amber-700 ring-amber-600/20",
  APPROVED: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  REJECTED: "bg-red-50 text-red-700 ring-red-600/20",
};

function StatusBadge({ status }: { status: SubmissionStatus }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[status]}`}
    >
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

  const submissions = response?.data ?? [];
  const meta = response?.meta;
  const totalPages = Math.max(meta?.totalPages ?? 1, 1);
  const total = meta?.total ?? submissions.length;

  return (
    <div className="space-y-6">
      <Link
        href="/student/dashboard"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft size={16} />
        Back to dashboard
      </Link>

      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-blue-600">
            YOUR WORKSPACE
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            My Submissions
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Track your projects and read feedback from your mentors.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => void refetch()}
            disabled={isFetching}
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>

          <Button
            nativeButton={false}
            render={
                <Link href="/student/submissions/new">
                    <Plus className="mr-2 h-4 w-4" />
                    New project
                </Link>
            }
            className="bg-blue-600 hover:bg-blue-700">
          </Button>
        </div>
      </section>

      {!isPending && !isError && (
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-500">Total submissions</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {total}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-500">On this page</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {submissions.length}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-500">Current page</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {page} <span className="text-base text-slate-400">/ {totalPages}</span>
            </p>
          </div>
        </div>
      )}

      {isPending ? (
        <div className="flex min-h-56 items-center justify-center rounded-xl border border-slate-200 bg-white">
          <div className="text-center">
            <output
                className="mx-auto block h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600"
                aria-label="Loading submissions"
            >
                <span className="sr-only">Loading submissions...</span>
            </output>
            <p className="mt-3 text-sm text-slate-500">
              Loading your submissions...
            </p>
          </div>
        </div>
      ) : isError ? (
        <div className="rounded-xl border border-red-200 bg-white p-8 text-center">
          <h2 className="font-semibold text-slate-900">
            Could not load submissions
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Please check your connection and try again.
          </p>
          <Button className="mt-4" variant="outline" onClick={() => void refetch()}>
            Try again
          </Button>
        </div>
      ) : submissions.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <GitBranchPlus size={24} />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-slate-900">
            No submissions yet
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Your projects will appear here after you submit them for mentor
            review.
          </p>
          <Button
            nativeButton={false}
            render={
                <Link href="/student/submissions/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Submit your first project
                </Link>
            }
            className="mt-5 bg-blue-600 hover:bg-blue-700">
          </Button>
        </div>
      ) : (
        <>
          <section className="space-y-4">
            {submissions.map((submission) => (
              <article
                key={submission.id}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
              >
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-lg font-semibold text-slate-900">
                        {submission.projectName}
                      </h2>
                      <StatusBadge status={submission.status} />
                    </div>
                    <p className="mt-2 text-sm text-slate-500">
                      Submitted {formatDate(submission.createdAt)}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <a
                      href={submission.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      <GitBranchPlus size={15} />
                      Repository
                      <ExternalLink size={13} />
                    </a>
                    <a
                      href={submission.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Live demo
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>

                <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                  {submission.description}
                </p>

                <div className="mt-5 border-t border-slate-100 pt-4">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Mentor feedback
                  </h3>

                  {submission.feedback?.length ? (
                    <div className="mt-3 space-y-3">
                      {submission.feedback.map((feedback) => (
                        <div
                          key={feedback.id}
                          className="rounded-lg bg-slate-50 p-4"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="text-sm font-medium text-slate-800">
                              {feedback.mentor.name}
                            </p>
                            <p className="text-xs text-slate-400">
                              {formatDate(feedback.createdAt)}
                            </p>
                          </div>
                          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                            {feedback.comment}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-2 text-sm text-slate-500">
                      No mentor feedback yet.
                    </p>
                  )}
                </div>
              </article>
            ))}
          </section>

          <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Page {page} of {totalPages}
              {meta ? ` · ${total} submissions total` : ""}
            </p>

            <div className="flex gap-2">
              <Button
                variant="outline"
                disabled={page <= 1 || isFetching}
                onClick={() => setPage((current) => current - 1)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              <Button
                variant="outline"
                disabled={page >= totalPages || isFetching}
                onClick={() => setPage((current) => current + 1)}
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
