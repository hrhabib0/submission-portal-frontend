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
      variant="ghost"
      onClick={() => logoutMutation.mutate()}
      disabled={logoutMutation.isPending}
      className={className}
    >
      <LogOut className="size-4 shrink-0" />

      {showLabel && (
        <span>
          {logoutMutation.isPending ? "Logging out..." : "Logout"}
        </span>
      )}
    </Button>
  );
}
