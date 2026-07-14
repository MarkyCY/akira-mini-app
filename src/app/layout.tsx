import type { Metadata } from "next";
// @ts-ignore
import "./globals.css";

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
      <body className="bg-background text-foreground h-screen">
        {children}
      </body>
    </html>
  );
}
