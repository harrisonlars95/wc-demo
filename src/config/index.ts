import { cookieStorage, createStorage } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { CaipNetwork } from "@reown/appkit";

// Get projectId from https://cloud.reown.com
export const projectId = "96b234f19a04030ad1147d99a3605035";

if (!projectId) {
  throw new Error("Project ID is not defined");
}
export const match: CaipNetwork = {
  id: "eip155:698",
  chainNamespace: "eip155",
  chainId: 698,
  name: "Match",
  currency: "MAT",
  explorerUrl: "https://matchscan.io",
  rpcUrl: "https://rpc.matchain.io",
};

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  projectId,
  networks: [match],
});

export const config = wagmiAdapter.wagmiConfig;
