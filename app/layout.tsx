import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";
import { Pathname } from "./pathname";

const barlow = Barlow({
  weight: ["500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Feedback Mixer",
  description: "Feedback Mixer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${barlow.className}`}>
        <div>{children}</div>
      </body>
    </html>
  );
}
