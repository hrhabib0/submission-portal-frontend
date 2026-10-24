
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FolderOpen,
  Plus,
} from "lucide-react";


const stats = [
  {
    label: "Total Submissions",
    value: "—",
    description: "Your submitted projects",
    icon: FolderOpen,
  },
  {
    label: "Pending Reviews",
    value: "—",
    description: "Waiting for mentor review",
    icon: Clock3,
  },
  {
    label: "Approved Projects",
    value: "—",
    description: "Projects approved by mentors",
    icon: CheckCircle2,
  },
];

export default function StudentDashboardPage() {
  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-blue-600">
            STUDENT WORKSPACE
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Student Dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Submit your work and track your progress.
          </p>
        </div>

        <Link
            href="/student/submissions/new"
            className="inline-flex h-9 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
            <Plus className="mr-2 h-4 w-4" />
            Submit a project
        </Link>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.label}
                  </p>
                  <p className="mt-3 text-3xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                </div>

                <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                  <Icon size={21} />
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-500">
                {stat.description}
              </p>
            </div>
          );
        })}
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
                <h2 className="text-lg font-semibold text-slate-900">
                Ready to submit your work?
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                Add your project details, repository URL, live demo link,
                and description to send your work to a mentor for review.
                </p>
            </div>

            <Link
                href="/student/submissions/new"
                className="inline-flex h-9 items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
                >
                Get started
                <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
        </div>
      </section>
    </div>
  );
}
