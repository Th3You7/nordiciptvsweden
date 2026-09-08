// Fails if the locale catalogs drift apart structurally.
//
// The catalogs carry non-translatable fields alongside copy (icon names, asset
// paths, prices). A price edited in en.json but not sv.json would silently show
// Swedish visitors a different number, so every key path and array length must
// match across locales. Run with: npm run check:i18n
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const locales = ["en", "sv"];

const load = (l) =>
  JSON.parse(readFileSync(join(root, "app/i18n/messages", `${l}.json`), "utf8"));

function shape(node, path = "", acc = []) {
  if (Array.isArray(node)) {
    acc.push(`${path}[] length=${node.length}`);
    node.forEach((v, i) => shape(v, `${path}[${i}]`, acc));
  } else if (node && typeof node === "object") {
    for (const k of Object.keys(node).sort()) shape(node[k], `${path}.${k}`, acc);
  } else {
    acc.push(`${path} :: ${typeof node}`);
  }
  return acc;
}

const [base, ...rest] = locales;
const baseShape = shape(load(base));
let failed = false;

for (const locale of rest) {
  const other = shape(load(locale));
  const max = Math.max(baseShape.length, other.length);
  for (let i = 0; i < max; i++) {
    if (baseShape[i] !== other[i]) {
      if (!failed) console.error("i18n catalogs are out of sync:\n");
      failed = true;
      console.error(`  ${base}: ${baseShape[i] ?? "(missing)"}`);
      console.error(`  ${locale}: ${other[i] ?? "(missing)"}\n`);
      break;
    }
  }
}

if (failed) process.exit(1);
console.log(`i18n OK — ${locales.join(", ")} catalogs match (${baseShape.length} keys).`);
