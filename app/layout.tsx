import './globals.css'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Nav from '@/components/Nav'
import Provider from '@/components/Provider'

const inter = Inter({ subsets: ['latin'] })

// Dynamic Metadata, like make title name of product or product id
export const metadata: Metadata = {
  title: 'Promptopia',
  description: 'Discover and share AI prompts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body /*className={inter.className}*/>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
