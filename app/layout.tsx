import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Nebiyu Musbah Yesuf - Full-Stack & AI-Focused Software Engineer",
  description:
    "Versatile Software Engineer with 3+ years of experience specializing in AI agent integration, scalable microservices, and full-stack development. 900+ problems solved.",
  keywords:
    "full stack developer, AI engineer, competitive programming, microservices, React, Next.js, Python, Go, Ethiopia developer",
  authors: [{ name: "Nebiyu Musbah Yesuf" }],
  creator: "Nebiyu Musbah Yesuf",
  publisher: "Nebiyu Musbah Yesuf",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nebiyumusbah.dev",
    title: "Nebiyu Musbah Yesuf - Full-Stack & AI-Focused Software Engineer",
    description:
      "Versatile Software Engineer specializing in AI agents, microservices, and competitive programming with 900+ problems solved.",
    siteName: "Nebiyu Musbah Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nebiyu Musbah Yesuf - Full-Stack & AI-Focused Software Engineer",
    description:
      "Versatile Software Engineer specializing in AI agents, microservices, and competitive programming with 900+ problems solved.",
    creator: "@nebiyumusbah",
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
