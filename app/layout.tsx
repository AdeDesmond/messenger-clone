import type { Metadata } from "next";
import "./globals.css";
import localfont from "next/font/local";
import { auth } from "@/auth";
import { AuthProvider } from "@/context/auth-context";
const mainFont = localfont({
  src: "../public/font/noto.ttf",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={mainFont.className}>{children}</body>
      </html>
    </AuthProvider>
  );
}
