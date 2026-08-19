//components/login
import { useState } from "react";
import { LogIn } from "lucide-react";

interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-[#0b0f19] bg-[radial-gradient(circle_at_20%_20%,rgba(79,139,255,0.08),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(79,139,255,0.06),transparent_40%)]">
      <div className="w-full max-w-md p-8 bg-[#161d2e] border border-[#26304a] shadow-2xl shadow-black/50 rounded-2xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br from-[#4f8bff] to-[#3562d6] rounded-2xl shadow-lg shadow-[#4f8bff]/30">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-100 tracking-tight">Reporting Portal</h1>
          <p className="mt-2 text-slate-400">Sign in to access your reports</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-300">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 transition-all bg-[#1e2739] border border-[#323e5c] rounded-lg text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-[#4f8bff] focus:border-transparent outline-none"
              placeholder="Enter username"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 transition-all bg-[#1e2739] border border-[#323e5c] rounded-lg text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-[#4f8bff] focus:border-transparent outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 font-medium text-white transition-all bg-gradient-to-r from-[#4f8bff] to-[#3562d6] rounded-lg shadow-lg shadow-[#4f8bff]/30 hover:from-[#6b9dff] hover:to-[#4472e0] active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>

      </div>
    </div>
  );
}
