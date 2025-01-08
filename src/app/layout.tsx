import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AppProvider from "@/components/providers/app-provider";
import { Toaster } from "@/components/ui/toaster";
import React, { Suspense } from "react";
import { BrandName } from "@/lib/data";


const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: BrandName,
  description: "Baranie management, Myanmar, Beauty salon, Beauty parlor, Appointment, Booking, Service, Cms",
  icons: "/img/bera.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AppProvider>
          {/* <ToastProvider> */}
          <Suspense>{children}</Suspense>
          <Toaster />
          {/* </ToastProvider> */}
        </AppProvider>
      </body>
    </html>
  );
}
