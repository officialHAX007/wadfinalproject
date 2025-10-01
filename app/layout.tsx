
import './globals.css'
import Nav from '@/components/Nav'

export const metadata = {
  title: 'Digital Illustrations MarketPlace',
  description: 'Artists showcase portfolios, buyers browse and purchase digital artworks.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main className="container my-6">
          {children}
        </main>
        <footer className="border-t py-6 text-center text-sm text-gray-500">
          © Digital Illustrations MarketPlace
        </footer>
      </body>
    </html>
  )
}
