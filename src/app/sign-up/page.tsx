import { AuthFormCard } from "@/features/auth/auth-form-card";

export default function SignUpPage() {
  return (
    <main className="grid min-h-screen bg-[linear-gradient(180deg,_#f8fbff_0%,_#edf4ff_100%)] lg:grid-cols-[1fr_0.9fr]">
      <section className="flex flex-col justify-between px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">Sign up</p>
          <h1 className="mt-4 max-w-xl text-5xl font-semibold tracking-tight text-slate-950">Create an account when the product has already proven its value.</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
            The sign-up screen keeps the story consistent: you start with links, then create an account when you want persistence,
            analytics history, and a proper workspace.
          </p>
        </div>
      </section>
      <section className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-16">
        <AuthFormCard mode="sign-up" />
      </section>
    </main>
  );
}
