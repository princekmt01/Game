import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Math Sprint",
  description: "A fast-paced mental math game. Answer as many questions as you can in 60 seconds.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${geistMono.variable} antialiased`}>
        <div className="bg-mesh" />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <main className="mx-auto min-h-[calc(100vh-4rem)] max-w-5xl px-4 py-8 sm:px-6">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
