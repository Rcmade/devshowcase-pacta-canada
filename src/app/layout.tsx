import Navbar from "@/components/navbar/Navbar";
import AddEditProjectDialog from "@/features/project/components/dialog/AddEditProjectDialog";
import Provider from "@/providers/Provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevShowcase - Share Your Projects",
  description:
    "A platform for developers to showcase their projects and get feedback from the community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <div className="min-h-screen">
            <Navbar />
            <main>{children}</main>

            <AddEditProjectDialog />
          </div>
        </Provider>
      </body>
    </html>
  );
}
