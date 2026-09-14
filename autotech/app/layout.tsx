import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider } from "./contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AutoTech - Mecânica, Funilaria e Diagnóstico",
  description:
    "Dicas, tutoriais e ferramentas para cuidar do seu carro com segurança.",
  verification: {
    google: "JGTBz0Q25olmwGq1mocPS0OO5XMBGrtLMhunmHwdUfs",
  },
  };

  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="pt-BR">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <AuthProvider>
            <Header />
            {children}
            <Footer />
          </AuthProvider>
        </body>
      </html>
    );
}