"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { ConnectKitProvider } from "connectkit";
import { abstractTestnet, abstract } from "viem/chains";
import { abstractWalletConnector } from "@abstract-foundation/agw-react/connectors";

export default function AbstractWalletWrapper({ children }) {
  const wagmiConfig = createConfig({
    connectors: [abstractWalletConnector()],
    chains: [abstract],
    transports: {
      [abstract.id]: http(),
    },
    ssr: true,
  });
  const queryClient = new QueryClient();
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
