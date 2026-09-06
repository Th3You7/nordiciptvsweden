"use client";

import { useState } from "react";
import { ICONS, LOGO_MARK } from "../lib/data";

// Parse a CSS declaration string ("color:red;font-size:12px") into a React
// style object, camelCasing property names (custom properties kept as-is).
export function parseStyle(str) {
  const out = {};
  if (!str) return out;
  for (const decl of str.split(";")) {
    const i = decl.indexOf(":");
    if (i === -1) continue;
    let key = decl.slice(0, i).trim();
    const val = decl.slice(i + 1).trim();
    if (!key || val === "") continue;
    if (!key.startsWith("--")) {
      key = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    }
    out[key] = val;
  }
  return out;
}

// Generic element that accepts CSS strings for base + hover styles.
export function Box({ as = "div", sx, hover, children, style, ...rest }) {
  const [h, setH] = useState(false);
  const Tag = as;
  const merged = {
    ...parseStyle(sx),
    ...(h && hover ? parseStyle(hover) : {}),
    ...(style || {}),
  };
  const hoverProps = hover
    ? { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) }
    : {};
  return (
    <Tag style={merged} {...hoverProps} {...rest}>
      {children}
    </Tag>
  );
}

export function Icon({ name, size = 24, filled = false, style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "block", ...(style || {}) }}
      dangerouslySetInnerHTML={{ __html: ICONS[name] || "" }}
    />
  );
}

export function LogoMark() {
  return (
    <svg
      width={30}
      height={26}
      viewBox="0 0 28 24"
      fill="none"
      style={{ display: "block" }}
      dangerouslySetInnerHTML={{ __html: LOGO_MARK }}
    />
  );
}

export function Stars() {
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} style={{ display: "inline-flex" }}>
          <Icon name="star" size={16} filled />
        </span>
      ))}
    </div>
  );
}
