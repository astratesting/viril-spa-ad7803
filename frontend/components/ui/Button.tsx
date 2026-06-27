import { ButtonHTMLAttributes, ReactNode } from "react";
import { classNames } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
  children: ReactNode;
}

const base =
  "inline-flex items-center justify-center gap-2 font-satoshi text-sm font-bold tracking-[0.2em] uppercase transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed select-none";

const variants: Record<Variant, string> = {
  primary: "bg-brass text-ink border border-brass hover:bg-brass-bright hover:border-brass-bright",
  secondary: "bg-transparent text-brass border border-brass hover:bg-brass hover:text-ink",
  ghost: "bg-transparent text-ivory border border-ivory/30 hover:border-brass hover:text-brass",
  danger: "bg-[#8B3A3A] text-ivory border border-[#8B3A3A] hover:brightness-110",
};

export default function Button({
  variant = "primary",
  loading = false,
  className,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      className={classNames(base, variants[variant], "px-8 py-3", className)}
    >
      {loading && (
        <span
          aria-hidden
          className="inline-block w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin"
        />
      )}
      {children}
    </button>
  );
}
