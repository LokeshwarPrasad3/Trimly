"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowRight, CheckCircle2, Link2, LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSlugFromUrl } from "@/features/guest/lib/slug";
import { useGuestSession } from "@/features/guest/hooks/use-guest-session";
import { linkButtonClass } from "@/lib/ui";

const guestLinkFormSchema = z.object({
  originalUrl: z.url("Enter a valid URL to shorten."),
});

type GuestLinkFormValues = z.infer<typeof guestLinkFormSchema>;

export function GuestLinksClient() {
  const { token, identityQuery, linksQuery, createLinkMutation, isInitializing, initializationError } = useGuestSession();
  const form = useForm<GuestLinkFormValues>({
    resolver: zodResolver(guestLinkFormSchema),
    defaultValues: {
      originalUrl: "",
    },
  });

  const guestIdentity = identityQuery.data;
  const guestLinks = linksQuery.data ?? [];

  const onSubmit = form.handleSubmit(async (values) => {
    await createLinkMutation.mutateAsync({
      originalUrl: values.originalUrl,
      slug: createSlugFromUrl(values.originalUrl),
    });

    form.reset();
  });

  if (isInitializing) {
    return (
      <main className="min-h-screen bg-[linear-gradient(180deg,_#f9fbff_0%,_#eff4ff_45%,_#ffffff_100%)] px-6 py-10 sm:px-8">
        <div className="mx-auto flex max-w-4xl items-center justify-center rounded-[2rem] border border-border/70 bg-white p-12 shadow-sm">
          <LoaderCircle className="mr-3 size-5 animate-spin text-sky-700" />
          <span className="text-sm font-medium text-slate-700">Creating guest workspace...</span>
        </div>
      </main>
    );
  }

  if (initializationError || identityQuery.isError || linksQuery.isError) {
    return (
      <main className="min-h-screen bg-[linear-gradient(180deg,_#f9fbff_0%,_#eff4ff_45%,_#ffffff_100%)] px-6 py-10 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <Alert className="rounded-[2rem] border-rose-200 bg-rose-50">
            <AlertCircle className="size-4 text-rose-700" />
            <AlertTitle className="text-rose-950">Unable to load guest workspace</AlertTitle>
            <AlertDescription className="text-rose-800">
              Check the API and database connection, then refresh this page.
            </AlertDescription>
          </Alert>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,_#f9fbff_0%,_#eff4ff_45%,_#ffffff_100%)] px-6 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <section className="rounded-[2rem] border border-border/70 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Guest links</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Shorten URLs without logging in.</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Guest users can create up to 10 short links for free. After the 10th link, we ask them to log in to continue using the product.
          </p>
          <div className="mt-3 text-xs uppercase tracking-[0.18em] text-slate-400">Guest token: {token}</div>
          <form onSubmit={onSubmit} className="mt-6 grid gap-4 md:grid-cols-[1fr_auto]">
            <div className="space-y-2 rounded-[1.5rem] border border-border/70 bg-slate-50 px-5 py-4">
              <Label htmlFor="originalUrl" className="text-sm text-slate-500">Paste your long URL</Label>
              <Input
                id="originalUrl"
                placeholder="https://example.com/very-long-product-campaign-url"
                className="border-0 bg-transparent px-0 text-base font-medium text-slate-950 shadow-none focus-visible:ring-0"
                {...form.register("originalUrl")}
                disabled={guestIdentity?.freeTierExpired || createLinkMutation.isPending}
              />
              <p className="text-xs text-rose-600">{form.formState.errors.originalUrl?.message ?? " "}</p>
            </div>
            <Button
              type="submit"
              className="h-auto rounded-[1.5rem] px-5 py-4 text-sm"
              disabled={guestIdentity?.freeTierExpired || createLinkMutation.isPending}
            >
              {createLinkMutation.isPending ? "Creating..." : "Make short URL"}
            </Button>
          </form>
          {createLinkMutation.isError ? (
            <p className="mt-3 text-sm text-rose-600">
              {(createLinkMutation.error as Error).message || "Unable to create short link."}
            </p>
          ) : null}
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-border/70 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Your guest links</h2>
                <p className="text-sm text-muted-foreground">
                  {guestIdentity?.linksUsed ?? guestLinks.length} of 10 free links used
                </p>
              </div>
              <div className="rounded-full bg-sky-50 px-3 py-1 text-sm font-medium text-sky-700">
                {guestIdentity?.remainingLinks ?? 0} left
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {guestLinks.length > 0 ? (
                guestLinks.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-[1.25rem] border border-border/70 bg-slate-50 px-4 py-3">
                    <div className="min-w-0">
                      <p className="font-medium text-foreground">blink.new/{item.slug}</p>
                      <p className="truncate text-sm text-muted-foreground">{item.originalUrl}</p>
                    </div>
                    <Link2 className="size-4 text-sky-700" />
                  </div>
                ))
              ) : (
                <div className="rounded-[1.25rem] border border-dashed border-border bg-slate-50 px-4 py-6 text-sm text-muted-foreground">
                  No guest links yet. Paste a URL above to create your first short link.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-1 size-5 text-amber-700" />
              <div>
                <p className="text-lg font-semibold text-amber-950">What happens after 10 links?</p>
                <p className="mt-3 text-sm leading-6 text-amber-800">
                  The guest free tier expires. Users then log in to access all links and continue using the product for free.
                </p>
              </div>
            </div>
            <div className="mt-6 space-y-3 text-sm text-amber-900">
              <div className="flex gap-3 rounded-2xl bg-white/70 p-4">
                <CheckCircle2 className="mt-0.5 size-4 text-sky-700" />
                <span>Guest workspace is backed by the API and persisted with a local guest token.</span>
              </div>
              <div className="flex gap-3 rounded-2xl bg-white/70 p-4">
                <CheckCircle2 className="mt-0.5 size-4 text-sky-700" />
                <span>After the limit, login becomes required before creating new short links.</span>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={guestIdentity?.freeTierExpired ? "/guest-upgrade" : "/sign-in"} className={linkButtonClass("primary")}>
                {guestIdentity?.freeTierExpired ? "See expired state" : "Login now"}
                <ArrowRight className="size-4" />
              </Link>
              <Link href="/dashboard" className={linkButtonClass("secondary")}>
                Dashboard preview
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
