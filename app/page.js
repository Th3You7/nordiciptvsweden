"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Icon, LogoMark, Stars } from "./components/ui";
import {
  resolveLang,
  COPY,
  FEATURE_DATA,
  LIBRARY_DATA,
  DEVICE_DATA,
  REVIEW_DATA,
  FAQ_DATA,
  BLOG_DATA,
  PLAN_DATA,
  CONTENT_ROW_DATA,
  STEP_DATA,
  WA_LINK,
  BRAND,
} from "./lib/data";

const g = (cols, gap) =>
  `display:grid;grid-template-columns:repeat(${cols},1fr);gap:${gap};align-items:start;`;

export default function Home() {
  const [page, setPage] = useState("home");
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState("en");
  const [mobile, setMobile] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [w, setW] = useState(1280);
  const io = useRef(null);

  // Restore persisted preferences after mount (avoids hydration mismatch).
  useEffect(() => {
    try {
      const th = localStorage.getItem("aurion_theme");
      const lg = localStorage.getItem("aurion_lang");
      if (th) setTheme(th);
      if (lg) setLang(lg);
    } catch (e) {}
    setW(window.innerWidth);
    const onResize = () => {
      const nw = window.innerWidth;
      setW((prev) => (Math.abs(nw - prev) > 8 ? nw : prev));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Reveal-on-scroll animation, re-run whenever the active page changes.
  useEffect(() => {
    try {
      window.scrollTo({ top: 0 });
    } catch (e) {}
    if (io.current) io.current.disconnect();
    const timer = setTimeout(() => {
      try {
        io.current = new IntersectionObserver(
          (es) => {
            es.forEach((en) => {
              if (en.isIntersecting) {
                en.target.style.opacity = "1";
                en.target.style.transform = "none";
                io.current.unobserve(en.target);
              }
            });
          },
          { threshold: 0.06, rootMargin: "0px 0px -30px 0px" }
        );
        document.querySelectorAll("[data-reveal]").forEach((el) => {
          if (el.dataset.revealed) return;
          el.dataset.revealed = "1";
          el.style.opacity = "0";
          el.style.transform = "translateY(16px)";
          el.style.transition =
            "opacity .6s cubic-bezier(.2,.7,.2,1), transform .6s cubic-bezier(.2,.7,.2,1)";
          io.current.observe(el);
        });
      } catch (e) {
        document.querySelectorAll("[data-reveal]").forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "none";
        });
      }
      setTimeout(() => {
        try {
          document.querySelectorAll("[data-reveal]").forEach((el) => {
            const r = el.getBoundingClientRect();
            if (r.top < window.innerHeight) {
              el.style.opacity = "1";
              el.style.transform = "none";
            }
          });
        } catch (e) {}
      }, 900);
    }, 40);
    return () => clearTimeout(timer);
  }, [page]);

  useEffect(() => () => io.current && io.current.disconnect(), []);

  const go = (k) => {
    setMobile(false);
    setPage(k);
  };
  const toggleTheme = () => {
    const nt = theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("aurion_theme", nt);
    } catch (e) {}
    setTheme(nt);
  };
  const toggleLang = () => {
    const nl = lang === "en" ? "mt" : "en";
    try {
      localStorage.setItem("aurion_lang", nl);
    } catch (e) {}
    setLang(nl);
  };

  const t = resolveLang(COPY, lang);
  const R = (o) => resolveLang(o, lang);

  const navItems = [
    ["home", "home", "home"],
    ["features", "features", "zap"],
    ["pricing", "pricing", "tag"],
    ["blog", "blog", "news"],
    ["devices", "devices", "monitor"],
    ["faq", "faq", "help"],
    ["contact", "contact", "wa"],
  ].map(([k, lbl, ic]) => ({ key: k, label: t.nav[lbl], icon: ic }));

  const deskNav = w >= 1040;
  const iconNav = w >= 620 && w < 1040;

  const features = R(FEATURE_DATA);
  const libPos = ["22% 18%", "78% 20%", "50% 26%", "24% 80%", "76% 74%", "52% 58%"];
  const library = R(LIBRARY_DATA);
  const devices = R(DEVICE_DATA);
  const reviews = R(REVIEW_DATA);
  const faqRaw = R(FAQ_DATA);
  const posts = R(BLOG_DATA);
  const plans = R(PLAN_DATA);
  const steps = R(STEP_DATA);
  const contentRows = R(CONTENT_ROW_DATA);

  const payMethods = ["Visa", "Mastercard", "PayPal", lang === "mt" ? "u aktar" : "& more"];
  const heroStats = [
    { value: "99.9%", label: lang === "mt" ? "Attività" : "Uptime" },
    { value: "40K+", label: lang === "mt" ? "Films" : "Movies" },
    { value: "18K+", label: lang === "mt" ? "Kanali Live" : "Live Channels" },
  ];
  const stats = [
    { value: "99.9%", label: lang === "mt" ? "Attività (Uptime)" : "Uptime" },
    { value: "40,000+", label: lang === "mt" ? "Films" : "Movies" },
    { value: "12,000+", label: lang === "mt" ? "Serje" : "Series" },
    { value: "18,000+", label: lang === "mt" ? "Kanali Live" : "Live Channels" },
    { value: "50,000+", label: lang === "mt" ? "Utenti Attivi" : "Active Users" },
  ];
  const footerCols = [
    { title: lang === "mt" ? "Prodott" : "Product", links: [["features", "features"], ["pricing", "pricing"], ["devices", "devices"]] },
    { title: lang === "mt" ? "Kumpanija" : "Company", links: [["blog", "blog"], ["contact", "contact"], ["faq", "faq"]] },
    { title: "Legal", links: null },
  ];
  const legalLinks = [
    { label: lang === "mt" ? "Termini" : "Terms", key: "faq" },
    { label: lang === "mt" ? "Privatezza" : "Privacy", key: "faq" },
    { label: lang === "mt" ? "Rifużjonijiet" : "Refunds", key: "faq" },
  ];

  const grids = {
    heroGrid: `display:grid;gap:${w < 880 ? "40px" : "48px"};align-items:center;grid-template-columns:${w < 880 ? "1fr" : "1.05fr .95fr"};max-width:1240px;margin:0 auto;padding:clamp(56px,8vw,104px) 24px 40px;`,
    statsGrid: `display:grid;gap:1px;border:1px solid var(--border);border-radius:20px;overflow:hidden;background:var(--border);grid-template-columns:${w < 560 ? "repeat(2,1fr)" : w < 860 ? "repeat(3,1fr)" : "repeat(5,1fr)"};`,
    gridFeat: g(w < 640 ? 1 : w < 980 ? 2 : 3, "20px"),
    gridLib: g(w < 480 ? 2 : w < 820 ? 3 : 6, "16px"),
    gridDev: g(w < 480 ? 2 : w < 820 ? 3 : 4, "16px"),
    gridDevBig: g(w < 480 ? 2 : w < 820 ? 3 : 4, "18px"),
    gridRev: g(w < 640 ? 1 : w < 1000 ? 2 : 3, "20px"),
    gridSteps: g(w < 760 ? 1 : 3, "20px"),
    gridPrice: g(w < 560 ? 2 : 4, "18px"),
    gridPriceHome: g(w < 560 ? 2 : 4, "14px"),
    gridBlogHome: g(w < 640 ? 1 : 3, "20px"),
    gridContact: `display:grid;gap:22px;grid-template-columns:${w < 680 ? "1fr" : "1fr 1fr"};`,
    gridFoot: `display:grid;gap:36px;grid-template-columns:${w < 720 ? "1fr 1fr" : w < 960 ? "1.4fr 1fr 1fr" : "1.6fr 1fr 1fr 1fr"};`,
    blogGrid: `display:grid;gap:0;border:1px solid var(--border);border-radius:20px;overflow:hidden;background:var(--card);grid-template-columns:${w < 760 ? "1fr" : "300px 1fr"};`,
  };

  const planCardStyle = (p, sm) =>
    sm
      ? `position:relative;border:${p.best ? "1.6px solid var(--accent)" : "1px solid var(--border)"};border-radius:16px;background:var(--card);padding:22px 16px;transition:transform .3s ease,box-shadow .3s ease;${p.best ? "box-shadow:0 0 28px var(--glow);" : ""}`
      : `position:relative;border:${p.best ? "1.6px solid var(--accent)" : "1px solid var(--border)"};border-radius:20px;background:var(--card);padding:32px 26px;transition:transform .3s ease,box-shadow .3s ease;${p.best ? "box-shadow:0 0 34px var(--glow);" : ""}`;
  const planBtnStyle = (p, sm) =>
    sm
      ? `width:100%;margin-top:16px;height:40px;border-radius:10px;font-family:Poppins;font-weight:600;font-size:13.5px;cursor:pointer;transition:background .2s,transform .2s,border-color .2s;${p.best ? "border:none;background:var(--accent);color:#fff;box-shadow:0 8px 20px rgba(229,9,20,.35);" : "border:1.5px solid var(--accent);background:transparent;color:var(--text);"}`
      : `width:100%;margin-top:22px;height:48px;border-radius:12px;font-family:Poppins;font-weight:600;font-size:15px;cursor:pointer;transition:background .2s,transform .2s,border-color .2s;${p.best ? "border:none;background:var(--accent);color:#fff;box-shadow:0 10px 26px rgba(229,9,20,.35);" : "border:1.5px solid var(--accent);background:transparent;color:var(--text);"}`;

  const kicker = (text) => (
    <span style={{ fontSize: "13px", fontWeight: 700, letterSpacing: ".18em", color: "var(--accent)", textTransform: "uppercase" }}>{text}</span>
  );

  const faqItem = (q, idx, big) => {
    const open = openFaq === idx;
    return (
      <div key={idx} style={{ border: "1px solid var(--border)", borderRadius: "16px", background: "var(--card)", overflow: "hidden" }}>
        <button
          onClick={() => setOpenFaq((cur) => (cur === idx ? -1 : idx))}
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", textAlign: "left", padding: big ? "22px 24px" : "20px 22px", background: "none", border: "none", cursor: "pointer", color: "var(--text)", fontFamily: "'Poppins'", fontWeight: 600, fontSize: big ? "17px" : "16.5px" }}
        >
          {q.q}
          <span style={{ display: "inline-flex", color: "var(--accent)", transition: "transform .3s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
            <Icon name="chevron" size={20} />
          </span>
        </button>
        {open && (
          <div style={{ padding: big ? "0 24px 24px" : "0 22px 22px", color: "var(--text2)", fontSize: big ? "16px" : "15.5px", lineHeight: 1.65, animation: "au-acc .3s ease both" }}>
            {q.a}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="au-root" data-theme={theme} style={{ minHeight: "100vh", fontFamily: "'Inter',system-ui,sans-serif", color: "var(--text)", background: "var(--bg)", position: "relative" }}>
      {/* Background layers */}
      <div aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", inset: "-30px", background: "url('/assets/bg-blur.jpg') center/cover no-repeat", filter: "blur(6px)", transform: "scale(1.06)", opacity: "var(--photo)" }} />
        <div style={{ position: "absolute", inset: 0, background: "var(--scrim)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(1100px 620px at 82% -8%,var(--glow),transparent 60%),radial-gradient(900px 520px at -5% 12%,rgba(229,9,20,.07),transparent 55%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(var(--stripe) 1px,transparent 1px) 0 0/46px 46px,linear-gradient(90deg,var(--stripe) 1px,transparent 1px) 0 0/46px 46px" }} />
      </div>

      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 60, backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", background: "var(--navbg)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 24px", height: "72px", display: "flex", alignItems: "center", gap: "28px" }}>
          <button onClick={() => go("home")} aria-label="Home" style={{ display: "flex", alignItems: "center", gap: "10px", background: "none", border: "none", cursor: "pointer", color: "var(--text)", padding: 0 }}>
            <span style={{ display: "inline-flex", color: "var(--text)" }}><LogoMark /></span>
            <span style={{ fontFamily: "'Poppins'", fontWeight: 800, fontSize: "21px", letterSpacing: ".14em" }}>{BRAND}</span>
          </button>

          {/* desktop text nav */}
          <div style={{ alignItems: "center", gap: "4px", marginLeft: "14px", display: deskNav ? "flex" : "none" }}>
            {navItems.map((item) => (
              <Box as="button" key={item.key} onClick={() => go(item.key)} hover="color:var(--text);background:var(--bg2)"
                sx={`display:inline-flex;align-items:center;gap:7px;padding:9px 12px;border:none;border-radius:10px;background:${page === item.key ? "var(--bg2)" : "transparent"};color:${page === item.key ? "var(--text)" : "var(--text2)"};font-family:Inter;font-weight:600;font-size:14.5px;cursor:pointer;transition:color .2s ease,background .2s ease;`}>
                <span style={{ display: "inline-flex", color: "var(--accent)" }}><Icon name={item.icon} size={20} /></span>
                {item.label}
              </Box>
            ))}
          </div>

          {/* icon nav (tablet) */}
          <div style={{ alignItems: "center", gap: "2px", marginLeft: "auto", display: iconNav ? "flex" : "none" }}>
            {navItems.map((item) => (
              <Box as="button" key={item.key} onClick={() => go(item.key)} aria-label={item.label} title={item.label} hover="color:var(--text);background:var(--bg2)"
                sx={`display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;min-width:58px;height:52px;padding:0 6px;border:none;border-radius:12px;background:${page === item.key ? "var(--bg2)" : "transparent"};color:${page === item.key ? "var(--accent)" : "var(--text2)"};cursor:pointer;transition:color .2s ease,background .2s ease;`}>
                <Icon name={item.icon} size={20} />
                <span style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "10px", letterSpacing: ".06em", textTransform: "uppercase" }}>{item.label}</span>
              </Box>
            ))}
          </div>

          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "10px" }}>
            <Box as="button" onClick={toggleLang} aria-label="Language" hover="border-color:var(--accent)"
              sx="display:flex;align-items:center;gap:7px;height:40px;padding:0 13px;border:1px solid var(--border);border-radius:999px;background:transparent;color:var(--text);cursor:pointer;font-family:'Inter';font-weight:600;font-size:13px;transition:border-color .2s ease;">
              <span style={{ display: "inline-flex" }}><Icon name="globe2" size={17} /></span>
              <span style={{ letterSpacing: ".04em" }}>{lang === "en" ? "EN" : "MT"}</span>
            </Box>
            <Box as="button" onClick={toggleTheme} aria-label="Toggle theme" hover="border-color:var(--accent);transform:rotate(18deg)"
              sx="width:40px;height:40px;display:grid;place-items:center;border:1px solid var(--border);border-radius:999px;background:transparent;color:var(--text);cursor:pointer;transition:border-color .2s ease,transform .3s ease;">
              <Icon name={theme === "dark" ? "sun" : "moon"} size={20} />
            </Box>
            <Box as="button" onClick={() => go("contact")} hover="background:var(--accent2);transform:translateY(-2px);box-shadow:0 12px 30px rgba(229,9,20,.45)"
              sx={`display:${deskNav ? "inline-flex" : "none"};align-items:center;height:40px;padding:0 20px;border:none;border-radius:999px;background:var(--accent);color:#fff;font-family:'Poppins';font-weight:600;font-size:14px;cursor:pointer;box-shadow:0 8px 22px rgba(229,9,20,.32);transition:background .2s ease,transform .2s ease,box-shadow .2s ease;`}>
              {t.nav.freeTrial}
            </Box>
            <button onClick={() => setMobile((m) => !m)} aria-label="Menu" style={{ display: deskNav || iconNav ? "none" : "grid", width: "40px", height: "40px", placeItems: "center", border: "1px solid var(--border)", borderRadius: "12px", background: "transparent", color: "var(--text)", cursor: "pointer" }}>
              <Icon name={mobile ? "close" : "menu"} size={22} />
            </button>
          </div>
        </div>
        {mobile && (
          <div style={{ borderTop: "1px solid var(--border)", padding: "10px 16px 16px", display: "flex", flexDirection: "column", gap: "2px", background: "var(--navbg)" }}>
            {navItems.map((item) => (
              <button key={item.key} onClick={() => go(item.key)} style={{ display: "flex", alignItems: "center", gap: "12px", textAlign: "left", padding: "13px 12px", border: "none", borderRadius: "12px", background: page === item.key ? "var(--bg2)" : "transparent", color: "var(--text)", fontFamily: "Inter", fontWeight: 600, fontSize: "16px", cursor: "pointer" }}>
                <span style={{ display: "inline-flex", color: "var(--accent)" }}><Icon name={item.icon} size={20} /></span>
                {item.label}
              </button>
            ))}
            <button onClick={() => go("contact")} style={{ marginTop: "8px", height: "48px", border: "none", borderRadius: "999px", background: "var(--accent)", color: "#fff", fontFamily: "'Poppins'", fontWeight: 600, fontSize: "15px", cursor: "pointer" }}>{t.nav.freeTrial}</button>
          </div>
        )}
      </nav>

      <div key={page} style={{ animation: "au-pageIn .45s ease both", position: "relative", zIndex: 2 }}>
        {/* ============ HOME ============ */}
        {page === "home" && (
          <div>
            {/* Hero */}
            <Box as="section" sx={grids.heroGrid} data-wrap="hero">
              <div data-reveal="1">
                <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "7px 14px", border: "1px solid var(--border)", borderRadius: "999px", background: "var(--card)", fontSize: "12.5px", fontWeight: 600, letterSpacing: ".06em", color: "var(--text2)" }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 10px var(--accent)" }} />
                  {t.hero.badge}
                </span>
                <h1 style={{ fontFamily: "'Poppins'", fontWeight: 800, fontSize: "clamp(38px,5.2vw,64px)", lineHeight: 1.04, letterSpacing: "-.02em", margin: "22px 0 0", textWrap: "balance" }}>{t.hero.title}</h1>
                <p style={{ fontSize: "clamp(16px,1.5vw,19px)", lineHeight: 1.65, color: "var(--text2)", margin: "22px 0 0", maxWidth: "520px", textWrap: "pretty" }}>{t.hero.sub}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginTop: "34px" }}>
                  <Box as="button" onClick={() => go("contact")} hover="background:var(--accent2);transform:translateY(-2px);box-shadow:0 16px 40px rgba(229,9,20,.5)"
                    sx="display:inline-flex;align-items:center;gap:10px;height:54px;padding:0 26px;border:none;border-radius:999px;background:var(--accent);color:#fff;font-family:'Poppins';font-weight:600;font-size:16px;cursor:pointer;box-shadow:0 12px 30px rgba(229,9,20,.36);transition:background .2s,transform .2s,box-shadow .2s;">
                    {t.hero.cta1}<span style={{ display: "inline-flex" }}><Icon name="arrow" size={18} /></span>
                  </Box>
                  <Box as="button" onClick={() => go("pricing")} hover="background:rgba(229,9,20,.08);transform:translateY(-2px)"
                    sx="height:54px;padding:0 26px;border:1.5px solid var(--accent);border-radius:999px;background:transparent;color:var(--text);font-family:'Poppins';font-weight:600;font-size:16px;cursor:pointer;transition:background .2s,transform .2s;">
                    {t.hero.cta2}
                  </Box>
                </div>
                <div style={{ display: "flex", gap: "26px", marginTop: "34px", flexWrap: "wrap" }}>
                  {heroStats.map((s, i) => (
                    <div key={i}>
                      <div style={{ fontFamily: "'Poppins'", fontWeight: 700, fontSize: "24px" }}>{s.value}</div>
                      <div style={{ fontSize: "13px", color: "var(--text2)", marginTop: "2px" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div data-reveal="1" style={{ position: "relative", minHeight: "360px" }}>
                <div style={{ position: "relative", borderRadius: "22px", border: "1px solid var(--border)", background: "var(--card)", boxShadow: "var(--shadow)", padding: "14px" }}>
                  <div style={{ borderRadius: "14px", overflow: "hidden", aspectRatio: "16/10", background: "url('/assets/hero-tv.jpg') center/cover no-repeat,var(--bg2)", display: "grid", placeItems: "center", position: "relative" }}>
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(8,8,8,.35),rgba(8,8,8,.62)),radial-gradient(circle at 50% 45%,var(--glow),transparent 62%)" }} />
                    <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", color: "var(--text2)" }}>
                      <span style={{ width: "66px", height: "66px", borderRadius: "50%", background: "var(--accent)", display: "grid", placeItems: "center", color: "#fff", boxShadow: "0 0 34px var(--glow)", animation: "au-pulse 3.2s ease-in-out infinite" }}><Icon name="play" size={30} filled /></span>
                      <span style={{ fontFamily: "'Poppins'", fontWeight: 600, fontSize: "14px", letterSpacing: ".16em", color: "var(--text)" }}>ULTRA HD · 4K</span>
                    </div>
                  </div>
                </div>
                <div style={{ position: "absolute", right: "-6px", bottom: "-26px", width: "118px", borderRadius: "22px", border: "1px solid var(--border)", background: "var(--card)", boxShadow: "var(--shadow)", padding: "8px", animation: "au-float 5s ease-in-out infinite" }}>
                  <div style={{ borderRadius: "14px", overflow: "hidden", aspectRatio: "9/17", background: "url('/img_0968-2-mrtc28d1-ato8.jpg') center/cover no-repeat,var(--bg2)" }} />
                </div>
              </div>
            </Box>

            {/* Stats bar */}
            <section style={{ maxWidth: "1240px", margin: "20px auto 0", padding: "0 24px" }}>
              <Box data-reveal="1" sx={grids.statsGrid}>
                {stats.map((s, i) => (
                  <div key={i} style={{ background: "var(--card)", padding: "26px 18px", textAlign: "center" }}>
                    <div style={{ fontFamily: "'Poppins'", fontWeight: 800, fontSize: "clamp(22px,2.4vw,30px)", color: "var(--accent)" }}>{s.value}</div>
                    <div style={{ fontSize: "13px", color: "var(--text2)", marginTop: "4px", letterSpacing: ".02em" }}>{s.label}</div>
                  </div>
                ))}
              </Box>
            </section>

            {/* Features */}
            <section id="features" style={{ maxWidth: "1240px", margin: "0 auto", padding: "clamp(64px,8vw,110px) 24px 0" }}>
              <div data-reveal="1" style={{ textAlign: "center", maxWidth: "660px", margin: "0 auto 46px" }}>
                {kicker(t.features.kicker)}
                <h2 style={{ fontFamily: "'Poppins'", fontWeight: 700, fontSize: "clamp(30px,3.6vw,44px)", letterSpacing: "-.02em", margin: "14px 0 12px", textWrap: "balance" }}>{t.features.title}</h2>
                <p style={{ color: "var(--text2)", fontSize: "17px", lineHeight: 1.6, margin: 0 }}>{t.features.sub}</p>
              </div>
              <Box sx={grids.gridFeat} data-grid="feat">
                {features.map((f, i) => (
                  <FeatureCard key={i} f={f} />
                ))}
              </Box>
            </section>

            {/* Library */}
            <section style={{ maxWidth: "1240px", margin: "0 auto", padding: "clamp(64px,8vw,110px) 24px 0" }}>
              <div data-reveal="1" style={{ textAlign: "center", maxWidth: "660px", margin: "0 auto 46px" }}>
                {kicker(t.library.kicker)}
                <h2 style={{ fontFamily: "'Poppins'", fontWeight: 700, fontSize: "clamp(30px,3.6vw,44px)", letterSpacing: "-.02em", margin: "14px 0 0", textWrap: "balance" }}>{t.library.title}</h2>
              </div>
              <Box sx={grids.gridLib} data-grid="lib">
                {library.map((c, i) => (
                  <LibraryCard key={i} c={c} pos={libPos[i % libPos.length]} reveal />
                ))}
              </Box>
            </section>

            {/* Content & channels */}
            <section style={{ maxWidth: "1180px", margin: "0 auto", padding: "clamp(64px,8vw,110px) 24px 0" }}>
              <div data-reveal="1" style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 56px" }}>
                {kicker(t.content.kicker)}
                <h2 style={{ fontFamily: "'Poppins'", fontWeight: 700, fontSize: "clamp(30px,3.6vw,44px)", letterSpacing: "-.02em", margin: "14px 0 12px", textWrap: "balance" }}>{t.content.title}</h2>
                <p style={{ color: "var(--text2)", fontSize: "17px", lineHeight: 1.65, margin: 0, textWrap: "pretty" }}>{t.content.sub}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(36px,5vw,64px)" }}>
                {contentRows.map((r, i) => {
                  const rev = i % 2 === 1;
                  return (
                    <div key={i} data-reveal="1" style={{ display: "flex", alignItems: "center", gap: w < 820 ? "24px" : "48px", flexDirection: w < 820 ? "column" : rev ? "row-reverse" : "row" }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "'Poppins',monospace", fontSize: "11.5px", fontWeight: 600, letterSpacing: ".14em", color: "var(--accent)", padding: "6px 12px", border: "1px solid rgba(229,9,20,.3)", borderRadius: "999px" }}>{r.tag}</span>
                        <h3 style={{ fontFamily: "'Poppins'", fontWeight: 700, fontSize: "clamp(24px,2.8vw,32px)", letterSpacing: "-.01em", margin: "18px 0 12px", textWrap: "balance" }}>{r.title}</h3>
                        <p style={{ color: "var(--text2)", fontSize: "16px", lineHeight: 1.65, margin: "0 0 20px", textWrap: "pretty" }}>{r.desc}</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                          {r.bullets.map((b, j) => (
                            <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: "11px", fontSize: "15.5px", color: "var(--text)" }}>
                              <span style={{ display: "inline-flex", color: "var(--accent)", flex: "none", marginTop: "1px" }}><Icon name="check" size={17} /></span>{b}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div style={{ flex: 1, minWidth: 0, width: "100%" }}>
                        <div style={{ borderRadius: "20px", overflow: "hidden", aspectRatio: "16/11", border: "1px solid var(--border)", background: "repeating-linear-gradient(-45deg,var(--bg2),var(--bg2) 12px,transparent 12px,transparent 24px),var(--card)", position: "relative", boxShadow: "var(--shadow)" }}>
                          {r.img ? (
                            <>
                              <div style={{ position: "absolute", inset: 0, background: `url('${r.img}') center/cover no-repeat` }} />
                              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 55%,rgba(0,0,0,.35)),radial-gradient(circle at 50% 40%,var(--glow),transparent 68%)" }} />
                            </>
                          ) : (
                            <>
                              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 45%,var(--glow),transparent 62%)" }} />
                              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px", color: "var(--text2)" }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/img_0951-mrs00ei5-czm3.jpg" alt="artwork" width={897} height={1200} style={{ maxWidth: "100%", height: "auto", display: "block", objectFit: "cover", width: "897px", aspectRatio: "897 / 1200" }} />
                                <span style={{ display: "grid", placeItems: "center", width: "60px", height: "60px", borderRadius: "16px", background: "rgba(229,9,20,.12)", color: "var(--accent)" }}><Icon name={r.icon} size={26} /></span>
                                <span style={{ fontFamily: "'Poppins',monospace", fontSize: "11px", letterSpacing: ".16em" }}>ARTWORK · 16:9</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Payments */}
              <div data-reveal="1" style={{ marginTop: "clamp(48px,6vw,80px)", border: "1px solid var(--border)", borderRadius: "20px", background: "var(--card)", padding: "32px 28px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "18px 26px", textAlign: "center" }}>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontFamily: "'Poppins'", fontWeight: 600, fontSize: "17px" }}>{t.payments.title}</div>
                  <div style={{ color: "var(--text2)", fontSize: "14.5px", marginTop: "3px" }}>{t.payments.note}</div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {payMethods.map((m, i) => (
                    <span key={i} style={{ display: "inline-flex", alignItems: "center", height: "44px", padding: "0 20px", border: "1px solid var(--border)", borderRadius: "12px", background: "var(--bg2)", fontFamily: "'Poppins'", fontWeight: 600, fontSize: "15px", letterSpacing: ".01em" }}>{m}</span>
                  ))}
                </div>
              </div>
            </section>

            {/* Devices row */}
            <section style={{ maxWidth: "1240px", margin: "0 auto", padding: "clamp(64px,8vw,110px) 24px 0" }}>
              <div data-reveal="1" style={{ textAlign: "center", maxWidth: "660px", margin: "0 auto 44px" }}>
                {kicker(t.devices.kicker)}
                <h2 style={{ fontFamily: "'Poppins'", fontWeight: 700, fontSize: "clamp(30px,3.6vw,44px)", letterSpacing: "-.02em", margin: "14px 0 0" }}>{t.devices.title}</h2>
              </div>
              <Box sx={grids.gridDev} data-grid="dev">
                {devices.map((d, i) => (
                  <Box key={i} data-reveal="1" hover="transform:translateY(-5px);border-color:rgba(229,9,20,.4);box-shadow:0 0 22px var(--glow)"
                    sx="display:flex;flex-direction:column;align-items:center;gap:14px;padding:30px 16px;border:1px solid var(--border);border-radius:18px;background:var(--card);transition:transform .3s ease,border-color .3s ease,box-shadow .3s ease;">
                    <span style={{ color: "var(--accent)" }}><Icon name={d.icon} size={30} /></span>
                    <span style={{ fontFamily: "'Poppins'", fontWeight: 600, fontSize: "15px" }}>{d.title}</span>
                  </Box>
                ))}
              </Box>
            </section>

            {/* Testimonials */}
            <section style={{ maxWidth: "1240px", margin: "0 auto", padding: "clamp(64px,8vw,110px) 24px 0" }}>
              <div data-reveal="1" style={{ textAlign: "center", maxWidth: "660px", margin: "0 auto 46px" }}>
                {kicker(t.reviews.kicker)}
                <h2 style={{ fontFamily: "'Poppins'", fontWeight: 700, fontSize: "clamp(30px,3.6vw,44px)", letterSpacing: "-.02em", margin: "14px 0 0" }}>{t.reviews.title}</h2>
              </div>
              <Box sx={grids.gridRev} data-grid="rev">
                {reviews.map((r, i) => (
                  <Box key={i} data-reveal="1" hover="transform:translateY(-5px);box-shadow:0 18px 40px rgba(0,0,0,.26),0 0 22px var(--glow)"
                    sx="border:1px solid var(--border);border-radius:20px;background:var(--card);padding:28px;transition:transform .3s ease,box-shadow .3s ease;">
                    <div style={{ display: "flex", gap: "3px", color: "var(--accent)" }}><Stars /></div>
                    <p style={{ fontSize: "16px", lineHeight: 1.65, margin: "18px 0 22px", color: "var(--text)", textWrap: "pretty" }}>{r.quote}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span style={{ width: "42px", height: "42px", borderRadius: "50%", background: "rgba(229,9,20,.12)", color: "var(--accent)", display: "grid", placeItems: "center", fontFamily: "'Poppins'", fontWeight: 700 }}>{r.initial}</span>
                      <div>
                        <div style={{ fontFamily: "'Poppins'", fontWeight: 600, fontSize: "15px" }}>{r.name}</div>
                        <div style={{ fontSize: "13px", color: "var(--text2)" }}>{r.role}</div>
                      </div>
                    </div>
                  </Box>
                ))}
              </Box>
            </section>

            {/* Pricing preview */}
            <section style={{ maxWidth: "1240px", margin: "0 auto", padding: "clamp(64px,8vw,110px) 24px 0" }}>
              <div data-reveal="1" style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 52px" }}>
                {kicker(t.pricing.kicker)}
                <h2 style={{ fontFamily: "'Poppins'", fontWeight: 700, fontSize: "clamp(30px,3.6vw,44px)", letterSpacing: "-.02em", margin: "14px 0 12px" }}>{t.pricing.title}</h2>
                <p style={{ color: "var(--text2)", fontSize: "17px", lineHeight: 1.6, margin: 0 }}>{t.pricing.sub}</p>
              </div>
              <Box sx={grids.gridPriceHome} data-grid="pricehome">
                {plans.map((p, i) => (
                  <Box key={i} data-reveal="1" hover="transform:translateY(-5px);box-shadow:0 20px 40px rgba(0,0,0,.3),0 0 26px var(--glow)" sx={planCardStyle(p, true)}>
                    {p.best && (
                      <span style={{ position: "absolute", top: "-11px", left: "50%", transform: "translateX(-50%)", background: "var(--accent)", color: "#fff", fontFamily: "'Poppins'", fontWeight: 600, fontSize: "10.5px", letterSpacing: ".06em", padding: "5px 11px", borderRadius: "999px", boxShadow: "0 8px 20px rgba(229,9,20,.4)", whiteSpace: "nowrap" }}>{p.badge}</span>
                    )}
                    <div style={{ fontFamily: "'Poppins'", fontWeight: 600, fontSize: "16px" }}>{p.name}</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "4px", margin: "10px 0 3px" }}><span style={{ fontFamily: "'Poppins'", fontWeight: 800, fontSize: "34px", letterSpacing: "-.02em" }}>{p.price}</span></div>
                    <div style={{ fontSize: "12px", color: "var(--text2)" }}>{p.per}</div>
                    <button onClick={() => go("contact")} style={parseInlineBtn(planBtnStyle(p, true))}>{t.pricing.choose}</button>
                    <div style={{ height: "1px", background: "var(--border)", margin: "16px 0" }} />
                    <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                      {p.features.map((feat, j) => (
                        <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "12.5px", lineHeight: 1.4, color: "var(--text2)" }}>
                          <span style={{ display: "inline-flex", color: "var(--accent)", flex: "none", marginTop: "1px" }}><Icon name="check" size={17} /></span>{feat}
                        </div>
                      ))}
                    </div>
                  </Box>
                ))}
              </Box>
              <div data-reveal="1" style={{ textAlign: "center", margin: "38px 0 0" }}>
                <Box as="button" onClick={() => go("pricing")} hover="background:rgba(229,9,20,.08);transform:translateY(-2px)"
                  sx="display:inline-flex;align-items:center;gap:9px;height:50px;padding:0 26px;border:1.5px solid var(--accent);border-radius:999px;background:transparent;color:var(--text);font-family:'Poppins';font-weight:600;font-size:15px;cursor:pointer;transition:background .2s,transform .2s;">
                  {t.pricing.seeAll}<Icon name="arrow" size={18} />
                </Box>
              </div>
            </section>

            {/* FAQ preview */}
            <section style={{ maxWidth: "820px", margin: "0 auto", padding: "clamp(64px,8vw,110px) 24px 0" }}>
              <div data-reveal="1" style={{ textAlign: "center", margin: "0 auto 40px" }}>
                <h2 style={{ fontFamily: "'Poppins'", fontWeight: 700, fontSize: "clamp(28px,3.4vw,40px)", letterSpacing: "-.02em", margin: 0 }}>{t.faq.title}</h2>
              </div>
              <div data-reveal="1" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {faqRaw.slice(0, 4).map((q, i) => faqItem(q, i, false))}
              </div>
            </section>

            {/* Blog preview */}
            <section style={{ maxWidth: "1240px", margin: "0 auto", padding: "clamp(64px,8vw,110px) 24px 0" }}>
              <div data-reveal="1" style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 46px" }}>
                {kicker(t.blog.kicker)}
                <h2 style={{ fontFamily: "'Poppins'", fontWeight: 700, fontSize: "clamp(30px,3.6vw,44px)", letterSpacing: "-.02em", margin: "14px 0 12px" }}>{t.blog.title}</h2>
                <p style={{ color: "var(--text2)", fontSize: "17px", lineHeight: 1.6, margin: 0 }}>{t.blog.sub}</p>
              </div>
              <Box sx={grids.gridBlogHome} data-grid="bloghome">
                {posts.slice(0, 3).map((b, i) => (
                  <Box as="article" key={i} data-reveal="1" onClick={() => go("blog")} hover="transform:translateY(-5px);border-color:rgba(229,9,20,.35);box-shadow:0 20px 44px rgba(0,0,0,.26),0 0 24px var(--glow)"
                    sx="cursor:pointer;border:1px solid var(--border);border-radius:20px;overflow:hidden;background:var(--card);display:flex;flex-direction:column;transition:transform .3s ease,box-shadow .3s ease,border-color .3s ease;">
                    <div style={{ aspectRatio: "16/9", background: "repeating-linear-gradient(45deg,var(--bg2),var(--bg2) 12px,transparent 12px,transparent 24px),var(--bg2)", display: "grid", placeItems: "center", position: "relative" }}>
                      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 40% 40%,var(--glow),transparent 65%)" }} />
                      <span style={{ position: "relative", fontFamily: "'Poppins',monospace", fontSize: "11px", letterSpacing: ".16em", color: "var(--text2)" }}>FEATURED · 16:9</span>
                    </div>
                    <div style={{ padding: "24px 24px 26px", display: "flex", flexDirection: "column", flex: 1 }}>
                      <span style={{ alignSelf: "flex-start", fontSize: "11.5px", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--accent)", padding: "5px 11px", border: "1px solid rgba(229,9,20,.3)", borderRadius: "999px" }}>{b.tag}</span>
                      <h3 style={{ fontFamily: "'Poppins'", fontWeight: 700, fontSize: "19px", letterSpacing: "-.01em", margin: "14px 0 9px", textWrap: "balance" }}>{b.title}</h3>
                      <p style={{ color: "var(--text2)", fontSize: "14.5px", lineHeight: 1.6, margin: "0 0 16px", textWrap: "pretty" }}>{b.excerpt}</p>
                      <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "10px", fontSize: "12.5px", color: "var(--text2)" }}><span>{b.date}</span><span>·</span><span>{b.read}</span></div>
                    </div>
                  </Box>
                ))}
              </Box>
              <div data-reveal="1" style={{ textAlign: "center", margin: "38px 0 0" }}>
                <Box as="button" onClick={() => go("blog")} hover="background:rgba(229,9,20,.08);transform:translateY(-2px)"
                  sx="display:inline-flex;align-items:center;gap:9px;height:50px;padding:0 26px;border:1.5px solid var(--accent);border-radius:999px;background:transparent;color:var(--text);font-family:'Poppins';font-weight:600;font-size:15px;cursor:pointer;transition:background .2s,transform .2s;">
                  {t.blog.readAll}<Icon name="arrow" size={18} />
                </Box>
              </div>
            </section>

            {/* CTA banner */}
            <section style={{ maxWidth: "1240px", margin: "0 auto", padding: "clamp(64px,8vw,110px) 24px clamp(40px,6vw,80px)" }}>
              <div data-reveal="1" style={{ position: "relative", overflow: "hidden", border: "1px solid rgba(229,9,20,.35)", borderRadius: "26px", background: "linear-gradient(180deg,var(--card),var(--bg2))", padding: "clamp(40px,6vw,72px) 32px", textAlign: "center", boxShadow: "0 0 60px var(--glow)" }}>
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(600px 300px at 50% -20%,var(--glow),transparent 60%)" }} />
                <div style={{ position: "relative" }}>
                  <h2 style={{ fontFamily: "'Poppins'", fontWeight: 800, fontSize: "clamp(30px,4vw,50px)", letterSpacing: "-.02em", margin: "0 0 14px", textWrap: "balance" }}>{t.cta.title}</h2>
                  <p style={{ color: "var(--text2)", fontSize: "18px", margin: "0 auto 30px", maxWidth: "520px" }}>{t.cta.sub}</p>
                  <Box as="button" onClick={() => go("contact")} hover="background:var(--accent2);transform:translateY(-2px)"
                    sx="height:56px;padding:0 32px;border:none;border-radius:999px;background:var(--accent);color:#fff;font-family:'Poppins';font-weight:600;font-size:17px;cursor:pointer;box-shadow:0 14px 34px rgba(229,9,20,.42);transition:background .2s,transform .2s;">
                    {t.hero.cta1}
                  </Box>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ============ FEATURES ============ */}
        {page === "features" && (
          <section style={{ maxWidth: "1240px", margin: "0 auto", padding: "clamp(56px,7vw,96px) 24px clamp(48px,7vw,90px)" }}>
            <div data-reveal="1" style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 52px" }}>
              {kicker(t.features.kicker)}
              <h1 style={{ fontFamily: "'Poppins'", fontWeight: 800, fontSize: "clamp(34px,4.4vw,54px)", letterSpacing: "-.02em", margin: "14px 0 12px" }}>{t.features.title}</h1>
              <p style={{ color: "var(--text2)", fontSize: "17px", lineHeight: 1.6, margin: 0 }}>{t.features.sub}</p>
            </div>
            <Box sx={grids.gridFeat} data-grid="featp">
              {features.map((f, i) => (
                <FeatureCard key={i} f={f} />
              ))}
            </Box>

            <div data-reveal="1" style={{ textAlign: "center", maxWidth: "660px", margin: "clamp(56px,7vw,90px) auto 40px" }}>
              {kicker(t.library.kicker)}
              <h2 style={{ fontFamily: "'Poppins'", fontWeight: 700, fontSize: "clamp(28px,3.4vw,40px)", letterSpacing: "-.02em", margin: "14px 0 0" }}>{t.library.title}</h2>
            </div>
            <Box sx={grids.gridLib} data-grid="libp">
              {library.map((c, i) => (
                <LibraryCard key={i} c={c} pos={libPos[i % libPos.length]} />
              ))}
            </Box>

            <div data-reveal="1" style={{ marginTop: "clamp(48px,6vw,72px)", textAlign: "center", border: "1px solid rgba(229,9,20,.35)", borderRadius: "24px", background: "linear-gradient(180deg,var(--card),var(--bg2))", padding: "clamp(36px,5vw,60px) 32px", boxShadow: "0 0 50px var(--glow)" }}>
              <h2 style={{ fontFamily: "'Poppins'", fontWeight: 800, fontSize: "clamp(26px,3.2vw,38px)", margin: "0 0 22px" }}>{t.cta.title}</h2>
              <Box as="button" onClick={() => go("contact")} hover="background:var(--accent2);transform:translateY(-2px)"
                sx="height:54px;padding:0 30px;border:none;border-radius:999px;background:var(--accent);color:#fff;font-family:'Poppins';font-weight:600;font-size:16px;cursor:pointer;box-shadow:0 12px 30px rgba(229,9,20,.4);transition:background .2s,transform .2s;">{t.hero.cta1}</Box>
            </div>
          </section>
        )}

        {/* ============ PRICING ============ */}
        {page === "pricing" && (
          <section style={{ maxWidth: "1240px", margin: "0 auto", padding: "clamp(56px,7vw,96px) 24px clamp(48px,7vw,90px)" }}>
            <div data-reveal="1" style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 52px" }}>
              {kicker(t.pricing.kicker)}
              <h1 style={{ fontFamily: "'Poppins'", fontWeight: 800, fontSize: "clamp(34px,4.4vw,54px)", letterSpacing: "-.02em", margin: "14px 0 12px" }}>{t.pricing.title}</h1>
              <p style={{ color: "var(--text2)", fontSize: "17px", lineHeight: 1.6, margin: 0 }}>{t.pricing.sub}</p>
            </div>
            <Box sx={grids.gridPrice} data-grid="price">
              {plans.map((p, i) => (
                <Box key={i} data-reveal="1" hover="transform:translateY(-6px);box-shadow:0 24px 50px rgba(0,0,0,.3),0 0 30px var(--glow)" sx={planCardStyle(p, false)}>
                  {p.best && (
                    <span style={{ position: "absolute", top: "-13px", left: "50%", transform: "translateX(-50%)", background: "var(--accent)", color: "#fff", fontFamily: "'Poppins'", fontWeight: 600, fontSize: "12px", letterSpacing: ".08em", padding: "6px 14px", borderRadius: "999px", boxShadow: "0 8px 20px rgba(229,9,20,.4)", whiteSpace: "nowrap" }}>{p.badge}</span>
                  )}
                  <div style={{ fontFamily: "'Poppins'", fontWeight: 600, fontSize: "19px" }}>{p.name}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "4px", margin: "16px 0 4px" }}><span style={{ fontFamily: "'Poppins'", fontWeight: 800, fontSize: "46px", letterSpacing: "-.02em" }}>{p.price}</span></div>
                  <div style={{ fontSize: "13.5px", color: "var(--text2)" }}>{p.per}</div>
                  <button onClick={() => go("contact")} style={parseInlineBtn(planBtnStyle(p, false))}>{t.pricing.choose}</button>
                  <div style={{ height: "1px", background: "var(--border)", margin: "22px 0" }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {p.features.map((feat, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14.5px", color: "var(--text2)" }}>
                        <span style={{ display: "inline-flex", color: "var(--accent)", flex: "none", marginTop: "1px" }}><Icon name="check" size={17} /></span>{feat}
                      </div>
                    ))}
                  </div>
                </Box>
              ))}
            </Box>
            <p data-reveal="1" style={{ textAlign: "center", color: "var(--text2)", fontSize: "14px", margin: "38px 0 0" }}>{t.pricing.note}</p>
          </section>
        )}

        {/* ============ BLOG ============ */}
        {page === "blog" && (
          <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "clamp(56px,7vw,96px) 24px clamp(48px,7vw,90px)" }}>
            <div data-reveal="1" style={{ textAlign: "center", margin: "0 auto 52px", maxWidth: "640px" }}>
              {kicker(t.blog.kicker)}
              <h1 style={{ fontFamily: "'Poppins'", fontWeight: 800, fontSize: "clamp(34px,4.4vw,54px)", letterSpacing: "-.02em", margin: "14px 0 12px" }}>{t.blog.title}</h1>
              <p style={{ color: "var(--text2)", fontSize: "17px", margin: 0 }}>{t.blog.sub}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
              {posts.map((b, i) => (
                <Box as="article" key={i} data-reveal="1" hover="transform:translateY(-4px);border-color:rgba(229,9,20,.35);box-shadow:0 20px 44px rgba(0,0,0,.26),0 0 24px var(--glow)"
                  sx={grids.blogGrid + "transition:transform .3s ease,box-shadow .3s ease,border-color .3s ease;"} data-blogcard="1">
                  <div style={{ minHeight: "210px", background: "repeating-linear-gradient(45deg,var(--bg2),var(--bg2) 12px,transparent 12px,transparent 24px),var(--bg2)", display: "grid", placeItems: "center", position: "relative" }}>
                    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 40% 40%,var(--glow),transparent 65%)" }} />
                    <span style={{ position: "relative", fontFamily: "'Poppins',monospace", fontSize: "11px", letterSpacing: ".16em", color: "var(--text2)" }}>FEATURED · 16:9</span>
                  </div>
                  <div style={{ padding: "30px 32px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <span style={{ alignSelf: "flex-start", fontSize: "12px", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--accent)", padding: "5px 11px", border: "1px solid rgba(229,9,20,.3)", borderRadius: "999px" }}>{b.tag}</span>
                    <h2 style={{ fontFamily: "'Poppins'", fontWeight: 700, fontSize: "23px", letterSpacing: "-.01em", margin: "16px 0 10px", textWrap: "balance" }}>{b.title}</h2>
                    <p style={{ color: "var(--text2)", fontSize: "15.5px", lineHeight: 1.6, margin: "0 0 16px", textWrap: "pretty" }}>{b.excerpt}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "13px", color: "var(--text2)" }}><span>{b.date}</span><span>·</span><span>{b.read}</span></div>
                  </div>
                </Box>
              ))}
            </div>
          </section>
        )}

        {/* ============ DEVICES ============ */}
        {page === "devices" && (
          <section style={{ maxWidth: "1240px", margin: "0 auto", padding: "clamp(56px,7vw,96px) 24px clamp(48px,7vw,90px)" }}>
            <div data-reveal="1" style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 52px" }}>
              {kicker(t.devicesPage.kicker)}
              <h1 style={{ fontFamily: "'Poppins'", fontWeight: 800, fontSize: "clamp(34px,4.4vw,54px)", letterSpacing: "-.02em", margin: "14px 0 12px" }}>{t.devicesPage.title}</h1>
              <p style={{ color: "var(--text2)", fontSize: "17px", margin: 0 }}>{t.devicesPage.sub}</p>
            </div>
            <Box sx={grids.gridDevBig} data-grid="devbig">
              {devices.map((d, i) => (
                <Box key={i} data-reveal="1" hover="transform:translateY(-6px);border-color:rgba(229,9,20,.4);box-shadow:0 0 26px var(--glow)"
                  sx="display:flex;flex-direction:column;align-items:center;gap:16px;padding:38px 18px;border:1px solid var(--border);border-radius:20px;background:var(--card);transition:transform .3s ease,border-color .3s ease,box-shadow .3s ease;">
                  <span style={{ display: "grid", placeItems: "center", width: "64px", height: "64px", borderRadius: "16px", background: "rgba(229,9,20,.10)", color: "var(--accent)" }}><Icon name={d.icon} size={32} /></span>
                  <span style={{ fontFamily: "'Poppins'", fontWeight: 600, fontSize: "16px" }}>{d.title}</span>
                </Box>
              ))}
            </Box>

            <div data-reveal="1" style={{ marginTop: "clamp(56px,7vw,90px)", textAlign: "center" }}>
              <h2 style={{ fontFamily: "'Poppins'", fontWeight: 700, fontSize: "clamp(28px,3.4vw,40px)", letterSpacing: "-.02em", margin: "0 0 44px" }}>{t.devicesPage.stepsTitle}</h2>
            </div>
            <Box sx={grids.gridSteps} data-grid="steps">
              {steps.map((s, i) => (
                <div key={i} data-reveal="1" style={{ border: "1px solid var(--border)", borderRadius: "20px", background: "var(--card)", padding: "34px 28px", position: "relative" }}>
                  <span style={{ fontFamily: "'Poppins'", fontWeight: 800, fontSize: "15px", width: "42px", height: "42px", borderRadius: "12px", background: "var(--accent)", color: "#fff", display: "grid", placeItems: "center", boxShadow: "0 8px 20px rgba(229,9,20,.35)" }}>{s.n}</span>
                  <h3 style={{ fontFamily: "'Poppins'", fontWeight: 600, fontSize: "20px", margin: "20px 0 8px" }}>{s.title}</h3>
                  <p style={{ color: "var(--text2)", fontSize: "15px", lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                </div>
              ))}
            </Box>

            <div data-reveal="1" style={{ marginTop: "clamp(48px,6vw,72px)", textAlign: "center", border: "1px solid rgba(229,9,20,.35)", borderRadius: "24px", background: "linear-gradient(180deg,var(--card),var(--bg2))", padding: "clamp(36px,5vw,60px) 32px", boxShadow: "0 0 50px var(--glow)" }}>
              <h2 style={{ fontFamily: "'Poppins'", fontWeight: 800, fontSize: "clamp(26px,3.2vw,38px)", margin: "0 0 22px" }}>{t.devicesPage.ctaTitle}</h2>
              <Box as="button" onClick={() => go("contact")} hover="background:var(--accent2);transform:translateY(-2px)"
                sx="height:54px;padding:0 30px;border:none;border-radius:999px;background:var(--accent);color:#fff;font-family:'Poppins';font-weight:600;font-size:16px;cursor:pointer;box-shadow:0 12px 30px rgba(229,9,20,.4);transition:background .2s,transform .2s;">{t.hero.cta1}</Box>
            </div>
          </section>
        )}

        {/* ============ FAQ ============ */}
        {page === "faq" && (
          <section style={{ maxWidth: "840px", margin: "0 auto", padding: "clamp(56px,7vw,96px) 24px clamp(48px,7vw,90px)" }}>
            <div data-reveal="1" style={{ textAlign: "center", margin: "0 auto 48px" }}>
              {kicker(t.faqPage.kicker)}
              <h1 style={{ fontFamily: "'Poppins'", fontWeight: 800, fontSize: "clamp(34px,4.4vw,54px)", letterSpacing: "-.02em", margin: "14px 0 0" }}>{t.faqPage.title}</h1>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {faqRaw.map((q, i) => faqItem(q, i, true))}
            </div>
          </section>
        )}

        {/* ============ CONTACT ============ */}
        {page === "contact" && (
          <section style={{ maxWidth: "980px", margin: "0 auto", padding: "clamp(56px,7vw,96px) 24px clamp(48px,7vw,90px)" }}>
            <div data-reveal="1" style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 52px" }}>
              {kicker(t.contact.kicker)}
              <h1 style={{ fontFamily: "'Poppins'", fontWeight: 800, fontSize: "clamp(34px,4.4vw,54px)", letterSpacing: "-.02em", margin: "14px 0 12px" }}>{t.contact.title}</h1>
              <p style={{ color: "var(--text2)", fontSize: "17px", margin: 0 }}>{t.contact.sub}</p>
            </div>
            <Box sx={grids.gridContact} data-grid="contact">
              <Box as="a" href={WA_LINK} target="_blank" rel="noopener" data-reveal="1" hover="transform:translateY(-6px);border-color:rgba(229,9,20,.4);box-shadow:0 22px 48px rgba(0,0,0,.28),0 0 26px var(--glow)"
                sx="text-decoration:none;color:var(--text);border:1px solid var(--border);border-radius:22px;background:var(--card);padding:40px 34px;display:flex;flex-direction:column;align-items:flex-start;gap:18px;transition:transform .3s ease,border-color .3s ease,box-shadow .3s ease;">
                <span style={{ display: "grid", placeItems: "center", width: "60px", height: "60px", borderRadius: "16px", background: "rgba(229,9,20,.10)", color: "var(--accent)" }}><Icon name="wa" size={30} /></span>
                <div>
                  <div style={{ fontFamily: "'Poppins'", fontWeight: 700, fontSize: "22px" }}>{t.contact.wa}</div>
                  <div style={{ color: "var(--text2)", fontSize: "15px", marginTop: "6px", lineHeight: 1.55 }}>{t.contact.waDesc}</div>
                </div>
                <span style={{ marginTop: "auto", display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "'Poppins'", fontWeight: 600, fontSize: "15px", color: "var(--accent)" }}>{t.contact.waCta}<Icon name="arrow" size={18} /></span>
              </Box>
              <div data-reveal="1" style={{ border: "1px solid var(--border)", borderRadius: "22px", background: "var(--card)", padding: "40px 34px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "18px" }}>
                <span style={{ display: "grid", placeItems: "center", width: "60px", height: "60px", borderRadius: "16px", background: "rgba(229,9,20,.10)", color: "var(--accent)" }}><Icon name="headphones" size={30} /></span>
                <div>
                  <div style={{ fontFamily: "'Poppins'", fontWeight: 700, fontSize: "22px" }}>{t.contact.support}</div>
                  <div style={{ color: "var(--text2)", fontSize: "15px", marginTop: "6px", lineHeight: 1.55 }}>{t.contact.supportDesc}</div>
                </div>
                <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "10px", fontFamily: "'Poppins'", fontWeight: 600, fontSize: "15px" }}>
                  <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 10px #22c55e" }} />{t.contact.online}
                </div>
              </div>
            </Box>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--border)", background: "var(--bg2)", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "clamp(48px,6vw,72px) 24px 34px" }}>
          <Box sx={grids.gridFoot} data-foot="1">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text)" }}>
                <span style={{ display: "inline-flex" }}><LogoMark /></span>
                <span style={{ fontFamily: "'Poppins'", fontWeight: 800, fontSize: "20px", letterSpacing: ".14em" }}>{BRAND}</span>
              </div>
              <p style={{ color: "var(--text2)", fontSize: "14.5px", lineHeight: 1.6, margin: "18px 0 0", maxWidth: "300px" }}>{t.footer.tagline}</p>
            </div>
            {footerCols.map((col, i) => (
              <div key={i}>
                <div style={{ fontFamily: "'Poppins'", fontWeight: 600, fontSize: "14px", letterSpacing: ".04em", marginBottom: "16px" }}>{col.title}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
                  {(col.links
                    ? col.links.map(([k, lbl]) => ({ label: t.nav[lbl] || lbl, key: k }))
                    : legalLinks
                  ).map((lk, j) => (
                    <Box as="button" key={j} onClick={() => go(lk.key)} hover="color:var(--accent)"
                      sx="text-align:left;background:none;border:none;padding:0;cursor:pointer;color:var(--text2);font-family:'Inter';font-size:14.5px;transition:color .2s ease;">{lk.label}</Box>
                  ))}
                </div>
              </div>
            ))}
          </Box>
          <div style={{ height: "1px", background: "var(--border)", margin: "40px 0 22px" }} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", justifyContent: "space-between", alignItems: "center", color: "var(--text2)", fontSize: "13px" }}>
            <span>{t.footer.copy}</span>
            <span style={{ maxWidth: "560px", textAlign: "right", opacity: 0.8 }}>{t.footer.disclaimer}</span>
          </div>
        </div>
      </footer>

      {/* WhatsApp float */}
      <Box as="a" href={WA_LINK} target="_blank" rel="noopener" aria-label="WhatsApp" hover="background:var(--accent2);transform:scale(1.08)"
        sx="position:fixed;right:24px;bottom:24px;z-index:80;width:60px;height:60px;border-radius:50%;background:var(--accent);color:#fff;display:grid;place-items:center;box-shadow:0 12px 30px rgba(229,9,20,.45);animation:au-float 3.4s ease-in-out infinite;transition:background .2s ease,transform .2s ease;">
        <Icon name="wa" size={28} />
      </Box>
    </div>
  );
}

