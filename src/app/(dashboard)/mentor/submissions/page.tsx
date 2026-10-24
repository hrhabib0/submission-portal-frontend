
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useGetSubmissions, useReviewSubmission } from "@/hooks";
import { getApiErrorMessage } from "@/lib/apiError";
import type {
  Submission,
  SubmissionStatus,
} from "@/types/submission.types";

const PAGE_SIZE = 10;

const statusStyles: Record<SubmissionStatus, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  APPROVED: "bg-emerald-100 text-emerald-800",
  REJECTED: "bg-red-100 text-red-800",
};

export default function MentorSubmissionsPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<"" | SubmissionStatus>("");
  const [comments, setComments] = useState<Record<string, string>>({});

  const reviewMutation = useReviewSubmission();

  const {
    data: response,
    isPending,
    isError,
    refetch,
    isFetching,
  } = useGetSubmissions({
    page,
    limit: PAGE_SIZE,
    ...(status ? { status } : {}),
  });

  const submissions: Submission[] = response?.data?.submissions ?? [];
  const meta = response?.data?.meta;

  const totalPages = meta?.totalPages ?? 1;
  const total = meta?.total ?? submissions.length;

  function handleStatusChange(value: string) {
    setStatus(value as "" | SubmissionStatus);
    setPage(1);
  }

  function handleReview(
    submission: Submission,
    nextStatus: "APPROVED" | "REJECTED",
  ) {
    const comment = comments[submission.id]?.trim() ?? "";

    if (!comment) {
      toast.error("Please provide feedback before reviewing.");
      return;
    }

    reviewMutation.mutate(
      {
        submissionId: submission.id,
        payload: {
          status: nextStatus,
          comment,
        },
      },
      {
        onSuccess: () => {
          toast.success(
            `Submission ${nextStatus.toLowerCase()} successfully.`,
          );

          setComments((current) => ({
            ...current,
            [submission.id]: "",
          }));
        },
        onError: (error) => {
          toast.error(
            getApiErrorMessage(error, "Could not review submission."),
          );
        },
      },
    );
  }

  return (
    <main className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Student Submissions
        </h1>
        <p className="text-sm text-muted-foreground">
          Review projects, evaluate student work, and leave feedback.
        </p>
      </header>

      <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {isPending
            ? "Loading submissions..."
            : `${total} submission${total === 1 ? "" : "s"} found`}
        </p>

        <label className="flex items-center gap-2 text-sm">
          <span className="font-medium">Filter status</span>
          <select
            value={status}
            onChange={(event) => handleStatusChange(event.target.value)}
            className="h-10 rounded-md border bg-background px-3"
          >
            <option value="">All statuses</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </label>
      </section>

      {isPending ? (
        <output
          className="mx-auto block h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600"
          aria-label="Loading submissions"
        >
          <span className="sr-only">Loading submissions...</span>
        </output>
      ) : isError ? (
        <div className="space-y-3 rounded-lg border p-8 text-center">
          <p className="text-sm text-destructive">
            Could not load submissions. Check your connection and mentor access.
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
        <div className="rounded-lg border p-10 text-center">
          <p className="font-medium">No submissions found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try another status filter or check back later.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {submissions.map((submission: Submission) => (
              <article
                key={submission.id}
                className="space-y-4 rounded-xl border bg-card p-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 space-y-1">
                    <h2 className="text-lg font-semibold">
                      {submission.projectName}
                    </h2>

                    <p className="text-sm text-muted-foreground">
                      {submission.student?.name ?? "Unknown student"}
                      {submission.student?.email
                        ? ` · ${submission.student.email}`
                        : ""}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Submitted{" "}
                      {new Date(submission.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${statusStyles[submission.status]}`}
                  >
                    {submission.status}
                  </span>
                </div>

                <p className="whitespace-pre-wrap text-sm leading-6">
                  {submission.description}
                </p>

                <div className="flex flex-wrap gap-4 text-sm">
                  <a
                    href={submission.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    GitHub repository ↗
                  </a>
                  <a
                    href={submission.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Live project ↗
                  </a>
                </div>

                {submission.status === "PENDING" ? (
                  <div className="space-y-3 border-t pt-4">
                    <label
                      htmlFor={`feedback-${submission.id}`}
                      className="text-sm font-medium"
                    >
                      Feedback for student
                    </label>

                    <textarea
                      id={`feedback-${submission.id}`}
                      value={comments[submission.id] ?? ""}
                      onChange={(event) =>
                        setComments((current) => ({
                          ...current,
                          [submission.id]: event.target.value,
                        }))
                      }
                      placeholder="Explain what went well or what needs improvement..."
                      rows={3}
                      maxLength={2000}
                      className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />

                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        disabled={reviewMutation.isPending}
                        onClick={() =>
                          handleReview(submission, "APPROVED")
                        }
                        className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Approve
                      </button>

                      <button
                        type="button"
                        disabled={reviewMutation.isPending}
                        onClick={() =>
                          handleReview(submission, "REJECTED")
                        }
                        className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="border-t pt-4">
                    <p className="text-sm text-muted-foreground">
                      This submission has already been reviewed.
                    </p>

                    {submission.feedback?.[0] && (
                      <p className="mt-2 text-sm">
                        <span className="font-medium">
                          Latest feedback:{" "}
                        </span>
                        {submission.feedback[0].comment}
                      </p>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>

          <footer className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              Page {meta?.page ?? page} of {totalPages}
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                disabled={page <= 1 || isFetching}
                onClick={() => setPage((current) => current - 1)}
                className="rounded-md border px-4 py-2 text-sm disabled:opacity-40"
              >
                Previous
              </button>

              <button
                type="button"
                disabled={page >= totalPages || isFetching}
                onClick={() => setPage((current) => current + 1)}
                className="rounded-md border px-4 py-2 text-sm disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </footer>
        </>
      )}
    </main>
  );
}
