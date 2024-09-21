"use client";

import { wagmiAdapter, projectId, match } from "@/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import React, { type ReactNode } from "react";
import { WagmiProvider } from "wagmi";

// Set up queryClient
const queryClient = new QueryClient();

if (!projectId) {
  throw new Error("Project ID is not defined");
}

// Set up metadata
const metadata = {
  name: "appkit-example-scroll",
  description: "AppKit Example - Scroll",
  url: "http://wc.gosheepstudio.com/", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// Create the modal
export const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [match],
  defaultNetwork: match,
  metadata: metadata,
  includeWalletIds: ["38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662"],
  featuredWalletIds: ["38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662"],
  features: {
    socials: false,
    email: false,
    swaps: false,
    onramp: false,
    allWallets: false,
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

function ContextProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default ContextProvider;
