import {
  Cabin,
  Inter,
  Kablammo,
  Open_Sans,
  Poppins,
  Raleway,
  Red_Rose
} from "next/font/google";

/* -----------------------------------------------------------------------------------------------
 * google fonts
 * -----------------------------------------------------------------------------------------------*/

export const cabin = Cabin({
  variable: "--font-cabin",
  subsets: ["latin"],
  display: "swap"
});

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap"
});

export const kablammo = Kablammo({
  variable: "--font-kablammo",
  subsets: ["latin"],
  display: "swap"
});

export const opensans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap"
});

export const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap"
});

export const redrose = Red_Rose({
  variable: "--font-red-rose",
  subsets: ["latin"],
  display: "swap"
});
