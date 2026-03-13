"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, LoaderCircle, Sparkles } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useAuthSession } from "@/features/auth/hooks/use-auth-session";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const emailSchema = z.email("Enter a valid email address.");
const passwordSchema = z.string().min(8, "Use at least 8 characters.");

const authSchema = z.discriminatedUnion("mode", [
  z.object({
    mode: z.literal("sign-in"),
    email: emailSchema,
    password: passwordSchema,
  }),
  z.object({
    mode: z.literal("sign-up"),
    name: z.string().trim().min(2, "Enter your name.").max(80, "Name is too long."),
    email: emailSchema,
    password: passwordSchema,
  }),
  z.object({
    mode: z.literal("forgot-password"),
    email: emailSchema,
  }),
  z.object({
    mode: z.literal("guest-upgrade"),
    email: emailSchema,
    password: passwordSchema,
  }),
]);

type AuthMode = "sign-in" | "sign-up" | "forgot-password" | "guest-upgrade";
type AuthFormValues = z.infer<typeof authSchema>;

type AuthFormCardProps = {
  mode: AuthMode;
};

const content: Record<
  AuthMode,
  {
    title: string;
    description: string;
    action: string;
    footerHref: string;
    footerLabel: string;
    footerText: string;
  }
> = {
  "sign-in": {
    title: "Welcome back",
    description: "Sign in to open your workspace, manage links, and view live analytics.",
    action: "Sign in",
    footerHref: "/sign-up",
    footerLabel: "Create an account",
    footerText: "New to Blink?",
  },
  "sign-up": {
    title: "Create your account",
    description: "Sign up to claim guest links and continue using the app with a full dashboard.",
    action: "Create account",
    footerHref: "/sign-in",
    footerLabel: "Sign in instead",
    footerText: "Already have an account?",
  },
  "forgot-password": {
    title: "Reset password",
    description: "Enter your email and we will show the reset-ready state for this flow.",
    action: "Send reset link",
    footerHref: "/sign-in",
    footerLabel: "Back to sign in",
    footerText: "Remembered your password?",
  },
  "guest-upgrade": {
    title: "Login to continue",
    description: "Your guest free tier has ended. Sign in to keep all links and continue for free.",
    action: "Login to continue",
    footerHref: "/sign-up",
    footerLabel: "Create account",
    footerText: "Need an account first?",
  },
};

function getDefaultValues(mode: AuthMode): AuthFormValues {
  switch (mode) {
    case "sign-up":
      return {
        mode,
        name: "",
        email: "",
        password: "",
      };
    case "forgot-password":
      return {
        mode,
        email: "",
      };
    default:
      return {
        mode,
        email: "",
        password: "",
      };
  }
}

export function AuthFormCard({ mode }: AuthFormCardProps) {
  const router = useRouter();
  const [forgotPasswordSent, setForgotPasswordSent] = useState(false);
  const { loginMutation, signupMutation } = useAuthSession();
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: getDefaultValues(mode),
  });

  const ui = content[mode];
  const authMutation = mode === "sign-up" ? signupMutation : loginMutation;

  async function onSubmit(values: AuthFormValues) {
    if (values.mode === "forgot-password") {
      setForgotPasswordSent(true);
      return;
    }

    if (values.mode === "sign-up") {
      await signupMutation.mutateAsync({
        name: values.name,
        email: values.email,
        password: values.password,
      });
    } else {
      await loginMutation.mutateAsync({
        email: values.email,
        password: values.password,
      });
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <Card className="w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/60 bg-white/85 shadow-[0_28px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur-xl">
      <div className="border-b border-sky-100 bg-[linear-gradient(135deg,_rgba(56,189,248,0.16),_rgba(255,255,255,0.95)_52%,_rgba(34,211,238,0.16))] px-6 py-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700 shadow-sm">
          <Sparkles className="size-3.5" />
          Blink auth
        </div>
      </div>
      <CardHeader className="space-y-3 px-6 pt-6">
        <CardTitle className="text-3xl tracking-tight text-slate-950">{ui.title}</CardTitle>
        <CardDescription className="text-sm leading-6 text-slate-600">{ui.description}</CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          {mode === "sign-up" ? (
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" placeholder="Lokeshwar Rao" className="border-white/60 bg-slate-50/80" {...form.register("name")} />
              <p className="text-xs text-rose-600">{"name" in form.formState.errors ? form.formState.errors.name?.message : " "}</p>
            </div>
          ) : null}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="you@example.com" className="border-white/60 bg-slate-50/80" {...form.register("email")} />
            <p className="text-xs text-rose-600">{form.formState.errors.email?.message ?? " "}</p>
          </div>

          {mode !== "forgot-password" ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="password">Password</Label>
                {mode === "sign-in" ? (
                  <Link href="/forgot-password" className="text-xs font-medium text-sky-700 hover:underline">
                    Forgot password?
                  </Link>
                ) : null}
              </div>
              <Input id="password" type="password" placeholder="At least 8 characters" className="border-white/60 bg-slate-50/80" {...form.register("password")} />
              <p className="text-xs text-rose-600">{"password" in form.formState.errors ? form.formState.errors.password?.message : " "}</p>
            </div>
          ) : null}

          {forgotPasswordSent ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              Reset-ready state shown. Hook the email delivery flow here when backend support is added.
            </div>
          ) : null}

          {authMutation.isError && mode !== "forgot-password" ? (
            <p className="text-sm text-rose-600">{(authMutation.error as Error).message || "Authentication failed."}</p>
          ) : null}

          <Button type="submit" className="h-11 w-full rounded-xl text-sm" disabled={mode !== "forgot-password" && authMutation.isPending}>
            {mode !== "forgot-password" && authMutation.isPending ? (
              <>
                <LoaderCircle className="size-4 animate-spin" />
                Working...
              </>
            ) : (
              <>
                {ui.action}
                <ArrowRight className="size-4" />
              </>
            )}
          </Button>

          <div className="rounded-2xl bg-slate-50/80 px-4 py-4 text-sm text-slate-600">
            <p className="font-medium text-slate-950">API integration</p>
            <p className="mt-1 leading-6">
              Sign up posts to `/api/users`. Sign in posts to `/api/auth/login`. Successful auth then redirects into `/dashboard`.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
            <span>{ui.footerText}</span>
            <Link href={ui.footerHref} className="font-medium text-sky-700 hover:underline">
              {ui.footerLabel}
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
