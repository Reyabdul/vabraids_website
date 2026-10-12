import { Cormorant, Jost } from "next/font/google";
import { QueryProvider } from "@/lib/query/provider";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { siteMetadataQuery } from "@/sanity/lib/queries";
import "./globals.css";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

// Used until the "SEO & Sharing" fields are filled in on Site Settings in Studio.
const DEFAULT_TITLE = "VA Braids — Braiding, elevated.";
const DEFAULT_DESCRIPTION =
  "Protective styling in Toronto. Braids, twists, and ponytails — booked through The Re-Up Hub.";

export async function generateMetadata() {
  // If Sanity can't be reached, fall back to the defaults rather than
  // failing the whole page over its <head>.
  const settings = await client.fetch(siteMetadataQuery).catch(() => null);
  const title = settings?.seoTitle || DEFAULT_TITLE;
  const description = settings?.seoDescription || DEFAULT_DESCRIPTION;
  const images = settings?.shareImage?.asset
    ? [{ url: urlFor(settings.shareImage).width(1200).height(630).fit("crop").url(), width: 1200, height: 630 }]
    : undefined;

  return {
    title,
    description,
    openGraph: { title, description, images },
    twitter: { card: images ? "summary_large_image" : "summary", title, description, images },
  };
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
