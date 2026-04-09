import React from "react"
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin", "cyrillic"],
  variable: '--font-inter'
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk'
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin", "cyrillic"],
  variable: '--font-jetbrains'
});

export const metadata: Metadata = {
  title: 'NovaCode — IT-рішення для вашого бізнесу',
  description: 'NovaCode — сучасна IT-компанія. Розробка ПЗ, хмарні рішення, AI-інтеграції, DevOps та кібербезпека. Ми створюємо технологічне майбутнє.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uk">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
