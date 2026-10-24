
"use client";

import { LogOut } from "lucide-react";

import { useLogout } from "@/hooks";
import { Button } from "@/components/ui/button";

interface LogoutButtonProps {
  className?: string;
  showLabel?: boolean;
}

export function LogoutButton({
  className,
  showLabel = true,
}: LogoutButtonProps) {
  const logoutMutation = useLogout();

  return (
    <Button
      type="button"
      onClick={() => logoutMutation.mutate()}
      disabled={logoutMutation.isPending}
      className={className}
    >
      <LogOut className="size-4" />

      {showLabel && (
        <span className="hidden sm:inline">
          {logoutMutation.isPending ? "Logging out..." : "Logout"}
        </span>
      )}
    </Button>
  );
}
