import { ThirdwebProvider, coinbaseWallet, metamaskWallet, okxWallet, walletConnect } from "@thirdweb-dev/react";
import { Base } from "@thirdweb-dev/chains";
import Head from "next/head";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      activeChain={Base}
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
      supportedWallets={[
        coinbaseWallet({ recommended: true }),
        okxWallet(),
        metamaskWallet(),
        walletConnect(), // <-- WalletConnect resmi aktif di sini bro!
      ]}
    >
      <Head>
        <meta name="google" content="notranslate" />
      </Head>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
          }
        
