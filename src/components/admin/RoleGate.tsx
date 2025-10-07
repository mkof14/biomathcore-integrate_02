"use client";
import { can, type Role } from "@/lib/roles";
import { useRole } from "@/components/admin/useRole";

export default function RoleGate({
  permission,
  children,
}: {
  permission: string;
  children: React.ReactNode;
}) {
  const { role } = useRole();
  if (!can(role as Role, permission)) return null;
  return <>{children}</>;
}
