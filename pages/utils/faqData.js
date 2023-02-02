const faqData_semaphore = [
  {
    question: "What is Semaphore?",
    answer:
      "Semaphore is a privacy-preserving protocol that enables secure, anonymous voting on the blockchain. It provides a secure and confidential way for users to signal their intent, while keeping their identity hidden and preserving their privacy.",
  },
  {
    question:
      "What are zero-knowledge proofs and how are they used in Semaphore?",
    answer:
      "Zero-knowledge proofs are cryptographic proofs that allow a user to prove the validity of a statement without revealing the underlying data. In Semaphore, zero-knowledge proofs are used to securely and privately cast a signal, such as a vote or endorsement, without revealing the user's identity. This provides a simple mechanism for ensuring that a signal is only cast once and preserving the privacy of the user.",
  },
  {
    question: "What are the components of the Semaphore protocol?",
    answer:
      "The Semaphore protocol consists of three main components: a circuit, contracts, and verifiers. The circuit is the heart of the protocol and performs the calculation and verification of the proof of membership, nullifier hash, and signal. The contracts provide the functions to create and manage groups, while the verifiers verify the Semaphore proofs.",
  },
  {
    question: "What are the base contracts in Semaphore?",
    answer:
      "Semaphore provides two base contracts: SemaphoreCore.sol and SemaphoreGroups.sol. SemaphoreCore.sol contains the functions to verify Semaphore proofs, while SemaphoreGroups.sol contains the functions to create and manage groups.",
  },
  {
    question: "What are the extension contracts in Semaphore?",
    answer:
      "Semaphore provides two extension contracts: SemaphoreVoting.sol and SemaphoreWhistleblowing.sol. SemaphoreVoting.sol provides the essential functions for creating and conducting polls, while SemaphoreWhistleblowing.sol provides the essential functions for creating entities and allowing whistleblowers to anonymously publish leaks.",
  },
];

export const faqData_unirep = [
  {
    question: "What is Unirep?",
    answer:
      "UniRep stands for Universal Reputation, it's a protocol to allow people to provide reputation across multiple communities using interoperable smart contracts while preserving user privacy through zero-knowledge proofs.",
  },
  {
    question:
      "What are zero-knowledge proofs and how are they used in Semaphore?",
    answer:
      "Zero-knowledge proofs are cryptographic proofs that allow a user to prove the validity of a statement without revealing the underlying data. In Semaphore, zero-knowledge proofs are used to securely and privately cast a signal, such as a vote or endorsement, without revealing the user's identity. This provides a simple mechanism for ensuring that a signal is only cast once and preserving the privacy of the user.",
  },
  {
    question: "What are the components of the Semaphore protocol?",
    answer:
      "The Semaphore protocol consists of three main components: a circuit, contracts, and verifiers. The circuit is the heart of the protocol and performs the calculation and verification of the proof of membership, nullifier hash, and signal. The contracts provide the functions to create and manage groups, while the verifiers verify the Semaphore proofs.",
  },
  {
    question: "What are the base contracts in Semaphore?",
    answer:
      "Semaphore provides two base contracts: SemaphoreCore.sol and SemaphoreGroups.sol. SemaphoreCore.sol contains the functions to verify Semaphore proofs, while SemaphoreGroups.sol contains the functions to create and manage groups.",
  },
  {
    question: "What are the extension contracts in Semaphore?",
    answer:
      "Semaphore provides two extension contracts: SemaphoreVoting.sol and SemaphoreWhistleblowing.sol. SemaphoreVoting.sol provides the essential functions for creating and conducting polls, while SemaphoreWhistleblowing.sol provides the essential functions for creating entities and allowing whistleblowers to anonymously publish leaks.",
  },
];

export default faqData_semaphore;
