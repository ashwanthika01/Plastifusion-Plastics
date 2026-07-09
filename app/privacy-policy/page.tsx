import Client from "./Client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",

  description:
    "Read the Privacy Policy of Plastifusion Plastics regarding collection, usage and protection of user information.",
};

export default function page(){
  return <Client />;  
}