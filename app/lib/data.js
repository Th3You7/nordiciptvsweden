// Non-translatable assets only: icon paths, the logo mark and site constants.
// All copy lives in app/i18n/messages/{en,sv}.json.

export const ICONS = {
  shield: '<path d="M12 22c5-2 8-5 8-10V5l-8-3-8 3v7c0 5 3 8 8 10z"/>',
  tv: '<rect x="2" y="7" width="20" height="13" rx="2.5"/><path d="M17 2l-5 5-5-5"/>',
  tv2: '<rect x="2" y="7" width="20" height="13" rx="2.5"/><path d="M17 2l-5 5-5-5"/><path d="M7 20l5-2 5 2"/>',
  phone: '<rect x="6.5" y="2" width="11" height="20" rx="2.5"/><path d="M11 18h2"/>',
  globe: '<circle cx="12" cy="12" r="9.2"/><path d="M2.8 12h18.4"/><path d="M12 2.8c2.6 3 2.6 15.4 0 18.4M12 2.8c-2.6 3-2.6 15.4 0 18.4"/>',
  zap: '<path d="M13 2 4 14h6l-1 8 9-12h-6z"/>',
  cloud: '<path d="M17.5 19a4.5 4.5 0 0 0 .4-9 6.4 6.4 0 0 0-12.4 1.4A4 4 0 0 0 6.2 19z"/>',
  check: '<circle cx="12" cy="12" r="9.4"/><path d="M8.2 12l2.6 2.6 5-5.6"/>',
  rocket: '<path d="M5 14c-1.4 1.6-1.6 5-1.6 5s3.4-.2 5-1.6"/><path d="M9.2 15.2 8 14c1-6 5.5-9.4 11.6-9.6C19.4 10.5 16 15 10 16z"/><circle cx="14.4" cy="9.6" r="1.6"/>',
  clock: '<circle cx="12" cy="12" r="9.4"/><path d="M12 6.4V12l4 2.2"/>',
  headphones: '<path d="M3.5 14a8.5 8.5 0 0 1 17 0"/><path d="M3.5 14v3a2 2 0 0 0 2 2h.8v-6h-.8a2 2 0 0 0-2 1z"/><path d="M20.5 14v3a2 2 0 0 1-2 2h-.8v-6h.8a2 2 0 0 1 2 1z"/>',
  wifi: '<path d="M4.5 11.5a11 11 0 0 1 15 0"/><path d="M7.6 14.8a6.4 6.4 0 0 1 8.8 0"/><path d="M10.6 18h2.8"/>',
  monitor: '<rect x="2.5" y="4" width="19" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  laptop: '<rect x="4" y="5" width="16" height="10.5" rx="1.6"/><path d="M2 19h20"/>',
  tablet: '<rect x="5" y="2.5" width="14" height="19" rx="2.4"/><path d="M11.2 18.5h1.6"/>',
  film: '<rect x="3.5" y="3.5" width="17" height="17" rx="2"/><path d="M3.5 8.5h17M3.5 15.5h17M8 3.5v17M16 3.5v17"/>',
  trophy: '<path d="M7 4h10v4a5 5 0 0 1-10 0z"/><path d="M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3"/><path d="M12 13v4M8.5 21h7M10 17h4"/>',
  news: '<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><path d="M7.5 8.5h9M7.5 12h9M7.5 15.5h5.5"/>',
  baby: '<circle cx="12" cy="12" r="9.4"/><path d="M9 9.5h.01M15 9.5h.01M9 14a3.5 3.5 0 0 0 6 0"/>',
  book: '<path d="M5 4h12a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2z"/><path d="M9 4v16"/>',
  play: '<path d="M8 5.2v13.6L19 12z"/>',
  arrow: '<path d="M4.5 12h14M13 6l6 6-6 6"/>',
  chevron: '<path d="M6 9.5l6 6 6-6"/>',
  globe2: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18"/>',
  home: '<path d="M4 11 12 4l8 7"/><path d="M6 10v9.5h4V14h4v5.5h4V10"/>',
  tag: '<path d="M11 3H4v7l10 10 7-7z"/><circle cx="8" cy="8" r="1.4"/>',
  help: '<circle cx="12" cy="12" r="9.4"/><path d="M9.4 9.3a2.7 2.7 0 0 1 5.2 1c0 1.8-2.6 2.2-2.6 3.7"/><path d="M12 17h.01"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  // Filled dots rather than the `h.01` stroke trick: at nav size that trick
  // renders ~1.4px specks. Elements carry their own fill/stroke, overriding
  // the parent <svg> the way LOGO_MARK already does.
  more: '<circle cx="5" cy="12" r="1.9" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.9" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.9" fill="currentColor" stroke="none"/>',
  shieldCheck: '<path d="M12 22c5-2 8-5 8-10V5l-8-3-8 3v7c0 5 3 8 8 10z"/><path d="M9 11.6l2.1 2.1L15 9.9"/>',
  receipt: '<path d="M5 3h14v18l-2.3-1.6-2.4 1.6-2.3-1.6L9.7 21l-2.4-1.6L5 21z"/><path d="M8.5 8h7M8.5 12h7"/>',
  lock: '<rect x="4.5" y="10" width="15" height="10.5" rx="2.2"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.1 1.1 6.1L12 16.9 6.4 19.8l1.1-6.1L3.1 9.5l6.1-.9z"/>',
  wa: '<path d="M20.5 12a8.5 8.5 0 0 1-12.4 7.5L3.5 20.5l1.1-4.5A8.5 8.5 0 1 1 20.5 12z"/><path d="M8.6 8.4c.2-.5.5-.5.8-.5h.5c.2 0 .4 0 .6.5l.7 1.6c0 .2 0 .3-.1.5l-.5.6c-.1.1-.2.3-.1.5.3.6 1.4 2 2.7 2.5.2.1.4 0 .5-.1l.6-.7c.1-.2.3-.2.5-.1l1.6.8c.2.1.3.2.3.4 0 .6-.3 1.4-.6 1.6-.4.3-1.9.9-4-.4-2.4-1.4-3.7-3.9-3.8-4.1-.1-.2-.9-1.3-.9-2.5 0-1.1.6-1.6.8-1.8z"/>',
};

export const LOGO_MARK =
  '<rect x="1.5" y="4.5" width="16" height="12" rx="2.5" stroke="currentColor" stroke-width="1.7"/><path d="M6.5 6.5 9.5 4l3-2.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><polygon points="7,8 7,13 11,10.5" fill="var(--accent)"/><path d="M19.5 7a6 6 0 0 1 0 8" stroke="var(--accent)" stroke-width="1.9" stroke-linecap="round"/><path d="M22.5 4.5a10 10 0 0 1 0 13" stroke="var(--accent)" stroke-width="1.7" stroke-linecap="round" opacity="0.5"/>';

// +212 617-984899. wa.me needs digits only: country code first, no "+",
// spaces or dashes. Override per environment with NEXT_PUBLIC_WHATSAPP_NUMBER.
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "212617984899";

// Human-readable form, for anywhere the number is shown rather than linked.
export const WHATSAPP_DISPLAY = "+212 617-984899";

export const WA_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
