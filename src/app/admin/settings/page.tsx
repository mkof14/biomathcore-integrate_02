"use client";
import { useRole } from "@/components/admin/useRole";
import type { Role } from "@/lib/roles";
import { can } from "@/lib/roles";
import { useEffect, useState } from "react";

const ROLES: Role[] = [
  "SuperAdmin",
  "Analyst",
  "TechOperator",
  "ContentManager",
  "Moderator",
];

export default function Settings() {
  const { role, setRole } = useRole();
  const [lang, setLang] = useState("en");
  const [currency, setCurrency] = useState("USD");
  const [tz, setTz] = useState("America/New_York");
  const [apiKey, setApiKey] = useState("");
  const [aiEnabled, setAiEnabled] = useState(true);

  useEffect(() => {
    const st = (k: string, d: string) => localStorage.getItem(k) || d;
    setLang(st("adm.lang", "en"));
    setCurrency(st("adm.currency", "USD"));
    setTz(st("adm.tz", "America/New_York"));
    setApiKey(localStorage.getItem("adm.apiKey") || "");
    setAiEnabled((localStorage.getItem("adm.ai") ?? "1") === "1");
  }, []);
  const save = () => {
    localStorage.setItem("adm.lang", lang);
    localStorage.setItem("adm.currency", currency);
    localStorage.setItem("adm.tz", tz);
    localStorage.setItem("adm.apiKey", apiKey);
    localStorage.setItem("adm.ai", aiEnabled ? "1" : "0");
    alert("Saved");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Settings</h2>

      <div className="bg-[#0c1324] border border-slate-800 rounded-xl p-4">
        <div className="text-sm mb-2">
          Current role: <span className="font-semibold">{role}</span>
        </div>
        {role === "SuperAdmin" ? (
          <div className="flex items-center gap-3">
            <label className="text-sm">Switch session role:</label>
            <select
              className="rounded bg-slate-900/60 border border-slate-700 p-2"
              defaultValue={role}
              onChange={(e) => setRole(e.target.value as Role)}
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="text-slate-400 text-sm">
            Only SuperAdmin can change session role.
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-[#0c1324] border border-slate-800 rounded-xl p-4">
          <h3 className="font-semibold mb-2">Localization</h3>
          <div className="flex flex-col gap-2">
            <label className="text-sm">Language</label>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="rounded bg-slate-900/60 border border-slate-700 p-2"
            >
              <option>en</option>
              <option>ru</option>
              <option>es</option>
            </select>
            <label className="text-sm">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="rounded bg-slate-900/60 border border-slate-700 p-2"
            >
              <option>USD</option>
              <option>EUR</option>
              <option>RUB</option>
            </select>
            <label className="text-sm">Timezone</label>
            <input
              value={tz}
              onChange={(e) => setTz(e.target.value)}
              className="rounded bg-slate-900/60 border border-slate-700 p-2"
            />
          </div>
        </div>

        <div className="bg-[#0c1324] border border-slate-800 rounded-xl p-4">
          <h3 className="font-semibold mb-2">API / AI</h3>
          <div className="flex flex-col gap-2">
            <label className="text-sm">API Key</label>
            <input
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="rounded bg-slate-900/60 border border-slate-700 p-2"
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={aiEnabled}
                onChange={(e) => setAiEnabled(e.target.checked)}
              />
              Enable AI modules
            </label>
            <button
              onClick={save}
              className="mt-2 px-3 py-1 rounded bg-emerald-400 text-slate-900 font-semibold"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#0c1324] border border-slate-800 rounded-xl p-4">
        <h3 className="font-semibold mb-2">Access Preview</h3>
        <ul className="text-sm grid sm:grid-cols-2 gap-y-1">
          <li>
            FinanceMonitor: {can(role as Role, "view_finance") ? "✅" : "⛔"}
          </li>
          <li>
            UserManagement: {can(role as Role, "manage_users") ? "✅" : "⛔"}
          </li>
          <li>
            DeviceMonitor: {can(role as Role, "monitor_devices") ? "✅" : "⛔"}
          </li>
          <li>
            BehaviorAnalytics:{" "}
            {can(role as Role, "view_analytics") ? "✅" : "⛔"}
          </li>
          <li>Alerts: {can(role as Role, "view_alerts") ? "✅" : "⛔"}</li>
          <li>
            Settings: {can(role as Role, "access_settings") ? "✅" : "⛔"}
          </li>
        </ul>
      </div>
    </div>
  );
}
