// lib/toast.ts
// Minimal event-based toast store. Any component can call showToast(...)
// without needing React context/provider wiring — ToastContainer (mounted
// once near the app root) subscribes and renders whatever is active.

export type ToastType = "error" | "success" | "warning" | "info";

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

type Listener = (toasts: Toast[]) => void;

let toasts: Toast[] = [];
let listeners: Listener[] = [];
let idCounter = 0;

function emit() {
  listeners.forEach((l) => l(toasts));
}

export function showToast(message: string, type: ToastType = "error", durationMs = 4500) {
  const id = ++idCounter;
  toasts = [...toasts, { id, message, type }];
  emit();
  if (durationMs > 0) {
    setTimeout(() => dismissToast(id), durationMs);
  }
  return id;
}

export function dismissToast(id: number) {
  toasts = toasts.filter((t) => t.id !== id);
  emit();
}

export function subscribeToasts(listener: Listener) {
  listeners.push(listener);
  listener(toasts);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}
