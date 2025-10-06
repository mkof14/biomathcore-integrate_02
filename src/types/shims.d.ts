// ===== глобальные безопасные объявления =====
declare type AnyRecord = Record<string, any>;

// react/next иногда ругается на .css/.svg импорт
declare module "*.css";
declare module "*.svg" {
  const content: any;
  export default content;
}

// уведомления (TypeOptions)
declare type TypeOptions = "info" | "success" | "warning" | "error";

// иногда встречается переменная g как глобальная
declare var g: any;
