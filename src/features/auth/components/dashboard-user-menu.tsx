"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuthSession } from "@/features/auth/hooks/use-auth-session";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { type PublicUser } from "@/lib/validations/user";

type DashboardUserMenuProps = {
  user: PublicUser;
};

export function DashboardUserMenu({ user }: DashboardUserMenuProps) {
  const router = useRouter();
  const { logoutMutation } = useAuthSession();

  async function handleLogout() {
    await logoutMutation.mutateAsync();
    router.push("/sign-in");
    router.refresh();
  }

  const initials =
    user.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || user.email.slice(0, 2).toUpperCase();

  return (
    <div className="flex items-center gap-3 rounded-[1.25rem] bg-white/80 px-3 py-2">
      <Avatar className="size-10 rounded-2xl bg-sky-100">
        <AvatarFallback className="rounded-2xl bg-sky-100 text-sky-700">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="hidden min-w-0 sm:block">
        <p className="truncate text-sm font-semibold text-slate-950">
          {user.name ?? "Trimly user"}
        </p>
        <p className="truncate text-xs text-slate-500">{user.email}</p>
      </div>
      <Button
        variant="ghost"
        className="py-4"
        size="sm"
        onClick={handleLogout}
        disabled={logoutMutation.isPending}
      >
        <LogOut className="size-4" />
        {logoutMutation.isPending ? "Signing out..." : "Logout"}
      </Button>
    </div>
  );
}
