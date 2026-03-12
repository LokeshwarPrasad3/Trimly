import { ArrowUpRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type MetricCardProps = {
  label: string;
  value: string;
  change: string;
};

export function MetricCard({ label, value, change }: MetricCardProps) {
  return (
    <Card className="rounded-[1.75rem] border-white/70 bg-white/75 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.4)] backdrop-blur-xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-slate-500">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-3xl font-semibold tracking-tight text-slate-950">{value}</p>
            <p className="mt-2 text-sm text-slate-500">Logged-in workspace</p>
          </div>
          <div className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
            <ArrowUpRight className="size-3.5" />
            {change}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
