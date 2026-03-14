"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff, LoaderCircle, Sparkles } from "lucide-react";
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
    footerText: "New to Trimly?",
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
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
    <Card className="w-full max-w-xl overflow-hidden rounded-[2.25rem] border border-white/70 bg-[linear-gradient(180deg,_rgba(255,255,255,0.92),_rgba(248,250,252,0.9))] shadow-[0_34px_90px_-52px_rgba(15,23,42,0.42)] backdrop-blur-2xl">
      <div className="border-b border-white/70 bg-[linear-gradient(135deg,_rgba(14,165,233,0.15),_rgba(255,255,255,0.96)_48%,_rgba(34,211,238,0.18))] px-6 py-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700 shadow-sm">
          <Sparkles className="size-3.5" />
          Trimly auth
        </div>
      </div>
      <CardHeader className="space-y-3 px-6 pt-6">
        <CardTitle className="text-3xl tracking-tight text-slate-950">
          {ui.title}
        </CardTitle>
        <CardDescription className="text-sm leading-6 text-slate-600">
          {ui.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          {mode === "sign-up" ? (
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                placeholder="Lokeshwar Dewangan"
                className="h-11 rounded-xl bg-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
                {...form.register("name")}
              />
              <p className="text-xs text-rose-600">
                {"name" in form.formState.errors
                  ? form.formState.errors.name?.message
                  : " "}
              </p>
            </div>
          ) : null}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="you@example.com"
              className="h-11 rounded-xl bg-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
              {...form.register("email")}
            />
            <p className="text-xs text-rose-600">
              {form.formState.errors.email?.message ?? " "}
            </p>
          </div>

          {mode !== "forgot-password" ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="password">Password</Label>
                {mode === "sign-in" ? (
                  <Link
                    href="/forgot-password"
                    className="text-xs font-medium text-sky-700 hover:underline">
                    Forgot password?
                  </Link>
                ) : null}
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="At least 8 characters"
                  className="h-11 rounded-xl bg-white/85 pr-11 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
                  {...form.register("password")}
                />
                <button
                  type="button"
                  aria-label={
                    isPasswordVisible ? "Hide password" : "Show password"
                  }
                  className="absolute right-3 top-1/2 inline-flex -translate-y-1/2 items-center justify-center text-slate-400 transition-colors hover:text-slate-700"
                  onClick={() => setIsPasswordVisible((current) => !current)}>
                  {isPasswordVisible ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-rose-600">
                {"password" in form.formState.errors
                  ? form.formState.errors.password?.message
                  : " "}
              </p>
            </div>
          ) : null}

          {forgotPasswordSent ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              Reset-ready state shown. Hook the email delivery flow here when
              backend support is added.
            </div>
          ) : null}

          {authMutation.isError && mode !== "forgot-password" ? (
            <p className="text-sm text-rose-600">
              {(authMutation.error as Error).message ||
                "Authentication failed."}
            </p>
          ) : null}

          <Button
            type="submit"
            className="h-11 w-full rounded-xl text-sm shadow-[0_20px_45px_-26px_rgba(14,165,233,0.82)]"
            disabled={mode !== "forgot-password" && authMutation.isPending}>
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

          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
            <span>{ui.footerText}</span>
            <Link
              href={ui.footerHref}
              className="font-medium text-sky-700 hover:underline">
              {ui.footerLabel}
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
