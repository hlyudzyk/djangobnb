import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar/Navbar";
import Modal from "@/app/components/modals/Modal";
import LoginModal from "@/app/components/modals/LoginModal";
import SignupModal from "@/app/components/modals/SignupModal";
import AddPropertyModal from "@/app/components/modals/AddPropertyModal";
import SearchModal from "@/app/components/modals/SearchModal";
import Footer from "@/app/components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Properties",
  description: "App to book hotels & apartments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        <div className="pt-32">
          {children}

        </div>

      <LoginModal/>
      <SignupModal/>
      <SearchModal/>
      <AddPropertyModal/>
      <Footer/>
      </body>
    </html>
  );
}
