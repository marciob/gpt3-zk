import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import styles from "../styles/Home.module.css";
import { v4 as uuidv4 } from "uuid";
import { ethers } from "ethers";
import { Identity } from "@semaphore-protocol/identity";
import { Group } from "@semaphore-protocol/group";
import SemaphoreAbi from "./utils/SemaphoreAbi";
const { generateProof } = require("@semaphore-protocol/proof");
const { verifyProof } = require("@semaphore-protocol/proof");
const { packToSolidityProof } = require("@semaphore-protocol/proof");

const FineTune = () => {
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), prompt: "", completion: "" },
  ]);
  const [submittedInputs, setSubmittedInputs] = useState([]);

  const [provider, setProvider] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const [identity, setIdentity] = useState("");
  const [trapdoor, setTrapdoor] = useState("");
  const [nullifier, setNullifier] = useState("");
  const [identityCommitment, setIdentityCommitment] = useState("");

  const [group1, setGroup1] = useState("");
  const [group2, setGroup2] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const signal = "good";

  const handleGoodButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleBadButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // const semaphoreContractAddress = "0x5259d32659F1806ccAfcE593ED5a89eBAb85262f"
  const semaphoreContractAddress = "0x99aAb52e60f40AAC0BFE53e003De847bBDbC9611";

  //prompt and completion submits
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("InputFields", inputFields);
    setSubmittedInputs([...submittedInputs, ...inputFields]);
    const newInputFields = inputFields.map((field) => {
      return {
        ...field,
        prompt: "",
        completion: "",
      };
    });
    setInputFields(newInputFields.reverse());
  };

  //helper for prompt and completion submits
  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setInputFields(newInputFields);
  };

  //adds more prompt and completion inputs fields until limit of 3
  const handleAddFields = (e) => {
    e.preventDefault();
    if (inputFields.length >= 3) {
      // return without adding a new field
      return;
    }
    setInputFields([
      ...inputFields,
      { id: uuidv4(), prompt: "", completion: "" },
    ]);
  };

  //remove prompt and completion input fields
  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };

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
        console.log("Account connected: ", await signer.getAddress());
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install Metamask to connect to your wallet.");
    }
  };

  const handleCreateId = () => {
    console.log("createId clicked");

    const newIdentity = new Identity();
    const newTrapdoor = newIdentity.getTrapdoor();
    const newNullifier = newIdentity.getNullifier();
    const newIdentityCommitment = newIdentity.getCommitment();

    console.log("newIdentity: ", newIdentity);
    console.log("newTrapdoor: ", newTrapdoor);
    console.log("newNullifier: ", newNullifier);
    console.log("newIdentityCommitment: ", newIdentityCommitment);

    setIdentity(newIdentity);
    setTrapdoor(newTrapdoor);
    setNullifier(newNullifier);
    setIdentityCommitment(newIdentityCommitment);
  };

  const handleCreateGroupOffchain = async () => {
    console.log("CreateGroupOffchain clicked");

    const group = await new Group(20);
    console.log("group root: ", group.root);

    //adding member to group
    group.addMember(identityCommitment);

    setGroup1(group);

    console.log("group1 root: ", group.root);
  };

  const handleCreateGroupOnchain = async () => {
    console.log("handleCreateGroupOnchain clicked");

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();

      const semaphoreContract = new ethers.Contract(
        semaphoreContractAddress,
        SemaphoreAbi,
        signer
      );
      await semaphoreContract.createGroup(
        21,
        20,
        0,
        "0x95a548A77f41d64f5F0d6905f8F9CD3aeFe972A9"
      );
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const generateProofOffchain = async () => {
    console.log("generateProofOffchain clicked: ");
    try {
      const id = new Identity();
      const group = await new Group(20);

      console.log("start group: ", group.root);

      //adding member to group
      group.addMember(id.getCommitment());

      const externalNullifier = group.root;

      console.log("identity: ", id);
      console.log("group: ", group);
      console.log("externalNullifier: ", externalNullifier);
      console.log("signal: ", signal);

      const fullProof = await generateProof(
        id,
        group,
        externalNullifier,
        "10",
        {
          zkeyFilePath: "./semaphore.zkey",
          wasmFilePath: "./semaphore.wasm",
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      setProvider(window.ethereum);
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className="mt-10">
        <Sidebar />

        {/* Connecton Button */}
        <div className="flex justify-end mr-10">
          <button
            className="bg-blue-500 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-600 mb-10 block"
            onClick={handleConnectWallet}
          >
            {isConnected ? "Connected" : "Connect Wallet"}
          </button>
        </div>

        <div className="flex justify-center ">
          <button
            className="bg-gray-500 text-white text-center py-2 px-4 rounded-lg hover:bg-gray-600 mb-10 block"
            onClick={handleCreateId}
          >
            CreateId off-chain
          </button>
        </div>
        <div className="flex justify-center ">
          <button
            className="bg-gray-500 text-white text-center py-2 px-4 rounded-lg hover:bg-gray-600 mb-10 block"
            onClick={handleCreateGroupOffchain}
          >
            CreateGroup off-chain
          </button>
        </div>
        <div className="flex justify-center ">
          <button
            className="bg-gray-500 text-white text-center py-2 px-4 rounded-lg hover:bg-gray-600 mb-10 block"
            onClick={handleCreateGroupOnchain}
          >
            CreateGroup on-chain
          </button>
        </div>
        <div className="flex justify-center ">
          <button
            className="bg-gray-500 text-white text-center py-2 px-4 rounded-lg hover:bg-gray-600 mb-10 block"
            onClick={generateProofOffchain}
          >
            GenerateProof off-chain
          </button>
        </div>
        <div className="bg-white p-4 lg:col-span-1 text-center">
          <h1 className="text-2xl font-medium">Fine-Tune</h1>
          <p className="text-lg mb-5">
            Improve the fine-tune model by providing additional prompts and
            expected completions.
          </p>
          <form onSubmit={handleSubmit} className="mx-auto w-1/4">
            {inputFields.map((inputField) => (
              <div key={inputField.id} className="flex items-center mb-3">
                <input
                  className="border-2 border-gray-300 bg-white p-2 rounded-lg mr-4"
                  name="prompt"
                  placeholder="Prompt"
                  value={inputField.prompt}
                  onChange={(event) => handleChangeInput(inputField.id, event)}
                />
                <input
                  className="border-2 border-gray-300 bg-white p-2 rounded-lg mr-4"
                  name="completion"
                  placeholder="Completion"
                  value={inputField.completion}
                  onChange={(event) => handleChangeInput(inputField.id, event)}
                />
                <button
                  className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                  disabled={inputFields.length === 1}
                  onClick={() => handleRemoveFields(inputField.id)}
                >
                  -
                </button>
              </div>
            ))}
            {inputFields.length >= 3 ? (
              <div
                className="bg-gray-100 border-t border-b border-gray-200 text-gray-700 px-4 py-3 mb-3"
                role="alert"
              >
                <p className="text-sm">
                  You can send up to 3 prompts and completions at once.
                </p>
              </div>
            ) : null}
            <button
              className={` text-white font-bold py-2 px-4 rounded mr-4 ${
                inputFields.length >= 3
                  ? "bg-gray-200 hover:bg-gray-200"
                  : "bg-gray-400 hover:bg-gray-600"
              }`}
              onClick={handleAddFields}
              disabled={inputFields.length >= 3}
            >
              +
            </button>
            <button
              className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded ml-4"
              type="submit"
            >
              Send
            </button>
          </form>
          <div className="my-5">
            {/* Render the stored inputs */}
            {submittedInputs.map((input) => (
              <div
                key={input.id}
                className="bg-white p-4 rounded-lg shadow-md my-4 flex"
              >
                <div className="w-3/4">
                  <h2 className="text-lg font-medium mb-2">Prompt:</h2>
                  <p className="text-gray-700">{input.prompt}</p>
                  <h2 className="text-lg font-medium my-4">Completion:</h2>
                  <p className="text-gray-700">{input.completion}</p>
                </div>
                <div className="w-1/4 justify-around">
                  <button
                    className="bg-green-500 text-white py-1 px-2 rounded-lg h-10"
                    onClick={handleGoodButtonClick}
                  >
                    Good
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded-lg h-10 ml-2"
                    onClick={handleBadButtonClick}
                  >
                    Bad
                  </button>
                </div>
                {/* Modal */}
                {isModalOpen && (
                  <div className="fixed top-0 left-0 h-full w-full bg-gray-800 bg-opacity-75">
                    <div className="relative mx-auto my-16 max-w-lg">
                      <div className="bg-white rounded-lg p-8">
                        <div className="text-center font-medium text-xl mb-4">
                          Voting
                        </div>

                        <div className="absolute top-0 right-0 m-4">
                          <button
                            className="bg-red-500 text-white text-center py-2 px-4 rounded-lg hover:bg-red-600"
                            onClick={handleModalClose}
                          >
                            X
                          </button>
                        </div>
                        <div className="flex justify-center">
                          <button
                            className="bg-blue-500 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-600 mb-10 block"
                            onClick={generateProofOffchain}
                          >
                            Generate proof
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FineTune;
