import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

export const metadata: Metadata = {
  title: {
    template: "%s - Aaroham Treasure woman clothing store",
    default: "Aaroham Treasure woman clothing store",
  },
  description: "Aaroham Treasure woman clothing store, Your one stop shop for all your needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProviderWrapper>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </SessionProviderWrapper>
  );
}
