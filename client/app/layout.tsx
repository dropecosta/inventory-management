import type { Metadata } from "next";
import { Inter } from "next/font/google";
import DashboardWrapper from "@/app/dashboardWrapper";
import StoreProvider from "@/app/redux";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Appstock",
  description: "Inventory management dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-full flex flex-col antialiased`}>
        <StoreProvider>
          <DashboardWrapper>{children}</DashboardWrapper>
        </StoreProvider>
      </body>
    </html>
  );
}
