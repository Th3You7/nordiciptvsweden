// All site content, translations and icon paths — ported from the original template.

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
  sun: '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.4v2.4M12 19.2v2.4M4.5 4.5l1.7 1.7M17.8 17.8l1.7 1.7M2.4 12h2.4M19.2 12h2.4M4.5 19.5l1.7-1.7M17.8 6.2l1.7-1.7"/>',
  moon: '<path d="M21 12.8A8.6 8.6 0 1 1 11.2 3a6.7 6.7 0 0 0 9.8 9.8z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.1 1.1 6.1L12 16.9 6.4 19.8l1.1-6.1L3.1 9.5l6.1-.9z"/>',
  wa: '<path d="M20.5 12a8.5 8.5 0 0 1-12.4 7.5L3.5 20.5l1.1-4.5A8.5 8.5 0 1 1 20.5 12z"/><path d="M8.6 8.4c.2-.5.5-.5.8-.5h.5c.2 0 .4 0 .6.5l.7 1.6c0 .2 0 .3-.1.5l-.5.6c-.1.1-.2.3-.1.5.3.6 1.4 2 2.7 2.5.2.1.4 0 .5-.1l.6-.7c.1-.2.3-.2.5-.1l1.6.8c.2.1.3.2.3.4 0 .6-.3 1.4-.6 1.6-.4.3-1.9.9-4-.4-2.4-1.4-3.7-3.9-3.8-4.1-.1-.2-.9-1.3-.9-2.5 0-1.1.6-1.6.8-1.8z"/>',
};

export const LOGO_MARK =
  '<rect x="1.5" y="4.5" width="16" height="12" rx="2.5" stroke="currentColor" stroke-width="1.7"/><path d="M6.5 6.5 9.5 4l3-2.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><polygon points="7,8 7,13 11,10.5" fill="var(--accent)"/><path d="M19.5 7a6 6 0 0 1 0 8" stroke="var(--accent)" stroke-width="1.9" stroke-linecap="round"/><path d="M22.5 4.5a10 10 0 0 1 0 13" stroke="var(--accent)" stroke-width="1.7" stroke-linecap="round" opacity="0.5"/>';

// Recursively resolve {en,mt} objects into the active language.
export function resolveLang(o, lang) {
  if (Array.isArray(o)) return o.map((x) => resolveLang(x, lang));
  if (o && typeof o === "object") {
    const ks = Object.keys(o);
    if ("en" in o && "mt" in o && ks.length <= 2)
      return o[lang] != null ? o[lang] : o.en;
    const out = {};
    for (const k of ks) out[k] = resolveLang(o[k], lang);
    return out;
  }
  return o;
}

