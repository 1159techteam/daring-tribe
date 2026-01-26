import type React from "react"
import type { Metadata } from "next"
import { Cinzel, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
})
const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  title: "Daring Tribe | Learn. Earn. Win. | Powered by 1159 Realty",
  description:
    "Join the fearless movement. Partner with 1159 Realty to dominate the real estate market, close bold deals, and build lasting wealth. For the young and daring.",
  keywords: [
    "real estate",
    "realtors",
    "1159 realty",
    "sales community",
    "wealth building",
    "daring tribe",
    "nigeria real estate",
    "property investment",
    "real estate training",
  ],
  authors: [{ name: "1159 Realty" }],
  creator: "1159 Realty",
  publisher: "1159 Realty",
  metadataBase: new URL("https://daringtribe.1159realty.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Daring Tribe | Learn. Earn. Win. | Powered by 1159 Realty",
    description:
      "Join the fearless movement. Partner with 1159 Realty to dominate the real estate market, close bold deals, and build lasting wealth.",
    url: "https://daringtribe.1159realty.com",
    siteName: "Daring Tribe",
    images: [
      {
        url: "/luxury-modern-real-estate-office-space.jpg",
        width: 1200,
        height: 630,
        alt: "Daring Tribe - Real Estate Community",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daring Tribe | Learn. Earn. Win.",
    description:
      "Join the fearless movement of realtors building lasting wealth with 1159 Realty.",
    images: ["/luxury-modern-real-estate-office-space.jpg"],
  },
  icons: {
    icon: [
      {
        url: "/log.png",
      }
    ],
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Daring Tribe by 1159 Realty",
    description:
      "A fearless movement for Realtors who dare to dominate the market and build lasting wealth through real estate.",
    url: "https://daringtribe.1159realty.com",
    logo: "https://daringtribe.1159realty.com/log.png",
    sameAs: [
      "https://www.instagram.com/1159_realty",
      "https://www.facebook.com/1159realty",
      "https://www.linkedin.com/company/1159realty/",
      "https://youtube.com/@1159realty",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+234-806-174-7003",
      contactType: "customer service",
      email: "info@1159realty.com",
      areaServed: ["NG"],
      availableLanguage: ["English"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "No. 23, Offa Road, Opposite Kwara State Registry",
      addressLocality: "Ilorin",
      addressRegion: "Kwara State",
      addressCountry: "NG",
    },
  }

  return (
    <html lang="en">
      <body className={`${poppins.variable} ${cinzel.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
