import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

// Flat config (ESLint 9). This project is plain JavaScript, so unlike the
// Hungary site it does not pull in eslint-config-next/typescript.
const eslintConfig = defineConfig([
  // Build output and dependencies only. `legacy/` used to be ignored here; the
  // folder was deleted once it had been dead weight for months — it is in git
  // history if the original standalone template is ever needed again.
  globalIgnores([".next/**", ".next-verify/**", "out/**", "build/**", "node_modules/**"]),

  ...nextVitals,

  // Build-time Node scripts, not part of the Next app.
  {
    files: ["scripts/**/*.mjs"],
    languageOptions: {
      globals: {
        process: "readonly",
        console: "readonly",
        __dirname: "readonly",
      },
    },
  },
]);

export default eslintConfig;
