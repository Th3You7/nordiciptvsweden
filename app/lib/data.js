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

// Recursively resolve {en,sv} objects into the active language.
export function resolveLang(o, lang) {
  if (Array.isArray(o)) return o.map((x) => resolveLang(x, lang));
  if (o && typeof o === "object") {
    const ks = Object.keys(o);
    if ("en" in o && "sv" in o && ks.length <= 2)
      return o[lang] != null ? o[lang] : o.en;
    const out = {};
    for (const k of ks) out[k] = resolveLang(o[k], lang);
    return out;
  }
  return o;
}

export const COPY = {
  nav: { home: { en: "Home", sv: "Hem" }, features: { en: "Features", sv: "Funktioner" }, pricing: { en: "Pricing", sv: "Priser" }, blog: { en: "Blog", sv: "Blogg" }, devices: { en: "Devices", sv: "Enheter" }, faq: { en: "FAQ", sv: "FAQ" }, contact: { en: "Contact", sv: "Kontakt" }, freeTrial: { en: "Free Trial", sv: "Gratis test" } },
  hero: { badge: { en: "Live servers online now", sv: "Liveservrar online just nu" }, title: { en: "Every channel. Every device. Zero compromise.", sv: "Alla kanaler. Alla enheter. Inga kompromisser." }, sub: { en: "Premium IPTV with true 4K clarity, instant activation and a library that never sleeps — streaming, perfected.", sv: "Premium-IPTV med äkta 4K-skärpa, direkt aktivering och ett bibliotek som aldrig sover — streaming, perfektionerad." }, cta1: { en: "Start Free Trial", sv: "Starta gratis testperiod" }, cta2: { en: "View Plans", sv: "Se abonnemang" } },
  features: { kicker: { en: "Why AURION", sv: "Varför AURION" }, title: { en: "Built for the way you watch", sv: "Byggd för hur du tittar" }, sub: { en: "Everything you need for a flawless stream, and nothing you don't.", sv: "Allt du behöver för en felfri stream, och inget du inte behöver." } },
  library: { kicker: { en: "Content library", sv: "Innehållsbibliotek" }, title: { en: "A library that never runs dry", sv: "Ett bibliotek som aldrig tar slut" } },
  devices: { kicker: { en: "Watch anywhere", sv: "Titta var som helst" }, title: { en: "Works on the screens you already own", sv: "Fungerar på skärmarna du redan har" } },
  reviews: { kicker: { en: "Loved by viewers", sv: "Älskad av tittarna" }, title: { en: "Trusted by 50,000+ streamers", sv: "Betrodd av 50 000+ streamare" } },
  faq: { title: { en: "Questions? Answered.", sv: "Frågor? Besvarade." }, seeAll: { en: "See all questions", sv: "Se alla frågor" } },
  content: { kicker: { en: "Content & channels", sv: "Innehåll och kanaler" }, title: { en: "Sport, series & more — all in one place", sv: "Sport, serier och mer — allt på ett ställe" }, sub: { en: "AURION brings you live TV, movies and sport in crisp HD and 4K. One subscription, every device. Explore the service, view plans or get in touch.", sv: "AURION ger dig live-TV, filmer och sport i skarp HD och 4K. Ett abonnemang, alla enheter. Utforska tjänsten, se abonnemangen eller hör av dig." } },
  payments: { title: { en: "Accepted payments", sv: "Betalsätt vi accepterar" }, note: { en: "Pay securely with Visa, Mastercard, PayPal and more.", sv: "Betala tryggt med Visa, Mastercard, PayPal och mer." } },
  cta: { title: { en: "Ready to start watching?", sv: "Redo att börja titta?" }, sub: { en: "Join thousands of viewers streaming in stunning 4K today.", sv: "Gå med tusentals tittare som streamar i fantastisk 4K redan idag." } },
  pricing: { kicker: { en: "Plans", sv: "Abonnemang" }, title: { en: "Simple, honest pricing", sv: "Enkla, ärliga priser" }, sub: { en: "One subscription, every feature. No hidden fees, cancel anytime.", sv: "Ett abonnemang, alla funktioner. Inga dolda avgifter, avsluta när du vill." }, choose: { en: "Choose plan", sv: "Välj abonnemang" }, seeAll: { en: "See full pricing", sv: "Se alla priser" }, note: { en: "All plans include a free trial and a 7-day money-back guarantee.", sv: "Alla abonnemang inkluderar en gratis testperiod och 7 dagars pengarna-tillbaka-garanti." } },
  blog: { kicker: { en: "The blog", sv: "Bloggen" }, title: { en: "Guides, tips & updates", sv: "Guider, tips och nyheter" }, sub: { en: "Everything to get the most from your subscription.", sv: "Allt för att få ut mesta möjliga av ditt abonnemang." }, readAll: { en: "Read the blog", sv: "Läs bloggen" } },
  devicesPage: { kicker: { en: "Devices", sv: "Enheter" }, title: { en: "One subscription, every screen", sv: "Ett abonnemang, alla skärmar" }, sub: { en: "Set up in minutes on any device you own.", sv: "Kom igång på några minuter på vilken enhet som helst." }, stepsTitle: { en: "Set up in 3 simple steps", sv: "Kom igång i 3 enkla steg" }, ctaTitle: { en: "Need a hand setting up?", sv: "Behöver du hjälp att komma igång?" } },
  faqPage: { kicker: { en: "Support", sv: "Support" }, title: { en: "Frequently asked questions", sv: "Vanliga frågor" } },
  contact: { kicker: { en: "Contact", sv: "Kontakt" }, title: { en: "Talk to a human, instantly", sv: "Prata med en människa, direkt" }, sub: { en: "No forms, no email queues. Reach us on WhatsApp any time.", sv: "Inga formulär, inga mejlköer. Nå oss på WhatsApp när som helst." }, wa: { en: "WhatsApp us", sv: "WhatsAppa oss" }, waDesc: { en: "Chat directly with our team for setup, billing or anything else.", sv: "Chatta direkt med vårt team om installation, betalning eller vad som helst." }, waCta: { en: "Open chat", sv: "Öppna chatten" }, support: { en: "24/7 Support", sv: "Support dygnet runt" }, supportDesc: { en: "Real people, every hour of every day, in English and Swedish.", sv: "Riktiga människor, varje timme varje dag, på engelska och svenska." }, online: { en: "Agents online now", sv: "Agenter online just nu" } },
  footer: { tagline: { en: "Premium IPTV streaming, engineered for clarity, speed and reliability.", sv: "Premium IPTV-streaming, byggd för skärpa, snabbhet och tillförlitlighet." }, copy: { en: "© 2026 AURION. All rights reserved.", sv: "© 2026 AURION. Alla rättigheter förbehållna." }, disclaimer: { en: "AURION is an independent streaming platform. All artwork shown is placeholder. No third-party channel or brand logos are used.", sv: "AURION är en oberoende streamingplattform. Allt bildmaterial som visas är platshållare. Inga kanal- eller varumärkeslogotyper från tredje part används." } },
};

