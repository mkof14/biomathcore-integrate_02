// Алиасы папок (чтобы TS не ругался, когда файлы пока вне include)
declare module "@/components/*";
declare module "@/context/*";
declare module "@/data/*";
declare module "@/hooks/*";
declare module "@/lib/*";
declare module "@/modules/*";
declare module "next-themes";
declare module "next/headers";

// Точечные декларации для мест, где нужны пропы:

// 4.1 EndpointBadge: разрешим опц. showLabel
declare module "@/components/ui/EndpointBadge" {
  import * as React from "react";
  export type Props = { path: string; className?: string; showLabel?: boolean };
  const EndpointBadge: React.FC<Props>;
  export default EndpointBadge;
}

// 4.2 FormRenderer: схема и служебные пропы
declare module "@/components/forms/FormRenderer" {
  import * as React from "react";
  export type QSchema = any;
  const FormRenderer: React.FC<{
    schema: any;
    questionnaireKey: string;
    visibility: string;
    themeName?: string;
  }>;
  export default FormRenderer;
}

// 4.3 CardToned.Btn: добавим disabled
declare module "@/components/ui/CardToned" {
  import * as React from "react";
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
