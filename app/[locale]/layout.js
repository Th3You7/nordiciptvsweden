import "../globals.css";
import Image from "next/image";
import { Poppins, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { locales, isLocale } from "../i18n/config";
import { getMessages } from "../i18n/getMessages";
import { SiteNav } from "../components/client/SiteNav";
import { Reveal } from "../components/client/Reveal";
import { SiteFooter } from "../components/sections";
import { Icon } from "../components/ui";
import { JsonLd } from "../components/JsonLd";
import { siteGraph } from "../lib/schema";
import { siteUrl } from "../lib/site";
import { WA_LINK } from "../lib/data";

// Self-hosted at build time and served from our own origin — no request to
// fonts.googleapis.com, no render-blocking stylesheet, no third-party origin
// to connect to. Only the weights the stylesheet actually uses are downloaded.
// "latin" covers Swedish (å ä ö) and English; latin-ext is not needed here.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-body",
  display: "swap",
});

// Runs before first paint: applies the saved theme so there is no flash, and
// marks the document as scripted so the reveal animation may hide elements.
const BOOT = `try{var t=localStorage.getItem('aurion_theme');if(t)document.documentElement.setAttribute('data-theme',t);document.documentElement.classList.add('has-js')}catch(e){}`;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getMessages(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t.meta.title,
      template: `%s | AURION IPTV`,
    },
    description: t.meta.description,
    openGraph: {
      type: "website",
      siteName: "AURION IPTV",
      locale: t.meta.ogLocale,
      url: `/${locale}`,
      title: t.meta.title,
      description: t.meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getMessages(locale);

  return (
    <html lang={locale} className={`${poppins.variable} ${inter.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
        <JsonLd schema={siteGraph({ locale, t })} />
      </head>
      <body>
        <div className="au-page">
          <div className="au-bg" aria-hidden="true">
            <div className="au-bg-photo">
              {/* Decorative backdrop. quality 40 because the 6px CSS blur
                  makes the compression invisible. */}
              <Image src="/assets/bg-blur.jpg" alt="" fill sizes="100vw" quality={40} priority />
            </div>
            <div className="au-bg-scrim" />
            <div className="au-bg-glow" />
            <div className="au-bg-grid" />
          </div>

          <SiteNav
            locale={locale}
            nav={t.nav}
            legal={{
              terms: t.footer.cols.terms,
              privacy: t.footer.cols.privacy,
              refund: t.footer.cols.refunds,
            }}
          />
          <main className="au-main">{children}</main>
          <SiteFooter t={t} locale={locale} />

          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="au-wa"
          >
            <Icon name="wa" size={28} />
          </a>

          <Reveal />
        </div>
      </body>
    </html>
  );
}
