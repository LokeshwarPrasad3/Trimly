import { Progress } from "@/components/ui/progress";
import { settingsSections } from "@/lib/mock-data";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <section className="border-border/60 bg-background rounded-[2rem] border p-6 shadow-sm lg:p-8">
        <p className="text-sm font-semibold tracking-[0.22em] text-sky-700 uppercase">
          Settings
        </p>
        <h1 className="text-foreground mt-3 text-2xl font-semibold tracking-tight">
          Keep the operational screens polished from day one.
        </h1>
        <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-7">
          Settings screens are usually where unfinished products look generic.
          This UI pass keeps them inside the same system and tone.
        </p>
      </section>
      <section className="grid gap-5 xl:grid-cols-3">
        {settingsSections.map((section, index) => (
          <article
            key={section.title}
            className="border-border/70 bg-background rounded-[1.75rem] border p-6 shadow-sm"
          >
            <p className="text-foreground text-lg font-semibold">
              {section.title}
            </p>
            <p className="text-muted-foreground mt-3 text-sm leading-6">
              {section.description}
            </p>
            <Progress value={65 + index * 10} className="mt-6" />
          </article>
        ))}
      </section>
    </div>
  );
}
