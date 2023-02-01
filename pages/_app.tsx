import "../styles/globals.css";
import type { AppProps } from "next/app";
import "react-tooltip/dist/react-tooltip.css";
import { useState, createContext } from "react";
import WalletContext from "./components/WalletContext";

export default function App({ Component, pageProps }: AppProps) {
  const [provider, setProvider] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  return (
    <WalletContext.Provider
      value={{ provider, setProvider, isConnected, setIsConnected }}
    >
      <Component {...pageProps} />
    </WalletContext.Provider>
  );
}
