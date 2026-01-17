import "./globals.css";
import type { Metadata } from "next";
import {Inter } from "next/font/google";

import Header from "@/components/Header";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";






const inter = Inter({
  subsets: ["latin"],
  weight: [ "400","500","600","700","800"],

  
});

export const metadata: Metadata = {
  title: "Sonit",
  description: "Explore Menu · Delivering Happiness · Fastest Growing Brand of the Year · Made with fresh, local ingredients and love.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
   
      <body className={`${inter.className}  antialiased `} >
      


     <Header /> 
        {children}
          <Toaster />
        <Footer />    

      </body>
    </html>
  );
}
