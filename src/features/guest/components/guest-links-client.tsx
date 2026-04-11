"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  CheckIcon,
  Copy,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGuestSession } from "@/features/guest/hooks/use-guest-session";
import { getShortLinkUrl } from "@/lib/short-url";
import { linkButtonClass } from "@/lib/ui";

const guestLinkFormSchema = z.object({
  originalUrl: z.url("Enter a valid URL to shorten."),
});

type GuestLinkFormValues = z.infer<typeof guestLinkFormSchema>;

export function GuestLinksClient() {
  const {
    token,
    identityQuery,
    linksQuery,
    createLinkMutation,
    isInitializing,
    initializationError,
  } = useGuestSession();
  const [copiedLinkId, setCopiedLinkId] = useState<string | null>(null);
  const form = useForm<GuestLinkFormValues>({
    resolver: zodResolver(guestLinkFormSchema),
    defaultValues: {
      originalUrl: "",
    },
  });

  const guestIdentity = identityQuery.data;
  const guestLinks = linksQuery.data ?? [];

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const link = await createLinkMutation.mutateAsync({
        originalUrl: values.originalUrl,
      });
      const shortUrl = getShortLinkUrl(link.slug);
      toast.success("Short link created!", {
        description: shortUrl,
        action: {
          label: "Copy",
          onClick: () => navigator.clipboard.writeText(shortUrl),
        },
      });
      form.reset();
    } catch {
      // Error is handled by the mutation's onError callback
    }
  });

  async function handleCopy(linkId: string, slug: string) {
    const shortUrl = getShortLinkUrl(slug);
    await navigator.clipboard.writeText(shortUrl);
    setCopiedLinkId(linkId);

    window.setTimeout(() => {
      setCopiedLinkId((current) => (current === linkId ? null : current));
    }, 1600);
  }

  if (isInitializing) {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_30%),linear-gradient(180deg,_#f9fbff_0%,_#eff4ff_45%,_#ffffff_100%)] px-6 py-10 sm:px-8">
        <div className="mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center">
          <div className="relative w-full max-w-xl overflow-hidden rounded-[2.25rem] border border-white/70 bg-[linear-gradient(180deg,_rgba(255,255,255,0.92),_rgba(248,250,252,0.88))] p-10 text-center shadow-[0_36px_90px_-52px_rgba(15,23,42,0.38)] backdrop-blur-2xl">
            <div className="absolute inset-x-10 top-0 h-28 bg-[radial-gradient(circle,_rgba(14,165,233,0.18),_transparent_60%)] blur-3xl" />
            <div className="relative mx-auto flex size-24 items-center justify-center rounded-full border border-sky-100 bg-[linear-gradient(135deg,_rgba(224,242,254,0.9),_rgba(255,255,255,0.98))] shadow-[0_24px_60px_-36px_rgba(14,165,233,0.6)]">
              <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-sky-500 border-r-cyan-400" />
              <div className="absolute inset-2 animate-[spin_3s_linear_infinite_reverse] rounded-full border-4 border-transparent border-b-sky-200 border-l-sky-300" />
              <div className="rounded-full bg-white p-3 shadow-sm">
                <Sparkles className="size-6 text-sky-700" />
              </div>
            </div>
            <div className="relative mt-8 space-y-3">
              <p className="text-xs font-semibold tracking-[0.22em] text-sky-700 uppercase">
                Preparing guest mode
              </p>
              <h1 className="bg-[linear-gradient(135deg,_#0f172a_0%,_#155e75_60%,_#0ea5e9_100%)] bg-clip-text text-3xl font-semibold tracking-tight text-transparent">
                Creating your guest workspace
              </h1>
              <p className="mx-auto max-w-md text-sm leading-7 text-slate-600">
                We are setting up a private guest token and getting your first
                short-link space ready.
              </p>
            </div>
            <div className="relative mt-8 overflow-hidden rounded-full bg-slate-100">
              <div className="h-2 w-full animate-[pulse_1.6s_ease-in-out_infinite] bg-[linear-gradient(90deg,_rgba(14,165,233,0.22),_rgba(14,165,233,0.9),_rgba(34,211,238,0.3))]" />
            </div>
          </div>
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
            <AlertTitle className="text-rose-950">
              Unable to load guest workspace
            </AlertTitle>
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
        <section className="border-border/70 rounded-[2rem] border bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold tracking-[0.22em] text-sky-700 uppercase">
            Guest links
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
            Shorten URLs without logging in.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Guest users can create up to 10 short links for free. After the 10th
            link, we ask them to log in to continue using the product.
          </p>
          <div className="mt-3 text-xs tracking-[0.18em] break-all text-slate-400 uppercase">
            Guest token: {token}
          </div>
          <form
            onSubmit={onSubmit}
            className="mt-6 grid gap-4 md:grid-cols-[1fr_auto]"
          >
            <div className="border-border/70 space-y-2 rounded-[1.5rem] border bg-slate-50 px-5 py-4">
              <Label htmlFor="originalUrl" className="text-sm text-slate-500">
                Paste your long URL
              </Label>
              <Input
                id="originalUrl"
                placeholder="https://example.com/very-long-product-campaign-url"
                className="border-0 bg-transparent px-0 text-base font-medium text-slate-950 shadow-none placeholder:font-normal placeholder:opacity-60 focus-visible:ring-0"
                {...form.register("originalUrl")}
                disabled={
                  guestIdentity?.freeTierExpired || createLinkMutation.isPending
                }
              />
              <p className="text-xs text-rose-600">
                {form.formState.errors.originalUrl?.message ?? " "}
              </p>
            </div>
            <Button
              type="submit"
              className="h-auto rounded-[1.5rem] px-5 py-4 text-sm"
              disabled={
                guestIdentity?.freeTierExpired || createLinkMutation.isPending
              }
            >
              {createLinkMutation.isPending ? "Creating..." : "Make short URL"}
            </Button>
          </form>
          {createLinkMutation.isError ? (
            <p className="mt-3 text-sm text-rose-600">
              {(createLinkMutation.error as Error).message ||
                "Unable to create short link."}
            </p>
          ) : null}
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="border-border/70 rounded-[2rem] border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-foreground text-xl font-semibold">
                  Your guest links
                </h2>
                <p className="text-muted-foreground text-sm">
                  {guestIdentity?.linksUsed ?? guestLinks.length} of 10 free
                  links used
                </p>
              </div>
              <div className="rounded-full bg-sky-50 px-3 py-1 text-sm font-medium text-sky-700">
                {guestIdentity?.remainingLinks ?? 0} left
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {guestLinks.length > 0 ? (
                guestLinks.map((item) => {
                  const shortUrl = getShortLinkUrl(item.slug);
                  const isCopied = copiedLinkId === item.id;

                  return (
                    <div
                      key={item.id}
                      className="border-border/70 grid gap-3 rounded-[1.25rem] border bg-slate-50 px-4 py-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
                    >
                      <div className="min-w-0">
                        <p className="text-foreground font-medium break-all">
                          {shortUrl}
                        </p>
                        <p className="text-muted-foreground mt-1 truncate text-sm">
                          {item.originalUrl}
                        </p>
                      </div>
                      <Tooltip>
                        <TooltipTrigger
                          render={
                            <Button type="button" variant="outline" size="sm" />
                          }
                          onClick={() => handleCopy(item.id, item.slug)}
                        >
                          {isCopied ? (
                            <CheckIcon className="size-4 text-emerald-600" />
                          ) : (
                            <Copy className="size-4" />
                          )}
                          {isCopied ? "Copied" : "Copy"}
                        </TooltipTrigger>
                        <TooltipContent>
                          {isCopied ? "Copied to clipboard" : "Copy short URL"}
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  );
                })
              ) : (
                <div className="border-border text-muted-foreground rounded-[1.25rem] border border-dashed bg-slate-50 px-4 py-6 text-sm">
                  No guest links yet. Paste a URL above to create your first
                  short link.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-1 size-5 text-amber-700" />
              <div>
                <p className="text-lg font-semibold text-amber-950">
                  What happens after 10 links?
                </p>
                <p className="mt-3 text-sm leading-6 text-amber-800">
                  The guest free tier expires. Users then log in to access all
                  links and continue using the product for free.
                </p>
              </div>
            </div>
            <div className="mt-6 space-y-3 text-sm text-amber-900">
              <div className="flex gap-3 rounded-2xl bg-white/70 p-4">
                <CheckCircle2 className="mt-0.5 size-4 text-sky-700" />
                <span>
                  Guest workspace is backed by the API and persisted with a
                  local guest token.
                </span>
              </div>
              <div className="flex gap-3 rounded-2xl bg-white/70 p-4">
                <CheckCircle2 className="mt-0.5 size-4 text-sky-700" />
                <span>
                  After the limit, login becomes required before creating new
                  short links.
                </span>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={
                  guestIdentity?.freeTierExpired ? "/guest-upgrade" : "/sign-in"
                }
                className={linkButtonClass("primary")}
              >
                {guestIdentity?.freeTierExpired
                  ? "See expired state"
                  : "Login now"}
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
