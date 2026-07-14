export default function CaptchaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      {children}
    </div>
  );
}
