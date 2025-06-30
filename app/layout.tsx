import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "RoyaltyFlow - Music Publishing Administration",
  description:
    "Collect 100% of your publishing royalties worldwide. Professional music publishing administration for songwriters and composers.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-mono antialiased">{children}</body>
    </html>
  )
}
