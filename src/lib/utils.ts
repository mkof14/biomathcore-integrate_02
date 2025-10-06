/* API-SURFACE-CLEANUP-TODO: replace 'unknown' with precise types incrementally */
import type { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
