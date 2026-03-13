"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateAuthenticatedLink } from "@/features/short-links/hooks/use-short-links";
import { createAuthenticatedLinkSchema, type CreateAuthenticatedLinkInput } from "@/lib/api/links";
import { getShortLinkUrl } from "@/lib/short-url";

export function CreateLinkForm() {
  const router = useRouter();
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const createLinkMutation = useCreateAuthenticatedLink();
  const form = useForm<CreateAuthenticatedLinkInput>({
    resolver: zodResolver(createAuthenticatedLinkSchema),
    defaultValues: {
      title: "Spring launch",
      slug: "spring-launch",
      originalUrl: "https://acme.com/launch",
    },
  });
  const slug = useWatch({ control: form.control, name: "slug" });

  async function onSubmit(values: CreateAuthenticatedLinkInput) {
    setSubmissionError(null);

    try {
      const normalizedValues = {
        ...values,
        title: values.title?.trim() ? values.title.trim() : undefined,
      };
      const link = await createLinkMutation.mutateAsync(normalizedValues);
      form.reset({
        title: link.title ?? "",
        slug: link.slug,
        originalUrl: link.originalUrl,
      });
      router.push(`/dashboard/links/${link.id}`);
    } catch (error) {
      setSubmissionError(error instanceof Error ? error.message : "Unable to create link.");
    }
  }

  return (
    <Card className="rounded-[1.75rem] border-white/60 bg-white/85 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.35)] backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-xl text-slate-950">Create short link</CardTitle>
        <CardDescription>Use a memorable slug and a clean destination. This form now posts to the live authenticated API.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Link title</Label>
              <Input id="title" placeholder="Campaign landing page" {...form.register("title")} />
              <p className="text-xs text-rose-600">{form.formState.errors.title?.message ?? " "}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Custom alias</Label>
              <Input id="slug" {...form.register("slug")} />
              <p className="text-xs text-rose-600">{form.formState.errors.slug?.message ?? " "}</p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="originalUrl">Destination URL</Label>
            <Input id="originalUrl" {...form.register("originalUrl")} />
            <p className="text-xs text-rose-600">{form.formState.errors.originalUrl?.message ?? " "}</p>
          </div>
          <div className="rounded-2xl bg-[linear-gradient(135deg,_rgba(14,165,233,0.1),_rgba(255,255,255,0.92),_rgba(6,182,212,0.1))] p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-2xl bg-white p-2 shadow-sm">
                <Sparkles className="size-4 text-sky-700" />
              </div>
              <div>
                <p className="font-medium text-slate-950">Preview</p>
                <p className="mt-1 text-sm text-slate-600">Your short URL will look like <span className="font-medium text-slate-950">{getShortLinkUrl(slug || "your-slug")}</span></p>
              </div>
            </div>
          </div>
          {submissionError ? <p className="text-sm text-rose-600">{submissionError}</p> : null}
          <Button type="submit" className="w-full sm:w-auto" disabled={createLinkMutation.isPending}>
            {createLinkMutation.isPending ? <LoaderCircle className="size-4 animate-spin" /> : null}
            {createLinkMutation.isPending ? "Creating link" : "Create link"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
