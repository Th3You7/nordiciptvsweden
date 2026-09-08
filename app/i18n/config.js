export const locales = ["en", "sv"];

// Swedish is the market language, so it is what "/" resolves to and what
// search engines get as x-default.
export const defaultLocale = "sv";

export const localeNames = {
  en: "English",
  sv: "Svenska",
};

// Short label shown in the nav switcher.
export const localeLabels = {
  en: "EN",
  sv: "SV",
};

export function isLocale(value) {
  return locales.includes(value);
}
