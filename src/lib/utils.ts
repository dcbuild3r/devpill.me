import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(value: string, month: "long" | "short" = "long") {
  return new Intl.DateTimeFormat("en", { year: "numeric", month, day: "numeric", timeZone: "Europe/Prague" }).format(new Date(value))
}
