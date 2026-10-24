
import Link from "next/link";
import { GitBranchPlus, Zap, ArrowUpRight } from "lucide-react";

const footerLinks = {
  platform: [
    { label: "Home", href: "/" },
    { label: "Student Dashboard", href: "/student/dashboard" },
    { label: "Mentor Dashboard", href: "/mentor/dashboard" },
  ],
  account: [
    { label: "Login", href: "/login" },
    { label: "Create an account", href: "/register" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4 lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5"
              aria-label="ProjectPortal home"
            >
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Zap className="size-5" />
              </span>

              <span className="text-lg font-bold tracking-tight">
                Project<span className="text-primary">Hub</span>
              </span>
            </Link>

            <p className="max-w-md text-sm leading-6 text-muted-foreground">
              A dedicated platform for students to submit their projects
              and receive meaningful feedback from mentors. Build, learn,
              improve, and grow together.
            </p>

            <Link
              href="/register"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              Get started
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          {/* Platform links */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold">Platform</h2>

            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account links */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold">Your Account</h2>

            <ul className="space-y-3">
              {footerLinks.account.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © 2026 ProjectHub. All rights reserved.
          </p>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <GitBranchPlus className="size-4" />
            Built for learning
          </a>
        </div>
      </div>
    </footer>
  );
}
