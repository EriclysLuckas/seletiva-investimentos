"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Adicione esta linha
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const pathname = usePathname(); // Adicione esta linha

  // Função para saber se está ativo
  const isClientes = pathname.startsWith("/clientes");
  const isAtivos = pathname.startsWith("/ativos");

  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground min-h-screen">
        <QueryClientProvider client={queryClient}>
          <header className="w-full border-b border-border bg-background text-foreground px-4 py-4">
            <nav className="flex justify-center gap-6">
              <Link
                href="/clientes"
                className={`relative after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[1.5px] after:bg-primary after:transition-all after:duration-500 after:-translate-x-1/2 hover:after:w-full ${
                  isClientes ? "after:w-full font-bold text-primary" : "after:w-0"
                }`}
              >
                Clientes
              </Link>
              <Link
                href="/ativos"
                className={`relative after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[1.5px] after:bg-primary after:transition-all after:duration-500 after:-translate-x-1/2 hover:after:w-full ${
                  isAtivos ? "after:w-full font-bold text-primary" : "after:w-0"
                }`}
              >
                Ativos
              </Link>
            </nav>
          </header>
          <main className="max-w-4xl mx-auto py-8">{children}</main>
        </QueryClientProvider>
      </body>
    </html>
  );
}