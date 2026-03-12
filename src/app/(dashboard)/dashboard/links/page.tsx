import Link from "next/link";
import { Search } from "lucide-react";

import { LinksTable } from "@/components/dashboard/links-table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { linkButtonClass } from "@/lib/ui";

export default function LinksPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-border/60 bg-background p-6 shadow-sm lg:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Links</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">Manage all short links from one clean list.</h1>
          </div>
          <Link href="/dashboard/create" className={linkButtonClass("primary")}>Create new link</Link>
        </div>
        <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_auto_auto_auto]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search by title, slug, or destination" />
          </div>
          <Badge className="justify-center rounded-xl bg-sky-50 px-4 py-2 text-sky-700 hover:bg-sky-50">All links</Badge>
          <Badge className="justify-center rounded-xl bg-emerald-50 px-4 py-2 text-emerald-700 hover:bg-emerald-50">Active</Badge>
          <Badge className="justify-center rounded-xl bg-amber-50 px-4 py-2 text-amber-700 hover:bg-amber-50">Scheduled</Badge>
        </div>
      </section>
      <LinksTable />
    </div>
  );
}
