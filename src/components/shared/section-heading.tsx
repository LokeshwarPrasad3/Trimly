type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-3xl space-y-3">
      <p className="text-sm font-semibold tracking-[0.24em] text-sky-700 uppercase">
        {eyebrow}
      </p>
      <h2 className="bg-[linear-gradient(135deg,_#0f172a_0%,_#0f766e_55%,_#0ea5e9_100%)] bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl">
        {title}
      </h2>
      <p className="text-base leading-7 text-slate-600">{description}</p>
    </div>
  );
}
