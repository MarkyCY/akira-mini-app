import dynamic from "next/dynamic";
import NavBarButtons from "@/components/Home/nav-buttons";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const TelegramInitializer = dynamic(
  () => import("@/components/tg/Initializer"),
);

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) {
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <TelegramInitializer />
        <div className="pt-4 px-4 pb-20" id="app">
          {children}
        </div>
        <NavBarButtons />
      </SessionProvider>
    </ThemeProvider>
  );
}
