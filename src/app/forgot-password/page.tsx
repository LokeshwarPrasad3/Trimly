import { AuthFormCard } from "@/features/auth/auth-form-card";

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,_#f8fbff_0%,_#edf4ff_100%)] px-6 py-10 sm:px-10">
      <div className="grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          <p className="text-sm font-semibold tracking-[0.24em] text-sky-700 uppercase">
            Recovery
          </p>
          <h1 className="text-5xl font-semibold tracking-tight text-slate-950">
            Reset the account flow without breaking the design system.
          </h1>
          <p className="text-base leading-7 text-slate-600">
            Even support states and secondary flows are designed upfront, so the
            product does not collapse into generic screens outside the main
            happy path.
          </p>
        </div>
        <AuthFormCard mode="forgot-password" />
      </div>
    </main>
  );
}
