import Link from "next/link";
import { ArrowRight, CheckCircle2, Layers3, Sparkles } from "lucide-react";

import { AuthFormCard } from "@/features/auth/auth-form-card";

const benefits = [
  "Create a permanent account after testing the guest flow.",
  "Claim guest links automatically during signup.",
  "Enter the full dashboard with analytics and link history.",
];

export default function SignUpPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.24),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(34,211,238,0.18),_transparent_24%),linear-gradient(180deg,_#f7fbff_0%,_#edf6ff_50%,_#ffffff_100%)] px-6 py-8 sm:px-10 lg:px-14 lg:py-12">
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle,_rgba(14,165,233,0.14),_transparent_58%)]" />
      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <section className="space-y-8">
          <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/75 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur">
            <Sparkles className="size-4 text-sky-700" />
            Blink
          </Link>
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">Sign up</p>
            <h1 className="max-w-2xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
              Move from guest mode to a full account without losing your links.
            </h1>
            <p className="max-w-xl text-base leading-7 text-slate-600">
              Create an account to unlock the dashboard, keep your guest links, and continue using the logged-in experience for free.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.75rem] border border-white/70 bg-white/75 p-5 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.3)] backdrop-blur">
              <div className="flex items-center gap-3 text-slate-950">
                <div className="rounded-2xl bg-sky-100 p-2">
                  <Layers3 className="size-4 text-sky-700" />
                </div>
                <p className="font-semibold">Guest claim flow</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">Any guest links on this device are claimed automatically after signup.</p>
            </div>
            <div className="rounded-[1.75rem] border border-white/70 bg-[linear-gradient(135deg,_rgba(14,165,233,0.14),_rgba(255,255,255,0.92),_rgba(34,211,238,0.14))] p-5 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.3)] backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">Signup route</p>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">/api/users</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">The signup form posts directly to the backend user creation endpoint.</p>
            </div>
          </div>
          <div className="space-y-3 rounded-[1.75rem] border border-white/70 bg-white/80 p-6 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.3)] backdrop-blur">
            {benefits.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 size-4 text-sky-700" />
                <p className="text-sm leading-6 text-slate-600">{item}</p>
              </div>
            ))}
            <Link href="/sign-in" className="inline-flex items-center gap-2 pt-2 text-sm font-medium text-sky-700 hover:underline">
              Already have an account?
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
        <section className="flex items-center justify-center">
          <AuthFormCard mode="sign-up" />
        </section>
      </div>
    </main>
  );
}