export const COPY = {
  nav: { home: { en: "Home", mt: "Home" }, features: { en: "Features", mt: "Karatteristiċi" }, pricing: { en: "Pricing", mt: "Prezzijiet" }, blog: { en: "Blog", mt: "Blog" }, devices: { en: "Devices", mt: "Apparat" }, faq: { en: "FAQ", mt: "FAQ" }, contact: { en: "Contact", mt: "Kuntatt" }, freeTrial: { en: "Free Trial", mt: "Prova b'xejn" } },
  hero: { badge: { en: "Live servers online now", mt: "Servers live online issa" }, title: { en: "Every channel. Every device. Zero compromise.", mt: "Kull kanal. Kull apparat. L-ebda kompromess." }, sub: { en: "Premium IPTV with true 4K clarity, instant activation and a library that never sleeps — streaming, perfected.", mt: "IPTV premium b'ċarezza 4K vera, attivazzjoni istantanja u librerija li qatt ma torqod — streaming, ipperfezzjonat." }, cta1: { en: "Start Free Trial", mt: "Ibda Prova b'xejn" }, cta2: { en: "View Plans", mt: "Ara l-Pjanijiet" } },
  features: { kicker: { en: "Why AURION", mt: "Għaliex AURION" }, title: { en: "Built for the way you watch", mt: "Mibni għall-mod kif tara int" }, sub: { en: "Everything you need for a flawless stream, and nothing you don't.", mt: "Kollox li teħtieġ għal stream perfett, u xejn li ma teħtieġx." } },
  library: { kicker: { en: "Content library", mt: "Librerija ta' kontenut" }, title: { en: "A library that never runs dry", mt: "Librerija li qatt ma tispiċċa" } },
  devices: { kicker: { en: "Watch anywhere", mt: "Ara kullimkien" }, title: { en: "Works on the screens you already own", mt: "Taħdem fuq l-iskrins li diġà għandek" } },
  reviews: { kicker: { en: "Loved by viewers", mt: "Maħbub mit-telespettaturi" }, title: { en: "Trusted by 50,000+ streamers", mt: "Fdat minn 50,000+ streamer" } },
  faq: { title: { en: "Questions? Answered.", mt: "Mistoqsijiet? Imwieġba." } },
  content: { kicker: { en: "Content & channels", mt: "Kontenut u kanali" }, title: { en: "Sport, series & more — all in one place", mt: "Sport, serje u aktar — kollox f'post wieħed" }, sub: { en: "AURION brings you live TV, movies and sport in crisp HD and 4K. One subscription, every device. Explore the service, view plans or get in touch.", mt: "AURION iġiblek TV live, films u sport f'HD u 4K ċari. Abbonament wieħed, kull apparat. Esplora s-servizz, ara l-pjanijiet jew ikkuntattjana." } },
  payments: { title: { en: "Accepted payments", mt: "Ħlasijiet aċċettati" }, note: { en: "Pay securely with Visa, Mastercard, PayPal and more.", mt: "Ħallas b'mod sigur b'Visa, Mastercard, PayPal u aktar." } },
  cta: { title: { en: "Ready to start watching?", mt: "Lest biex tibda tara?" }, sub: { en: "Join thousands of viewers streaming in stunning 4K today.", mt: "Ingħaqad ma' eluf ta' telespettaturi jistrimjaw f'4K illum." } },
  pricing: { kicker: { en: "Plans", mt: "Pjanijiet" }, title: { en: "Simple, honest pricing", mt: "Prezzijiet sempliċi u onesti" }, sub: { en: "One subscription, every feature. No hidden fees, cancel anytime.", mt: "Abbonament wieħed, kull karatteristika. L-ebda ħlasijiet moħbija, ikkanċella meta trid." }, choose: { en: "Choose plan", mt: "Agħżel pjan" }, seeAll: { en: "See full pricing", mt: "Ara l-prezzijiet kollha" }, note: { en: "All plans include a free trial and a 7-day money-back guarantee.", mt: "Il-pjanijiet kollha jinkludu prova b'xejn u garanzija ta' flus lura fi 7 ijiem." } },
  blog: { kicker: { en: "The blog", mt: "Il-blog" }, title: { en: "Guides, tips & updates", mt: "Gwidi, pariri u aġġornamenti" }, sub: { en: "Everything to get the most from your subscription.", mt: "Kollox biex tieħu l-aħjar mill-abbonament tiegħek." }, readAll: { en: "Read the blog", mt: "Aqra l-blog" } },
  devicesPage: { kicker: { en: "Devices", mt: "Apparat" }, title: { en: "One subscription, every screen", mt: "Abbonament wieħed, kull skrin" }, sub: { en: "Set up in minutes on any device you own.", mt: "Issettja fi minuti fuq kwalunkwe apparat li għandek." }, stepsTitle: { en: "Set up in 3 simple steps", mt: "Issettja fi 3 passi sempliċi" }, ctaTitle: { en: "Need a hand setting up?", mt: "Teħtieġ għajnuna biex tissettja?" } },
  faqPage: { kicker: { en: "Support", mt: "Sapport" }, title: { en: "Frequently asked questions", mt: "Mistoqsijiet frekwenti" } },
  contact: { kicker: { en: "Contact", mt: "Kuntatt" }, title: { en: "Talk to a human, instantly", mt: "Kellem bniedem, istantanjament" }, sub: { en: "No forms, no email queues. Reach us on WhatsApp any time.", mt: "L-ebda formoli, l-ebda kju ta' email. Ikkuntattjana fuq WhatsApp meta trid." }, wa: { en: "WhatsApp us", mt: "WhatsApp lilna" }, waDesc: { en: "Chat directly with our team for setup, billing or anything else.", mt: "Iċċettja direttament mat-tim tagħna għal setup, kontijiet jew kwalunkwe ħaġa oħra." }, waCta: { en: "Open chat", mt: "Iftaħ chat" }, support: { en: "24/7 Support", mt: "Sapport 24/7" }, supportDesc: { en: "Real people, every hour of every day, in English and Maltese.", mt: "Nies reali, kull siegħa ta' kuljum, bl-Ingliż u bil-Malti." }, online: { en: "Agents online now", mt: "Aġenti online issa" } },
  footer: { tagline: { en: "Premium IPTV streaming, engineered for clarity, speed and reliability.", mt: "Streaming IPTV premium, iddisinjat għaċ-ċarezza, ħeffa u affidabbiltà." }, copy: { en: "© 2026 AURION. All rights reserved.", mt: "© 2026 AURION. Id-drittijiet kollha riżervati." }, disclaimer: { en: "AURION is an independent streaming platform. All artwork shown is placeholder. No third-party channel or brand logos are used.", mt: "AURION hija pjattaforma tal-istreaming indipendenti. L-arti murija hija placeholder. L-ebda logos ta' kanali jew marki ta' partijiet terzi ma jintużaw." } },
};

