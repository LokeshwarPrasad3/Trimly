"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useState } from "react";

import { LinksTable } from "@/components/dashboard/links-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthenticatedLinks } from "@/features/short-links/hooks/use-short-links";

export function LinksPageClient() {
  const [search, setSearch] = useState("");
  const { data: links = [], isLoading } = useAuthenticatedLinks();

  const filteredLinks = links.filter((link) => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return true;
    }

    return [link.title ?? "", link.slug, link.originalUrl].some((value) =>
      value.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/60 bg-[linear-gradient(135deg,_rgba(14,165,233,0.12),_rgba(255,255,255,0.94)_48%,_rgba(34,211,238,0.14))] p-6 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.35)] lg:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-[0.22em] text-sky-700 uppercase">
              Links
            </p>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
              Manage all short links from one simple list.
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              Search by title, slug, or destination URL. Every row is now backed
              by your authenticated links API.
            </p>
          </div>
          <Button render={<Link href="/dashboard/create" />}>
            Create new link
          </Button>
        </div>
        <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_auto_auto]">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              className="border-white/60 bg-white/80 pl-9"
              placeholder="Search title, slug, or destination"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <Badge className="justify-center rounded-xl bg-sky-50 px-4 py-2 text-sky-700 hover:bg-sky-50">
            {links.length} total
          </Badge>
          <Badge className="justify-center rounded-xl bg-emerald-50 px-4 py-2 text-emerald-700 hover:bg-emerald-50">
            {links.filter((link) => link.status === "ACTIVE").length} active
          </Badge>
        </div>
      </section>
      <LinksTable
        links={filteredLinks}
        isLoading={isLoading}
        emptyTitle={search ? "No links match this search" : "No links yet"}
        emptyDescription={
          search
            ? "Try a different keyword or clear the search to see all links."
            : "Create your first authenticated short link to populate this table."
        }
      />
    </div>
  );
}
