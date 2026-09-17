import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Joselson Dias Portfolio',
  description: 'Digital Portfolio of Joselson Dias',
  icons: {
    icon: '/icon.svg'
  },
  openGraph: {
    title: 'Joselson Dias Portfolio',
    description: 'Digital Portfolio of Joselson Dias',
    type: 'website',
    images: ['/joselson-focus.webp']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Joselson Dias Portfolio',
    description: 'Digital Portfolio of Joselson Dias',
    images: ['/joselson-focus.webp']
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className='min-h-full flex flex-col'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
