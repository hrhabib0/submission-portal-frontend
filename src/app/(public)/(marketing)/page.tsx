
"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CircleCheck,
  Clock3,
  Code2,
  FileCheck2,
  GitPullRequest,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Zap,
} from "lucide-react";

import { useCurrentUser } from "@/hooks";

const features = [
  {
    icon: GitPullRequest,
    title: "Easy project submission",
    description:
      "Submit your project repository, live demo, and project description in one simple form.",
    iconClass: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: MessageSquareText,
    title: "Meaningful feedback",
    description:
      "Receive clear, actionable feedback from mentors to understand what you did well and what to improve.",
    iconClass: "bg-violet-500/10 text-violet-600",
  },
  {
    icon: ShieldCheck,
    title: "Transparent reviews",
    description:
      "Track your submission status and see review feedback in one organized workspace.",
    iconClass: "bg-emerald-500/10 text-emerald-600",
  },
];

const steps = [
  {
    number: "01",
    icon: Code2,
    title: "Build your project",
    description:
      "Create your project, push your code to GitHub, and deploy a live version.",
  },
  {
    number: "02",
    icon: FileCheck2,
    title: "Submit for review",
    description:
      "Share your project links and description with your mentor through the platform.",
  },
  {
    number: "03",
    icon: CircleCheck,
    title: "Learn and improve",
    description:
      "Review your feedback, make improvements, and keep growing as a developer.",
  },
];

export default function HomePage() {
  const { data: user, isPending } = useCurrentUser();

  const isAuthenticated = Boolean(user);

  const dashboardHref =
    user?.role === "MENTOR"
      ? "/mentor/dashboard"
      : "/student/dashboard";

  const primaryHref = isAuthenticated ? dashboardHref : "/register";

  const primaryLabel = isAuthenticated
    ? "Go to your dashboard"
    : "Get started for free";

  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <section className="relative isolate border-b">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -top-32 left-1/2 size-[440px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl sm:size-[600px]" />
          <div className="absolute right-0 top-40 size-64 rounded-full bg-blue-400/10 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-28">
          {/* Hero copy */}
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-3.5 py-2 text-xs font-medium shadow-sm sm:text-sm">
              <Sparkles className="size-4 text-primary" />
              <span>One platform. Better project reviews.</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.1]">
              Your projects deserve{" "}
              <span className="text-primary">better feedback.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8 lg:mx-0">
              Submit your work, get constructive feedback from mentors, and
              turn every project into an opportunity to become a better
              developer.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Link
                href={primaryHref}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
              >
                {isPending && !isAuthenticated
                  ? "Loading..."
                  : primaryLabel}
                <ArrowRight className="size-4" />
              </Link>

              {!isAuthenticated && (
                <Link
                  href="/login"
                  className="inline-flex h-12 items-center justify-center rounded-lg border bg-background px-6 text-sm font-semibold transition-colors hover:bg-muted"
                >
                  Sign in
                </Link>
              )}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm text-muted-foreground lg:justify-start">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" />
                Simple submissions
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" />
                Clear feedback
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" />
                Progress tracking
              </span>
            </div>
          </div>

          {/* Dashboard preview */}
          <div className="mx-auto w-full max-w-xl lg:max-w-none">
            <div className="relative rounded-2xl border bg-background p-3 shadow-2xl shadow-primary/10 sm:p-5">
              <div className="flex items-center justify-between gap-3 border-b pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Zap className="size-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Project workspace</p>
                    <p className="text-xs text-muted-foreground">
                      Your work, all in one place
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  Overview
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 py-5">
                <div className="rounded-xl border bg-muted/30 p-4">
                  <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
                    <FileCheck2 className="size-4" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Submissions
                  </p>
                  <p className="mt-1 text-xl font-bold">Your projects</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Organized and accessible
                  </p>
                </div>

                <div className="rounded-xl border bg-muted/30 p-4">
                  <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
                    <MessageSquareText className="size-4" />
                  </div>
                  <p className="text-sm text-muted-foreground">Mentor review</p>
                  <p className="mt-1 text-xl font-bold">Actionable insights</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Feedback you can use
                  </p>
                </div>
              </div>

              <div className="rounded-xl border p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">Project review workflow</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      From submission to improvement
                    </p>
                  </div>
                  <Clock3 className="size-5 text-muted-foreground" />
                </div>

                <div className="mt-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
                      <Code2 className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">Project submitted</p>
                      <p className="text-xs text-muted-foreground">
                        Repository and live demo shared
                      </p>
                    </div>
                    <CheckCircle2 className="size-5 shrink-0 text-emerald-600" />
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
                      <UsersRound className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">Mentor review</p>
                      <p className="text-xs text-muted-foreground">
                        Feedback and review status
                      </p>
                    </div>
                    <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                      Workflow
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600">
                      <Sparkles className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">Improve your work</p>
                      <p className="text-xs text-muted-foreground">
                        Apply feedback and grow your skills
                      </p>
                    </div>
                    <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
                  </div>
                </div>
              </div>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                A clearer process for students and mentors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Why ProjectPortal?
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to move forward
          </h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            Spend less time managing submissions and more time learning,
            building, and improving your work.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="group rounded-2xl border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 sm:p-7"
              >
                <div
                  className={`flex size-12 items-center justify-center rounded-xl ${feature.iconClass}`}
                >
                  <Icon className="size-6" />
                </div>

                <h3 className="mt-5 text-lg font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {feature.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-medium text-primary opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
                  Built for better learning
                  <ArrowRight className="size-4" />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              How it works
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              From your first submission to your next improvement
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              A straightforward workflow that keeps your projects and
              feedback organized.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-16">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.number}
                  className="relative rounded-2xl border bg-background p-6 sm:p-7"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <span className="text-3xl font-bold tracking-tight text-muted-foreground/30">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-semibold">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {step.description}
                  </p>

                  {index < steps.length - 1 && (
                    <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden size-6 -translate-y-1/2 rounded-full border bg-background p-1 text-muted-foreground md:block" />
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final call to action */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-primary px-6 py-12 text-center text-primary-foreground sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full border border-white/10 sm:size-80"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-36 -left-16 size-72 rounded-full border border-white/10"
          />

          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-white/15">
              <Zap className="size-6" />
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to take your projects further?
            </h2>

            <p className="mt-4 text-sm leading-7 text-primary-foreground/80 sm:text-base">
              Start submitting your work, get constructive feedback, and
              make every project a step toward becoming a stronger developer.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href={primaryHref}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:bg-background/90"
              >
                {primaryLabel}
                <ArrowRight className="size-4" />
              </Link>

              {!isAuthenticated && (
                <Link
                  href="/login"
                  className="inline-flex h-12 items-center justify-center rounded-lg border border-white/30 px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-white/10"
                >
                  Already have an account?
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
