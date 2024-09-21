"use client";

import { wagmiAdapter, projectId, match, metadata } from "@/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import React, { type ReactNode } from "react";
import { WagmiProvider } from "wagmi";

// Set up queryClient
const queryClient = new QueryClient();

if (!projectId) {
  throw new Error("Project ID is not defined");
}

// Create the modal
export const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [match],
  defaultNetwork: match,
  metadata: metadata,
  featuredWalletIds: [
    // 默认展示的钱包
    "38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662", // bgw
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96", // metamask
    "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0", // trustwallet
  ],
  includeWalletIds: [
    "38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662", // bgw
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96", // metamask
    "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0", // trustwallet
  ],
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


// bitkeep://wc?uri=wc%3Aeb612afa5b7294d6647653a9b69e321d992b818c3b3cff4f4e6529a6a71c4272%402%3FexpiryTimestamp%3D1726922719%26relay-protocol%3Dirn%26symKey%3Dce6c3846e19f9badb09f7f30a9ddcdd974ab84250070a0695ecd6d75e6d62c39