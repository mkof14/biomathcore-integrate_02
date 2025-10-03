import * as React from "react";
declare module "@/components/ui/CardToned" {
  export const Btn: React.FC<{
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: "primary" | "ghost";
    className?: string;
    disabled?: boolean;
  }>;
  export const Card: React.FC<React.PropsWithChildren<{ className?: string }>>;
  export const CardHeader: React.FC<React.PropsWithChildren<{ className?: string }>>;
  export const CardTitle: React.FC<React.PropsWithChildren<{ className?: string }>>;
  export const CardBody: React.FC<React.PropsWithChildren<{ className?: string }>>;
  export const Row: React.FC<React.PropsWithChildren<{ className?: string }>>;
  export const Badge: React.FC<React.PropsWithChildren<{ className?: string }>>;
}
