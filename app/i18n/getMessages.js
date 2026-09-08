import { notFound } from "next/navigation";
import { isLocale } from "./config";

// Loads a locale's message catalog on the server. The dynamic import is
// statically analysable, so each catalog is bundled and tree-shaken per route
// rather than shipped to the client.
export async function getMessages(locale) {
  if (!isLocale(locale)) notFound();
  return (await import(`./messages/${locale}.json`)).default;
}
