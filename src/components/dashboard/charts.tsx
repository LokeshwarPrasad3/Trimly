"use client";

import { Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMounted } from "@/hooks/use-mounted";
import { clicksTrend, trafficSources } from "@/lib/mock-data";

export function PerformanceChart() {
  const mounted = useMounted();

  return (
    <Card className="rounded-[1.75rem] border-white/60 bg-white/75 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.4)] backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-lg">Traffic trend</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] min-w-0">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={clicksTrend}>
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="clicks" stroke="var(--color-chart-1)" strokeWidth={3} dot={false} />
              <Line
                type="monotone"
                dataKey="conversions"
                stroke="var(--color-chart-3)"
                strokeWidth={2}
                strokeDasharray="6 6"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full rounded-3xl bg-muted/50" />
        )}
      </CardContent>
    </Card>
  );
}

export function SourceChart() {
  const mounted = useMounted();

  return (
    <Card className="rounded-[1.75rem] border-white/60 bg-white/75 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.4)] backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-lg">Source mix</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="h-[220px] min-w-0">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={trafficSources} dataKey="value" innerRadius={55} outerRadius={88} paddingAngle={5}>
                  {trafficSources.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full rounded-3xl bg-muted/50" />
          )}
        </div>
        <div className="space-y-3">
          {trafficSources.map((source) => (
            <div key={source.name} className="flex items-center justify-between rounded-2xl bg-muted/60 px-4 py-3 text-sm">
              <div className="flex items-center gap-3">
                <span className="size-3 rounded-full" style={{ backgroundColor: source.fill }} />
                <span className="font-medium text-foreground">{source.name}</span>
              </div>
              <span className="text-muted-foreground">{source.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

