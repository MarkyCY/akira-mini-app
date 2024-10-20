import type { Metadata, Viewport } from "next";

import "./globals.css";
import NavBarButtons from "@/components/Home/nav-buttons";
import { AuthProvider } from "@/contexts/AuthContext";
import AuthenticatedComponent from "@/contexts/AuthenticatedComponent";

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
    <html className="dark" lang="en">
      <body className="bg-white dark:bg-black">
        <div className='pt-4 pb-20' id="app">
          <AuthProvider>
            <AuthenticatedComponent>
              {children}
            </AuthenticatedComponent>
          </AuthProvider>
        </div>
        <NavBarButtons />
      </body>
    </html>
  );
}
