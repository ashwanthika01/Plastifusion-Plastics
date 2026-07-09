import Client from "./Client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plastic Injection Moulding Solutions",

  description:
    "Explore our plastic injection moulding solutions, custom manufacturing capabilities, precision moulding services and engineered plastic products.",

  keywords: [
    "Plastic Solutions",
    "Custom Plastic Components",
    "Injection Moulding Services",
    "Engineering Plastic Products",
  ],
};

export default function Page() {
  return <Client />;
}