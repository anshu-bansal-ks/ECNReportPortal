// import { useState } from "react";
// import { 
//   LayoutDashboard, Users, UserCircle, ShieldCheck, 
//   FileText, Mail, ClipboardList, Lock, LogOut, Settings
// } from "lucide-react";

// // ✅ Interface define kiya taaki App.tsx ka error chala jaye
// interface AdminDashboardProps {
//   onLogout: () => void;
// }

// export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
//   const [activeTab, setActiveTab] = useState("reports");

//   const menuItems = [
//     { id: "user-mgmt", label: "User Management", icon: Users },
//     { id: "sales-mgmt", label: "User and Sales Person", icon: UserCircle },
//     { id: "role-mgmt", label: "Role Management", icon: ShieldCheck },
//     { id: "report-mgmt", label: "Report Management", icon: FileText },
//     { id: "email-mgmt", label: "Email Management", icon: Mail },
//     { id: "email-log", label: "Email Log Board", icon: ClipboardList },
//     { id: "log-board", label: "Log Board", icon: ClipboardList },
//     { id: "report-status", label: "Report Assignment Status", icon: FileText },
//     { id: "report-access", label: "Report Access", icon: Lock },
//   ];

//   return (
//     <div className="flex h-screen bg-slate-50 overflow-hidden">
      
//       {/* 🟢 SIDEBAR (Left Panel) */}
//       <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-2xl">
//         <div className="p-6 border-b border-slate-800 flex items-center gap-3">
//           <div className="bg-blue-600 p-2 rounded-lg">
//             <LayoutDashboard size={20} className="text-white" />
//           </div>
//           <span className="text-xl font-bold tracking-tight">Admin CP</span>
//         </div>

//         <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
//           {menuItems.map((item) => (
//             <button
//               key={item.id}
//               onClick={() => setActiveTab(item.id)}
//               className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
//                 activeTab === item.id 
//                   ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
//                   : "text-slate-400 hover:bg-slate-800 hover:text-white"
//               }`}
//             >
//               <item.icon size={20} />
//               <span className="font-medium">{item.label}</span>
//             </button>
//           ))}
//         </nav>

//         {/* User Info & Logout */}
//         <div className="p-4 border-t border-slate-800 space-y-4">
//           <button 
//             onClick={onLogout}
//             className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200"
//           >
//             <LogOut size={20} />
//             <span className="font-medium">Sign Out</span>
//           </button>
//         </div>
//       </aside>

//       {/* ⚪ MAIN CONTENT (Right Panel) */}
//       <main className="flex-1 flex flex-col overflow-hidden">
        
//         {/* Header */}
//         <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
//           <h2 className="text-lg font-semibold text-slate-800 capitalize">
//             {activeTab.replace("-", " ")}
//           </h2>
//           <div className="flex items-center gap-4">
//             <span className="text-sm text-slate-500 italic">Administrator</span>
//             <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
//               <Settings size={16} className="text-slate-600" />
//             </div>
//           </div>
//         </header>

//         {/* Dynamic View Section */}
//         <div className="flex-1 overflow-auto p-8">
//           <div className="max-w-6xl mx-auto">
            
//             {activeTab === "reports" && (
//               <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
//                  {/* 🔹 Aapka Report List ka Table yahan aayega */}
//                  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
//                     <h3 className="text-xl font-bold mb-4">Master Reports Table</h3>
//                     <p className="text-gray-500">Yahan aapki purani CSHTML wali table render hogi.</p>
//                  </div>
//               </div>
//             )}

//             {activeTab === "users" && (
//               <div className="p-12 text-center bg-white rounded-2xl border-2 border-dashed border-gray-200">
//                  <Users className="mx-auto mb-4 text-gray-300" size={48} />
//                  <h3 className="text-lg font-medium text-gray-500">User Management Module</h3>
//                  <p className="text-sm text-gray-400">Add or Edit users coming soon.</p>
//               </div>
//             )}

