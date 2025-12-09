import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// 1. Import the Navbar
import Navbar from "./components/SiteNavbar"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Internship Portal",
  description: "Find your next tech internship",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 2. Place Navbar above the children */}
        <Navbar /> 
        
        {/* This is where your page.tsx content renders */}
        {children} 
      </body>
    </html>
  );
}