// Server components. Hover and responsive behaviour live in globals.css, so
// nothing here needs client-side JavaScript.
import { ICONS, LOGO_MARK } from "../lib/data";

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

export function LogoMark() {
  return (
    <svg
      width={30}
      height={26}
      viewBox="0 0 28 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      style={{ display: "block" }}
      dangerouslySetInnerHTML={{ __html: LOGO_MARK }}
    />
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
