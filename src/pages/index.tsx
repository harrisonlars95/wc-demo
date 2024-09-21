"use client";
import { Core } from "@walletconnect/core";
import { useAppKit } from "@reown/appkit/react";
import { useAccount, useSignMessage } from "wagmi";
import { modal } from "@/context";
import { match } from "@/config";

export default function Home() {
  const { open, close } = useAppKit();
  const { address, isConnecting, isDisconnected } = useAccount();
  const { signMessage, data } = useSignMessage();

  const handleOpenModal = () => {
    open();
  };

  return (
    <div className="p-1 flex flex-col text-wrap break-words">
      <button onClick={handleOpenModal}>Connection Bitget</button>
      <p>address: {address}</p>
      <button onClick={() => modal.switchNetwork(match)}>Change Network</button>
      <button onClick={() => signMessage({ message: "hello world" })}>Sign message</button>
      <p>result: {data}</p>
    </div>
  );
}
