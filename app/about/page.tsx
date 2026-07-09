import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "About Us",

  description:
    "Learn about Plastifusion Plastics, our journey, manufacturing expertise, quality standards and commitment to delivering precision plastic solutions.",

  keywords: [
    "About Plastifusion Plastics",
    "Plastic Manufacturing Company",
    "Injection Moulding Experts",
  ],
};

export default function Page() {
  return <Client />;
}