"use client";

import { useState } from "react";
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
  ShieldCheck,
  Sparkles,
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
    <main className="min-h-screen bg-background px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-2xl border bg-card shadow-sm lg:min-h-190 lg:grid-cols-2">
        {/* Branding panel */}
      <section className="relative hidden min-h-screen flex-col justify-between overflow-hidden border-r bg-card p-10 lg:flex xl:p-14">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-24 size-96 rounded-full bg-blue-500/10 blur-3xl" />

        {/* Brand */}
        <Link
          href="/"
          className="relative flex w-fit items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <ClipboardCheck className="size-6" />
          </div>

          <div>
            <p className="text-base font-bold tracking-tight text-foreground">
              ProjectHub
            </p>
            <p className="text-xs text-muted-foreground">
              Submission &amp; Review Platform
            </p>
          </div>
        </Link>

        {/* Main message */}
        <div className="relative max-w-xl py-12">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/70 px-3.5 py-2 text-sm font-medium text-primary shadow-sm">
            <Sparkles className="size-4" />
            Your next milestone starts here
          </div>

          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground xl:text-5xl">
            Great projects deserve
            <span className="mt-2 block text-primary">
              great feedback.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground">
            Submit your work, receive meaningful feedback, and track
            your progress from submission to approval—all in one place.
          </p>

          <div className="mt-10 space-y-5">
            {[
              {
                title: "Submit and manage projects",
                description: "Keep your work organized in one place.",
              },
              {
                title: "Learn from mentor feedback",
                description: "Turn suggestions into meaningful progress.",
              },
              {
                title: "Track your review status",
                description: "Stay informed about every submission.",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3.5">
                <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <CheckCircle2 className="size-5" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm leading-5 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust note */}
          <div className="mt-10 flex items-center gap-2 border-t pt-6 text-xs text-muted-foreground">
            <ShieldCheck className="size-4 text-primary" />
            A dedicated workspace for learning and project reviews.
          </div>
        </div>

        <p className="relative text-xs text-muted-foreground">
          © 2026 ProjectHub. Built for better learning.
        </p>
      </section>

      {/* Login panel */}
      <section className="flex min-h-screen flex-col px-5 py-8 sm:px-10 lg:justify-center lg:px-12 xl:px-20">
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center lg:flex-none">
          {/* Mobile branding */}
          <Link
            href="/"
            className="mb-10 flex w-fit items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <ClipboardCheck className="size-5" />
            </div>

            <div>
              <p className="font-bold tracking-tight text-foreground">
                ProjectHub
              </p>
              <p className="text-xs text-muted-foreground">
                Submission &amp; Review Platform
              </p>
            </div>
          </Link>

          {/* Heading */}
          <div className="mb-8">
            <div className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-primary">
              <span className="size-1.5 rounded-full bg-primary" />
              Welcome back
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Sign in to your account
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Enter your credentials to continue to your workspace.
            </p>
          </div>

          {/* Form card */}
          <div className="rounded-2xl border bg-card p-5 shadow-sm sm:p-7">
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
                    <Label htmlFor={field.name}>Email address</Label>

                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

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
                        className="h-11 bg-background pl-10 shadow-none"
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
                    <Label htmlFor={field.name}>Password</Label>

                    <div className="relative">
                      <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

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
                        className="h-11 bg-background pl-10 pr-11 shadow-none"
                      />

                      <button
                        type="button"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        onClick={() =>
                          setShowPassword((previous) => !previous)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                className="h-11 w-full font-medium shadow-sm"
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

              <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="size-3.5" />
                Your account is protected by secure authentication.
              </p>
            </form>
          </div>

          {/* Registration link */}
          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-[10px] font-medium tracking-wider text-muted-foreground">
              NEW TO PROJECTHUB?
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>

        <footer className="mx-auto mt-8 w-full max-w-md text-center text-xs text-muted-foreground">
          © 2026 ProjectHub. Built for better learning.
        </footer>
      </section>
      </div>
      
    </main>
  );
}
