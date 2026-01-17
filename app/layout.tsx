import "./globals.css";
import type { Metadata } from "next";
import {Bangers,Inter } from "next/font/google";

import Header from "@/components/Header";
import { Toaster } from "sonner";



const bangers = Bangers({
  subsets: ["latin"],
  weight: [ "400"],
  variable: "--font-bangers",

});



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
   
      <body className={`${inter.className} ${bangers.variable} antialiased `} >
      

     <Header /> 
        {children}
       <Toaster />
   
      </body>
    </html>
  );
}
