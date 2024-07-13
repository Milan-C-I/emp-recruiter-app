// "use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Session from "./SessionProvider";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
      <header className="emp-header">
        <div className="logo">logo</div>
        <div className="header-name">
          <span>Emp-Recruiter</span>
        </div>
      </header>
      <Session session={session}>
        {children}
      </Session>
        </body>
    </html>
  );
}
