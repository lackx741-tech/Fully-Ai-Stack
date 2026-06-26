import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fully AI Stack",
  description: "AI-native Ethereum engineering dashboard"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