export const FEATURE_DATA = [
  { icon: "tv", bg: "/assets/4k-bg.jpg", title: { en: "Ultra HD 4K", mt: "Ultra HD 4K" }, desc: { en: "Crystal-clear 4K and FHD streams on every supported title.", mt: "Streams 4K u FHD ċari daqs kristall fuq kull titlu appoġġjat." } },
  { icon: "phone", bg: "/assets/multidevice-bg.jpg", title: { en: "Multi Device", mt: "Ħafna Apparat" }, desc: { en: "Watch on TV, phone, tablet, and browser — switch seamlessly.", mt: "Ara fuq TV, telefon, tablet u browser — aqleb bla xkiel." } },
  { icon: "zap", bg: "/assets/247.png", bgContain: true, title: { en: "Instant Activation", mt: "Attivazzjoni Istantanja" }, desc: { en: "Up and running in under 60 seconds after checkout.", mt: "Lest u jaħdem f'inqas minn 60 sekonda wara l-ħlas." } },
  { icon: "cloud", bg: "/assets/fx-buffering.png", bgContain: true, title: { en: "Zero Buffering", mt: "L-ebda Buffering" }, desc: { en: "Optimised global servers keep every stream perfectly smooth.", mt: "Servers globali ottimizzati jżommu kull stream perfettament lixx." } },
  { icon: "headphones", bg: "/assets/fx-support.png", bgContain: true, title: { en: "24/7 Support", mt: "Sapport 24/7" }, desc: { en: "Real people ready to help, any hour, every single day.", mt: "Nies reali lesti biex jgħinu, kull siegħa, kuljum." } },
  { icon: "shield", bg: "/assets/fx-secure.png", bgContain: true, title: { en: "Secure Streaming", mt: "Streaming Sigur" }, desc: { en: "Encrypted connections and fully private playback, always.", mt: "Konnessjonijiet kriptati u playback kompletament privat, dejjem." } },
];

export const LIBRARY_DATA = [
  { icon: "film", title: { en: "Movies", mt: "Films" } }, { icon: "tv2", title: { en: "Series", mt: "Serje" } }, { icon: "trophy", title: { en: "Sports", mt: "Sport" } },
  { icon: "news", title: { en: "News", mt: "Aħbarijiet" } }, { icon: "baby", title: { en: "Kids", mt: "Tfal" } }, { icon: "book", title: { en: "Documentaries", mt: "Dokumentarji" } },
];

export const DEVICE_DATA = [
  { icon: "tv", title: { en: "Smart TV", mt: "Smart TV" } }, { icon: "phone", title: { en: "Android", mt: "Android" } }, { icon: "phone", title: { en: "iPhone", mt: "iPhone" } }, { icon: "monitor", title: { en: "Fire TV", mt: "Fire TV" } },
  { icon: "monitor", title: { en: "Windows", mt: "Windows" } }, { icon: "laptop", title: { en: "Mac", mt: "Mac" } }, { icon: "globe", title: { en: "Web Browser", mt: "Web Browser" } }, { icon: "tablet", title: { en: "Tablet", mt: "Tablet" } },
];

