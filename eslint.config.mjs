import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "worker/**",
    // Built files published as they are: the report's page under public/blog/, and any worktree
    // checked out inside the repo.
    "public/blog/*/assets/**",
    ".claude/**",
  ]),
]);

export default eslintConfig;
