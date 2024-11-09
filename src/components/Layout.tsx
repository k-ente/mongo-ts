// src/components/Layout.tsx
import { ReactNode } from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'
import { CookieConsent } from './CookieConsent'

interface LayoutProps {
  children: ReactNode
  title?: string
}

export default function Layout({ children, title = 'Community Marketplace' }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <CookieConsent />
      <Footer />
    </>
  )
}

