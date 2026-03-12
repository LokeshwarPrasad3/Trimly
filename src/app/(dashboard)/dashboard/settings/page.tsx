import { Progress } from "@/components/ui/progress";
import { settingsSections } from "@/lib/mock-data";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-border/60 bg-background p-6 shadow-sm lg:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Settings</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">Keep the operational screens polished from day one.</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
          Settings screens are usually where unfinished products look generic. This UI pass keeps them inside the same system and tone.
        </p>
      </section>
      <section className="grid gap-5 xl:grid-cols-3">
        {settingsSections.map((section, index) => (
          <article key={section.title} className="rounded-[1.75rem] border border-border/70 bg-background p-6 shadow-sm">
            <p className="text-lg font-semibold text-foreground">{section.title}</p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{section.description}</p>
            <Progress value={65 + index * 10} className="mt-6" />
          </article>
        ))}
      </section>
    </div>
  );
}