// ---- Small presentational helpers shared across pages ----

function parseInlineBtn(str) {
  const out = {};
  for (const decl of str.split(";")) {
    const i = decl.indexOf(":");
    if (i === -1) continue;
    const key = decl.slice(0, i).trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    const val = decl.slice(i + 1).trim();
    if (key && val) out[key] = val;
  }
  return out;
}

function FeatureCard({ f }) {
  const cardStyle = `position:relative;overflow:hidden;border:${f.bg ? "1px solid rgba(229,9,20,.35)" : "1px solid var(--border)"};border-radius:20px;background:var(--card);padding:30px 26px;transition:transform .3s ease,box-shadow .3s ease,border-color .3s ease;`;
  return (
    <Box data-reveal="1" hover="transform:translateY(-6px) scale(1.012);border-color:rgba(229,9,20,.4);box-shadow:0 22px 44px rgba(0,0,0,.28),0 0 26px var(--glow)" sx={cardStyle}>
      {f.bg && (
        <>
          <div style={{ position: "absolute", inset: 0, background: `url('${f.bg}') center/${f.bgContain ? "70%" : "cover"} no-repeat`, opacity: 0.28 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,rgba(18,18,18,.72),rgba(8,8,8,.92)),radial-gradient(circle at 25% 20%,var(--glow),transparent 60%)" }} />
        </>
      )}
      <div style={{ position: "relative" }}>
        <span style={{ display: "grid", placeItems: "center", width: "54px", height: "54px", borderRadius: "14px", background: "rgba(229,9,20,.10)", color: "var(--accent)", transition: "transform .3s ease" }}><Icon name={f.icon} size={26} /></span>
        <h3 style={{ fontFamily: "'Poppins'", fontWeight: 600, fontSize: "20px", margin: "20px 0 8px" }}>{f.title}</h3>
        <p style={{ color: "var(--text2)", fontSize: "15px", lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
      </div>
    </Box>
  );
}

function LibraryCard({ c, pos, reveal }) {
  const bg = `radial-gradient(115% 85% at ${pos},rgba(229,9,20,.32),transparent 58%),linear-gradient(160deg,#1c1c1c,#0b0b0b)`;
  return (
    <div {...(reveal ? { "data-reveal": "1" } : {})} style={{ cursor: "default" }}>
      <Box hover="transform:scale(1.04);box-shadow:0 18px 36px rgba(0,0,0,.32),0 0 22px var(--glow)"
        sx="border-radius:16px;overflow:hidden;aspect-ratio:2/3;border:1px solid var(--border);position:relative;transition:transform .3s ease,box-shadow .3s ease;"
        style={{ background: bg }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ display: "grid", placeItems: "center", width: "76px", height: "76px", borderRadius: "50%", background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.14)", color: "#fff" }}><Icon name={c.icon} size={46} /></span>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "46%", background: "linear-gradient(to top,rgba(0,0,0,.78),transparent)" }} />
        <div style={{ position: "absolute", left: "14px", right: "14px", bottom: "12px", fontFamily: "'Poppins'", fontWeight: 700, fontSize: "15px", color: "#fff" }}>{c.title}</div>
      </Box>
    </div>
  );
}
