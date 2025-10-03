// Глобальные минимальные шимы

// Любой импорт вида "@/..." считаем any (пока типизацию сужаем максимально)
declare module "@/*";

// Иногда встречается
declare module "rehype-raw";

// Разрешим кастомные JSX-теги, если вдруг где-то используются
declare global {
  namespace JSX {
    interface IntrinsicElements {
      chartjs: any;
    }
  }
}
export {};

// ---- Wildcard-ambient для наших алиасов ----
declare module "@/*";
declare module "@/app/*";
declare module "@/components/*";
declare module "@/context/*";
declare module "@/data/*";
declare module "@/hooks/*";
declare module "@/lib/*";
declare module "@/modules/*";

// Часто встречается в Next проектах:
declare module "next-themes";
declare module "next/headers";
declare module "@/lib/*";
declare module "@/lib/*";
declare module "@/components/*";
declare module "@/context/*";
declare module "@/data/*";
declare module "@/hooks/*";
declare module "@/modules/*";
declare module "next-themes";
declare module "next/headers";
declare module "@/store/*";
declare module "@/utils/*";
