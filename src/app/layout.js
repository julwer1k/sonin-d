import './globals.css'
import localFont from 'next/font/local';
import { Manrope, Inter, Poppins } from 'next/font/google';

export const manropeFont = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});
export const interFont = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});
export const poppinsFont = Poppins({
  subsets: ['latin'],
  weight: ['800'],
  variable: '--font-poppins',
  display: 'swap',
});
export const drukFont = localFont({
  src: [
    { path: '../../fonts/DrukWide-Medium-Trial.otf', weight: '500', style: 'normal' },
    { path: '../../fonts/DrukWide-Bold-Trial.otf', weight: '700', style: 'normal' },
  ],
  variable: '--font-druk',
  display: 'swap',
});
export const eUkraineFont = localFont({
  src: [
    { path: '../../fonts/e-Ukraine-Light.otf', weight: '300', style: 'normal' },
    { path: '../../fonts/e-Ukraine-Regular.otf', weight: '400', style: 'normal' },
    { path: '../../fonts/e-Ukraine-Medium.otf', weight: '500', style: 'normal' },
    { path: '../../fonts/e-Ukraine-Bold.otf', weight: '700', style: 'normal' },
  ],
  variable: '--font-eukraine',
  display: 'swap',
})

export const metadata = {
  title: 'Dasha Happy Birthday',
  description: '',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${manropeFont.variable} ${drukFont.variable} ${interFont.variable}  ${poppinsFont.variable} ${eUkraineFont.variable} scroll-smooth`}
    >
      <body>
        {children}
      </body>
    </html>
  );
}