export const FEATURE_DATA = [
  { icon: "tv", bg: "/assets/4k-bg.jpg", title: { en: "Ultra HD 4K", sv: "Ultra HD 4K" }, desc: { en: "Crystal-clear 4K and FHD streams on every supported title.", sv: "Kristallklara 4K- och FHD-streams på alla titlar som stöds." } },
  { icon: "phone", bg: "/assets/multidevice-bg.jpg", title: { en: "Multi Device", sv: "Flera enheter" }, desc: { en: "Watch on TV, phone, tablet, and browser — switch seamlessly.", sv: "Titta på TV, mobil, surfplatta och webbläsare — växla sömlöst." } },
  { icon: "zap", bg: "/assets/247.png", bgContain: true, title: { en: "Instant Activation", sv: "Direkt aktivering" }, desc: { en: "Up and running in under 60 seconds after checkout.", sv: "Igång på under 60 sekunder efter köpet." } },
  { icon: "cloud", bg: "/assets/fx-buffering.png", bgContain: true, title: { en: "Zero Buffering", sv: "Ingen buffring" }, desc: { en: "Optimised global servers keep every stream perfectly smooth.", sv: "Optimerade globala servrar håller varje stream helt jämn." } },
  { icon: "headphones", bg: "/assets/fx-support.png", bgContain: true, title: { en: "24/7 Support", sv: "Support dygnet runt" }, desc: { en: "Real people ready to help, any hour, every single day.", sv: "Riktiga människor redo att hjälpa, när som helst, varje dag." } },
  { icon: "shield", bg: "/assets/fx-secure.png", bgContain: true, title: { en: "Secure Streaming", sv: "Säker streaming" }, desc: { en: "Encrypted connections and fully private playback, always.", sv: "Krypterade anslutningar och helt privat uppspelning, alltid." } },
];

