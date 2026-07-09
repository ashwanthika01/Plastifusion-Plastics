import Footer from "@/components/Footer/Footer";
// @ts-ignore
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import { DM_Sans } from "next/font/google";
import ChatBot from "@/components/chatbot/Chatbot";
import { Metadata } from "next";
import Schema from "@/components/Schema";
import Script from "next/script";
const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://plastifusionplastics.com"),

  title: {
    default: "Plastifusion Plastics",
    template: "%s | Plastifusion Plastics",
  },
  verification:{
    google: "DIYEOM7tifq2fQswBcxboSYFipzmEhvaWWpUGS5jBrQ"
   },
   

  description:
    "Leading manufacturer of precision plastic injection moulded components for industrial and engineering applications.",

  keywords: [
    "Plastic Injection Moulding",
    "Injection Moulding Manufacturer",
    "Plastic Components",
    "Engineering Plastics",
    "Industrial Plastic Parts",
    "Custom Plastic Components",
    "Plastic Manufacturing India",
  ],
   
  openGraph: {
  title: "Plastifusion Plastics",

  description:
    "Precision plastic injection moulding solutions.",
  type: "website",
  images: [
    {
      url: "/og-image.png",
      width: 1200,
      height: 630,
    },
  ],
},

  robots: {
    index: true,
    follow: true,
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Schema />
      </head>
      <Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
  strategy="afterInteractive"
/>

<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-NRS24R3X57');
  `}
</Script>
      <body>
        <Navbar />
        {children}
        <ChatBot />
        <Footer />
        
      </body>
    </html>
  );
}