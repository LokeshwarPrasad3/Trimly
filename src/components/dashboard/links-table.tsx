import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { shortLinks } from "@/lib/mock-data";

const statusVariant = {
  Active: "bg-emerald-50 text-emerald-700 hover:bg-emerald-50",
  Scheduled: "bg-amber-50 text-amber-700 hover:bg-amber-50",
  "Needs review": "bg-rose-50 text-rose-700 hover:bg-rose-50",
};

export function LinksTable() {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-white/60 bg-white/75 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.4)] backdrop-blur-xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Link</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Clicks</TableHead>
            <TableHead>Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shortLinks.map((link) => (
            <TableRow key={link.id}>
              <TableCell>
                <div>
                  <Link href={`/dashboard/links/${link.id}`} className="font-semibold text-foreground hover:underline">
                    {link.title}
                  </Link>
                  <p className="text-sm text-muted-foreground">blink.new/{link.slug}</p>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={statusVariant[link.status]}>{link.status}</Badge>
              </TableCell>
              <TableCell>{link.source}</TableCell>
              <TableCell>{link.clicks.toLocaleString()}</TableCell>
              <TableCell>{link.updatedAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