export const LIBRARY_DATA = [
  { icon: "film", title: { en: "Movies", sv: "Filmer" } }, { icon: "tv2", title: { en: "Series", sv: "Serier" } }, { icon: "trophy", title: { en: "Sports", sv: "Sport" } },
  { icon: "news", title: { en: "News", sv: "Nyheter" } }, { icon: "baby", title: { en: "Kids", sv: "Barn" } }, { icon: "book", title: { en: "Documentaries", sv: "Dokumentärer" } },
];

export const DEVICE_DATA = [
  { icon: "tv", title: { en: "Smart TV", sv: "Smart-TV" } }, { icon: "phone", title: { en: "Android", sv: "Android" } }, { icon: "phone", title: { en: "iPhone", sv: "iPhone" } }, { icon: "monitor", title: { en: "Fire TV", sv: "Fire TV" } },
  { icon: "monitor", title: { en: "Windows", sv: "Windows" } }, { icon: "laptop", title: { en: "Mac", sv: "Mac" } }, { icon: "globe", title: { en: "Web Browser", sv: "Webbläsare" } }, { icon: "tablet", title: { en: "Tablet", sv: "Surfplatta" } },
];

export const REVIEW_DATA = [
  { initial: "J", name: { en: "James C.", sv: "James C." }, role: { en: "Verified customer", sv: "Verifierad kund" }, quote: { en: "Switched from cable and never looked back. 4K looks incredible and setup took two minutes.", sv: "Bytte från kabel-TV och har aldrig ångrat mig. 4K ser otroligt bra ut och installationen tog två minuter." } },
  { initial: "M", name: { en: "Maria B.", sv: "Maria B." }, role: { en: "Verified customer", sv: "Verifierad kund" }, quote: { en: "Support answered on WhatsApp within a minute. Zero buffering even on match night.", sv: "Supporten svarade på WhatsApp inom en minut. Noll buffring även på matchkvällen." } },
  { initial: "D", name: { en: "David R.", sv: "David R." }, role: { en: "Verified customer", sv: "Verifierad kund" }, quote: { en: "Works flawlessly across my TV, phone and laptop. Best value I've found by far.", sv: "Fungerar felfritt på min TV, mobil och laptop. Det klart bästa värdet jag hittat." } },
];

