import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { profileSummary } from "@/lib/mock-data";

export default function ProfilePage() {
  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <Card className="rounded-[1.75rem] border-border/70 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center gap-4">
            <Avatar className="size-16 rounded-3xl bg-sky-100">
              <AvatarFallback className="rounded-3xl bg-sky-100 text-sky-700">LR</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xl font-semibold text-foreground">{profileSummary.name}</p>
              <p className="text-sm text-muted-foreground">{profileSummary.role}</p>
            </div>
          </div>
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-muted-foreground">Email</p>
              <p className="font-medium text-foreground">{profileSummary.email}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Location</p>
              <p className="font-medium text-foreground">{profileSummary.location}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Current plan</p>
              <p className="font-medium text-foreground">{profileSummary.plan}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="rounded-[1.75rem] border-border/70 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Momentum snapshot</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          {[
            ["Shipping streak", profileSummary.streak],
            ["Top source", "Instagram"],
            ["Most active slug", "spring-launch"],
            ["Review status", "UI pass in progress"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-muted/50 p-5">
              <p className="text-sm text-muted-foreground">{label}</p>
              <p className="mt-2 text-lg font-semibold text-foreground">{value}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
