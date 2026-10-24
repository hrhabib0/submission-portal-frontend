
"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";


import { useLogin } from "@/hooks";
import { getApiErrorMessage } from "@/lib/apiError";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function LoginPage() {
  const router = useRouter();
  const loginMutation = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await loginMutation.mutateAsync({
          email: value.email.trim(),
          password: value.password,
        });

        toast.success(response.message || "Welcome back!");

        const role = response.data.role;

        router.replace(
          role === "MENTOR"
            ? "/mentor/dashboard"
            : "/student/dashboard",
        );
      } catch (error) {
        toast.error(getApiErrorMessage(error, "Unable to sign in."));
      }
    },
  });

  return (
    <main className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-2">
      {/* Left branding panel */}
      <section className="relative hidden min-h-screen overflow-hidden bg-slate-950 p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
        <div className="absolute -right-32 -top-32 size-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-24 size-96 rounded-full bg-indigo-500/20 blur-3xl" />

        <Link href="/" className="relative flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-950/40">
            <ClipboardCheck className="size-6" />
          </div>
          <div>
            <p className="text-base font-semibold tracking-tight">
              ProjectHub
            </p>
            <p className="text-xs text-slate-400">
              Submission & Review Platform
            </p>
          </div>
        </Link>

        <div className="relative max-w-xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-blue-200">
            <span className="size-2 rounded-full bg-blue-400" />
            Your next milestone starts here
          </div>

          <h1 className="text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">
            Great projects deserve
            <span className="mt-2 block text-blue-400">
              great feedback.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-slate-400">
            Submit your work, receive meaningful feedback, and track
            your progress from submission to approval—all in one place.
          </p>

          <div className="mt-10 space-y-4">
            {[
              "Submit and manage your projects",
              "Get feedback from mentors",
              "Track your review status",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="size-5 shrink-0 text-blue-400" />
                <span className="text-sm text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-slate-500">
          A better way to submit, review, and improve.
        </p>
      </section>

      {/* Login panel */}
      <section className="flex min-h-screen flex-col px-5 py-8 sm:px-10 lg:justify-center lg:px-12 xl:px-20">
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center lg:flex-none">
          {/* Mobile branding */}
          <Link href="/" className="mb-10 flex items-center gap-3 lg:hidden">
            <div className="flex size-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <ClipboardCheck className="size-5" />
            </div>
            <div>
              <p className="font-semibold tracking-tight text-slate-900">
                ProjectHub
              </p>
              <p className="text-xs text-slate-500">
                Submission & Review Platform
              </p>
            </div>
          </Link>

          <div className="mb-8">
            <p className="mb-3 text-sm font-medium text-blue-600">
              Welcome back
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
              Sign in to your account
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Enter your credentials to continue to your dashboard.
            </p>
          </div>

          <form
            className="space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              void form.handleSubmit();
            }}
          >
            <form.Field
              name="email"
              validators={{
                onBlur: ({ value }) => {
                  if (!value.trim()) return "Email is required.";
                  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
                    return "Enter a valid email address.";
                  }
                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name} className="text-slate-700">
                    Email address
                  </Label>

                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      aria-invalid={
                        field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0
                      }
                      className="h-11 border-slate-200 bg-white pl-10 shadow-sm focus-visible:ring-blue-500"
                    />
                  </div>

                  {field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0 && (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors.join(", ")}
                      </p>
                    )}
                </div>
              )}
            </form.Field>

            <form.Field
              name="password"
              validators={{
                onBlur: ({ value }) =>
                  value.length === 0
                    ? "Password is required."
                    : undefined,
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={field.name} className="text-slate-700">
                      Password
                    </Label>
                  </div>

                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      aria-invalid={
                        field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0
                      }
                      className="h-11 border-slate-200 bg-white pl-10 pr-11 shadow-sm focus-visible:ring-blue-500"
                    />

                    <button
                      type="button"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword((previous) => !previous)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-sm p-1 text-slate-400 transition-colors hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>

                  {field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0 && (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors.join(", ")}
                      </p>
                    )}
                </div>
              )}
            </form.Field>

            <Button
              type="submit"
              disabled={loginMutation.isPending}
              className="h-11 w-full bg-blue-600 font-medium shadow-sm transition-colors hover:bg-blue-700"
            >
              {loginMutation.isPending ? (
                "Signing in..."
              ) : (
                <>
                  Sign in
                  <ArrowRight className="ml-2 size-4" />
                </>
              )}
            </Button>
          </form>

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-slate-400">NEW TO PROJECTHUB?</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <p className="text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-blue-600 underline-offset-4 hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>

        <footer className="mx-auto mt-8 w-full max-w-md text-center text-xs text-slate-400">
          © 2026 ProjectHub. Built for better learning.
        </footer>
      </section>
    </main>
  );
}
