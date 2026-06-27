import { HTMLAttributes, ReactNode } from "react";
import { classNames } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  tone?: "dark" | "light";
}

export default function Card({ children, tone = "dark", className, ...rest }: CardProps) {
  return (
    <div
      {...rest}
      className={classNames(
        "border p-6",
        tone === "light"
          ? "bg-ivory border-ivory/20 text-ink"
          : "bg-charcoal-soft border-ivory/15 text-ivory",
        className
      )}
    >
      {children}
    </div>
  );
}
