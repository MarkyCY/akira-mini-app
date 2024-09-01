import type { Metadata, Viewport } from "next";
 
import { Inter } from "next/font/google";
import "./globals.css";
import ClientComponent from "./client-component";
import NavBarButtons from "./nav-buttons";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Otaku Senpai",
  description: "La app de los Otakus de Cuba",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientComponent />
        {children}
        <NavBarButtons />
      </body>
    </html>
  );
}