export const REVIEW_DATA = [
  { initial: "J", name: { en: "James C.", mt: "James C." }, role: { en: "Verified customer", mt: "Klijent verifikat" }, quote: { en: "Switched from cable and never looked back. 4K looks incredible and setup took two minutes.", mt: "Qlibt mill-cable u qatt ma ħarist lura. L-4K jidher inkredibbli u s-setup ħa żewġ minuti." } },
  { initial: "M", name: { en: "Maria B.", mt: "Maria B." }, role: { en: "Verified customer", mt: "Klijent verifikat" }, quote: { en: "Support answered on WhatsApp within a minute. Zero buffering even on match night.", mt: "Is-sapport wieġeb fuq WhatsApp f'minuta. L-ebda buffering anke f'lejl ta' logħob." } },
  { initial: "D", name: { en: "David R.", mt: "David R." }, role: { en: "Verified customer", mt: "Klijent verifikat" }, quote: { en: "Works flawlessly across my TV, phone and laptop. Best value I've found by far.", mt: "Taħdem b'mod perfett fuq it-TV, telefon u laptop tiegħi. L-aħjar valur li sibt s'issa." } },
];

export const FAQ_DATA = [
  { q: { en: "What is AURION and how does it work?", mt: "X'inhu AURION u kif jaħdem?" }, a: { en: "AURION is a premium IPTV streaming service. After subscribing you receive credentials that work in any compatible app on your devices — no dish or cable required.", mt: "AURION huwa servizz tal-istreaming IPTV premium. Wara li tabbona tirċievi kredenzjali li jaħdmu f'kwalunkwe app kompatibbli fuq l-apparat tiegħek — l-ebda dixx jew cable meħtieġa." } },
  { q: { en: "Which devices are supported?", mt: "Liema apparat huwa appoġġjat?" }, a: { en: "Smart TVs, Android, iPhone, Fire TV, Windows, Mac, tablets and any modern web browser. If it has a screen, it likely works.", mt: "Smart TVs, Android, iPhone, Fire TV, Windows, Mac, tablets u kwalunkwe web browser modern. Jekk għandu skrin, x'aktarx jaħdem." } },
  { q: { en: "How fast is activation?", mt: "Kemm hija mgħaġġla l-attivazzjoni?" }, a: { en: "Most accounts are activated instantly — usually within 60 seconds of completing checkout.", mt: "Ħafna kontijiet jiġu attivati istantanjament — ġeneralment fi 60 sekonda mit-tlestija tal-ħlas." } },
  { q: { en: "Do you offer a free trial?", mt: "Toffru prova b'xejn?" }, a: { en: "Yes. Every new subscriber can start with a free trial to test quality and stability before committing.", mt: "Iva. Kull abbonat ġdid jista' jibda bi prova b'xejn biex jittestja l-kwalità u l-istabbiltà qabel ma jimpenja ruħu." } },
  { q: { en: "What internet speed do I need?", mt: "Liema veloċità tal-internet neħtieġ?" }, a: { en: "We recommend at least 15 Mbps for HD and 25 Mbps for smooth 4K streaming.", mt: "Nirrakkomandaw mill-inqas 15 Mbps għal HD u 25 Mbps għal streaming 4K lixx." } },
  { q: { en: "Can I cancel anytime?", mt: "Nista' nikkanċella meta rrid?" }, a: { en: "Absolutely. There are no long-term contracts, and we offer a 7-day money-back guarantee on every plan.", mt: "Assolutament. M'hemmx kuntratti fit-tul, u noffru garanzija ta' flus lura fi 7 ijiem fuq kull pjan." } },
];

