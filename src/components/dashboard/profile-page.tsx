
"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BriefcaseBusiness,
  GraduationCap,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useCurrentUser } from "@/hooks";


export default function ProfilePage() {
  const {
    data: user,
    isPending,
    isError,
  } = useCurrentUser();

  if (isPending) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-40 animate-pulse rounded-md bg-muted" />
        <div className="h-48 animate-pulse rounded-2xl border bg-muted/30" />
        <div className="h-56 animate-pulse rounded-2xl border bg-muted/30" />
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-center">
        <div className="rounded-full bg-destructive/10 p-4 text-destructive">
          <UserRound className="size-7" />
        </div>

        <h2 className="text-lg font-semibold">
          Unable to load profile
        </h2>

        <p className="max-w-sm text-sm text-muted-foreground">
          We couldn't retrieve your account information. Please try again later.
        </p>
      </div>
    );
  }

  const isMentor = user.role === "MENTOR";
  const roleLabel = isMentor ? "Mentor" : "Student";
  const initials = user.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part: string) => part.charAt(0).toUpperCase())
    .join("");

  const dashboardHref = isMentor
    ? "/mentor/dashboard"
    : "/student/dashboard";

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      {/* Page heading */}
      <div className="space-y-1">
        <Link
          href={dashboardHref}
          className="mb-3 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Dashboard
        </Link>

        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          My Profile
        </h1>

        <p className="text-sm text-muted-foreground sm:text-base">
          View your personal information and account details.
        </p>
      </div>

      {/* Profile overview */}
      <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="h-24 bg-primary/10 sm:h-32" />

        <div className="px-5 pb-6 sm:px-8">
          <div className="-mt-10 flex flex-col gap-4 sm:-mt-12 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl border-4 border-card bg-primary text-2xl font-bold text-primary-foreground shadow-sm sm:size-24 sm:text-3xl">
                {initials || <UserRound className="size-10" />}
              </div>

              <div className="min-w-0 pb-1">
                <h2 className="break-words text-xl font-bold sm:text-2xl">
                  {user.name}
                </h2>

                <p className="mt-1 break-all text-sm text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-full border bg-muted/40 px-3 py-1.5 text-sm font-medium">
              {isMentor ? (
                <BriefcaseBusiness className="size-4 text-primary" />
              ) : (
                <GraduationCap className="size-4 text-primary" />
              )}
              {roleLabel} Account
            </div>
          </div>
        </div>
      </section>

      {/* Personal information */}
      <section className="rounded-2xl border bg-card p-5 shadow-sm sm:p-7">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
            <UserRound className="size-5" />
          </div>

          <div>
            <h2 className="font-semibold">Personal Information</h2>
            <p className="text-sm text-muted-foreground">
              Your basic account information.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-xl border bg-muted/20 p-4">
            <UserRound className="mt-0.5 size-5 shrink-0 text-muted-foreground" />

            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">
                Full Name
              </p>
              <p className="mt-1 break-words font-medium">
                {user.name}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border bg-muted/20 p-4">
            <Mail className="mt-0.5 size-5 shrink-0 text-muted-foreground" />

            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">
                Email Address
              </p>
              <p className="mt-1 break-all font-medium">
                {user.email}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Account information */}
      <section className="rounded-2xl border bg-card p-5 shadow-sm sm:p-7">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
            <ShieldCheck className="size-5" />
          </div>

          <div>
            <h2 className="font-semibold">Account Information</h2>
            <p className="text-sm text-muted-foreground">
              Your ProjectHub account details.
            </p>
          </div>
        </div>

        <div className="divide-y rounded-xl border">
          <div className="flex items-center justify-between gap-4 p-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Account Role
              </p>
              <p className="mt-1 font-medium">{roleLabel}</p>
            </div>

            {isMentor ? (
              <BriefcaseBusiness className="size-5 text-muted-foreground" />
            ) : (
              <GraduationCap className="size-5 text-muted-foreground" />
            )}
          </div>

          <div className="flex items-center justify-between gap-4 p-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Account Email
              </p>
              <p className="mt-1 break-all font-medium">
                {user.email}
              </p>
            </div>

            <Mail className="size-5 shrink-0 text-muted-foreground" />
          </div>
        </div>
      </section>

      <p className="text-center text-xs text-muted-foreground">
        Profile editing will be available in a future update.
      </p>
    </div>
  );
}
