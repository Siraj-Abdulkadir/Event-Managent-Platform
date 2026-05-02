"use client";

import dynamic from "next/dynamic";

const ChakraProviderNoSSR = dynamic(
  () => import("@chakra-ui/react").then((mod) => mod.ChakraProvider),
  { ssr: false }
);

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ChakraProviderNoSSR>{children}</ChakraProviderNoSSR>;
}