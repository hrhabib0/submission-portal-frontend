
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink, GitBranchPlus, Send } from "lucide-react";
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
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        href="/student/dashboard"
        className="inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-900"
      >
        <ArrowLeft size={16} />
        Back to dashboard
      </Link>

      <div>
        <p className="text-sm font-medium text-blue-600">
          PROJECT SUBMISSION
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Submit your project
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Share your project details and links so your mentor can review
          your work.
        </p>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void form.handleSubmit();
        }}
        className="space-y-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
      >
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
              <Label htmlFor={field.name}>Project name *</Label>
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
              />
              {field.state.meta.isTouched &&
                field.state.meta.errors.length > 0 && (
                  <p className="text-xs text-red-600">
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
              if (!value.trim()) return "Repository URL is required.";

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
              <Label htmlFor={field.name}>GitHub repository URL *</Label>
              <div className="relative">
                <GitBranchPlus className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id={field.name}
                  name={field.name}
                  type="url"
                  placeholder="https://github.com/username/repository"
                  className="pl-10"
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
              {field.state.meta.isTouched &&
                field.state.meta.errors.length > 0 && (
                  <p className="text-xs text-red-600">
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
              if (!value.trim()) return "Live project URL is required.";

              try {
                const url = new URL(value);
                if (url.protocol !== "https:" && url.protocol !== "http:") {
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
              <Label htmlFor={field.name}>Live project URL *</Label>
              <div className="relative">
                <ExternalLink className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id={field.name}
                  name={field.name}
                  type="url"
                  placeholder="https://your-project.vercel.app"
                  className="pl-10"
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
              {field.state.meta.isTouched &&
                field.state.meta.errors.length > 0 && (
                  <p className="text-xs text-red-600">
                    {field.state.meta.errors.join(", ")}
                  </p>
                )}
            </div>
          )}
        </form.Field>

        {/* Description */}
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
              <Label htmlFor={field.name}>Project description *</Label>
              <Textarea
                id={field.name}
                name={field.name}
                placeholder="Describe your project, its main features, and the technologies you used..."
                rows={5}
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
              <div className="flex items-start justify-between gap-3">
                <div>
                  {field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0 && (
                      <p className="text-xs text-red-600">
                        {field.state.meta.errors.join(", ")}
                      </p>
                    )}
                </div>
                <p className="text-xs text-slate-400">
                  {field.state.value.length} characters
                </p>
              </div>
            </div>
          )}
        </form.Field>

        <div className="rounded-lg border border-blue-100 bg-blue-50/70 p-4">
          <p className="text-sm font-medium text-blue-900">
            Before submitting
          </p>
          <p className="mt-1 text-sm leading-6 text-blue-800">
            Make sure your repository is accessible to your mentor and
            your live project link opens correctly.
          </p>
          <p className="mt-1 text-sm leading-6 text-red-800">
            N.B.: Remember that you can submit only one project for now. We are working on our site. Some days later you can submit multiple projects. 
          </p>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/student/dashboard")}
            disabled={createSubmissionMutation.isPending}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700"
            disabled={createSubmissionMutation.isPending}
          >
            {createSubmissionMutation.isPending ? (
              "Submitting..."
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit project
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
