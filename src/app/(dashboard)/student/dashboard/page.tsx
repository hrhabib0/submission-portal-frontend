
"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FolderOpen,
  Plus,
  RefreshCw,
  Sparkles,
} from "lucide-react";

import { useMySubmissions } from "@/hooks";
import type { Submission } from "@/types/submission.types";

const statStyles = {
  total: {
    icon: FolderOpen,
    iconClass: "bg-primary/10 text-primary",
  },
  pending: {
    icon: Clock3,
    iconClass: "bg-amber-500/10 text-amber-600",
  },
  approved: {
    icon: CheckCircle2,
    iconClass: "bg-emerald-500/10 text-emerald-600",
  },
};

export default function StudentDashboardPage() {
  const {
    data: response,
    isPending,
    isError,
    refetch,
    isFetching,
  } = useMySubmissions(1, 100);

  const submissions: Submission[] = response?.data ?? [];

  const stats = [
    {
      label: "Total Submissions",
      value: submissions.length,
      description: "Your submitted projects",
      ...statStyles.total,
    },
    {
      label: "Pending Reviews",
      value: submissions.filter(
        (submission) => submission.status === "PENDING",
      ).length,
      description: "Waiting for mentor review",
      ...statStyles.pending,
    },
    {
      label: "Approved Projects",
      value: submissions.filter(
        (submission) => submission.status === "APPROVED",
      ).length,
      description: "Projects approved by mentors",
      ...statStyles.approved,
    },
  ];

  if (isError) {
    return (
      <section className="rounded-2xl border border-destructive/20 bg-card p-6 sm:p-8">
        <div className="flex size-11 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
          <FolderOpen className="size-5" />
        </div>

        <h2 className="mt-4 text-lg font-semibold">
          Unable to load your dashboard
        </h2>

        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          We couldn&apos;t retrieve your submissions. Please check your
          connection and try again.
        </p>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            className={`size-4 ${isFetching ? "animate-spin" : ""}`}
          />
          {isFetching ? "Retrying..." : "Try again"}
        </button>
      </section>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page heading */}
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-xs font-medium text-primary sm:text-sm">
            <Sparkles className="size-3.5" />
            STUDENT WORKSPACE
          </div>

          <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
            Student Dashboard
          </h1>

          <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
            Submit your work, track reviews, and keep improving your projects.
          </p>
        </div>

        <Link
          href="/student/submissions/new"
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
        >
          <Plus className="size-4" />
          Submit a project
        </Link>
      </section>

      {/* Statistics */}
      <section
        aria-label="Submission statistics"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.label}
              className="rounded-2xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>

                  <p className="mt-3 text-3xl font-bold tracking-tight">
                    {isPending ? "—" : stat.value}
                  </p>
                </div>

                <div
                  className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${stat.iconClass}`}
                >
                  <Icon className="size-5" />
                </div>
              </div>

              <p className="mt-3 text-xs leading-5 text-muted-foreground">
                {stat.description}
              </p>
            </article>
          );
        })}
      </section>

      {/* Main content */}
      <section className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        {/* Submission CTA */}
        <article className="relative overflow-hidden rounded-2xl border bg-card p-6 sm:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-primary/5 blur-2xl"
          />

          <div className="relative">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FolderOpen className="size-5" />
            </div>

            <h2 className="mt-5 text-lg font-semibold">
              Ready to submit your work?
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-7 text-muted-foreground">
              Share your project name, repository, live demo, and description.
              Your mentor can then review your work and provide useful feedback.
            </p>

            <Link
              href="/student/submissions/new"
              className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Create submission
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </article>

        {/* Workflow card */}
        <article className="rounded-2xl border bg-muted/30 p-6 sm:p-7">
          <h2 className="font-semibold">Your review journey</h2>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Follow these steps to get the most out of your projects.
          </p>

          <div className="mt-6 space-y-5">
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
                <FolderOpen className="size-4" />
              </div>

              <div>
                <p className="text-sm font-medium">Submit your project</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Add your repository and live demo links.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
                <Clock3 className="size-4" />
              </div>

              <div>
                <p className="text-sm font-medium">Wait for mentor review</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Track your submission status on your dashboard.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
                <CheckCircle2 className="size-4" />
              </div>

              <div>
                <p className="text-sm font-medium">Learn from feedback</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Apply suggestions and improve your next project.
                </p>
              </div>
            </div>
          </div>
        </article>
      </section>

      {/* Bottom information */}
      <section className="rounded-2xl border bg-muted/30 p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold">Keep building. Keep improving.</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Every submission is an opportunity to learn something new.
            </p>
          </div>

          <Link
            href="/student/submissions"
            className="inline-flex h-9 items-center justify-center gap-2 self-start rounded-lg border bg-background px-3 text-sm font-medium transition-colors hover:bg-muted sm:self-auto"
          >
            My submissions
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
