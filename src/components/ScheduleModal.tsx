// Components/ScheduleModal
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { buildApiUrl } from "../lib/supabase";
import { X, CalendarClock, Send, Users, MessageSquare } from "lucide-react";

export default function ScheduleModal({
  show,
  onClose,
  reportName,
  companyName,
  filterData,
}: any) {
  const [emailsTo, setEmailsTo] = useState<string[]>([]);
  const [emailsCc, setEmailsCc] = useState<string[]>([]);
  const [inputTo, setInputTo] = useState("");
  const [inputCc, setInputCc] = useState("");
  
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const [form, setForm] = useState({
    frequency: "",
    datetime: "",
    subject: "",
    body: "",
    outputAsBody: false,
  });

  if (!show) return null;

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const addEmail = (value: string, list: string[], setList: any, setInput: any) => {
    value.split(/[,;]+/).forEach((e) => {
      const email = e.trim();
      if (!email) return;
      if (!isValidEmail(email)) {
        alert(`Invalid email: ${email}`);
        return;
      }
      if (!list.includes(email)) {
        setList((prev: string[]) => [...prev, email]);
      }
    });
    setInput("");
  };

  const buildDynamicFilters = (filters: any) => {
    const payload: any = {};
    const keyMap: any = {
      company: "compId",
      salesrep: "salesrepId",
      supplier: "supplierId",
      vendor: "vendorId",
      customer: "custId",
      timeperiod: "timeperiod",
      fromDate: "fromDate",
      toDate: "toDate",
    };

    Object.keys(filters || {}).forEach((key) => {
      const value = filters[key];
      if (value === "" || value === null || value === undefined) return;
      const mappedKey = keyMap[key] || key;
      payload[mappedKey] = value;
    });
    return payload;
  };

  const handleSubmit = async () => {
    if (emailsTo.length === 0) {
      alert("Please enter at least one recipient in 'Send Report To'");
      return;
    }
    if (!form.frequency || !form.datetime) {
      alert("Please fill Frequency and Schedule Date Time");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = user.id || 0;
      const company = localStorage.getItem("company") || companyName || "";

      if (!userId) {
        alert("User ID not found");
        return;
      }

      const finalFilter = buildDynamicFilters({ ...filterData, company });

      const payload = {
        reportName,
        recepients: emailsTo.join(","),
        cc_recepients: emailsCc.join(","),
        emailSubject: form.subject || `${reportName} Report`,
        emailBody: `<p>${form.body || reportName}</p>`,
        deliveryFrequency: form.frequency,
        deliveryDateTime: form.datetime,
        filter: JSON.stringify(finalFilter),
        htmlOutput: form.outputAsBody,
      };

      const url = buildApiUrl(`/api/Schedule?compId=${company}&userId=${userId}`);

      await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setIsError(false);
      setMessage("Schedule Saved Successfully ✅");

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err: any) {
      console.error(err);
      setIsError(true);
      setMessage(err.response?.data?.message || "Schedule Failed ❌");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#161d2e] border border-[#26304a] w-full max-w-[680px] max-h-[92vh] rounded-2xl shadow-2xl shadow-black/60 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#26304a] flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[#1c2b4d] rounded-lg flex items-center justify-center">
              <CalendarClock size={18} className="text-[#4f8bff]" />
            </div>
            <h2 className="text-lg font-semibold text-slate-100">Email Schedule Form</h2>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-200 transition-colors">
            <X size={22} />
          </button>
        </div>

        {message && (
          <div className={`mx-6 mt-4 px-4 py-2.5 rounded-lg text-sm font-medium border ${
            isError
              ? "bg-[#3a1a1e] text-[#f87171] border-[#5c2a2f]"
              : "bg-[#12301f] text-[#4ade80] border-[#1f4a30]"
          }`}>
            {message}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Report Info */}
          <div className="bg-[#111827] border border-[#26304a] rounded-xl px-4 py-3 text-sm space-y-1">
            <div className="text-slate-300"><span className="text-slate-500 font-medium">Report Name:</span> <span className="text-slate-100 font-medium">{reportName}</span></div>
            <div className="text-slate-300"><span className="text-slate-500 font-medium">Company Name:</span> <span className="text-slate-100 font-medium">{companyName}</span></div>
          </div>

          {/* Frequency + Date Time */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5 block">Frequency</label>
              <select
                className="border border-[#323e5c] bg-[#1e2739] text-slate-100 w-full h-[38px] px-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8bff] focus:border-transparent"
                value={form.frequency}
                onChange={(e) => setForm({ ...form, frequency: e.target.value })}
              >
                <option value="">--Select Frequency--</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Annually">Annually</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5 block">Schedule Date Time</label>
              <DatePicker
                selected={form.datetime ? new Date(form.datetime) : null}
                onChange={(date) => {
                  if (!date) {
                    setForm({ ...form, datetime: "" });
                    return;
                  }
                   if (!form.datetime) {
                    const now = new Date();
                    date.setHours(now.getHours());
                    date.setMinutes(now.getMinutes());
                  }
                  const pad = (n: number) => n.toString().padStart(2, "0");

                const formatted =
                  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:00`;

                setForm({ ...form, datetime: formatted });
                }}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={1}
                dateFormat="yyyy/MM/dd HH:mm"
                placeholderText="Click Here..."
                isClearable
                className="w-full h-[38px] px-3 bg-[#1e2739] border border-[#323e5c] text-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8bff] focus:border-transparent"
                wrapperClassName="w-full"
                popperClassName="custom-popper"
              />
            </div>
          </div>

          {/* Send Report To */}
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
              <Send size={12} /> Send Report To <span className="text-[#f87171]">*</span>
            </label>
            <div className="flex flex-wrap border border-[#323e5c] p-1 min-h-[38px] rounded-lg bg-[#1e2739] focus-within:ring-2 focus-within:ring-[#4f8bff]">
              {emailsTo.map((email, index) => (
                <div
                  key={index}
                  className="bg-[#263049] border border-[#3a4664] text-slate-200 text-sm px-3 py-1 rounded-full flex items-center mr-2 mb-1"
                >
                  <span>{email}</span>
                  <button
                    onClick={() => setEmailsTo((prev) => prev.filter((_, i) => i !== index))}
                    className="ml-2 text-slate-400 hover:text-[#f87171] font-medium"
                  >
                   ✕
                  </button>
                </div>
              ))}
              <input
                type="text"
                placeholder="Add recipients (separate with comma or Enter)"
                className="flex-1 p-1 outline-none min-w-[160px] bg-transparent text-sm text-slate-100 placeholder-slate-500"
                value={inputTo}
                onChange={(e) => setInputTo(e.target.value)}
                onBlur={() => addEmail(inputTo, emailsTo, setEmailsTo, setInputTo)}
                onKeyDown={(e) => {
                  if (["Enter", ",", ";"].includes(e.key)) {
                    e.preventDefault();
                    addEmail(inputTo, emailsTo, setEmailsTo, setInputTo);
                  }
                }}
              />
            </div>
          </div>

          {/* CC + Email Subject */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                <Users size={12} /> CC
              </label>
              <div className="flex flex-wrap border border-[#323e5c] p-1 min-h-[38px] rounded-lg bg-[#1e2739] focus-within:ring-2 focus-within:ring-[#4f8bff]">
                {emailsCc.map((email, index) => (
                  <div
                    key={index}
                    className="bg-[#263049] border border-[#3a4664] text-slate-200 text-sm px-3 py-1 rounded-full flex items-center mr-2 mb-1"
                  >
                    <span>{email}</span>
                    <button
                      onClick={() => setEmailsCc((prev) => prev.filter((_, i) => i !== index))}
                      className="ml-2 text-slate-400 hover:text-[#f87171]"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  placeholder="Add CC (separate with comma or Enter)"
                  className="flex-1 p-1 outline-none min-w-[140px] bg-transparent text-sm text-slate-100 placeholder-slate-500"
                  value={inputCc}
                  onChange={(e) => setInputCc(e.target.value)}
                  onBlur={() => addEmail(inputCc, emailsCc, setEmailsCc, setInputCc)}
                  onKeyDown={(e) => {
                    if (["Enter", ",", ";"].includes(e.key)) {
                      e.preventDefault();
                      addEmail(inputCc, emailsCc, setEmailsCc, setInputCc);
                    }
                  }}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5 block">Email Subject</label>
              <input
                type="text"
                className="border border-[#323e5c] bg-[#1e2739] text-slate-100 w-full h-[38px] px-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8bff] focus:border-transparent placeholder-slate-500"
                placeholder="Enter email subject..."
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
              />
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex items-center gap-2 pt-1 border-t border-[#20293e]">
            <label className="flex items-center gap-2 cursor-pointer pt-3 select-none">
              <input
                type="checkbox"
                id="outputAsBody"
                checked={form.outputAsBody}
                onChange={(e) => setForm({ ...form, outputAsBody: e.target.checked })}
                className="w-4 h-4 accent-[#4f8bff] cursor-pointer"
              />
              <span className="text-sm text-slate-300">Output As Email Body</span>
            </label>
          </div>

          {/* Body */}
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
              <MessageSquare size={12} /> Body
            </label>
            <textarea
              className="border border-[#323e5c] bg-[#1e2739] text-slate-100 p-3 w-full rounded-lg min-h-[110px] text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8bff] focus:border-transparent placeholder-slate-500"
              placeholder="Write additional message here (optional)..."
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-[#26304a] flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-[#323e5c] text-slate-300 rounded-lg hover:bg-[#1e2739] hover:text-slate-100 text-sm font-medium transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-[#4f8bff] hover:bg-[#6b9dff] text-white rounded-lg shadow-sm shadow-[#4f8bff]/30 text-sm font-medium transition-colors"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
