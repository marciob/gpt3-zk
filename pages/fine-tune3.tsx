// page only for testing

import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import styles from "../styles/Home.module.css";
import { ethers } from "ethers";
import { Tooltip as ReactTooltip } from "react-tooltip";
import WalletContext from "./components/WalletContext";

const FineTune = () => {
  const context = useContext(WalletContext);

  const handleConnectWallet = async () => {
    if (context.provider) {
      try {
        context.setIsConnected(true);
        // Store the wallet connection in local storage
        localStorage.setItem("walletConnection", "true");

        const provider = new ethers.providers.Web3Provider(
          window.ethereum,
          "any"
        );
        // Prompt user for account connections
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        console.log("Account connected: ", await signer.getAddress());
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install Metamask to connect to your wallet.");
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      context.setProvider(window.ethereum);
    }
  }, []);

  useEffect(() => {
    // Check if the wallet connection is stored in local storage
    const walletConnection = localStorage.getItem("walletConnection");
    if (walletConnection) {
      context.setIsConnected(true);
    }
  }, []);

  return (
    <div className={styles.container}>
      <ReactTooltip anchorId="my-element" />

      <div className="mt-10 mb-72">
        <Sidebar />

        {/* Connecton Button */}
        <div className="flex justify-end mr-10">
          <button
            id="my-element"
            data-tooltip-content={
              isIdCreated
                ? `Your Semaphore ID has been created.`
                : "A Semaphore ID prevents double voting and preserves your privacy."
            }
            data-width={100}
            data-multiline={true}
            className="bg-gray-800 text-white text-center py-2 px-4 rounded-lg hover:bg-gray-600 mb-10 block mr-4"
            onClick={CreateIdAndOffchainGroup}
          >
            {isIdCreated ? "ID Created" : "Create ID"}
          </button>

          <button
            className="bg-gray-800 text-white text-center py-2 px-4 rounded-lg hover:bg-gray-600 mb-10 block"
            onClick={handleConnectWallet}
          >
            {context.isConnected ? "Connected" : "Connect Wallet"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FineTune;
