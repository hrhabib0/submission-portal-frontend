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
  Sparkles,
  UserRound,
} from "lucide-react";

import { useRegister } from "@/hooks";
import { getApiErrorMessage } from "@/lib/apiError";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const router = useRouter();
  const registerMutation = useRegister();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    onSubmit: async ({ value }) => {
      if (value.password !== value.confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }

      try {
        const response = await registerMutation.mutateAsync({
          name: value.name.trim(),
          email: value.email.trim().toLowerCase(),
          password: value.password,
        });

        toast.success(response.message || "Account created successfully!");

        // Registration does not automatically log the user in.
        router.push("/login");
      } catch (error) {
        toast.error(getApiErrorMessage(error, "Registration failed."));
      }
    },
  });

  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-2xl border bg-card shadow-sm lg:min-h-190 lg:grid-cols-2">
        {/* Branding panel */}
        <section className="relative hidden flex-col justify-between overflow-hidden border-r bg-muted/20 p-10 lg:flex xl:p-14">
          <div className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-24 size-80 rounded-full bg-blue-500/10 blur-3xl" />

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

          <div className="relative max-w-md py-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-3.5 py-2 text-sm font-medium text-primary shadow-sm">
              <Sparkles className="size-4" />
              Start your learning journey
            </div>

            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground xl:text-5xl">
              Your ideas deserve
              <span className="mt-2 block text-primary">
                a place to grow.
              </span>
            </h1>

            <p className="mt-5 text-sm leading-7 text-muted-foreground xl:text-base">
              Create your student account, share your projects, and
              turn valuable mentor feedback into your next milestone.
            </p>

            <div className="mt-9 space-y-5">
              {[
                {
                  title: "Share your work",
                  description: "Submit projects and keep them organized.",
                },
                {
                  title: "Receive meaningful feedback",
                  description: "Learn from reviews and improve your skills.",
                },
                {
                  title: "Track your progress",
                  description: "Follow your submissions from review to decision.",
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
          </div>

          <p className="relative text-xs text-muted-foreground">
            ProjectHub · Built for better learning.
          </p>
        </section>

        {/* Registration panel */}
        <section className="flex flex-col justify-center p-5 sm:p-9 lg:p-10 xl:p-14">
          {/* Mobile branding */}
          <Link
            href="/"
            className="mb-8 flex w-fit items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
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

          <div className="mb-7">
            <div className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-primary">
              <span className="size-1.5 rounded-full bg-primary" />
              GET STARTED
            </div>

            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Create your account
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Join ProjectHub to submit your projects and receive mentor feedback.
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();
                void form.handleSubmit();
              }}
            >
              {/* Full name */}
              <form.Field
                name="name"
                validators={{
                  onBlur: ({ value }) =>
                    !value.trim()
                      ? "Name is required."
                      : value.trim().length < 2
                        ? "Name must be at least 2 characters."
                        : undefined,
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Full name</Label>

                    <div className="relative">
                      <UserRound className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id={field.name}
                        name={field.name}
                        placeholder="Enter your full name"
                        autoComplete="name"
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

              {/* Email */}
              <form.Field
                name="email"
                validators={{
                  onBlur: ({ value }) =>
                    !value.trim()
                      ? "Email is required."
                      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
                        ? "Enter a valid email address."
                        : undefined,
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
                        placeholder="you@example.com"
                        autoComplete="email"
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

              {/* Password */}
              <form.Field
                name="password"
                validators={{
                  onBlur: ({ value }) =>
                    value.length < 8
                      ? "Password must be at least 8 characters."
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
                        placeholder="Create a password"
                        autoComplete="new-password"
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
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        onClick={() => setShowPassword((previous) => !previous)}
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

              {/* Confirm password */}
              <form.Field
                name="confirmPassword"
                validators={{
                  onBlur: ({ value }) =>
                    !value
                      ? "Please confirm your password."
                      : value !== form.getFieldValue("password")
                        ? "Passwords do not match."
                        : undefined,
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Confirm password</Label>

                    <div className="relative">
                      <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id={field.name}
                        name={field.name}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Enter your password again"
                        autoComplete="new-password"
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
                          showConfirmPassword
                            ? "Hide confirm password"
                            : "Show confirm password"
                        }
                        onClick={() =>
                          setShowConfirmPassword((previous) => !previous)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {showConfirmPassword ? (
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
                disabled={registerMutation.isPending}
                className="h-11 w-full font-medium shadow-sm"
              >
                {registerMutation.isPending ? (
                  "Creating account..."
                ) : (
                  <>
                    Create account
                    <ArrowRight className="ml-2 size-4" />
                  </>
                )}
              </Button>

              <p className="flex items-center justify-center gap-2 pt-1 text-xs text-muted-foreground">
                <LockKeyhole className="size-3.5" />
                Your information is handled securely.
              </p>
            </form>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </p>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            © 2026 ProjectHub. Built for better learning.
          </p>
        </section>
      </div>
    </main>
  );
}
