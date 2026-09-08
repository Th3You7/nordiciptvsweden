"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, LogoMark } from "../ui";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { BRAND } from "../../lib/data";

// Client island: the nav needs the mobile-menu toggle, the "More" dropdown, the
// theme toggle and the active-route highlight. The links themselves are still
// <a> tags in the prerendered HTML, so they are crawlable.
const NAV = [
  ["", "home", "home"],
  ["features", "features", "zap"],
  ["pricing", "pricing", "tag"],
  ["blog", "blog", "news"],
  ["devices", "devices", "monitor"],
  ["faq", "faq", "help"],
  ["contact", "contact", "wa"],
];

// The legal pages, grouped behind "More" so the main bar stays at seven items.
const LEGAL = [
  ["terms", "terms", "receipt"],
  ["privacy", "privacy", "lock"],
  ["refund", "refund", "shieldCheck"],
];

function toggleTheme() {
  const el = document.documentElement;
  const next = el.getAttribute("data-theme") === "light" ? "dark" : "light";
  el.setAttribute("data-theme", next);
  try {
    localStorage.setItem("aurion_theme", next);
  } catch (e) {}
}

// `nav` is only the t.nav sub-object and `legal` only the three short labels:
// passing the whole catalog would serialize every FAQ answer and pricing plan
// into the client payload of every page.
export function SiteNav({ locale, nav, legal }) {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef(null);

  const items = NAV.map(([slug, key, icon]) => {
    const href = slug ? `/${locale}/${slug}` : `/${locale}`;
    return { href, icon, label: nav[key], active: pathname === href };
  });

  const legalItems = LEGAL.map(([slug, key, icon]) => ({
    href: `/${locale}/${slug}`,
    icon,
    label: legal[key],
    active: pathname === `/${locale}/${slug}`,
  }));

  const onLegalPage = legalItems.some((it) => it.active);

  // Closed on navigation from the link handlers rather than from an effect on
  // `pathname` — setState in an effect body costs an extra render pass after
  // every navigation, and every route change here originates from these links.
  const closeMenus = () => {
    setOpen(false);
    setMoreOpen(false);
  };

  // Dismiss the dropdown on Escape or a click outside the nav.
  useEffect(() => {
    if (!moreOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMoreOpen(false);
    };
    const onDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setMoreOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [moreOpen]);

  const dropdown = (
    <div className="au-nav-drop" role="menu">
      {legalItems.map((it) => (
        <Link
          key={it.href}
          href={it.href}
          role="menuitem"
          aria-current={it.active ? "page" : undefined}
          onClick={closeMenus}
        >
          <span className="au-nav-drop-ico">
            <Icon name={it.icon} size={18} />
          </span>
          {it.label}
        </Link>
      ))}
    </div>
  );

  return (
    <nav className="au-nav" ref={navRef}>
      <div className="au-nav-inner">
        <Link href={`/${locale}`} className="au-brand" aria-label={BRAND} onClick={closeMenus}>
          <span style={{ display: "inline-flex", color: "var(--text)" }}>
            <LogoMark />
          </span>
          <span className="au-brand-name">{BRAND}</span>
        </Link>

        <div className="au-nav-desk">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="au-nav-link"
              aria-current={it.active ? "page" : undefined}
              onClick={closeMenus}
            >
              <span className="au-nav-link-ico">
                <Icon name={it.icon} size={20} />
              </span>
              {it.label}
            </Link>
          ))}

          <div className="au-nav-more">
            <button
              type="button"
              className="au-nav-link"
              aria-haspopup="true"
              aria-expanded={moreOpen}
              aria-current={onLegalPage ? "page" : undefined}
              onClick={() => setMoreOpen((o) => !o)}
            >
              <span className="au-nav-link-ico">
                <Icon name="more" size={20} />
              </span>
              {nav.more}
            </button>
            {moreOpen ? dropdown : null}
          </div>
        </div>

        <div className="au-nav-icons">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="au-nav-icon"
              title={it.label}
              aria-current={it.active ? "page" : undefined}
              onClick={closeMenus}
            >
              <Icon name={it.icon} size={20} />
              <span>{it.label}</span>
            </Link>
          ))}

          <div className="au-nav-more">
            <button
              type="button"
              className="au-nav-icon"
              title={nav.more}
              aria-haspopup="true"
              aria-expanded={moreOpen}
              aria-current={onLegalPage ? "page" : undefined}
              onClick={() => setMoreOpen((o) => !o)}
            >
              <Icon name="more" size={20} />
              <span>{nav.more}</span>
            </button>
            {moreOpen ? dropdown : null}
          </div>
        </div>

        <div className="au-nav-actions">
          <LanguageSwitcher locale={locale} />
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="au-pill au-pill-icon"
          >
            <span className="au-ico-sun">
              <Icon name="sun" size={20} />
            </span>
            <span className="au-ico-moon">
              <Icon name="moon" size={20} />
            </span>
          </button>
          <Link
            href={`/${locale}/contact`}
            className="au-btn au-btn-green au-btn-nav au-nav-trial"
            onClick={closeMenus}
          >
            {nav.freeTrial}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
            className="au-nav-burger"
          >
            <Icon name={open ? "close" : "menu"} size={22} />
          </button>
        </div>
      </div>

      {open ? (
        <div className="au-nav-mobile">
          {items.map((it) => (
            <Link key={it.href} href={it.href} onClick={closeMenus} aria-current={it.active ? "page" : undefined}>
              <span style={{ display: "inline-flex", color: "var(--accent)" }}>
                <Icon name={it.icon} size={20} />
              </span>
              {it.label}
            </Link>
          ))}

          {/* On mobile the group is flattened rather than nested in a dropdown. */}
          <div className="au-nav-mobile-head">{nav.more}</div>
          {legalItems.map((it) => (
            <Link key={it.href} href={it.href} onClick={closeMenus} aria-current={it.active ? "page" : undefined}>
              <span style={{ display: "inline-flex", color: "var(--accent)" }}>
                <Icon name={it.icon} size={20} />
              </span>
              {it.label}
            </Link>
          ))}

          <Link href={`/${locale}/contact`} className="au-nav-cta" onClick={closeMenus}>
            {nav.freeTrial}
          </Link>
        </div>
      ) : null}
    </nav>
  );
}
