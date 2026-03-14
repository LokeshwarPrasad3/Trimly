import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

import { AuthFormCard } from "@/features/auth/auth-form-card";

const benefits = [
  "Claim guest links automatically.",
  "Enter the full dashboard with your saved links.",
];

export default function SignUpPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.24),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(34,211,238,0.18),_transparent_24%),linear-gradient(180deg,_#f7fbff_0%,_#edf6ff_50%,_#ffffff_100%)] px-6 py-8 sm:px-10 lg:px-14 lg:py-12">
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle,_rgba(14,165,233,0.14),_transparent_58%)]" />
      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <section className="order-2 space-y-6 lg:order-1">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/75 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur"
          >
            <Sparkles className="size-4 text-sky-700" />
            Trimly
          </Link>
          <div className="space-y-4">
            <p className="text-sm font-semibold tracking-[0.24em] text-sky-700 uppercase">
              Sign up
            </p>
            <h1 className="max-w-xl bg-[linear-gradient(135deg,_#0f172a_0%,_#155e75_55%,_#0ea5e9_100%)] bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl">
              Create your account and keep every link in one place.
            </h1>
            <p className="max-w-lg text-base leading-7 text-slate-600">
              Move from the guest flow into the full workspace without losing
              the links already created on this device.
            </p>
          </div>
          <div className="space-y-3 rounded-[1.75rem] border border-white/70 bg-white/78 p-6 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.28)] backdrop-blur">
            {benefits.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 size-4 text-sky-700" />
                <p className="text-sm leading-6 text-slate-600">{item}</p>
              </div>
            ))}
            <Link
              href="/sign-in"
              className="inline-flex items-center gap-2 pt-2 text-sm font-medium text-sky-700 hover:underline"
            >
              Already have an account?
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
        <section className="order-1 flex items-center justify-center lg:order-2">
          <AuthFormCard mode="sign-up" />
        </section>
      </div>
    </main>
  );
}
