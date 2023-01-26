import React, { useState } from "react";
import { ethers } from "ethers";

function withWallet(WrappedComponent) {
  return function (props) {
    const [isConnected, setIsConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState("");
    const [walletSigner, setWalletSigner] = useState();

    const handleConnectWallet = async () => {
      if (provider) {
        try {
          setIsConnected(true);

          const provider = new ethers.providers.Web3Provider(
            window.ethereum,
            "any"
          );
          // Prompt user for account connections
          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          setWalletAddress(await signer.getAddress());
          setWalletSigner(signer);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("Please install Metamask to connect to your wallet.");
      }
    };

    return (
      <>
        {!isConnected && (
          <button
            className="bg-gray-800 text-white text-center py-2 px-4 rounded-lg hover:bg-gray-600 mb-10 block"
            onClick={handleConnectWallet}
          >
            Connect Wallet
          </button>
        )}
        <WrappedComponent
          {...props}
          isConnected={isConnected}
          walletAddress={walletAddress}
          walletSigner={walletSigner}
        />
      </>
    );
  };
}