export const FAQ_DATA = [
  { q: { en: "What is AURION and how does it work?", sv: "Vad är AURION och hur fungerar det?" }, a: { en: "AURION is a premium IPTV streaming service. After subscribing you receive credentials that work in any compatible app on your devices — no dish or cable required.", sv: "AURION är en premium IPTV-streamingtjänst. Efter att du tecknat abonnemang får du inloggningsuppgifter som fungerar i alla kompatibla appar på dina enheter — ingen parabol eller kabel behövs." } },
  { q: { en: "Which devices are supported?", sv: "Vilka enheter stöds?" }, a: { en: "Smart TVs, Android, iPhone, Fire TV, Windows, Mac, tablets and any modern web browser. If it has a screen, it likely works.", sv: "Smart-TV, Android, iPhone, Fire TV, Windows, Mac, surfplattor och alla moderna webbläsare. Har den en skärm fungerar den troligen." } },
  { q: { en: "How fast is activation?", sv: "Hur snabb är aktiveringen?" }, a: { en: "Most accounts are activated instantly — usually within 60 seconds of completing checkout.", sv: "De flesta konton aktiveras direkt — oftast inom 60 sekunder efter genomfört köp." } },
  { q: { en: "Do you offer a free trial?", sv: "Erbjuder ni en gratis testperiod?" }, a: { en: "Yes. Every new subscriber can start with a free trial to test quality and stability before committing.", sv: "Ja. Alla nya kunder kan börja med en gratis testperiod för att testa kvalitet och stabilitet innan de bestämmer sig." } },
  { q: { en: "What internet speed do I need?", sv: "Vilken internethastighet behöver jag?" }, a: { en: "We recommend at least 15 Mbps for HD and 25 Mbps for smooth 4K streaming.", sv: "Vi rekommenderar minst 15 Mbit/s för HD och 25 Mbit/s för smidig 4K-streaming." } },
  { q: { en: "Can I cancel anytime?", sv: "Kan jag avsluta när jag vill?" }, a: { en: "Absolutely. There are no long-term contracts, and we offer a 7-day money-back guarantee on every plan.", sv: "Absolut. Det finns inga långa bindningstider, och vi erbjuder 7 dagars pengarna-tillbaka-garanti på alla abonnemang." } },
  { q: { en: "How do I pay?", sv: "Hur betalar jag?" }, a: { en: "You can pay securely by card, by bank transfer, or through the payment link we send you on WhatsApp. As soon as the payment is confirmed your account is activated.", sv: "Du kan betala tryggt med kort, via banköverföring eller genom betallänken vi skickar på WhatsApp. Så snart betalningen är bekräftad aktiveras ditt konto." } },
  { q: { en: "How do I receive my login details?", sv: "Hur får jag mina inloggningsuppgifter?" }, a: { en: "We send your username, password and playlist link on WhatsApp straight after activation, together with a short setup guide for your device.", sv: "Vi skickar ditt användarnamn, lösenord och spellistelänk på WhatsApp direkt efter aktiveringen, tillsammans med en kort installationsguide för din enhet." } },
  { q: { en: "Can I watch on more than one device at the same time?", sv: "Kan jag titta på flera enheter samtidigt?" }, a: { en: "Yes. The 1 Month plan covers 2 devices at once, 3 Months covers 3, 6 Months covers 4 and 12 Months covers 5. You can install the service on as many devices as you like — the limit applies only to simultaneous streams.", sv: "Ja. Abonnemanget på 1 månad täcker 2 enheter samtidigt, 3 månader täcker 3, 6 månader täcker 4 och 12 månader täcker 5. Du kan installera tjänsten på hur många enheter du vill — gränsen gäller bara samtidiga streams." } },
  { q: { en: "Which apps can I use?", sv: "Vilka appar kan jag använda?" }, a: { en: "AURION works with any standard IPTV player — IPTV Smarters, TiviMate, Smart STB, Perfect Player and similar apps. We'll recommend the best one for your device.", sv: "AURION fungerar med alla vanliga IPTV-spelare — IPTV Smarters, TiviMate, Smart STB, Perfect Player och liknande appar. Vi rekommenderar den som passar din enhet bäst." } },
  { q: { en: "Is a TV guide (EPG) included?", sv: "Ingår en TV-guide (EPG)?" }, a: { en: "Yes. A full EPG with programme names and schedules is included on every plan, so you can see what is on now and what is coming up.", sv: "Ja. En komplett EPG med programnamn och tablå ingår i alla abonnemang, så du ser vad som sänds nu och vad som kommer härnäst." } },
  { q: { en: "Do you have catch-up and on-demand?", sv: "Har ni play-funktion och on demand?" }, a: { en: "Yes. Many channels include catch-up so you can watch a programme after it aired, alongside a library of 40,000+ movies and 12,000+ series on demand.", sv: "Ja. Många kanaler har play-funktion så att du kan se ett program i efterhand, plus ett bibliotek med 40 000+ filmer och 12 000+ serier on demand." } },
  { q: { en: "Do you show live sport and big events?", sv: "Visar ni livesport och stora evenemang?" }, a: { en: "Yes. We carry the major European leagues, cups and international competitions in HD, along with the main sports and event channels.", sv: "Ja. Vi har de stora europeiska ligorna, cuperna och de internationella tävlingarna i HD, tillsammans med de viktigaste sport- och evenemangskanalerna." } },
  { q: { en: "Which languages are the channels in?", sv: "Vilka språk sänds kanalerna på?" }, a: { en: "The line-up covers Swedish, English, Norwegian, Danish, Finnish and the major European languages, plus Arabic, Turkish and many more — over 18,000 channels in total.", sv: "Utbudet täcker svenska, engelska, norska, danska, finska och de stora europeiska språken, plus arabiska, turkiska och många fler — över 18 000 kanaler totalt." } },
  { q: { en: "What if a channel freezes or stops working?", sv: "Vad gör jag om en kanal hakar upp sig eller slutar fungera?" }, a: { en: "Message us on WhatsApp and we will fix it. Most issues are solved within minutes — usually a server switch or a quick app setting. Our team is available 24/7.", sv: "Skicka ett meddelande på WhatsApp så löser vi det. De flesta problem löses inom några minuter — oftast ett serverbyte eller en snabb inställning i appen. Vårt team finns tillgängligt dygnet runt." } },
  { q: { en: "Do I need a VPN?", sv: "Behöver jag VPN?" }, a: { en: "Usually not — the service works on a normal connection. If your provider slows down streaming traffic a VPN can help, and our team will tell you if it is needed.", sv: "Oftast inte — tjänsten fungerar på en vanlig uppkoppling. Om din operatör bromsar streamingtrafik kan VPN hjälpa, och vårt team säger till om det behövs." } },
  { q: { en: "Can I use it while travelling abroad?", sv: "Kan jag använda tjänsten när jag reser utomlands?" }, a: { en: "Yes. Your account works anywhere there is a stable internet connection, so you keep your channels while travelling.", sv: "Ja. Ditt konto fungerar överallt där det finns en stabil internetuppkoppling, så du behåller dina kanaler när du reser." } },
  { q: { en: "Is there a contract or automatic renewal?", sv: "Finns det bindningstid eller automatisk förnyelse?" }, a: { en: "No. Every plan is paid once for a fixed period and nothing renews automatically. When it ends, you decide whether to extend.", sv: "Nej. Varje abonnemang betalas en gång för en bestämd period och inget förnyas automatiskt. När det tar slut bestämmer du själv om du vill förlänga." } },
  { q: { en: "How do I renew my subscription?", sv: "Hur förnyar jag mitt abonnemang?" }, a: { en: "Send us a message on WhatsApp before your plan ends and we extend the same account — you keep your settings and favourites.", sv: "Skicka ett meddelande på WhatsApp innan ditt abonnemang tar slut så förlänger vi samma konto — du behåller dina inställningar och favoriter." } },
  { q: { en: "Can I upgrade my plan later?", sv: "Kan jag uppgradera mitt abonnemang senare?" }, a: { en: "Yes. You can move to a longer plan or add more simultaneous devices at any time — we simply adjust the difference.", sv: "Ja. Du kan gå över till ett längre abonnemang eller lägga till fler samtidiga enheter när som helst — vi justerar bara mellanskillnaden." } },
  { q: { en: "Do you help me set everything up?", sv: "Hjälper ni mig att installera allt?" }, a: { en: "Yes, free of charge. We send a step-by-step guide and, if you prefer, we walk you through it on WhatsApp until everything is playing.", sv: "Ja, utan kostnad. Vi skickar en steg-för-steg-guide och, om du vill, går vi igenom den med dig på WhatsApp tills allt fungerar." } },
  { q: { en: "Is my viewing private?", sv: "Är mitt tittande privat?" }, a: { en: "Yes. Playback is encrypted and we never share your details with anyone. We only keep what is needed to run your subscription.", sv: "Ja. Uppspelningen är krypterad och vi delar aldrig dina uppgifter med någon. Vi sparar bara det som behövs för att driva ditt abonnemang." } },
];

