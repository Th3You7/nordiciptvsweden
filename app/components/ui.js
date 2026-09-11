// Server components. Hover and responsive behaviour live in globals.css, so
// nothing here needs client-side JavaScript.
import Image from "next/image";
import { ICONS } from "../lib/data";

export function Icon({ name, size = 24, filled = false, className, style }) {
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
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ display: "block", ...(style || {}) }}
      dangerouslySetInnerHTML={{ __html: ICONS[name] || "" }}
    />
  );
}

// Site logo: the Swedish flag, identifying the market at a glance. The
// wordmark beside it carries the name, so the image itself is decorative.
export function LogoMark() {
  return (
    <span className="au-logo-flag">
      <Image
        src="/assets/logo-flag.webp"
        alt=""
        width={44}
        height={28}
        priority
      />
    </span>
  );
}

export function Stars() {
  return (
    <div className="au-stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} style={{ display: "inline-flex" }}>
          <Icon name="star" size={16} filled />
        </span>
      ))}
    </div>
  );
}
