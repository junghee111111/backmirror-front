import type { Metadata } from "next";
import Header from "./ui/common/header";
import "@fontsource-variable/noto-sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "BackMirror",
  description: "Mirrors your Backend API super easily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
