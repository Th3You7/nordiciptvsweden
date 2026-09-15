"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "./ui";
import { locales, localeLabels, localeNames } from "../i18n/config";

// Swaps the leading locale segment and keeps the rest of the path
// (/en/pricing -> /sv/pricing). Blog posts are the exception: a post need not
// exist in every language, so when the other language has no translation the
// link goes to that language's blog index instead of a URL that 404s.
function swapLocale(pathname, from, to, blogLocales) {
  if (!pathname) return `/${to}`;
  if (pathname === `/${from}`) return `/${to}`;
  if (!pathname.startsWith(`/${from}/`)) return `/${to}`;

  const rest = pathname.slice(from.length + 1);
  const post = /^\/blog\/([^/]+)\/?$/.exec(rest);
  if (post && !(blogLocales[post[1]] || []).includes(to)) return `/${to}/blog`;
  return `/${to}${rest}`;
}

export function LanguageSwitcher({ locale, blogLocales = {} }) {
  const pathname = usePathname();
  const [hover, setHover] = useState(false);
  const other = locales.find((l) => l !== locale) ?? locale;
  const href = swapLocale(pathname, locale, other, blogLocales);

  return (
    <Link
      href={href}
      hrefLang={other}
      aria-label={`Byt språk till ${localeNames[other]} / Switch language to ${localeNames[other]}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "7px",
        height: "40px",
        padding: "0 13px",
        border: `1px solid ${hover ? "var(--accent)" : "var(--border)"}`,
        borderRadius: "999px",
        background: "transparent",
        color: "var(--text)",
        textDecoration: "none",
        cursor: "pointer",
        fontFamily: "var(--font-body), system-ui, sans-serif",
        fontWeight: 600,
        fontSize: "13px",
        transition: "border-color .2s ease",
      }}
    >
      <span style={{ display: "inline-flex" }}>
        <Icon name="globe2" size={17} />
      </span>
      <span style={{ letterSpacing: ".04em" }}>{localeLabels[locale]}</span>
    </Link>
  );
}
