import './globals.css'
import Background from '../components/Background'
import Footer from '../components/Footer'
import { Header } from '../components/ui'

export const metadata = {
  title: { default: 'Al-Rimal Energy', template: '%s | Al-Rimal Energy' },
  description: 'Al-Rimal Energy explores, refines and ships the oil and petrochemicals that power industry across three continents.',
}
export const viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#05080A' }

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <noscript><style>{'.rv{opacity:1!important;transform:none!important}'}</style></noscript>
        <Background />
        <Header />
        <main id="app" tabIndex={-1}>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
