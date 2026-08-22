import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Barab - Restaurant & Fast Food",
  description: "Barab - Restaurant & Fast Food Template",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
