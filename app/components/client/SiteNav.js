"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, LogoMark } from "../ui";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { BRAND } from "../../lib/site";
import { WA_LINK } from "../../lib/data";

// Client island: the nav needs the mobile-menu toggle, the "More" dropdown and
// the active-route highlight. The links themselves are still <a> tags in the
// prerendered HTML, so they are crawlable.
const NAV = [
  ["", "home", "home"],
  ["features", "features", "zap"],
  ["pricing", "pricing", "tag"],
  ["blog", "blog", "news"],
  ["faq", "faq", "help"],
];

// Grouped behind "More": Devices and Contact alongside the legal pages.
// `from` says which label set the text comes from — the nav labels or the
// short legal labels passed in from the layout.
const MORE = [
  { slug: "devices", key: "devices", icon: "monitor", from: "nav" },
  { slug: "contact", key: "contact", icon: "wa", from: "nav" },
  { slug: "terms", key: "terms", icon: "receipt", from: "legal" },
  { slug: "privacy", key: "privacy", icon: "lock", from: "legal" },
  { slug: "refund", key: "refund", icon: "shieldCheck", from: "legal" },
];

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

  const moreItems = MORE.map(({ slug, key, icon, from }) => ({
    href: `/${locale}/${slug}`,
    icon,
    label: from === "nav" ? nav[key] : legal[key],
    active: pathname === `/${locale}/${slug}`,
  }));

  const onMorePage = moreItems.some((it) => it.active);

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
      {moreItems.map((it) => (
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
              aria-current={onMorePage ? "page" : undefined}
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
              aria-current={onMorePage ? "page" : undefined}
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
          {/* Always on the bar, beside the language switcher: opens WhatsApp.
              Icon-only on narrow screens, full label from 1200px. */}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={nav.freeTrial}
            title={nav.freeTrial}
            className="au-btn au-btn-green au-btn-nav au-nav-trial"
            onClick={closeMenus}
          >
            <Icon name="wa" size={20} />
            <span className="au-nav-trial-label">{nav.freeTrial}</span>
          </a>
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
          {moreItems.map((it) => (
            <Link key={it.href} href={it.href} onClick={closeMenus} aria-current={it.active ? "page" : undefined}>
              <span style={{ display: "inline-flex", color: "var(--accent)" }}>
                <Icon name={it.icon} size={20} />
              </span>
              {it.label}
            </Link>
          ))}

          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="au-nav-cta"
            onClick={closeMenus}
          >
            {nav.freeTrial}
          </a>
        </div>
      ) : null}
    </nav>
  );
}
