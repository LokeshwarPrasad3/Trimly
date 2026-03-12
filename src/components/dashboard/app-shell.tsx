"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { appName, dashboardNav, profileSummary } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type AppShellProps = {
  children: React.ReactNode;
};

function SidebarContent() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col rounded-[1.75rem] bg-white/70 p-3 backdrop-blur-xl">
      <div className="px-3 py-5">
        <Link href="/dashboard" className="text-lg font-semibold tracking-tight text-slate-950">
          {appName}
        </Link>
        <p className="mt-1 text-sm text-slate-500">Logged-in workspace with analytics access</p>
      </div>
      <Separator />
      <nav className="flex-1 space-y-1 px-2 py-4">
        {dashboardNav.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all",
                active
                  ? "bg-gradient-to-r from-sky-600 to-cyan-500 text-white shadow-[0_14px_35px_-18px_rgba(14,165,233,0.85)]"
                  : "text-slate-600 hover:bg-sky-50 hover:text-slate-950"
              )}
            >
              {Icon ? <Icon className="size-4" /> : null}
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto rounded-[1.5rem] bg-gradient-to-r from-slate-950 to-sky-700 p-4 text-white">
        <p className="text-sm font-semibold">{profileSummary.name}</p>
        <p className="text-sm text-sky-100">{profileSummary.plan} workspace</p>
      </div>
    </div>
  );
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_28%),linear-gradient(180deg,_#eff6ff_0%,_#f8fafc_55%,_#ffffff_100%)]">
      <div className="mx-auto flex min-h-screen max-w-[1600px] gap-6 px-4 py-4 sm:px-6">
        <aside className="hidden w-72 shrink-0 rounded-[2rem] border border-white/60 bg-white/65 p-4 shadow-[0_30px_70px_-45px_rgba(15,23,42,0.4)] backdrop-blur-xl lg:block">
          <SidebarContent />
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="mb-4 flex items-center justify-between rounded-[1.75rem] border border-white/60 bg-white/70 px-4 py-3 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.35)] backdrop-blur-xl lg:px-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Analytics workspace</p>
              <p className="text-sm text-slate-500">Modern logged-in area with charts, links, and profile screens</p>
            </div>
            <Sheet>
              <SheetTrigger render={<Button variant="outline" size="sm" className="lg:hidden" />}>
                <Menu className="size-4" />
                Menu
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SidebarContent />
              </SheetContent>
            </Sheet>
          </div>
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
