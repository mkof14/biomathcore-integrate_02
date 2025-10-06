"use client";
import { useEffect, useState } from "react";
import type { Role } from "@/lib/roles";

function readCookie(name: string) {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return m ? decodeURIComponent(m[2]) : null;
}

export function useRole(defaultRole: Role = "SuperAdmin" as Role) {
  const [role, setRole] = useState<Role>(
    (readCookie("adminrole") as Role) || defaultRole,
  );
  useEffect(() => {}, []);
  const update = async (r: Role) => {
    const res = await fetch("/api/admin/role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: r }),
    });
    if (res.ok) {
      setRole(r);
      location.reload();
    }
  };
  return { role, setRole: update };
}
