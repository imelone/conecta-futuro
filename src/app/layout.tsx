"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/app_components/sidenavNew/sidenav";
import { SidebarProvider } from "@/context/sidebar_context";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="layout"
        style={{
          display: "flex",
          height: "100vh",
          flexDirection: "row", // Ensure horizontal layout
        }}
      >
        <div className="layout">
          <Sidebar />
          <div className="content">
            {children} {/* This will render the current page content */}
          </div>
        </div>
      </body>
    </html>
  );
}
