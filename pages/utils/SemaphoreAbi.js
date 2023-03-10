const SemaphoreAbi = [
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "contractAddress", type: "address" },
          { internalType: "uint8", name: "merkleTreeDepth", type: "uint8" },
        ],
        internalType: "struct ISemaphore.Verifier[]",
        name: "_verifiers",
        type: "tuple[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "groupId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "oldAdmin",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "GroupAdminUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "groupId",
        type: "uint256",
      },
      { indexed: false, internalType: "uint8", name: "depth", type: "uint8" },
      {
        indexed: false,
        internalType: "uint256",
        name: "zeroValue",
        type: "uint256",
      },
    ],
    name: "GroupCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "groupId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "identityCommitment",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "root",
        type: "uint256",
      },
    ],
    name: "MemberAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "groupId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "identityCommitment",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "root",
        type: "uint256",
      },
    ],
    name: "MemberRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "nullifierHash",
        type: "uint256",
      },
    ],
    name: "NullifierHashAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "groupId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "signal",
        type: "bytes32",
      },
    ],
    name: "ProofVerified",
    type: "event",
  },
  {
    inputs: [
      { internalType: "uint256", name: "groupId", type: "uint256" },
      { internalType: "uint256", name: "identityCommitment", type: "uint256" },
    ],
    name: "addMember",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "groupId", type: "uint256" },
      { internalType: "uint8", name: "depth", type: "uint8" },
      { internalType: "uint256", name: "zeroValue", type: "uint256" },
      { internalType: "address", name: "admin", type: "address" },
    ],
    name: "createGroup",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "groupId", type: "uint256" }],
    name: "getDepth",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "groupId", type: "uint256" }],
    name: "getNumberOfLeaves",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "groupId", type: "uint256" }],
    name: "getRoot",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "groupAdmins",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "groupId", type: "uint256" },
      { internalType: "uint256", name: "identityCommitment", type: "uint256" },
      { internalType: "uint256[]", name: "proofSiblings", type: "uint256[]" },
      { internalType: "uint8[]", name: "proofPathIndices", type: "uint8[]" },
    ],
    name: "removeMember",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "groupId", type: "uint256" },
      { internalType: "address", name: "newAdmin", type: "address" },
    ],
    name: "updateGroupAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    name: "verifiers",
    outputs: [
      { internalType: "contract IVerifier", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "groupId", type: "uint256" },
      { internalType: "bytes32", name: "signal", type: "bytes32" },
      { internalType: "uint256", name: "nullifierHash", type: "uint256" },
      { internalType: "uint256", name: "externalNullifier", type: "uint256" },
      { internalType: "uint256[8]", name: "proof", type: "uint256[8]" },
    ],
    name: "verifyProof",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

module.exports = SemaphoreAbi;
