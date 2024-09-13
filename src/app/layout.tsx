import type { Metadata, Viewport } from "next";

import "./globals.css";
import ClientComponent from "@/components/Home/client-component";
import NavBarButtons from "@/components/Home/nav-buttons";


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
      <body className="bg-white dark:bg-black">
        <ClientComponent />
        <div id="app">
            {children}
        </div>
        <NavBarButtons />
      </body>
    </html>
  );
}
