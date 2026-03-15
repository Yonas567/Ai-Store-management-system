"use client";
import { ThemeContextProvider } from "@/utils/ThemeContext";
import QueryProvider from "@/utils/QueryProvider";
import "./global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="emotion-insertion-point" content="" />
      </head>
      <body suppressHydrationWarning>
        <QueryProvider>
          <ThemeContextProvider>{children}</ThemeContextProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
