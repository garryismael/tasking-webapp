import ToastProvider from "@/components/ToastProvider";
import type { Metadata } from "next";
import "react-toastify/dist/ReactToastify.css";
import NextUIWrapper from "./NextUIWrapper";
import "./globals.css";
import ReduxProvider from "@/components/ReduxProvider";

export const metadata: Metadata = {
  title: "Task App",
  description: "Generated by GoDigital",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <NextUIWrapper>
            <ToastProvider>
              <main className="container mx-auto h-screen flex items-center justify-center">
                {children}
              </main>
            </ToastProvider>
          </NextUIWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
