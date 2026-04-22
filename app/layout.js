import './globals.css'

export const metadata = {
  title: 'Whale Tracker Dashboard',
  description: 'Dashboard Deteksi Konsentrasi Saham HSC KSEI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
