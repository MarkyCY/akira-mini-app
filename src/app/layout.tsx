import type { Metadata } from "next";
import dynamic from "next/dynamic";
import "./globals.css";
import NavBarButtons from "@/components/Home/nav-buttons";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/components/theme-provider";
import AuthenticatedComponent from "@/contexts/AuthenticatedComponent";

import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react"
import { redirect } from "next/navigation";

const TelegramInitializer = dynamic(
  () => import("@/components/tg/Initializer"),
  // { ssr: false }
);

export const metadata: Metadata = {
  title: "Otaku Senpai",
  description: "La app de los Otakus de Cuba",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();
  if (!session) {
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <AuthProvider> */}
          <SessionProvider>
            <TelegramInitializer />
            <div className="pt-4 px-4 pb-20" id="app">
              {/* <AuthenticatedComponent>{children}</AuthenticatedComponent> */}
              {children}
            </div>
            <NavBarButtons />
          </SessionProvider>
          {/* </AuthProvider> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
