import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Algorithm Visualizer",
  description: "A visualizer for algorithms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-100`}
      >
        <header className="bg-blue-500 p-4 text-center text-white">
          <h1 className="text-3xl font-bold">Algorithm Visualizer</h1>
        </header>
        <main className="container mx-auto p-5">
          {children}
        </main>
      </body>
    </html>
  );
}
