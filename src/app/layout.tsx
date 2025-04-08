import type { Metadata, Viewport } from "next";

import "@/styles/globals.css";

import { TailwindIndicator } from "@/components/tailwind-indicator";
import { siteConfig } from "@/config/site";
import * as fonts from "@/lib/fonts";
import { cn } from "@/lib/utils";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          ...Object.values(fonts).map((font) => font.variable),
          "min-h-dvh scroll-smooth font-inter antialiased",
        )}
      >
        {children}
        <TailwindIndicator />
      </body>
    </html>
  );
}

export const viewport: Viewport = {
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const metadata: Metadata = {
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    site: siteConfig.links.instagram,
  },
  icons: {
    icon: [{ rel: "icon", url: "/favicon.ico" }],
    apple: [{ url: "/favicon.ico" }],
  },
  manifest: "/site.webmanifest",
};
