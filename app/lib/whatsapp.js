// Prefilled WhatsApp links. A bare wa.me link opens an empty chat; these put a
// short localised message in the box so the visitor only has to press send,
// and so an incoming message says where it came from.
import { WA_LINK } from "./data";
import { BRAND } from "./site";

const MESSAGES = {
  blog: {
    sv: `Hej! Jag läste er guide och vill veta mer om ${BRAND}.`,
    en: `Hi! I read your guide and would like to know more about ${BRAND}.`,
  },
};

export function whatsappUrl(kind, locale) {
  const text = MESSAGES[kind]?.[locale];
  return text ? `${WA_LINK}?text=${encodeURIComponent(text)}` : WA_LINK;
}
