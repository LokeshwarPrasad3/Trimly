import { cn } from "@/lib/utils";

export function linkButtonClass(
  variant: "primary" | "secondary" | "ghost" = "primary",
  extra?: string
) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  const variants = {
    primary: "bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90",
    secondary:
      "bg-secondary px-4 py-2 text-secondary-foreground hover:bg-secondary/80",
    ghost:
      "px-4 py-2 text-foreground hover:bg-accent hover:text-accent-foreground",
  };

  return cn(base, variants[variant], extra);
}
