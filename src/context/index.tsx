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
    "971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709", // okx
    "20459438007b75f4f4acb98bf29aa3b800550309646d375da5fd4aac6c2a2c66", // TP
  ],
  includeWalletIds: [
    "38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662", // bgw
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96", // metamask
    "971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709", // okx
    "20459438007b75f4f4acb98bf29aa3b800550309646d375da5fd4aac6c2a2c66", // TP
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
