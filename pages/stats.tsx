import React, { useState, useEffect, useContext } from "react";
import Sidebar from "./components/Sidebar";
import styles from "../styles/Home.module.css";
import { ethers } from "ethers";
import WalletContext from "./components/WalletContext";

const Stats = () => {
  const context = useContext(WalletContext);

  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  const handleConnectWallet = async () => {
    if (context.isConnected) {
      // Disconnect the wallet
      context.setIsConnected(false);
      // Remove the wallet connection from local storage
      localStorage.removeItem("walletConnection");
    } else if (context.provider) {
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
      <div className="mt-10 mb-72">
        <Sidebar />
        <div className="flex justify-end mr-10">
          <div>
            <button
              className={`bg-gray-800 text-white text-center py-2 px-4 rounded-lg hover:bg-gray-600 mb-10 block${
                context.isConnected ? " hover:cursor-pointer" : ""
              }`}
              onClick={handleConnectWallet}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {context.isConnected ? (
                <span className="text-white hover:text-red-500">
                  {hover ? "Disconnect" : "Connected"}
                </span>
              ) : (
                "Connect Wallet"
              )}
            </button>
          </div>
        </div>
        <div className="bg-white p-4 lg:col-span-1 text-center w-1/3 mx-auto">
          <h1 className="text-2xl font-medium mb-5">Stats</h1>
          <p className="text-lg mb-5 ">
            We don't collect your data, help us to better understand our users.
          </p>
          <p>While maintaining your privacy.</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
