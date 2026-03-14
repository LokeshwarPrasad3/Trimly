import { redirect } from "next/navigation";

import { AppShell } from "@/components/dashboard/app-shell";
import { getCurrentUserFromCookie } from "@/server/auth/session";
import { userService } from "@/server/services/user-service";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUserFromCookie();

  if (!user) {
    redirect("/sign-in");
  }

  const currentUser = await userService.getUserById(user.id);

  return <AppShell currentUser={currentUser}>{children}</AppShell>;
}
