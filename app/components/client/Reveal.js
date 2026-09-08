"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Client island rendered once in the layout. It observes every [data-reveal]
// element on the current route and reveals it on scroll, so the sections
// themselves stay server components. Elements are visible by default without
// JS — globals.css only hides them under .has-js.
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!nodes.length) return;

    const show = (el) => el.classList.add("is-visible");

    if (typeof IntersectionObserver !== "function") {
      nodes.forEach(show);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -30px 0px" }
    );

    nodes.forEach((el) => {
      if (el.classList.contains("is-visible")) return;
      // Anything already in view on load is shown immediately.
      if (el.getBoundingClientRect().top < window.innerHeight) show(el);
      else io.observe(el);
    });

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
