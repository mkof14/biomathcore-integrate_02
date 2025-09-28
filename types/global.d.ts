/* tighten ambient types for repositories and engines */
declare namespace BMC {
  type Json = string | number | boolean | null | { [key: string]: Json } | Json[];
  type Dict<T = unknown> = Record<string, T>;
}
