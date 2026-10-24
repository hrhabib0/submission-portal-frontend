
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  UserRound,
  Mail,
} from "lucide-react";
import { toast } from "sonner";

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

        toast.success(
          response.message || "Account created successfully!",
        );

        // Registration does not log the user in.
        // Redirect to login after successful registration.
        router.push("/login");
      } catch (error) {
        toast.error(getApiErrorMessage(error, "Registration failed."));
      }
    },
  });

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:py-16">
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-2">
        {/* Left panel */}
        <section className="hidden flex-col justify-between bg-slate-950 p-10 text-white lg:flex">
          <Link href="/" className="text-xl font-bold tracking-tight">
            ProjectHub<span className="text-blue-400">.</span>
          </Link>

          <div className="max-w-sm">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-400">
              <UserRound size={28} />
            </div>

            <h1 className="text-3xl font-semibold leading-tight">
              Share your work.
              <br />
              Get meaningful feedback.
            </h1>

            <p className="mt-4 leading-7 text-slate-400">
              Create your student account, submit your projects, and
              track feedback from your mentors in one place.
            </p>

            <div className="mt-8 space-y-4 text-sm text-slate-300">
              <p className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                Submit your projects for review
              </p>
              <p className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                Track approval status
              </p>
              <p className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                Improve with mentor feedback
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-500">
            ProjectHub · Project Submission Dashboard
          </p>
        </section>

        {/* Registration form */}
        <section className="p-6 sm:p-10 lg:p-12">
          <div className="mb-8 lg:hidden">
            <Link href="/" className="text-xl font-bold text-slate-900">
              ProjectHub<span className="text-blue-600">.</span>
            </Link>
          </div>

          <div className="mb-8">
            <p className="text-sm font-medium text-blue-600">
              GET STARTED
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Create your account
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Register as a student to start submitting your projects.
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
            {/* Name */}
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
                    <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="Enter your full name"
                      autoComplete="name"
                      className="h-11 pl-10"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                    />
                  </div>
                  {field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0 && (
                      <p className="text-xs text-red-600">
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
                    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                      ? "Enter a valid email address."
                      : undefined,
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Email address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="h-11 pl-10"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                    />
                  </div>
                  {field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0 && (
                      <p className="text-xs text-red-600">
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
                    <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      autoComplete="new-password"
                      className="h-11 pl-10 pr-11"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword((previous) => !previous)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0 && (
                      <p className="text-xs text-red-600">
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
                    <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Enter your password again"
                      autoComplete="new-password"
                      className="h-11 pl-10 pr-11"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
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
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  {field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0 && (
                      <p className="text-xs text-red-600">
                        {field.state.meta.errors.join(", ")}
                      </p>
                    )}
                </div>
              )}
            </form.Field>

            <Button
              type="submit"
              className="h-11 w-full bg-blue-600 font-medium hover:bg-blue-700"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending
                ? "Creating account..."
                : "Create account"}
              {!registerMutation.isPending && (
                <ArrowRight className="ml-2 h-4 w-4" />
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Sign in
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
