import { CheckCircle2 } from "lucide-react";

import { CreateLinkForm } from "@/features/short-links/create-link-form";
import { createLinkChecklist } from "@/lib/mock-data";

export default function CreatePage() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6">
        <section className="rounded-[2rem] border border-white/60 bg-[linear-gradient(135deg,_rgba(14,165,233,0.12),_rgba(255,255,255,0.9)_45%,_rgba(6,182,212,0.12))] p-6 shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] lg:p-8">
          <p className="text-sm font-semibold tracking-[0.22em] text-sky-700 uppercase">
            Create
          </p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
            Create short links inside the logged-in workspace.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            The dashboard create screen is now only for logged-in users. Guest
            users stay in the simpler guest flow until they reach the 10-link
            limit.
          </p>
        </section>
        <CreateLinkForm />
      </div>
      <section className="rounded-[1.75rem] border border-white/60 bg-white/75 p-6 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.4)] backdrop-blur-xl">
        <h2 className="text-xl font-semibold text-slate-950">
          What this screen should feel like
        </h2>
        <div className="mt-5 space-y-4">
          {createLinkChecklist.map((item) => (
            <div key={item} className="flex gap-3 rounded-2xl bg-sky-50/70 p-4">
              <CheckCircle2 className="mt-0.5 size-4 text-sky-700" />
              <p className="text-sm leading-6 text-slate-600">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