//             {/* Other tabs placeholder */}
//             {activeTab !== "reports" && activeTab !== "users" && (
//                <div className="p-20 text-center text-gray-400">
//                   Select a module from the sidebar.
//                </div>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
import { useState } from "react";
import { 
  LayoutDashboard, Users, UserCircle, ShieldCheck, 
  FileText, Mail, ClipboardList, Lock, LogOut, 
  ChevronRight, ChevronLeft, Plus, FileSpreadsheet
} from "lucide-react";
import AdminReportList from "./report-mgmt";

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  // ✅ 1. Default tab 'report-mgmt' fix kiya
  const [activeTab, setActiveTab] = useState("report-mgmt");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: "user-mgmt", label: "User Management", icon: Users },
    { id: "sales-mgmt", label: "User and Sales Person", icon: UserCircle },
    { id: "role-mgmt", label: "Role Management", icon: ShieldCheck },
    { id: "report-mgmt", label: "Report Management", icon: FileText },
    { id: "email-mgmt", label: "Email Management", icon: Mail },
    { id: "email-log", label: "Email Log Board", icon: ClipboardList },
    { id: "log-board", label: "Log Board", icon: ClipboardList },
    { id: "report-status", label: "Report Assignment Status", icon: FileText },
    { id: "report-access", label: "Report Access", icon: Lock },
  ];

  return (
    <div className="flex h-screen bg-[#F4F7FE] overflow-hidden font-sans">
      
      {/* 🟢 SIDEBAR: Width kam ki (w-64) aur Scroll hataya (overflow-hidden) */}
      <aside className={`${isCollapsed ? "w-15" : "w-50"} bg-[#0B1437] text-white flex flex-col shadow-2xl relative z-10 transition-all duration-300 overflow-hidden`}>
        
        {/* Toggle Button */}
        <button 
  onClick={() => setIsCollapsed(!isCollapsed)} 
  className="absolute -right-3 top-10 bg-blue-500 text-white rounded-full shadow-xl hover:scale-110 z-50 border-2 border-[#F4F7FE] flex items-center justify-center transition-transform"
  style={{ height: '25px', width: '25px' }} // ✅ Exact height and width
>
  {isCollapsed ? (
    <ChevronRight size={18} strokeWidth={3} /> 
  ) : (
    <ChevronLeft size={18} strokeWidth={3} />
  )}
</button>

        {/* Logo Section */}
        <div className={`p-6 mb-2 border-b border-white/10 flex items-center ${isCollapsed ? "justify-center" : "gap-3"}`}>
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shrink-0">
            <ShieldCheck size={20} className="text-white" />
          </div>
          {!isCollapsed && (
            <div className="animate-in fade-in whitespace-nowrap">
              <h1 className="text-lg font-bold tracking-tight">ECN PORTAL</h1>
            </div>
          )}
        </div>

        {/* ✅ Navigation: Scroll hatane ke liye overflow-hidden rakha hai */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-hidden">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full group relative flex items-center px-3 py-3 rounded-xl transition-all duration-200 ${
                  isActive ? "bg-white/10 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
                } ${isCollapsed ? "justify-center" : "justify-start gap-3"}`}
              >
                <item.icon size={18} className={isActive ? "text-blue-400" : ""} />
                {!isCollapsed && (
                  <span className="text-[13px] font-semibold whitespace-nowrap overflow-hidden">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ⚪ MAIN CONTENT: Width badha di (flex-1) */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* HEADER */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-[#1B2559] capitalize">
              {activeTab.replace("-", " ")}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end border-r pr-4 border-gray-100">
               <span className="text-xs font-bold text-[#1B2559]">Administrator</span>
               <span className="text-[10px] text-green-500 font-bold uppercase">Online</span>
            </div>
            
            <button 
              onClick={onLogout} 
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition-all active:scale-95 font-bold text-[11px]"
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </div>
        </header>

        {/* CONTENT AREA: Right side space maximize ki gayi hai */}
        <div className="flex-1 overflow-auto p-1">
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 min-h-full w-full">
            
            {/* 🔥 REPORT MANAGEMENT: Ab ye login karte hi samne aayega */}
            {activeTab === "report-mgmt" && (
              <div className="space-y-4 animate-in fade-in duration-500">
                <div className="flex justify-between items-center border-b pb-4">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <FileSpreadsheet className="text-blue-500" size={20} /> Report Management
                  </h3>
                  <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg text-xs font-bold">
                    <Plus size={16} /> Add Report
                  </button>
                </div>
                <AdminReportList />
              </div>
            )}

            {/* Role Management */}
            {activeTab === "role-mgmt" && (
              <div className="animate-in fade-in">
                <h3 className="text-lg font-bold mb-4 text-slate-800">Role Management System</h3>
                <p className="text-slate-500 text-sm">Role settings content here...</p>
              </div>
            )}

            {/* Other tabs placeholder */}
            {activeTab !== "role-mgmt" && activeTab !== "report-mgmt" && (
              <div className="flex flex-col items-center justify-center h-[400px] text-slate-300">
                <LayoutDashboard size={48} className="mb-4 opacity-20" />
                <p className="text-sm font-bold italic">This module is under development.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}