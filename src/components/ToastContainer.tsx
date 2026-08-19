// components/ToastContainer.tsx
import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from "lucide-react";
import { subscribeToasts, dismissToast, Toast, ToastType } from "../lib/toast";

const ICONS: Record<ToastType, typeof Info> = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const STYLES: Record<ToastType, string> = {
  success: "bg-[#12301f] border-[#1f4a30] text-[#4ade80]",
  error: "bg-[#3a1a1e] border-[#5c2a2f] text-[#f87171]",
  warning: "bg-[#3a2f14] border-[#5c4a1f] text-[#facc15]",
  info: "bg-[#16233f] border-[#26304a] text-[#6b9dff]",
};

const ICON_BG: Record<ToastType, string> = {
  success: "bg-[#1a4a2e]",
  error: "bg-[#5c2a2f]",
  warning: "bg-[#5c4a1f]",
  info: "bg-[#1c2b4d]",
};

export default function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => subscribeToasts(setToasts), []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 w-[360px] max-w-[calc(100vw-2.5rem)] pointer-events-none">
      {toasts.map((t) => {
        const Icon = ICONS[t.type];
        return (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-start gap-3 border rounded-xl px-4 py-3.5 shadow-2xl shadow-black/50 animate-[toast-in_0.2s_ease-out] ${STYLES[t.type]}`}
          >
            <span className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center ${ICON_BG[t.type]}`}>
              <Icon size={15} />
            </span>
            <p className="text-sm font-medium leading-snug flex-1 pt-0.5 text-slate-100">
              {t.message}
            </p>
            <button
              onClick={() => dismissToast(t.id)}
              className="shrink-0 text-slate-400 hover:text-slate-100 transition-colors mt-0.5"
              aria-label="Dismiss"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
