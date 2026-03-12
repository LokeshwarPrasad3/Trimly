import { AuthFormCard } from "@/features/auth/auth-form-card";

export default function SignInPage() {
  return (
    <main className="grid min-h-screen bg-[linear-gradient(180deg,_#f8fbff_0%,_#edf4ff_100%)] lg:grid-cols-[1fr_0.9fr]">
      <section className="flex flex-col justify-between px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">Sign in</p>
          <h1 className="mt-4 max-w-xl text-5xl font-semibold tracking-tight text-slate-950">Step back into the workspace without losing momentum.</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
            This is a frontend-only auth flow for product review. The screen is polished and wired for interaction patterns,
            but not connected to authentication yet.
          </p>
        </div>
      </section>
      <section className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-16">
        <AuthFormCard mode="sign-in" />
      </section>
    </main>
  );
}