export const BLOG_DATA = [
  { tag: { en: "IPTV Guides", sv: "IPTV-guider" }, title: { en: "The complete beginner's guide to IPTV in 2026", sv: "Den kompletta nybörjarguiden till IPTV 2026" }, excerpt: { en: "Everything you need to know to start streaming — explained in plain language.", sv: "Allt du behöver veta för att börja streama — förklarat på ett enkelt språk." }, date: { en: "Jul 12, 2026", sv: "12 juli 2026" }, read: { en: "6 min read", sv: "6 min läsning" } },
  { tag: { en: "Installation", sv: "Installation" }, title: { en: "How to set up AURION on your Smart TV", sv: "Så installerar du AURION på din Smart-TV" }, excerpt: { en: "A step-by-step walkthrough for the most popular television platforms.", sv: "En steg-för-steg-genomgång för de populäraste TV-plattformarna." }, date: { en: "Jul 5, 2026", sv: "5 juli 2026" }, read: { en: "4 min read", sv: "4 min läsning" } },
  { tag: { en: "Streaming Tips", sv: "Streamingtips" }, title: { en: "Five ways to eliminate buffering for good", sv: "Fem sätt att bli av med buffring för gott" }, excerpt: { en: "Simple network tweaks that make a dramatic difference to stream quality.", sv: "Enkla nätverksjusteringar som gör stor skillnad för streamkvaliteten." }, date: { en: "Jun 28, 2026", sv: "28 juni 2026" }, read: { en: "5 min read", sv: "5 min läsning" } },
  { tag: { en: "Product Updates", sv: "Produktnyheter" }, title: { en: "What's new: faster servers and a fresh interface", sv: "Nyheter: snabbare servrar och ett nytt gränssnitt" }, excerpt: { en: "A look at the latest improvements rolling out to every subscriber.", sv: "En titt på de senaste förbättringarna som rullas ut till alla kunder." }, date: { en: "Jun 20, 2026", sv: "20 juni 2026" }, read: { en: "3 min read", sv: "3 min läsning" } },
];

