import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Hukuk Asistanım - Yapay Zeka Destekli Hukuki Yardım Platformu",
  description: "Türk hukuku için yapay zeka destekli dilekçe oluşturma, risk analizi ve tüketici hakem heyeti başvuru platformu",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} antialiased`}>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
