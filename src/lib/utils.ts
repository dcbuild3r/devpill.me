export function formatDate(value: string, month: "long" | "short" = "long") {
  return new Intl.DateTimeFormat("en", { year: "numeric", month, day: "numeric", timeZone: "Europe/Prague" }).format(new Date(value))
}
