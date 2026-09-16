// components/UserMenu.tsx
import { useState, useRef } from "react";
import { User, LogOut } from "lucide-react";

interface UserMenuProps {
  userEmail: string;
  onLogout: () => void;
}

export default function UserMenu({ userEmail, onLogout }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="User menu"
        aria-expanded={open}
        className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-colors ${
          open
            ? "bg-[#263049] border-[#4f8bff] text-[#4f8bff]"
            : "bg-[#1e2739] border-[#26304a] text-slate-300 hover:border-[#3a4664] hover:text-slate-100"
        }`}
      >
        <User className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] w-56 bg-[#161d2e] border border-[#26304a] rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-[#20293e]">
            <p className="text-[11px] uppercase tracking-wide text-slate-500 mb-0.5">Signed in as</p>
            <p className="text-sm font-medium text-slate-100 truncate">{userEmail}</p>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2.5 px-4 py-3 text-sm font-medium text-slate-300 hover:bg-[#1e2739] hover:text-[#f87171] transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
