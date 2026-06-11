import Footer from "@/components/Footer/Footer";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import { DM_Sans } from "next/font/google";
import ChatBot from "@/components/chatbot/Chatbot";
const dmSans = DM_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <ChatBot />
        <Footer />
      </body>
    </html>
  );
}