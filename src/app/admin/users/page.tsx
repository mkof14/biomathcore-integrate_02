"use client";
import { useEffect, useMemo, useState } from "react";
type U = { id:string; email:string; role:string; active:boolean; lastSeen:number };

export default function Users() {
  const [users,setUsers] = useState<U[]>([]);
  const [q,setQ] = useState("");
  const [role,setRole] = useState("All");
  const [active,setActive] = useState<"all"|"active"|"inactive">("all");
  useEffect(()=>{ fetch("/api/users/list").then(r=>r.json()).then(d=>setUsers(d.users)); },[]);
  const roles = Array.from(new Set(users.map(u=>u.role)));
  const filtered = useMemo(()=>users.filter(u=>{
    const okQ = q ? (u.email.includes(q)||u.id.includes(q)) : true;
    const okR = role==="All" ? true : u.role===role;
    const okA = active==="all" ? true : active==="active" ? u.active : !u.active;
    return okQ && okR && okA;
  }),[users,q,role,active]);

  const updateRole = async (id:string, newRole:string)=>{
    await fetch("/api/users/update",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id,role:newRole})});
    setUsers(prev=>prev.map(u=>u.id===id?{...u,role:newRole}:u));
  };
  const toggleBlock = async (id:string)=>{
    await fetch("/api/users/update",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id,block:true})});
    setUsers(prev=>prev.map(u=>u.id===id?{...u,active:!u.active}:u));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">User Management</h2>
      <div className="flex gap-2 flex-wrap">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by email or ID" className="px-2 py-1 rounded bg-slate-900/60 border border-slate-700"/>
        <select value={role} onChange={e=>setRole(e.target.value)} className="px-2 py-1 rounded bg-slate-900/60 border border-slate-700">
          <option>All</option>{roles.map(r=><option key={r}>{r}</option>)}
        </select>
        <select value={active} onChange={e=>setActive(e.target.value as any)} className="px-2 py-1 rounded bg-slate-900/60 border border-slate-700">
          <option value="all">All</option><option value="active">Active</option><option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="bg-[#0c1324] border border-slate-800 rounded-xl p-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-slate-400">
            <tr><th className="text-left py-2">ID</th><th className="text-left py-2">Email</th><th className="text-left py-2">Role</th><th className="text-left py-2">Active</th><th className="py-2">Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map(u=>(
              <tr key={u.id} className="border-t border-slate-800">
                <td className="py-2">{u.id}</td>
                <td className="py-2">{u.email}</td>
                <td className="py-2">
                  <select value={u.role} onChange={e=>updateRole(u.id, e.target.value)} className="px-2 py-1 rounded bg-slate-900/60 border border-slate-700">
                    {["SuperAdmin","Analyst","TechOperator","ContentManager","Moderator","User"].map(r=><option key={r}>{r}</option>)}
                  </select>
                </td>
                <td className="py-2">{u.active ? "✅" : "⛔"}</td>
                <td className="py-2 text-right">
                  <button onClick={()=>toggleBlock(u.id)} className="px-2 py-1 bg-rose-500 text-slate-900 rounded">{u.active?"Block":"Unblock"}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
