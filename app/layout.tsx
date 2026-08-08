import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SessionProvider } from "next-auth/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: { default: "TujiSa Store", template: "%s | TujiSa Store" },
  description: "Shop quality products from TujiSa Store with secure online checkout.",
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