export const BLOG_DATA = [
  { tag: { en: "IPTV Guides", mt: "Gwidi IPTV" }, title: { en: "The complete beginner's guide to IPTV in 2026", mt: "Il-gwida kompluta għall-prinċipjanti dwar l-IPTV fl-2026" }, excerpt: { en: "Everything you need to know to start streaming — explained in plain language.", mt: "Kollox li teħtieġ tkun taf biex tibda tistrimja — spjegat b'lingwa sempliċi." }, date: { en: "Jul 12, 2026", mt: "12 Lul, 2026" }, read: { en: "6 min read", mt: "6 min qari" } },
  { tag: { en: "Installation", mt: "Installazzjoni" }, title: { en: "How to set up AURION on your Smart TV", mt: "Kif tissettja AURION fuq is-Smart TV tiegħek" }, excerpt: { en: "A step-by-step walkthrough for the most popular television platforms.", mt: "Gwida pass pass għall-pjattaformi tat-televiżjoni l-aktar popolari." }, date: { en: "Jul 5, 2026", mt: "5 Lul, 2026" }, read: { en: "4 min read", mt: "4 min qari" } },
  { tag: { en: "Streaming Tips", mt: "Pariri tal-Istreaming" }, title: { en: "Five ways to eliminate buffering for good", mt: "Ħames modi biex telimina l-buffering għal kollox" }, excerpt: { en: "Simple network tweaks that make a dramatic difference to stream quality.", mt: "Tibdil sempliċi fin-network li jagħmel differenza drammatika fil-kwalità tal-istream." }, date: { en: "Jun 28, 2026", mt: "28 Ġun, 2026" }, read: { en: "5 min read", mt: "5 min qari" } },
  { tag: { en: "Product Updates", mt: "Aġġornamenti tal-Prodott" }, title: { en: "What's new: faster servers and a fresh interface", mt: "X'hemm ġdid: servers aktar mgħaġġla u interface friska" }, excerpt: { en: "A look at the latest improvements rolling out to every subscriber.", mt: "Ħarsa lejn l-aħħar titjib li qed jitqassam lil kull abbonat." }, date: { en: "Jun 20, 2026", mt: "20 Ġun, 2026" }, read: { en: "3 min read", mt: "3 min qari" } },
];

export const PLAN_DATA = [
  { price: "€15", name: { en: "1 Month", mt: "Xahar" }, per: { en: "billed once · €15/mo", mt: "iċċarġjat darba · €15/xahar" }, best: false, features: [{ en: "18,000+ live channels", mt: "18,000+ kanali live" }, { en: "40,000+ movies & 12,000+ series", mt: "40,000+ films u 12,000+ serje" }, { en: "4K / FHD where available", mt: "4K / FHD fejn disponibbli" }, { en: "2 devices at once", mt: "2 apparat fl-istess ħin" }, { en: "24/7 WhatsApp support", mt: "Sapport WhatsApp 24/7" }] },
  { price: "€35", name: { en: "3 Months", mt: "3 Xhur" }, per: { en: "billed once · €11.7/mo", mt: "iċċarġjat darba · €11.7/xahar" }, best: false, features: [{ en: "Everything in 1 Month", mt: "Kollox f'Xahar" }, { en: "Priority streaming servers", mt: "Servers tal-istreaming prijoritarji" }, { en: "3 devices at once", mt: "3 apparat fl-istess ħin" }, { en: "Free app updates", mt: "Aġġornamenti tal-app b'xejn" }] },
  { price: "€45", name: { en: "6 Months", mt: "6 Xhur" }, per: { en: "billed once · €7.5/mo", mt: "iċċarġjat darba · €7.5/xahar" }, best: false, features: [{ en: "Everything in 3 Months", mt: "Kollox fi 3 Xhur" }, { en: "4 devices at once", mt: "4 apparat fl-istess ħin" }, { en: "VIP support queue", mt: "Kju ta' sapport VIP" }, { en: "Early access to new content", mt: "Aċċess bikri għal kontenut ġdid" }] },
  { price: "€65", name: { en: "12 Months", mt: "12-il Xahar" }, per: { en: "billed once · €5.4/mo", mt: "iċċarġjat darba · €5.4/xahar" }, best: true, badge: { en: "Best Value", mt: "L-Aħjar Valur" }, features: [{ en: "Everything in 6 Months", mt: "Kollox fis-6 Xhur" }, { en: "5 devices at once", mt: "5 apparat fl-istess ħin" }, { en: "Top-priority 4K servers", mt: "Servers 4K ta' prijorità għolja" }, { en: "2 months free vs monthly", mt: "2 xhur b'xejn vs kull xahar" }, { en: "Dedicated account manager", mt: "Maniġer tal-kont dedikat" }] },
];

