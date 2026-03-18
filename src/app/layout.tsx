import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/layouts/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'חברותא-קונקט - חיבור לומדי תורה',
  description: 'פלטפורמה חברתית-לימודית לחיבור בין לומדי תורה ברחבי העולם',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${inter.className} min-h-screen bg-background text-text font-sans`}>
        <div className="min-h-screen">
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
