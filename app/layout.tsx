import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import { Toaster } from "sonner";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProHealth Admin Dashboard",
  description: "Manage your medical center with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-slate-50 text-slate-900`}>
        <Providers>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-slate-50">
              <div className="p-8">
                {children}
              </div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