export const PLAN_DATA = [
  {
    price: "€15", name: { en: "1 Month", sv: "1 månad" }, per: { en: "billed once · €15/mo", sv: "faktureras en gång · €15/mån" }, best: false,
    features: [
      { en: "18,000+ live channels", sv: "18 000+ livekanaler" },
      { en: "40,000+ movies & 12,000+ series", sv: "40 000+ filmer och 12 000+ serier" },
      { en: "4K / FHD where available", sv: "4K / FHD där det finns" },
      { en: "2 devices at once", sv: "2 enheter samtidigt" },
      { en: "No freezing, no buffering", sv: "Inga hack, ingen buffring" },
      { en: "Instant activation in 60 seconds", sv: "Direkt aktivering på 60 sekunder" },
      { en: "Works on every device", sv: "Fungerar på alla enheter" },
      { en: "Full TV guide (EPG) included", sv: "Komplett TV-guide (EPG) ingår" },
      { en: "Free step-by-step setup guide", sv: "Gratis steg-för-steg-guide" },
      { en: "24/7 WhatsApp support", sv: "WhatsApp-support dygnet runt" },
    ],
  },
  {
    price: "€35", name: { en: "3 Months", sv: "3 månader" }, per: { en: "billed once · €11.7/mo", sv: "faktureras en gång · €11,7/mån" }, best: false,
    features: [
      { en: "Everything in 1 Month", sv: "Allt i 1 månad" },
      { en: "18,000+ live channels", sv: "18 000+ livekanaler" },
      { en: "40,000+ movies & 12,000+ series", sv: "40 000+ filmer och 12 000+ serier" },
      { en: "4K / FHD where available", sv: "4K / FHD där det finns" },
      { en: "3 devices at once", sv: "3 enheter samtidigt" },
      { en: "Priority streaming servers", sv: "Prioriterade streamingservrar" },
      { en: "Encrypted, private playback", sv: "Krypterad, privat uppspelning" },
      { en: "Free app updates", sv: "Gratis appuppdateringar" },
      { en: "24/7 WhatsApp support", sv: "WhatsApp-support dygnet runt" },
      { en: "Save 22% vs monthly", sv: "Spara 22 % mot månadsvis" },
    ],
  },
  {
    price: "€45", name: { en: "6 Months", sv: "6 månader" }, per: { en: "billed once · €7.5/mo", sv: "faktureras en gång · €7,5/mån" }, best: false,
    features: [
      { en: "Everything in 3 Months", sv: "Allt i 3 månader" },
      { en: "18,000+ live channels", sv: "18 000+ livekanaler" },
      { en: "40,000+ movies & 12,000+ series", sv: "40 000+ filmer och 12 000+ serier" },
      { en: "4K / FHD where available", sv: "4K / FHD där det finns" },
      { en: "4 devices at once", sv: "4 enheter samtidigt" },
      { en: "VIP support queue", sv: "VIP-kö till supporten" },
      { en: "Early access to new content", sv: "Tidig tillgång till nytt innehåll" },
      { en: "Catch-up & on-demand library", sv: "Play-funktion och on demand-bibliotek" },
      { en: "Free setup on all your devices", sv: "Gratis installation på alla dina enheter" },
      { en: "Save 50% vs monthly", sv: "Spara 50 % mot månadsvis" },
    ],
  },
  {
    price: "€65", name: { en: "12 Months", sv: "12 månader" }, per: { en: "billed once · €5.4/mo", sv: "faktureras en gång · €5,4/mån" }, best: true, badge: { en: "Best Value", sv: "Bäst värde" },
    features: [
      { en: "Everything in 6 Months", sv: "Allt i 6 månader" },
      { en: "18,000+ live channels", sv: "18 000+ livekanaler" },
      { en: "40,000+ movies & 12,000+ series", sv: "40 000+ filmer och 12 000+ serier" },
      { en: "4K / FHD at the best quality", sv: "4K / FHD i bästa kvalitet" },
      { en: "5 devices at once", sv: "5 enheter samtidigt" },
      { en: "Top-priority 4K servers", sv: "Högst prioriterade 4K-servrar" },
      { en: "Dedicated account manager", sv: "Egen kontaktperson" },
      { en: "2 months free vs monthly", sv: "2 månader gratis mot månadsvis" },
      { en: "Encrypted, private playback", sv: "Krypterad, privat uppspelning" },
      { en: "Save 64% vs monthly", sv: "Spara 64 % mot månadsvis" },
    ],
  },
];

