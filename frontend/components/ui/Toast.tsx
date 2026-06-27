"use client";

import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";

type ToastKind = "success" | "error" | "info";
interface Toast {
  id: number;
  kind: ToastKind;
  message: string;
}

const ToastContext = createContext<{ toast: (message: string, kind?: ToastKind) => void } | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) return { toast: () => undefined };
  return ctx;
}

const accent: Record<ToastKind, string> = {
  success: "border-brass text-brass",
  error: "border-[#8B3A3A] text-[#C97A7A]",
  info: "border-ivory/40 text-ivory",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toast = useCallback((message: string, kind: ToastKind = "info") => {
    setToasts((t) => [...t, { id: Date.now() + Math.random(), kind, message }]);
  }, []);

  useEffect(() => {
    if (toasts.length === 0) return;
    const timers = toasts.map((t) =>
      setTimeout(() => setToasts((cur) => cur.filter((c) => c.id !== t.id)), 3500)
    );
    return () => timers.forEach(clearTimeout);
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`bg-charcoal-soft border ${accent[t.kind]} px-5 py-3 font-satoshi text-sm`}
            role="status"
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
