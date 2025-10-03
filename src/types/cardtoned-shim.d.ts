import * as React from "react";

declare module "@/components/ui/CardToned" {
  export const Card: React.FC<
    React.PropsWithChildren<{ className?: string; tone?: string }>
  >;
  export const CardHeader: React.FC<
    React.PropsWithChildren<{ className?: string }>
  >;
  export const CardTitle: React.FC<
    React.PropsWithChildren<{ className?: string }>
  >;
  export const CardBody: React.FC<
    React.PropsWithChildren<{ className?: string }>
  >;

  // Разные места используют "строчки" с парой label/value.
  export const Row: React.FC<
    React.PropsWithChildren<{
      className?: string;
      label?: React.ReactNode;
      value?: React.ReactNode;
    }>
  >;

  // Badge с поддержкой tone
  export const Badge: React.FC<
    React.PropsWithChildren<{ className?: string; tone?: string }>
  >;

  // Кнопка с поддержкой disabled
  export const Btn: React.FC<{
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: "primary" | "ghost";
    className?: string;
    disabled?: boolean;
  }>;
}
