/**
 * Site configuration – customize this file for your project.
 *
 * This is the single source for:
 * - Site name, description, and SEO (metadata, Open Graph, Twitter)
 * - Canonical URL (use NEXT_PUBLIC_SITE_URL in .env for different environments)
 * - Author/creator and links (GitHub, social, repo)
 * - robots.txt and sitemap.xml
 *
 * After forking: update name, description, url, authors, links, twitter, ogImage, and keywords.
 */

const baseUrl =
  (
    typeof process.env.NEXT_PUBLIC_SITE_URL === "string" &&
    process.env.NEXT_PUBLIC_SITE_URL.length > 0
  ) ?
    process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
  : "https://nextjs-template.khushalagarwal.tech";

export const siteConfig = {
  /** Site name (used in metadata, OG, title template) */
  name: "Next.js Starter Template",
  /** Short name (PWA manifest, app name) */
  shortName: "Next.js Template",
  /** Site description (meta description, OG, Twitter) */
  description:
    "A minimal Next.js 16 starter with TypeScript, Tailwind CSS v4, ESLint 9, Prettier, and Husky. Production-ready template to jumpstart your next project.",
  /** Canonical base URL (no trailing slash). Override with NEXT_PUBLIC_SITE_URL. */
  url: baseUrl,
  /** Contact / team email */
  email: { team: "starkhush5@gmail.com" },

  /** Authors (metadata, JSON-LD). Update for your project. */
  authors: [
    { name: "Khushal Agarwal", url: "https://portfolio.khushalagarwal.tech" },
  ],

  /** Creator and publisher (metadata) */
  creator: "Khushal Agarwal",
  publisher: "Khushal Agarwal",

  /** SEO keywords */
  keywords: [
    "nextjs",
    "next.js 16",
    "react",
    "typescript",
    "tailwind css",
    "tailwind v4",
    "eslint",
    "prettier",
    "husky",
    "starter template",
    "boilerplate",
  ],

  /** Social and project links. repo = this project’s repo; templateRepo = “use this template” / create-next-app URL. */
  links: {
    instagram: "https://www.instagram.com/starkhush/",
    github: "https://github.com/Khushal-ag",
    /** Main repo (e.g. your app after fork) */
    repo: "https://github.com/Khushal-ag/nextjs-template",
    /** Template repo URL for “clone / use this template” (create-next-app). Change if you publish your own template. */
    templateRepo: "https://github.com/Khushal-ag/nextjs-template",
    /** Footer link label (e.g. "username@github") */
    githubDisplay: "Khushal-ag@github",
  },

  /** Twitter card handle and site */
  twitter: {
    handle: "@starkhush",
    site: "@starkhush",
  },

  /** OG image URL (absolute). Default: {url}/og.png */
  ogImage: `${baseUrl}/og.png`,

  /** robots.txt: index and follow */
  robots: {
    index: true,
    follow: true,
  },
};

export type SiteConfig = typeof siteConfig;
