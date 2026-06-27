import { ReactNode } from "react";
import { classNames } from "@/lib/utils";

type Tone = "brass" | "amber" | "green" | "red" | "muted";

const tones: Record<Tone, string> = {
  brass: "bg-brass/15 text-brass border-brass/40",
  amber: "bg-amber-400/15 text-amber-300 border-amber-400/40",
  green: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40",
  red: "bg-red-500/15 text-red-300 border-red-500/40",
  muted: "bg-ivory/10 text-ivory/60 border-ivory/20",
};

export default function Badge({
  children,
  tone = "muted",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={classNames(
        "inline-flex items-center px-2.5 py-1 border text-[10px] font-satoshi font-bold tracking-[0.2em] uppercase",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
