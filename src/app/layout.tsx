import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Temporary Utopia — Performance brand studio",
  description: "Conversion-first marketing site for Temporary Utopia. Landing systems, creative sprints, and media ops.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
