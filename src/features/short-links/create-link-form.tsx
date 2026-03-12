"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createShortLinkSchema, type CreateShortLinkInput } from "@/lib/validations/short-link";

export function CreateLinkForm() {
  const form = useForm<CreateShortLinkInput>({
    resolver: zodResolver(createShortLinkSchema),
    defaultValues: {
      slug: "spring-launch",
      originalUrl: "https://acme.com/launch",
    },
  });

  return (
    <Card className="rounded-[1.75rem] border-border/70 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Create short link</CardTitle>
        <CardDescription>UI-only form with validation states and mock publishing flow.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={form.handleSubmit(() => undefined)}>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="originalUrl">Destination URL</Label>
              <Input id="originalUrl" {...form.register("originalUrl")} />
              <p className="text-xs text-rose-600">{form.formState.errors.originalUrl?.message ?? " "}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Custom alias</Label>
              <Input id="slug" {...form.register("slug")} />
              <p className="text-xs text-rose-600">{form.formState.errors.slug?.message ?? " "}</p>
            </div>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="space-y-2">
              <Label>Link category</Label>
              <Select defaultValue="campaign">
                <SelectTrigger>
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="campaign">Campaign</SelectItem>
                  <SelectItem value="creator">Creator</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Visibility</Label>
              <Select defaultValue="public">
                <SelectTrigger>
                  <SelectValue placeholder="Choose visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="internal">Internal</SelectItem>
                  <SelectItem value="review">Needs approval</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Internal notes</Label>
            <Textarea id="notes" placeholder="This campaign will be tied to the April launch review." />
          </div>
          <Button type="submit" className="w-full sm:w-auto">
            Publish preview
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
