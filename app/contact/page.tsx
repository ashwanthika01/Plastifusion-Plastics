import Client from "./Client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",

  description:
    "Contact Plastifusion Plastics for plastic injection moulding solutions, project inquiries and manufacturing partnerships.",

  keywords: [
    "Contact Plastifusion Plastics",
    "Plastic Manufacturer Contact",
    "Injection Moulding Inquiry",
  ],
};

export default function Page() {
  return <Client />;
}