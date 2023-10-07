import Navbar from "@/components/layout/nav-bar";
import NextAuthProvider from "@/context/nextauth-provider";
import { getServerSession } from "next-auth";
import { ThemeProvider } from "@/context/theme-provider";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { siteConfig } from "@/lib/site";
import { Inter } from "next/font/google";
import { authOptions } from "@/server/auth";
import Footer from "@/components/layout/footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  ...siteConfig,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <NextAuthProvider session={session}>
          <TooltipProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Navbar />
              <main className="container">{children}</main>
              <Footer />
              <Toaster />
            </ThemeProvider>
          </TooltipProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
