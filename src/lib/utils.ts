import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { ClassValue } from "clsx";

import { siteConfig } from "@/config/site";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Returns the absolute url for the given path based on the current environment
 * @param path The path to get the absolute url for
 * @returns The absolute url for the given path
 */
export function absoluteUrl(path: `/${string}`) {
  let url;

  if (process.env.NODE_ENV === "production") {
    url = `${siteConfig.url}${path}`;
  } else {
    url = `http://localhost:${process.env.PORT}${path}`;
  }

  return url.replace(/\/+$/, "");
}
