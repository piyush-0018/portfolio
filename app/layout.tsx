import type { Metadata } from "next";
import "./globals.css";
import OpeningIntro from "./components/opening-intro";

export const metadata: Metadata = {
  title: "Piyush Mandal — Full-stack & AI Development",
  description:
    "Computer Science undergraduate working with React, Python, FastAPI and LLM APIs. Explore Piyush Mandal’s projects, experience and background.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <OpeningIntro />
        {children}
      </body>
    </html>
  );
}
