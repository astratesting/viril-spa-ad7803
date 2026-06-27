"use client";

import { ReactNode, useEffect } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export default function Modal({ open, onClose, title, children, footer }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/90 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-charcoal-soft border border-brass/30 p-8 animate-[fadeIn_0.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h3 className="font-playfair text-2xl text-ivory mb-6">{title}</h3>}
        <div className="font-satoshi text-sm text-ivory/80 space-y-4">{children}</div>
        {footer && <div className="mt-8 flex justify-end gap-3">{footer}</div>}
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 text-ivory/40 hover:text-brass"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
