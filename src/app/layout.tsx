import type { Metadata } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"
import "./globals.css"
import SmoothScroll from "@/components/SmoothScroll"
import ParticleBackground from "@/components/ParticleBackground"
import CursorGlow from "@/components/CursorGlow"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Jimmi & Maureen | Introduction Ceremony",
  description:
    "You're invited to the Introduction Ceremony of Jimmi & Maureen on August 8th, 2026. Join us for a celebration of love, family, and new beginnings.",
  keywords: [
    "introduction ceremony",
    "maureen",
    "jimmi",
    "wedding",
    "celebration",
    "august 2026",
  ],
  authors: [{ name: "Jimmi & Maureen" }],
  openGraph: {
    title: "Jimmi & Maureen | Introduction Ceremony",
    description:
      "You're invited to the Introduction Ceremony of Jimmi & Maureen on August 8th, 2026.",
    type: "website",
    locale: "en_US",
    siteName: "Jimmi & Maureen",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jimmi & Maureen | Introduction Ceremony",
    description:
      "You're invited to the Introduction Ceremony of Jimmi & Maureen on August 8th, 2026.",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <body className="min-h-screen antialiased noise-bg" suppressHydrationWarning>
        <CursorGlow />
        <ParticleBackground />
        <SmoothScroll>
          <div className="fixed top-6 left-6 z-50">
            <span className="font-heading text-sm text-gold/30 tracking-widest font-light">
              M ♥ J
            </span>
          </div>
          <main className="relative z-10">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  )
}
