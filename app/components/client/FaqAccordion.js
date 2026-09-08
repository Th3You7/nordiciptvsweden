"use client";

import { useState } from "react";
import { Icon } from "../ui";

// Client island: only the open/closed state. Every answer is rendered into the
// markup and collapsed with [hidden] rather than removed, so all 22 answers are
// in the prerendered HTML for crawlers and available without JavaScript.
export function FaqAccordion({ items, big }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="au-faq-list" data-reveal="1">
      {items.map((q, i) => (
        <div key={q.q} className={`au-faq${big ? " au-faq-big" : ""}`}>
          <button
            type="button"
            className="au-faq-q"
            aria-expanded={open === i}
            onClick={() => setOpen((cur) => (cur === i ? -1 : i))}
          >
            {q.q}
            <span className="au-faq-chev">
              <Icon name="chevron" size={20} />
            </span>
          </button>
          <div className="au-faq-a" hidden={open !== i}>
            {q.a}
          </div>
        </div>
      ))}
    </div>
  );
}
