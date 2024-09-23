"use client";
import { modal } from "@/context";
import { useAppKit, useAppKitEvents } from "@reown/appkit/react";
import { parseEther } from "viem";
import { useAccount, useSendTransaction, useSignMessage, useSwitchChain } from "wagmi";

if (typeof window !== "undefined") {
  // 劫持 window.open ，如果是打开的是 bitkeep 协议则直接用 miniapp 的app 打开
  (window as any).open = new Proxy((window as any).open, {
    apply(target, ctx, args) {
      if (args[0].match(/^bitkeep:\/\//)) {
        const uri = args[0].replace(/bitkeep:\/\//, "https://bkcode.vip/");
        (window as any).Telegram!.WebApp.openLink(uri, {
          try_browser: true,
        });
      } else {
        return target(...args);
      }
    },
  });
}

export default function Home() {
  const { open, close } = useAppKit();
  const { address, isConnecting, isDisconnected } = useAccount();
  const { signMessage, data } = useSignMessage();

  const { sendTransaction, data: hash } = useSendTransaction();

  const handleOpenModal = async () => {
    open();


    // 浏览器劫持之后就不需要监听 display_uri 事件
    // const res = await modal.universalAdapter?.getWalletConnectProvider();

    // // 只有监听到连接钱包的 deeplink 才需要用 openLink 打开
    // res?.events.on("display_uri", (uri) => {
    //   (window as any).Telegram!.WebApp.openLink(`https://bkcode.vip/wc?uri=${encodeURIComponent(uri)}`, {
    //     try_browser: true,
    //   });
    // });
  };

  return (
    <div className="p-1 flex flex-col text-wrap break-words">
      <p>Tst: openLink2</p>
      <button onClick={handleOpenModal}>Connect Bitget</button>
      <p>address: {address}</p>

      <button
        onClick={() => {
          signMessage({ message: "hello world" });

          // signMessage 和 sendTx 会通过 wss 和钱包传输数据，所以需要用 tg sdk 手动跳转到 BGW
          // 仍需要手动触发
          (window as any).Telegram!.WebApp.openLink(`https://bkcode.vip`, {
            try_browser: true,
          });
        }}
      >
        Sign message
      </button>
      <p>result: {data}</p>

      <button
        onClick={() => {
          sendTransaction({
            to: "0xd2135CfB216b74109775236E36d4b433F1DF507B",
            value: parseEther("0.01"),
          });
          (window as any).Telegram!.WebApp.openLink(`https://bkcode.vip`, {
            try_browser: true,
          });
        }}
      >
        Send Transaction(transfer MAT)
      </button>
      <p>result: {hash}</p>
    </div>
  );
}