export const CONTENT_ROW_DATA = [
  { icon: "trophy", img: "/assets/sport.webp", tag: { en: "SPORTS · HD", sv: "SPORT · HD" }, title: { en: "Live sport, zero blackouts", sv: "Livesport, inga avbrott" }, desc: { en: "AURION streams live sport and events in HD with minimal delay. Never miss a match — watch live or catch up later.", sv: "AURION streamar livesport och evenemang i HD med minimal fördröjning. Missa aldrig en match — se den live eller i efterhand." }, bullets: [{ en: "Top leagues from across Europe and beyond", sv: "Toppligor från hela Europa och världen" }, { en: "Low-latency HD streams with minimal buffering", sv: "HD-streams med låg fördröjning och minimal buffring" }, { en: "Every major sport and live event", sv: "Alla stora sporter och liveevenemang" }, { en: "Watch live or on-demand catch-up", sv: "Se live eller i efterhand" }] },
  { icon: "film", img: "/assets/posters-grid.webp", tag: { en: "MOVIES & SERIES", sv: "FILMER OCH SERIER" }, title: { en: "Thousands of series & films", sv: "Tusentals serier och filmer" }, desc: { en: "One place for all your box sets and movies — from the latest premieres to timeless classics, plus content for the whole family.", sv: "Ett ställe för alla dina serier och filmer — från de senaste premiärerna till tidlösa klassiker, plus innehåll för hela familjen." }, bullets: [{ en: "Thousands of on-demand series and films", sv: "Tusentals serier och filmer on demand" }, { en: "Popular streaming originals included", sv: "Populära streamingoriginal ingår" }, { en: "New premieres and all-time classics", sv: "Nya premiärer och klassiker genom tiderna" }, { en: "Kids and family collections", sv: "Samlingar för barn och familj" }] },
  { icon: "monitor", img: "/assets/devices.webp", tag: { en: "ANY DEVICE", sv: "ALLA ENHETER" }, title: { en: "Watch on any screen", sv: "Titta på vilken skärm som helst" }, desc: { en: "AURION works everywhere you do. One subscription covers every screen in the home — with the whole family watching at once.", sv: "AURION fungerar överallt där du är. Ett abonnemang täcker alla skärmar i hemmet — så att hela familjen kan titta samtidigt." }, bullets: [{ en: "Smart TV, Android, iOS and streaming sticks", sv: "Smart-TV, Android, iOS och streamingstickor" }, { en: "Tablet, laptop and phone", sv: "Surfplatta, laptop och mobil" }, { en: "One subscription, unlimited screens", sv: "Ett abonnemang, obegränsat antal skärmar" }, { en: "The whole family can watch at once", sv: "Hela familjen kan titta samtidigt" }] },
];

export const STEP_DATA = [
  { n: "1", title: { en: "Choose your plan", sv: "Välj ditt abonnemang" }, desc: { en: "Pick the subscription that fits and check out securely in seconds.", sv: "Välj abonnemanget som passar och betala tryggt på några sekunder." } },
  { n: "2", title: { en: "Get your credentials", sv: "Få dina inloggningsuppgifter" }, desc: { en: "Receive your login details instantly by message, ready to use.", sv: "Få dina inloggningsuppgifter direkt via meddelande, klara att använda." } },
  { n: "3", title: { en: "Load your app & watch", sv: "Öppna appen och titta" }, desc: { en: "Enter your details in any compatible app and start streaming right away.", sv: "Ange dina uppgifter i valfri kompatibel app och börja streama direkt." } },
];

export const WA_LINK = "https://wa.me/00000000000";
export const BRAND = "AURION";
