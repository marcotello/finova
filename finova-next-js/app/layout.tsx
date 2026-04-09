import type { Metadata, Viewport } from "next";
import { Inter, Fira_Code } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Finova - Personal Finance Platform",
  description: "High-performance personal finance platform for managing your money in MXN and USD",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#4339F2" },
    { media: "(prefers-color-scheme: dark)", color: "#5B4CF5" },
  ],
  width: "device-width",
  initialScale: 1,
};

const _inter = Inter({ subsets: ["latin"] });
const _firaCode = Fira_Code({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-sans" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
