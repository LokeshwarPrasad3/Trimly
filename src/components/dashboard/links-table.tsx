import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getLinkHost } from "@/features/dashboard/lib/analytics";
import type { ApiShortLink } from "@/lib/api/links";
import { getShortLinkUrl } from "@/lib/short-url";

const statusClassName: Record<ApiShortLink["status"], string> = {
  ACTIVE: "bg-emerald-50 text-emerald-700 hover:bg-emerald-50",
  DISABLED: "bg-slate-100 text-slate-700 hover:bg-slate-100",
  EXPIRED: "bg-amber-50 text-amber-700 hover:bg-amber-50",
};

type LinksTableProps = {
  links: ApiShortLink[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
};

function LoadingRows() {
  return Array.from({ length: 4 }).map((_, index) => (
    <TableRow key={index}>
      <TableCell>
        <div className="space-y-2">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-3 w-28" />
        </div>
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-20 rounded-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-32" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-16" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-24" />
      </TableCell>
    </TableRow>
  ));
}

function MobileLoadingCards() {
  return Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className="h-36 rounded-[1.25rem]" />);
}

function EmptyState({ emptyTitle, emptyDescription }: { emptyTitle: string; emptyDescription: string }) {
  return (
    <div className="py-10 text-center">
      <div className="mx-auto max-w-md space-y-2">
        <p className="text-base font-semibold text-slate-950">{emptyTitle}</p>
        <p className="text-sm leading-6 text-slate-500">{emptyDescription}</p>
      </div>
    </div>
  );
}

export function LinksTable({
  links,
  isLoading = false,
  emptyTitle = "No links yet",
  emptyDescription = "Create your first short link to start tracking clicks inside the dashboard.",
}: LinksTableProps) {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-white/60 bg-white/80 p-2 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.4)] backdrop-blur-xl">
      <div className="space-y-3 md:hidden">
        {isLoading ? <MobileLoadingCards /> : null}
        {!isLoading && links.length === 0 ? <EmptyState emptyTitle={emptyTitle} emptyDescription={emptyDescription} /> : null}
        {!isLoading
          ? links.map((link) => (
              <div key={link.id} className="rounded-[1.25rem] border border-slate-200/80 bg-white/85 p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 space-y-1">
                    <Link href={`/dashboard/links/${link.id}`} className="block font-semibold text-slate-950 hover:text-sky-700 hover:underline">
                      {link.title ?? link.slug}
                    </Link>
                    <p className="break-all text-sm text-slate-500">{getShortLinkUrl(link.slug)}</p>
                  </div>
                  <Badge className={statusClassName[link.status]}>{link.status.toLowerCase()}</Badge>
                </div>
                <div className="mt-4 grid gap-3 rounded-2xl bg-slate-50/80 p-3 text-sm sm:grid-cols-2">
                  <div>
                    <p className="text-slate-400">Destination</p>
                    <div className="mt-1 flex items-center gap-2 text-slate-600">
                      <span className="truncate">{getLinkHost(link.originalUrl)}</span>
                      <ExternalLink className="size-3.5 shrink-0 text-slate-400" />
                    </div>
                  </div>
                  <div>
                    <p className="text-slate-400">Clicks</p>
                    <p className="mt-1 font-medium text-slate-950">{link.clickCount.toLocaleString()}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-slate-400">Updated</p>
                    <p className="mt-1 text-slate-600">{new Date(link.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>

      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Link</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Clicks</TableHead>
              <TableHead>Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? <LoadingRows /> : null}
            {!isLoading && links.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center">
                  <div className="mx-auto max-w-md space-y-2">
                    <p className="text-base font-semibold text-slate-950">{emptyTitle}</p>
                    <p className="text-sm leading-6 text-slate-500">{emptyDescription}</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : null}
            {!isLoading
              ? links.map((link) => (
                  <TableRow key={link.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <Link href={`/dashboard/links/${link.id}`} className="font-semibold text-slate-950 hover:text-sky-700 hover:underline">
                          {link.title ?? link.slug}
                        </Link>
                        <p className="break-all text-sm text-slate-500">{getShortLinkUrl(link.slug)}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusClassName[link.status]}>{link.status.toLowerCase()}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <span>{getLinkHost(link.originalUrl)}</span>
                        <ExternalLink className="size-3.5 text-slate-400" />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-slate-950">{link.clickCount.toLocaleString()}</TableCell>
                    <TableCell className="text-slate-500">{new Date(link.updatedAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
