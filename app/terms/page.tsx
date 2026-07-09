import Client from "./Client"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",

  description:
    "Read the Terms and Conditions governing the use of Plastifusion Plastics website and services.",
};

export default function Page() {
  return <Client />;  
}