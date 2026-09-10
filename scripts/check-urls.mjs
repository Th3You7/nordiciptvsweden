// Fails the build if any absolute URL in the output points at localhost.
//
// A canonical or hreflang tag naming localhost tells search engines the real
// address of every page is a machine they cannot reach, which can keep the
// whole site out of the index. This shipped to production once; this check
// exists so it cannot happen silently again.
//
// Run after `next build`, via: npm run verify
import { readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";

const DIST = process.env.CHECK_URLS_DIST || ".next";
const roots = [join(DIST, "server", "app")];
const BAD = /https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?/g;

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const name of entries) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(html|json|body|rsc)$/.test(name)) out.push(full);
  }
  return out;
}

const files = roots.flatMap((r) => walk(r));
if (!files.length) {
  console.error(`check:urls — no build output found under ${roots.join(", ")}. Run a build first.`);
  process.exit(1);
}

const hits = [];
for (const f of files) {
  const text = readFileSync(f, "utf8");
  const found = text.match(BAD);
  if (found) hits.push([f, [...new Set(found)]]);
}

if (hits.length) {
  console.error(`check:urls FAILED — localhost URLs found in ${hits.length} built file(s):\n`);
  for (const [f, urls] of hits.slice(0, 10)) console.error(`  ${f}\n    ${urls.join(", ")}`);
  if (hits.length > 10) console.error(`  …and ${hits.length - 10} more`);
  console.error(`\nSet NEXT_PUBLIC_SITE_URL to the production domain and rebuild.`);
  console.error(`It is inlined at BUILD time — a runtime-only env var has no effect.\n`);
  process.exit(1);
}

console.log(`check:urls OK — ${files.length} built files, no localhost URLs.`);
