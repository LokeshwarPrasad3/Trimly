"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const authSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(8, "Use at least 8 characters."),
  name: z.string().optional(),
  note: z.string().optional(),
});

type AuthMode = "sign-in" | "sign-up" | "forgot-password" | "guest-upgrade";

type AuthFormValues = z.infer<typeof authSchema>;

type AuthFormCardProps = {
  mode: AuthMode;
};

const content = {
  "sign-in": {
    title: "Welcome back",
    description: "Login to open the full workspace and view analytics.",
    action: "Sign in",
  },
  "sign-up": {
    title: "Create your account",
    description: "Claim your guest links and continue using the product for free.",
    action: "Create account",
  },
  "forgot-password": {
    title: "Reset password",
    description: "We will email reset instructions. This is UI-only for now.",
    action: "Send reset link",
  },
  "guest-upgrade": {
    title: "Free tier expired",
    description: "The guest user has used all 10 free links. Login is now required to continue.",
    action: "Login to continue",
  },
};

export function AuthFormCard({ mode }: AuthFormCardProps) {
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      note: "",
    },
  });

  const ui = content[mode];

  return (
    <Card className="w-full rounded-[2rem] border-border/70 shadow-sm">
      <CardHeader className="space-y-3">
        <CardTitle className="text-2xl">{ui.title}</CardTitle>
        <CardDescription className="text-sm leading-6">{ui.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={form.handleSubmit(() => undefined)}>
          {mode === "sign-up" ? (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Lokeshwar Rao" {...form.register("name")} />
            </div>
          ) : null}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="you@example.com" {...form.register("email")} />
            <p className="text-xs text-rose-600">{form.formState.errors.email?.message ?? " "}</p>
          </div>
          {mode !== "forgot-password" ? (
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="********" {...form.register("password")} />
              <p className="text-xs text-rose-600">{form.formState.errors.password?.message ?? " "}</p>
            </div>
          ) : null}
          {mode === "guest-upgrade" ? (
            <div className="space-y-2">
              <Label htmlFor="note">Reason for login</Label>
              <Textarea
                id="note"
                placeholder="Access all guest links and continue creating short URLs."
                {...form.register("note")}
              />
            </div>
          ) : null}
          <Button type="submit" className="w-full">
            {ui.action}
          </Button>
          <div className="flex flex-wrap justify-between gap-3 text-sm text-muted-foreground">
            <Link href="/guest-links" className="hover:text-foreground">
              View guest flow
            </Link>
            <Link href="/pricing" className="hover:text-foreground">
              Review free plan
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