export const CONTENT_ROW_DATA = [
  { icon: "trophy", img: "/assets/sport.jpg", tag: { en: "SPORTS · HD", mt: "SPORT · HD" }, title: { en: "Live sport, zero blackouts", mt: "Sport live, l-ebda blackouts" }, desc: { en: "AURION streams live sport and events in HD with minimal delay. Never miss a match — watch live or catch up later.", mt: "AURION jistrimja sport u avvenimenti live f'HD b'dewmien minimu. Qatt ma titlef logħba — ara live jew ilħaq wara." }, bullets: [{ en: "Top leagues from across Europe and beyond", mt: "L-aqwa ligi minn madwar l-Ewropa u lil hinn" }, { en: "Low-latency HD streams with minimal buffering", mt: "Streams HD b'latenza baxxa u buffering minimu" }, { en: "Every major sport and live event", mt: "Kull sport ewlieni u avveniment live" }, { en: "Watch live or on-demand catch-up", mt: "Ara live jew catch-up on-demand" }] },
  { icon: "film", tag: { en: "MOVIES & SERIES", mt: "FILMS U SERJE" }, title: { en: "Thousands of series & films", mt: "Eluf ta' serje u films" }, desc: { en: "One place for all your box sets and movies — from the latest premieres to timeless classics, plus content for the whole family.", mt: "Post wieħed għall-films u serje kollha tiegħek — mill-aħħar premieres sal-klassiċi, flimkien ma' kontenut għall-familja kollha." }, bullets: [{ en: "Thousands of on-demand series and films", mt: "Eluf ta' serje u films on-demand" }, { en: "Popular streaming originals included", mt: "Oriġinali popolari tal-istreaming inklużi" }, { en: "New premieres and all-time classics", mt: "Premieres ġodda u klassiċi ta' dejjem" }, { en: "Kids and family collections", mt: "Kolezzjonijiet għat-tfal u l-familja" }] },
  { icon: "monitor", img: "/assets/series.jpg", tag: { en: "ANY DEVICE", mt: "KULL APPARAT" }, title: { en: "Watch on any screen", mt: "Ara fuq kull skrin" }, desc: { en: "AURION works everywhere you do. One subscription covers every screen in the home — with the whole family watching at once.", mt: "AURION jaħdem kullimkien fejn tmur int. Abbonament wieħed ikopri kull skrin fid-dar — bil-familja kollha tara fl-istess ħin." }, bullets: [{ en: "Smart TV, Android, iOS and streaming sticks", mt: "Smart TV, Android, iOS u streaming sticks" }, { en: "Tablet, laptop and phone", mt: "Tablet, laptop u telefon" }, { en: "One subscription, unlimited screens", mt: "Abbonament wieħed, skrins bla limitu" }, { en: "The whole family can watch at once", mt: "Il-familja kollha tista' tara fl-istess ħin" }] },
];

export const STEP_DATA = [
  { n: "1", title: { en: "Choose your plan", mt: "Agħżel il-pjan tiegħek" }, desc: { en: "Pick the subscription that fits and check out securely in seconds.", mt: "Agħżel l-abbonament li jaqbel u ħallas b'mod sigur fi sekondi." } },
  { n: "2", title: { en: "Get your credentials", mt: "Ikseb il-kredenzjali tiegħek" }, desc: { en: "Receive your login details instantly by message, ready to use.", mt: "Irċievi d-dettalji tal-login istantanjament b'messaġġ, lesti biex jintużaw." } },
  { n: "3", title: { en: "Load your app & watch", mt: "Iftaħ l-app u ara" }, desc: { en: "Enter your details in any compatible app and start streaming right away.", mt: "Daħħal id-dettalji tiegħek fi kwalunkwe app kompatibbli u ibda tistrimja mill-ewwel." } },
];

export const WA_LINK = "https://wa.me/00000000000";
export const BRAND = "AURION";
