"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  ExternalLink,
  GitBranchPlus,
  LoaderCircle,
} from "lucide-react";
import { toast } from "sonner";

import {
  useGetSubmissionById,
  useReviewSubmission,
} from "@/hooks";
import { getApiErrorMessage } from "@/lib/apiError";
import type { SubmissionStatus } from "@/types/submission.types";

const statusStyles: Record<SubmissionStatus, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  APPROVED: "bg-emerald-100 text-emerald-800",
  REJECTED: "bg-red-100 text-red-800",
};

export default function MentorSubmissionDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();

  const {
    data: submission,
    isPending,
    isError,
    refetch,
    isFetching,
  } = useGetSubmissionById(id);

  const reviewMutation = useReviewSubmission();

  function handleReview(status: "APPROVED" | "REJECTED") {
    const trimmedComment = comment.trim();

    if (!trimmedComment) {
      toast.error("Please provide feedback before reviewing.");
      return;
    }

    reviewMutation.mutate(
      {
        submissionId: id,
        payload: {
          status,
          comment: trimmedComment,
        },
      },
      {
        onSuccess: async () => {
          toast.success(
            status === "APPROVED"
              ? "Submission approved successfully."
              : "Submission rejected successfully.",
          );

          setComment("");

          await Promise.all([
            queryClient.invalidateQueries({
              queryKey: ["submissions"],
            }),
            queryClient.invalidateQueries({
              queryKey: ["mentor-dashboard"],
            }),
          ]);

          await refetch();
        },
        onError: (error) => {
          toast.error(getApiErrorMessage(error));
        },
      },
    );
  }

  if (isPending) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <LoaderCircle
          className="h-8 w-8 animate-spin text-primary"
          aria-label="Loading submission"
        />
        <span className="sr-only">Loading submission...</span>
      </div>
    );
  }

  if (isError || !submission) {
    return (
      <section className="space-y-4 rounded-xl border bg-card p-6">
        <h1 className="text-xl font-semibold">
          Unable to load submission
        </h1>

        <p className="text-sm text-muted-foreground">
          The submission could not be loaded. It may not exist, or you may
          not have permission to view it.
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            {isFetching ? "Retrying..." : "Try again"}
          </button>

          <Link
            href="/mentor/submissions"
            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            Back to submissions
          </Link>
        </div>
      </section>
    );
  }

  const canReview = submission.status === "PENDING";

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <Link
        href="/mentor/submissions"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to submissions
      </Link>

      {/* Submission overview */}
      <section className="rounded-xl border bg-card p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Submission details
            </p>

            <h1 className="text-2xl font-bold tracking-tight">
              {submission.projectName}
            </h1>

            <p className="text-sm text-muted-foreground">
                Submitted by {submission.student?.name}
            </p>
          </div>

          <span
            className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[submission.status]}`}
          >
            {submission.status}
          </span>
        </div>

        <div className="mt-6 grid gap-5 border-t pt-5 sm:grid-cols-2">
                <div>
                    <p className="text-sm text-muted-foreground">Student name</p>
                    <p className="mt-1 font-medium">
                        {submission.student?.name}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-muted-foreground">Student email</p>
                    <p className="mt-1 break-all font-medium">
                        {submission.student?.email}
                    </p>
                </div>

            <div>
                <p className="text-sm text-muted-foreground">Submitted on</p>
                <p className="mt-1 font-medium">
                    {new Date(submission.createdAt).toLocaleString()}
                </p>
            </div>

          <div>
            <p className="text-sm text-muted-foreground">Last updated</p>
            <p className="mt-1 font-medium">
              {new Date(submission.updatedAt).toLocaleString()}
            </p>
          </div>
        </div>
      </section>

      {/* Project description and links */}
      <section className="space-y-5 rounded-xl border bg-card p-6">
        <h2 className="text-lg font-semibold">About the project</h2>

        <p className="whitespace-pre-wrap wrap-break-word text-sm leading-7 text-muted-foreground">
          {submission.description}
        </p>

        <div className="flex flex-wrap gap-3 border-t pt-5">
          <a
            href={submission.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            <GitBranchPlus className="h-4 w-4" />
            View repository
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          <a
            href={submission.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            View live project
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>

      {/* Review form */}
      <section className="space-y-4 rounded-xl border bg-card p-6">
        <div>
          <h2 className="text-lg font-semibold">Review submission</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Give the student clear and constructive feedback.
          </p>
        </div>

        {canReview ? (
          <>
            <div className="space-y-2">
              <label
                htmlFor="review-comment"
                className="text-sm font-medium"
              >
                Feedback <span className="text-destructive">*</span>
              </label>

              <textarea
                id="review-comment"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="Explain what was done well and what could be improved..."
                rows={5}
                maxLength={2000}
                disabled={reviewMutation.isPending}
                className="w-full resize-y rounded-md border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
              />

              <p className="text-right text-xs text-muted-foreground">
                {comment.length}/2000 characters
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => handleReview("APPROVED")}
                disabled={
                  reviewMutation.isPending || !comment.trim()
                }
                className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {reviewMutation.isPending
                  ? "Submitting..."
                  : "Approve submission"}
              </button>

              <button
                type="button"
                onClick={() => handleReview("REJECTED")}
                disabled={
                  reviewMutation.isPending || !comment.trim()
                }
                className="rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {reviewMutation.isPending
                  ? "Submitting..."
                  : "Reject submission"}
              </button>
            </div>
          </>
        ) : (
          <div className="rounded-lg bg-muted p-4 text-sm">
            This submission has already been{" "}
            <strong>{submission.status.toLowerCase()}</strong>. It cannot be
            reviewed again from this page.
          </div>
        )}
      </section>

      {/* Feedback history */}
      <section className="space-y-4 rounded-xl border bg-card p-6">
        <h2 className="text-lg font-semibold">Feedback history</h2>

        {submission.feedback?.length ? (
          <div className="space-y-4">
            {submission.feedback.map((singleFeedBack:any) => (
              <article
                key={singleFeedBack.id}
                className="rounded-lg border p-4"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-medium">
                    {singleFeedBack.mentor.name}
                  </p>

                  <time
                    dateTime={singleFeedBack.createdAt}
                    className="text-xs text-muted-foreground"
                  >
                    {new Date(singleFeedBack.createdAt).toLocaleString()}
                  </time>
                </div>

                <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                  {singleFeedBack.comment}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No feedback has been recorded for this submission yet.
          </p>
        )}
      </section>
    </div>
  );
}