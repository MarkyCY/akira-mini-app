import type { Metadata } from "next";
import dynamic from "next/dynamic";
import "./globals.css";
import NavBarButtons from "@/components/Home/nav-buttons";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/components/theme-provider";
import AuthenticatedComponent from "@/contexts/AuthenticatedComponent";

const TelegramInitializer = dynamic(
  () => import("@/components/tg/Initializer"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Otaku Senpai",
  description: "La app de los Otakus de Cuba",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-black h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <TelegramInitializer />
            <div className="pt-4 px-4 pb-20" id="app">
              <AuthenticatedComponent>{children}</AuthenticatedComponent>
            </div>
            <NavBarButtons />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
