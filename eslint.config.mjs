import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

// Flat config (ESLint 9). This project is plain JavaScript, so unlike the
// Hungary site it does not pull in eslint-config-next/typescript.
const eslintConfig = defineConfig([
  // `legacy/` is the original standalone template, kept only for reference and
  // never built or served. It is not ours to lint.
  globalIgnores([".next/**", "out/**", "build/**", "node_modules/**", "legacy/**"]),

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
