
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Session from "./SessionProvider";
import { getServerSession } from "next-auth";
import Image from "next/image";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "emp-recruiter-app",
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
        <div className="logo">
          <Image
            src="/logo.svg"
            alt="Emp-Recruiter"
            width={95}
            height={90}
          />
        </div>
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
