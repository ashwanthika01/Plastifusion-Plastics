import Client from "./Client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manufacturing Infrastructure",

  description:
    "Discover Plastifusion Plastics' advanced manufacturing infrastructure, modern machinery, quality control systems and production capabilities.",

  keywords: [
    "Plastic Manufacturing Infrastructure",
    "Injection Moulding Machines",
    "Plastic Factory India",
    "Production Facility",
  ],
};

export default function Page() {
  return <Client />;
}