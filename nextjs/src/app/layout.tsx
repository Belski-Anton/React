import type { Metadata } from 'next'
import { Special_Elite } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Providers } from '../../store/provider'

const elite = Special_Elite({ weight: ["400"], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Criminal Databases',
  description: 'Criminal Databases',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={elite.className}>
        <Header />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  )
}
