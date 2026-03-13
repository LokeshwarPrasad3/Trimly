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

export function LinksTable({
  links,
  isLoading = false,
  emptyTitle = "No links yet",
  emptyDescription = "Create your first short link to start tracking clicks inside the dashboard.",
}: LinksTableProps) {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-white/60 bg-white/80 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.4)] backdrop-blur-xl">
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
                      <p className="text-sm text-slate-500">{getShortLinkUrl(link.slug)}</p>
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
  );
}
