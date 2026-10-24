"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  GitBranchPlus,
  Send,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import { useCreateSubmission } from "@/hooks";
import { getApiErrorMessage } from "@/lib/apiError";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewSubmissionPage() {
  const router = useRouter();
  const createSubmissionMutation = useCreateSubmission();

  const form = useForm({
    defaultValues: {
      projectName: "",
      repoUrl: "",
      liveUrl: "",
      description: "",
    },

    onSubmit: async ({ value }) => {
      try {
        await createSubmissionMutation.mutateAsync({
          projectName: value.projectName.trim(),
          repoUrl: value.repoUrl.trim(),
          liveUrl: value.liveUrl.trim(),
          description: value.description.trim(),
        });

        toast.success("Your project was submitted successfully!");
        router.push("/student/submissions");
      } catch (error) {
        toast.error(
          getApiErrorMessage(error, "Unable to submit your project."),
        );
      }
    },
  });

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 pb-8">
      {/* Back navigation */}
      <Link
        href="/student/dashboard"
        className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
        Back to dashboard
      </Link>

      {/* Page heading */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary">
          <GitBranchPlus className="size-3.5" />
          PROJECT SUBMISSION
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Submit your project
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Showcase your work by sharing your project details, repository,
            and live demo for your mentor to review.
          </p>
        </div>
      </div>

      {/* Submission form */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void form.handleSubmit();
        }}
        className="overflow-hidden rounded-2xl border bg-card shadow-sm"
      >
        <div className="space-y-7 p-5 sm:p-8">
          {/* Project name */}
          <form.Field
            name="projectName"
            validators={{
              onBlur: ({ value }) =>
                !value.trim()
                  ? "Project name is required."
                  : value.trim().length < 3
                    ? "Project name must be at least 3 characters."
                    : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>
                  Project name <span className="text-destructive">*</span>
                </Label>

                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="e.g. Student Management Dashboard"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) =>
                    field.handleChange(event.target.value)
                  }
                  aria-invalid={
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0
                  }
                  className="h-11 bg-background"
                />

                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <p className="text-xs font-medium text-destructive">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
              </div>
            )}
          </form.Field>

          {/* Repository URL */}
          <form.Field
            name="repoUrl"
            validators={{
              onBlur: ({ value }) => {
                if (!value.trim()) {
                  return "Repository URL is required.";
                }

                try {
                  const url = new URL(value);

                  if (
                    url.protocol !== "https:" ||
                    url.hostname !== "github.com"
                  ) {
                    return "Enter a valid HTTPS GitHub repository URL.";
                  }
                } catch {
                  return "Enter a valid repository URL.";
                }

                return undefined;
              },
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>
                  GitHub repository URL{" "}
                  <span className="text-destructive">*</span>
                </Label>

                <div className="relative">
                  <GitBranchPlus className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id={field.name}
                    name={field.name}
                    type="url"
                    placeholder="https://github.com/username/repository"
                    className="h-11 bg-background pl-10"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) =>
                      field.handleChange(event.target.value)
                    }
                    aria-invalid={
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0
                    }
                  />
                </div>

                <p className="text-xs text-muted-foreground">
                  Make sure your mentor can access the repository.
                </p>

                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <p className="text-xs font-medium text-destructive">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
              </div>
            )}
          </form.Field>

          {/* Live URL */}
          <form.Field
            name="liveUrl"
            validators={{
              onBlur: ({ value }) => {
                if (!value.trim()) {
                  return "Live project URL is required.";
                }

                try {
                  const url = new URL(value);

                  if (
                    url.protocol !== "https:" &&
                    url.protocol !== "http:"
                  ) {
                    return "Enter a valid HTTP or HTTPS URL.";
                  }
                } catch {
                  return "Enter a valid live project URL.";
                }

                return undefined;
              },
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>
                  Live project URL{" "}
                  <span className="text-destructive">*</span>
                </Label>

                <div className="relative">
                  <ExternalLink className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id={field.name}
                    name={field.name}
                    type="url"
                    placeholder="https://your-project.vercel.app"
                    className="h-11 bg-background pl-10"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) =>
                      field.handleChange(event.target.value)
                    }
                    aria-invalid={
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0
                    }
                  />
                </div>

                <p className="text-xs text-muted-foreground">
                  Provide a working deployment link so your mentor can test
                  your project.
                </p>

                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <p className="text-xs font-medium text-destructive">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
              </div>
            )}
          </form.Field>

          {/* Project description */}
          <form.Field
            name="description"
            validators={{
              onBlur: ({ value }) =>
                !value.trim()
                  ? "Project description is required."
                  : value.trim().length < 20
                    ? "Description must be at least 20 characters."
                    : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>
                  Project description{" "}
                  <span className="text-destructive">*</span>
                </Label>

                <Textarea
                  id={field.name}
                  name={field.name}
                  placeholder="Describe your project, its main features, the problems it solves, and the technologies you used..."
                  rows={6}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) =>
                    field.handleChange(event.target.value)
                  }
                  aria-invalid={
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0
                  }
                  className="resize-y bg-background leading-6"
                />

                <div className="flex items-start justify-between gap-3">
                  <div>
                    {field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0 && (
                        <p className="text-xs font-medium text-destructive">
                          {field.state.meta.errors.join(", ")}
                        </p>
                      )}
                  </div>

                  <p className="shrink-0 text-xs tabular-nums text-muted-foreground">
                    {field.state.value.length} characters
                  </p>
                </div>
              </div>
            )}
          </form.Field>

          {/* Submission information */}
          <div className="space-y-4 rounded-xl border bg-muted/30 p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Lightbulb className="size-4" />
              </div>

              <div className="space-y-1">
                <h2 className="text-sm font-semibold text-foreground">
                  Before submitting
                </h2>
                <p className="text-sm leading-6 text-muted-foreground">
                  Check that your GitHub repository is accessible and your
                  live project opens correctly. Give your mentor a clear
                  description of your work.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-amber-600" />

              <p className="text-sm leading-6 text-muted-foreground">
                <span className="font-semibold text-foreground">
                  Submission limit:
                </span>{" "}
                Currently, you can submit only one project. Support for
                multiple project submissions may be added in a future
                update.
              </p>
            </div>
          </div>
        </div>

        {/* Form actions */}
        <div className="flex flex-col-reverse gap-3 border-t bg-muted/20 px-5 py-4 sm:flex-row sm:justify-end sm:px-8">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/student/dashboard")}
            disabled={createSubmissionMutation.isPending}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={createSubmissionMutation.isPending}
            className="w-full gap-2 sm:w-auto"
          >
            {createSubmissionMutation.isPending ? (
              "Submitting..."
            ) : (
              <>
                <Send className="size-4" />
                Submit project
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}