// ---- ultra-loose shims to allow prod build ----
declare var g: any;

declare module 'rehype-raw' {
  const rehypeRaw: any;
  export default rehypeRaw;
}

declare module 'zustand' {
  export function create<T>(init: any): any;
  export default create;
}

// allow any translation keys
type TFunc = (key: string, ...rest: any[]) => any;

// very loose i18n shape
declare module '@/lib/i18n-ui' {
  export const useI18n: () => {
    lang: string;
    setLang: (l: string) => void;
    t: TFunc;
    i18n: any;
  };
  export default useI18n;
}
