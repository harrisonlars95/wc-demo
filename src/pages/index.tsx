"use client";
import { useAppKit } from "@reown/appkit/react";
import { parseEther } from "viem";
import { useAccount, useSendTransaction, useSignMessage, useSwitchChain } from "wagmi";

export default function Home() {
  const { open, close } = useAppKit();
  const { address, isConnecting, isDisconnected } = useAccount();
  const { signMessage, data } = useSignMessage();

  const { sendTransaction, data: hash } = useSendTransaction();

  const handleOpenModal = () => {
    open();
  };

  return (
    <div className="p-1 flex flex-col text-wrap break-words">
      <button onClick={handleOpenModal}>Connect Bitget</button>
      <p>address: {address}</p>

      <button onClick={() => signMessage({ message: "hello world" })}>Sign message</button>
      <p>result: {data}</p>

      <button
        onClick={() =>
          sendTransaction({
            to: "0xd2135CfB216b74109775236E36d4b433F1DF507B",
            value: parseEther("0.01"),
          })
        }
      >
        Send Transaction(transfer MAT)
      </button>
      <p>result: {hash}</p>
    </div>
  );
}
