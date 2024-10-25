import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { debounce as lodashDebounce } from "lodash";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const debounce = (func, wait) => {
  return lodashDebounce(func, wait);
};