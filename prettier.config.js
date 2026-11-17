/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "<TYPES>",
    "",
    "<TYPES>^[@~]/(?!$).*$",
    "",
    "^[@~]/.*$",
    "",
    "^[./]",
  ],
  experimentalTernaries: true,
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  tailwindStylesheet: "./src/styles/globals.css",
};

export default config;
