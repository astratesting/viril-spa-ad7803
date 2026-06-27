import { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";
import { classNames } from "@/lib/utils";

const fieldBase =
  "w-full bg-charcoal-soft border px-4 py-3 text-ivory font-satoshi text-base placeholder:text-ivory/35 focus:border-brass transition-colors";

const labelBase =
  "block font-satoshi text-xs tracking-[0.25em] uppercase text-ivory/60 mb-2";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: ReactNode;
}

export function Input({ label, error, hint, className, id, ...rest }: InputProps) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className={labelBase}>
          {label}
        </label>
      )}
      <input
        id={id}
        {...rest}
        className={classNames(fieldBase, error ? "border-[#8B3A3A]" : "border-ivory/15", className)}
      />
      {hint && <p className="mt-2 font-satoshi text-xs text-ivory/45">{hint}</p>}
      {error && <p className="mt-2 font-satoshi text-xs text-[#C97A7A]">{error}</p>}
    </div>
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className, id, ...rest }: TextareaProps) {
  return (
    <div>
      {label && <label htmlFor={id} className={labelBase}>{label}</label>}
      <textarea
        id={id}
        {...rest}
        className={classNames(fieldBase, "resize-none", error ? "border-[#8B3A3A]" : "border-ivory/15", className)}
      />
      {error && <p className="mt-2 font-satoshi text-xs text-[#C97A7A]">{error}</p>}
    </div>
  );
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function Select({ label, error, options, placeholder, className, id, ...rest }: SelectProps) {
  return (
    <div>
      {label && <label htmlFor={id} className={labelBase}>{label}</label>}
      <select
        id={id}
        {...rest}
        className={classNames(fieldBase, "appearance-none cursor-pointer", error ? "border-[#8B3A3A]" : "border-ivory/15", className)}
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-charcoal-soft text-ivory">
            {o.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-2 font-satoshi text-xs text-[#C97A7A]">{error}</p>}
    </div>
  );
}
