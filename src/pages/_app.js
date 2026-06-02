import { ThirdwebProvider, coinbaseWallet, metamaskWallet, okxWallet } from "@thirdweb-dev/react";
import { Base } from "@thirdweb-dev/chains";

export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      activeChain={Base}
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
      supportedWallets={[
        coinbaseWallet({ recommended: true }),
        okxWallet(),
        metamaskWallet(),
      ]}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

