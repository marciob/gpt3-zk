import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import styles from "../styles/Home.module.css";
import { v4 as uuidv4 } from "uuid";
import { ethers } from "ethers";
import { Identity } from "@semaphore-protocol/identity";
import { Group } from "@semaphore-protocol/group";
import SemaphoreAbi from "./utils/SemaphoreAbi";
import { MoonLoader } from "react-spinners";
import { Tooltip as ReactTooltip } from "react-tooltip";
const { generateProof } = require("@semaphore-protocol/proof");
const { verifyProof } = require("@semaphore-protocol/proof");
const { packToSolidityProof } = require("@semaphore-protocol/proof");

const Stats = () => {
  return (
    <div className={styles.container}>
      <div className="mt-10 mb-72">
        <Sidebar />

        <div className="bg-white p-4 lg:col-span-1 text-center w-1/3 mx-auto">
          <h1 className="text-2xl font-medium mb-5">Stats</h1>
          <p className="text-lg mb-5 ">
            We don't collect your data, help us to better understand our
            visitors.
          </p>
          <p>While maintaining your privacy.</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
