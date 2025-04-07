import { Inter, JetBrains_Mono, Poppins } from "next/font/google";

/* -----------------------------------------------------------------------------------------------
 * google fonts
 * -----------------------------------------------------------------------------------------------*/

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});
