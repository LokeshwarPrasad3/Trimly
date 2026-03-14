"use client";

import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMounted } from "@/hooks/use-mounted";

type TrendPoint = {
  name: string;
  clicks: number;
  links?: number;
};

type StatusPoint = {
  name: string;
  value: number;
  fill: string;
};

type TooltipValue = string | number | Array<string | number> | undefined;
type TooltipName = string | number | undefined;

function formatCompactNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: value >= 1000 ? 1 : 0,
  }).format(value);
}

function formatTooltipValue(value: TooltipValue) {
  if (Array.isArray(value)) {
    return value.join(", ");
  }

  if (typeof value === "number") {
    return value.toLocaleString();
  }

  return value?.toString() ?? "0";
}

type PerformanceChartProps = {
  data: TrendPoint[];
  isLoading?: boolean;
  title?: string;
};

type SourceChartProps = {
  data: StatusPoint[];
  isLoading?: boolean;
  title?: string;
};

function EmptyChart({ message }: { message: string }) {
  return (
    <div className="flex h-full items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50/70 px-6 text-center text-sm text-slate-500">
      {message}
    </div>
  );
}

export function PerformanceChart({
  data,
  isLoading = false,
  title = "Traffic trend",
}: PerformanceChartProps) {
  const mounted = useMounted();

  return (
    <Card className="rounded-[1.75rem] border-white/60 bg-white/80 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.4)] backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-lg text-slate-950">{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] min-w-0">
        {isLoading ? (
          <Skeleton className="h-full rounded-3xl" />
        ) : !mounted ? (
          <Skeleton className="h-full rounded-3xl" />
        ) : data.length === 0 ? (
          <EmptyChart message="Create links to unlock traffic trend data." />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 12, right: 8, left: -16, bottom: 4 }}
            >
              <CartesianGrid
                vertical={false}
                stroke="rgba(148, 163, 184, 0.18)"
              />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                minTickGap={24}
                tick={{ fill: "#64748b", fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                width={44}
                tick={{ fill: "#64748b", fontSize: 12 }}
                tickFormatter={formatCompactNumber}
              />
              <Tooltip
                cursor={{ stroke: "rgba(14, 165, 233, 0.16)", strokeWidth: 2 }}
                formatter={(value: TooltipValue, name: TooltipName) => [
                  formatTooltipValue(value),
                  name === "clicks" ? "Clicks" : "Links created",
                ]}
                contentStyle={{
                  border: "1px solid rgba(226, 232, 240, 0.9)",
                  borderRadius: "18px",
                  boxShadow: "0 18px 45px -30px rgba(15, 23, 42, 0.35)",
                  backgroundColor: "rgba(255,255,255,0.96)",
                }}
                labelStyle={{ color: "#0f172a", fontWeight: 600 }}
              />
              <Line
                type="monotone"
                dataKey="clicks"
                stroke="var(--color-chart-1)"
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 5,
                  strokeWidth: 0,
                  fill: "var(--color-chart-1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="links"
                stroke="var(--color-chart-3)"
                strokeWidth={2}
                strokeDasharray="6 6"
                dot={false}
                activeDot={{
                  r: 4,
                  strokeWidth: 0,
                  fill: "var(--color-chart-3)",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

export function SourceChart({
  data,
  isLoading = false,
  title = "Link status mix",
}: SourceChartProps) {
  const mounted = useMounted();

  return (
    <Card className="rounded-[1.75rem] border-white/60 bg-white/80 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.4)] backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-lg text-slate-950">{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-5 lg:grid-cols-[minmax(240px,0.95fr)_1.05fr] lg:items-center">
        <div className="mx-auto aspect-square w-full max-w-[240px] min-w-0">
          {isLoading ? (
            <Skeleton className="h-full rounded-3xl" />
          ) : !mounted ? (
            <Skeleton className="h-full rounded-3xl" />
          ) : data.length === 0 ? (
            <EmptyChart message="No status data yet." />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius="58%"
                  outerRadius="84%"
                  paddingAngle={2}
                  cornerRadius={10}
                  stroke="rgba(255,255,255,0.95)"
                  strokeWidth={3}
                >
                  {data.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: TooltipValue, name: TooltipName) => [
                    formatTooltipValue(value),
                    name?.toString() ?? "",
                  ]}
                  contentStyle={{
                    border: "1px solid rgba(226, 232, 240, 0.9)",
                    borderRadius: "18px",
                    boxShadow: "0 18px 45px -30px rgba(15, 23, 42, 0.35)",
                    backgroundColor: "rgba(255,255,255,0.96)",
                  }}
                  labelStyle={{ color: "#0f172a", fontWeight: 600 }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="space-y-3">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-12 rounded-2xl" />
            ))
          ) : data.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-6 text-sm text-slate-500">
              Status insights appear after you create links.
            </div>
          ) : (
            data.map((source) => (
              <div
                key={source.name}
                className="flex items-center justify-between rounded-2xl bg-slate-50/80 px-4 py-3 text-sm"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="size-3 rounded-full"
                    style={{ backgroundColor: source.fill }}
                  />
                  <span className="font-medium text-slate-950">
                    {source.name}
                  </span>
                </div>
                <span className="text-slate-500">
                  {source.value.toLocaleString()}
                </span>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
