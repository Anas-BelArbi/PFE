const Web3 = require('web3');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const web3 = new Web3('http://127.0.0.1:7545'); // Assuming Ganache is running on this address
const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0MjMyNmNmMi00NjAzLTQzNjMtYTgzNi01YjYyYzM2NDU3MjYiLCJlbWFpbCI6Im1vdWhhbWVkYW5hcy5iZWxhcmJpQGVzcHJpdC50biIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIyYmQ5YWNjNTZjNTgwZTdkZjcwMyIsInNjb3BlZEtleVNlY3JldCI6ImU5ZjJkNWQ4M2NjM2I4OTg4ZTg3Nzg5MjY3YzY4ODAyOGUxNzAxZmVkNGUwNGQ5OGVkNDAwNTVjZmRiNTEyMjciLCJpYXQiOjE3MTYxNTE4Njl9.Qyj8Pf4E4KZvUbjLvn8GmJP5ihYGnhGzW8DDdhaBi6c'; // Replace with your actual Pinata JWT
// ABI and address of your third contract
const certificateListingABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_certificateReceiverAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "certificateCIDs",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "certificateReceiverAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCertificateTypeCounts",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "solar",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "wind",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "hydro",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "geothermal",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "biomass",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCertificatesByCapacity",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "ProjectAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "CertificateUniqueID",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "certificateData",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "certificateType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "TrackingSystemID",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "RenewableFuelType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "RenewableFacilityLocation",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "NameplateCapacityOfProject",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ProjectName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "EmissionsRateOfRenewableResource",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "stateA",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "stateR",
						"type": "bool"
					}
				],
				"internalType": "struct RenewableEnergyCertificates.Certificate[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCertificatesByEmissionsRate",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "ProjectAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "CertificateUniqueID",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "certificateData",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "certificateType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "TrackingSystemID",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "RenewableFuelType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "RenewableFacilityLocation",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "NameplateCapacityOfProject",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ProjectName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "EmissionsRateOfRenewableResource",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "stateA",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "stateR",
						"type": "bool"
					}
				],
				"internalType": "struct RenewableEnergyCertificates.Certificate[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getProjectsByCertificateCount",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "projectID",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "projectName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "vision",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "domain",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "verif",
						"type": "bool"
					},
					{
						"internalType": "string",
						"name": "latitude",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "longitude",
						"type": "string"
					}
				],
				"internalType": "struct RenewableEnergyCertificates.Project[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getStoredCIDs",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getStoredVerifiedCertificates",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "ProjectAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "CertificateUniqueID",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "certificateData",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "certificateType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "TrackingSystemID",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "RenewableFuelType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "RenewableFacilityLocation",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "NameplateCapacityOfProject",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ProjectName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "EmissionsRateOfRenewableResource",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "stateA",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "stateR",
						"type": "bool"
					}
				],
				"internalType": "struct RenewableEnergyCertificates.Certificate[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string[]",
				"name": "cids",
				"type": "string[]"
			}
		],
		"name": "storeCIDs",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "updateVerifiedCertificates",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "verifiedCertificates",
		"outputs": [
			{
				"internalType": "address",
				"name": "ProjectAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "CertificateUniqueID",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "certificateData",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "certificateType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "TrackingSystemID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "RenewableFuelType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "RenewableFacilityLocation",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "NameplateCapacityOfProject",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ProjectName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "EmissionsRateOfRenewableResource",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "stateA",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "stateR",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const certificateListingAddress = '0x5E3D8184F3E679d0b81Dc12a11e1F655DAE79D23';

// ABI and address of the MyToken contract
const myTokenABI =[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "burnedTokensOfOwner",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "uri",
						"type": "string"
					},
					{
						"internalType": "bytes32",
						"name": "transactionHash",
						"type": "bytes32"
					},
					{
						"internalType": "address",
						"name": "burnedBy",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "burnedAt",
						"type": "uint256"
					}
				],
				"internalType": "struct MyToken.BurnedTokenInfo[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTopMinters",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "uri",
				"type": "string"
			}
		],
		"name": "safeMint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "_data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "tokensOfOwner",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
const myTokenAddress = '0xA430ffA4f4472c4a49CA2D94484e6227cACa18f6'; // Replace with your MyToken contract address

// Create contract instances
const certificateListingContract = new web3.eth.Contract(certificateListingABI, certificateListingAddress);
const myTokenContract = new web3.eth.Contract(myTokenABI, myTokenAddress);

const imagePath = process.argv[2];

// Function to get the certificates from the contract
async function getCertificates() {
    try {
        const certificates = await certificateListingContract.methods.getStoredVerifiedCertificates().call();
        return certificates;
    } catch (error) {
        console.error('Error fetching certificates:', error);
        return [];
    }
}

// // Function to upload a file to Pinata and return the CID
// async function uploadFileToPinata(filePath, fileName) {
//     try {
//         const formData = new FormData();
//         const fileStream = fs.createReadStream(filePath);
//         formData.append('file', fileStream, fileName);

//         const pinataMetadata = JSON.stringify({ name: fileName });
//         formData.append('pinataMetadata', pinataMetadata);

//         const pinataOptions = JSON.stringify({ cidVersion: 1 });
//         formData.append('pinataOptions', pinataOptions);

//         const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
//             headers: {
//                 Authorization: `Bearer ${JWT}`,
//                 ...formData.getHeaders(),
//             },
//         });

//         return res.data.IpfsHash;
//     } catch (error) {
//         console.error(`Error uploading ${fileName} to Pinata:`, error);
//         return null;
//     }
// }
async function uploadFileToPinata(filePath, fileName) {
    try {
        const formData = new FormData();
        formData.append('file', fs.createReadStream(filePath), fileName);

        const pinataMetadata = JSON.stringify({ name: fileName });
        formData.append('pinataMetadata', pinataMetadata);

        const pinataOptions = JSON.stringify({ cidVersion: 1 });
        formData.append('pinataOptions', pinataOptions);

        const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
            headers: {
                Authorization: `Bearer ${JWT}`,
                ...formData.getHeaders(),
            },
        });
        return response.data.IpfsHash;
    } catch (error) {
        console.error(`Error uploading ${fileName} to Pinata:`, error);
        return null;
    }
}
// Function to upload certificate data to Pinata and return the metadata CID 
async function uploadCertificateToPinata(certificate, imageCid, index) {
    try {
        const metadata = {
            name: `Renewable Energy Certificate ID ${certificate.CertificateUniqueID}`,
            description: `
      <p>Embark on a journey to a sustainable future with this Renewable Energy Certificate. 
      Created for the esteemed project: ${certificate.ProjectName}, with a unique Certificate ID: ${certificate.CertificateUniqueID}. 
      This certificate was issued on ${certificate.certificateData} by ${certificate.ProjectAddress}, affirming its authenticity.</p>
      
      <p><strong>Certificate Details:</strong><br/>
      - <strong>Type:</strong> ${certificate.certificateType}<br/>
      - <strong>Tracking System ID:</strong> ${certificate.TrackingSystemID}<br/>
      - <strong>Renewable Fuel Type:</strong> ${certificate.RenewableFuelType}<br/>
      - <strong>Facility Location:</strong> ${certificate.RenewableFacilityLocation}<br/>
      - <strong>Nameplate Capacity:</strong> ${certificate.NameplateCapacityOfProject}<br/>
      - <strong>Emissions Rate:</strong> ${certificate.EmissionsRateOfRenewableResource}</p>
      
      <p>Verification Status: ${certificate.stateA ? "Verified" : "Not Verified"}.</p>
      
      <p>Celebrate the power of renewable energy with this certificate, a testament to clean and sustainable energy efforts.</p>`,
            image: `ipfs://${imageCid}`,
            attributes: certificate,
        };

        const tempFilePath = path.join(__dirname, `certificate_metadata_${index}.json`);
        fs.writeFileSync(tempFilePath, JSON.stringify(metadata, null, 2));

        const metadataCid = await uploadFileToPinata(tempFilePath, `certificate_metadata_${index}.json`);

        // Clean up temporary file
        fs.unlinkSync(tempFilePath);

        return metadataCid;
    } catch (error) {
        console.error(`Error uploading certificate ${index} metadata to Pinata:`, error);
        return null;
    }
}

// Function to check if a token exists
async function tokenExists(tokenId) {
    try {
        const owner = await myTokenContract.methods.ownerOf(tokenId).call();
        return !!owner;
    } catch (error) {
        return false; // If there's an error, it means the token does not exist
    }
}

async function main() {
    const certificates = await getCertificates();

    if (certificates.length === 0) {
        console.log('No certificates found.');
        return;
    }

    const imageCid = await uploadFileToPinata(imagePath, path.basename(imagePath));

    if (!imageCid) {
        console.log('Failed to upload image.');
        return;
    }

    const metadataCids = [];
    const addressMetadataMap = {};
    const certificateIdMap = {}; // To keep track of the CertificateUniqueID for each address
    for (let i = 0; i < certificates.length; i++) {
        const metadataCid = await uploadCertificateToPinata(certificates[i], imageCid, i);
        if (metadataCid) {
            metadataCids.push(metadataCid);
            addressMetadataMap[certificates[i].ProjectAddress] = metadataCid;
            certificateIdMap[certificates[i].ProjectAddress] = certificates[i].CertificateUniqueID;
        }
    }

    console.log('All Metadata CIDs:');
    console.log(metadataCids);

    console.log('Address to Metadata CID map:');
    console.log(addressMetadataMap);

    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0];

    for (const address in addressMetadataMap) {
        if (addressMetadataMap.hasOwnProperty(address)) {
            const metadataCid = addressMetadataMap[address];
            const uri = `ipfs://${metadataCid}`;
            const tokenId = certificateIdMap[address]; // Get the CertificateUniqueID for the tokenId
            const exists = await tokenExists(tokenId);
            if (!exists) {
                try {
                    await myTokenContract.methods.safeMint(address, tokenId, uri).send({ from: sender, gas: 5000000 });
                    console.log(`NFT minted successfully for address ${address} with Metadata CID ${metadataCid} and tokenId ${tokenId}`);
                } catch (error) {
                    console.error(`Error minting NFT for address ${address} with Metadata CID ${metadataCid}:`, error);
                }
            } else {
                console.log(`Token with ID ${tokenId} already exists. Skipping minting.`);
            }
        }
    }

    try {
        await certificateListingContract.methods.storeCIDs(metadataCids).send({ from: sender, gas: 5000000 });
        console.log('CIDs stored successfully in the smart contract.');
    } catch (error) {
        console.error('Error storing CIDs in the smart contract:', error);
    }
}

main();




// const Web3 = require('web3');
// const axios = require('axios');
// const FormData = require('form-data');
// const fs = require('fs');
// const path = require('path');
// const sharp = require('sharp');

// const web3 = new Web3('http://127.0.0.1:7545'); // Assuming Ganache is running on this address
// const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0MjMyNmNmMi00NjAzLTQzNjMtYTgzNi01YjYyYzM2NDU3MjYiLCJlbWFpbCI6Im1vdWhhbWVkYW5hcy5iZWxhcmJpQGVzcHJpdC50biIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIyYmQ5YWNjNTZjNTgwZTdkZjcwMyIsInNjb3BlZEtleVNlY3JldCI6ImU5ZjJkNWQ4M2NjM2I4OTg4ZTg3Nzg5MjY3YzY4ODAyOGUxNzAxZmVkNGUwNGQ5OGVkNDAwNTVjZmRiNTEyMjciLCJpYXQiOjE3MTYxNTE4Njl9.Qyj8Pf4E4KZvUbjLvn8GmJP5ihYGnhGzW8DDdhaBi6c'; // Replace with your actual Pinata JWT
// // ABI and address of your third contract
// const certificateListingABI = [
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "_certificateReceiverAddress",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "constructor"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "certificateCIDs",
// 		"outputs": [
// 			{
// 				"internalType": "string",
// 				"name": "",
// 				"type": "string"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "certificateReceiverAddress",
// 		"outputs": [
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "getCertificateTypeCounts",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "solar",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "wind",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "hydro",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "geothermal",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "biomass",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "getCertificatesByCapacity",
// 		"outputs": [
// 			{
// 				"components": [
// 					{
// 						"internalType": "address",
// 						"name": "ProjectAddress",
// 						"type": "address"
// 					},
// 					{
// 						"internalType": "uint256",
// 						"name": "CertificateUniqueID",
// 						"type": "uint256"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "certificateData",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "certificateType",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "TrackingSystemID",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "RenewableFuelType",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "RenewableFacilityLocation",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "NameplateCapacityOfProject",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "ProjectName",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "EmissionsRateOfRenewableResource",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "bool",
// 						"name": "stateA",
// 						"type": "bool"
// 					},
// 					{
// 						"internalType": "bool",
// 						"name": "stateR",
// 						"type": "bool"
// 					}
// 				],
// 				"internalType": "struct RenewableEnergyCertificates.Certificate[]",
// 				"name": "",
// 				"type": "tuple[]"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "getCertificatesByEmissionsRate",
// 		"outputs": [
// 			{
// 				"components": [
// 					{
// 						"internalType": "address",
// 						"name": "ProjectAddress",
// 						"type": "address"
// 					},
// 					{
// 						"internalType": "uint256",
// 						"name": "CertificateUniqueID",
// 						"type": "uint256"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "certificateData",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "certificateType",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "TrackingSystemID",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "RenewableFuelType",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "RenewableFacilityLocation",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "NameplateCapacityOfProject",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "ProjectName",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "EmissionsRateOfRenewableResource",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "bool",
// 						"name": "stateA",
// 						"type": "bool"
// 					},
// 					{
// 						"internalType": "bool",
// 						"name": "stateR",
// 						"type": "bool"
// 					}
// 				],
// 				"internalType": "struct RenewableEnergyCertificates.Certificate[]",
// 				"name": "",
// 				"type": "tuple[]"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "getProjectsByCertificateCount",
// 		"outputs": [
// 			{
// 				"components": [
// 					{
// 						"internalType": "address",
// 						"name": "owner",
// 						"type": "address"
// 					},
// 					{
// 						"internalType": "uint256",
// 						"name": "projectID",
// 						"type": "uint256"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "projectName",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "vision",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "domain",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "bool",
// 						"name": "verif",
// 						"type": "bool"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "latitude",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "longitude",
// 						"type": "string"
// 					}
// 				],
// 				"internalType": "struct RenewableEnergyCertificates.Project[]",
// 				"name": "",
// 				"type": "tuple[]"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "getStoredCIDs",
// 		"outputs": [
// 			{
// 				"internalType": "string[]",
// 				"name": "",
// 				"type": "string[]"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "getStoredVerifiedCertificates",
// 		"outputs": [
// 			{
// 				"components": [
// 					{
// 						"internalType": "address",
// 						"name": "ProjectAddress",
// 						"type": "address"
// 					},
// 					{
// 						"internalType": "uint256",
// 						"name": "CertificateUniqueID",
// 						"type": "uint256"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "certificateData",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "certificateType",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "TrackingSystemID",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "RenewableFuelType",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "RenewableFacilityLocation",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "NameplateCapacityOfProject",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "ProjectName",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "EmissionsRateOfRenewableResource",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "bool",
// 						"name": "stateA",
// 						"type": "bool"
// 					},
// 					{
// 						"internalType": "bool",
// 						"name": "stateR",
// 						"type": "bool"
// 					}
// 				],
// 				"internalType": "struct RenewableEnergyCertificates.Certificate[]",
// 				"name": "",
// 				"type": "tuple[]"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "string[]",
// 				"name": "cids",
// 				"type": "string[]"
// 			}
// 		],
// 		"name": "storeCIDs",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "updateVerifiedCertificates",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "verifiedCertificates",
// 		"outputs": [
// 			{
// 				"internalType": "address",
// 				"name": "ProjectAddress",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "CertificateUniqueID",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "certificateData",
// 				"type": "string"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "certificateType",
// 				"type": "string"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "TrackingSystemID",
// 				"type": "string"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "RenewableFuelType",
// 				"type": "string"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "RenewableFacilityLocation",
// 				"type": "string"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "NameplateCapacityOfProject",
// 				"type": "string"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "ProjectName",
// 				"type": "string"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "EmissionsRateOfRenewableResource",
// 				"type": "string"
// 			},
// 			{
// 				"internalType": "bool",
// 				"name": "stateA",
// 				"type": "bool"
// 			},
// 			{
// 				"internalType": "bool",
// 				"name": "stateR",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	}
// ];
// const certificateListingAddress = '0xD17477e1959F6e605F849c54232a6b497FcAE300';

// // ABI and address of the MyToken contract
// const myTokenABI =[
// 	{
// 		"inputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "constructor"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "owner",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "approved",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": true,
// 				"internalType": "uint256",
// 				"name": "tokenId",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "Approval",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "owner",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "operator",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "bool",
// 				"name": "approved",
// 				"type": "bool"
// 			}
// 		],
// 		"name": "ApprovalForAll",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "previousOwner",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "newOwner",
// 				"type": "address"
// 			}
// 		],
// 		"name": "OwnershipTransferred",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "from",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "to",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": true,
// 				"internalType": "uint256",
// 				"name": "tokenId",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "Transfer",
// 		"type": "event"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "to",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "tokenId",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "approve",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "owner",
// 				"type": "address"
// 			}
// 		],
// 		"name": "balanceOf",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "tokenId",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "burn",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "owner",
// 				"type": "address"
// 			}
// 		],
// 		"name": "burnedTokensOfOwner",
// 		"outputs": [
// 			{
// 				"components": [
// 					{
// 						"internalType": "uint256",
// 						"name": "tokenId",
// 						"type": "uint256"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "uri",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "bytes32",
// 						"name": "transactionHash",
// 						"type": "bytes32"
// 					},
// 					{
// 						"internalType": "address",
// 						"name": "burnedBy",
// 						"type": "address"
// 					},
// 					{
// 						"internalType": "uint256",
// 						"name": "burnedAt",
// 						"type": "uint256"
// 					}
// 				],
// 				"internalType": "struct MyToken.BurnedTokenInfo[]",
// 				"name": "",
// 				"type": "tuple[]"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "tokenId",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "getApproved",
// 		"outputs": [
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "getTopMinters",
// 		"outputs": [
// 			{
// 				"internalType": "address[]",
// 				"name": "",
// 				"type": "address[]"
// 			},
// 			{
// 				"internalType": "uint256[]",
// 				"name": "",
// 				"type": "uint256[]"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "owner",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "operator",
// 				"type": "address"
// 			}
// 		],
// 		"name": "isApprovedForAll",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "name",
// 		"outputs": [
// 			{
// 				"internalType": "string",
// 				"name": "",
// 				"type": "string"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "owner",
// 		"outputs": [
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "tokenId",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "ownerOf",
// 		"outputs": [
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "renounceOwnership",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "to",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "tokenId",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "uri",
// 				"type": "string"
// 			}
// 		],
// 		"name": "safeMint",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "from",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "to",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "tokenId",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "safeTransferFrom",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "from",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "to",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "tokenId",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "bytes",
// 				"name": "_data",
// 				"type": "bytes"
// 			}
// 		],
// 		"name": "safeTransferFrom",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "operator",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "bool",
// 				"name": "approved",
// 				"type": "bool"
// 			}
// 		],
// 		"name": "setApprovalForAll",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "bytes4",
// 				"name": "interfaceId",
// 				"type": "bytes4"
// 			}
// 		],
// 		"name": "supportsInterface",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "symbol",
// 		"outputs": [
// 			{
// 				"internalType": "string",
// 				"name": "",
// 				"type": "string"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "tokenId",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "tokenURI",
// 		"outputs": [
// 			{
// 				"internalType": "string",
// 				"name": "",
// 				"type": "string"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "owner",
// 				"type": "address"
// 			}
// 		],
// 		"name": "tokensOfOwner",
// 		"outputs": [
// 			{
// 				"internalType": "uint256[]",
// 				"name": "",
// 				"type": "uint256[]"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "totalSupply",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "from",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "to",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "tokenId",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "transferFrom",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "newOwner",
// 				"type": "address"
// 			}
// 		],
// 		"name": "transferOwnership",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	}
// ];
// const myTokenAddress = '0xe50579e79b284a1063f0E9D22b7D7e34C196769f'; // Replace with your MyToken contract address

// // Create contract instances
// const certificateListingContract = new web3.eth.Contract(certificateListingABI, certificateListingAddress);
// const myTokenContract = new web3.eth.Contract(myTokenABI, myTokenAddress);

// const imagePath = process.argv[2];

// // Function to get the certificates from the contract
// async function getCertificates() {
//     try {
//         const certificates = await certificateListingContract.methods.getStoredVerifiedCertificates().call();
//         return certificates;
//     } catch (error) {
//         console.error('Error fetching certificates:', error);
//         return [];
//     }
// }

// // // Function to upload a file to Pinata and return the CID
// // async function uploadFileToPinata(filePath, fileName) {
// //     try {
// //         const formData = new FormData();
// //         const fileStream = fs.createReadStream(filePath);
// //         formData.append('file', fileStream, fileName);

// //         const pinataMetadata = JSON.stringify({ name: fileName });
// //         formData.append('pinataMetadata', pinataMetadata);

// //         const pinataOptions = JSON.stringify({ cidVersion: 1 });
// //         formData.append('pinataOptions', pinataOptions);

// //         const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
// //             headers: {
// //                 Authorization: `Bearer ${JWT}`,
// //                 ...formData.getHeaders(),
// //             },
// //         });

// //         return res.data.IpfsHash;
// //     } catch (error) {
// //         console.error(`Error uploading ${fileName} to Pinata:`, error);
// //         return null;
// //     }
// // }
// async function uploadFileToPinata(filePath, fileName) {
//     try {
//         const formData = new FormData();
//         formData.append('file', fs.createReadStream(filePath), fileName);

//         const pinataMetadata = JSON.stringify({ name: fileName });
//         formData.append('pinataMetadata', pinataMetadata);

//         const pinataOptions = JSON.stringify({ cidVersion: 1 });
//         formData.append('pinataOptions', pinataOptions);

//         const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
//             headers: {
//                 Authorization: `Bearer ${JWT}`,
//                 ...formData.getHeaders(),
//             },
//         });
//         return response.data.IpfsHash;
//     } catch (error) {
//         console.error(`Error uploading ${fileName} to Pinata:`, error);
//         return null;
//     }
// }
// // Function to upload certificate data to Pinata and return the metadata CID 
// async function uploadCertificateToPinata(certificate, imageCid, index) {
//     try {
//         const metadata = {
//             name: `Certificate_ID ${certificate.CertificateUniqueID}`,
//             description: `
//       <p>Embark on a journey to a sustainable future with this Renewable Energy Certificate. 
//       Created for the esteemed project: ${certificate.ProjectName}, with a unique Certificate ID: ${certificate.CertificateUniqueID}. 
//       This certificate was issued on ${certificate.certificateData} by ${certificate.ProjectAddress}, affirming its authenticity.</p>
      
//       <p><strong>Certificate Details:</strong><br/>
//       - <strong>Type:</strong> ${certificate.certificateType}<br/>
//       - <strong>Tracking System ID:</strong> ${certificate.TrackingSystemID}<br/>
//       - <strong>Renewable Fuel Type:</strong> ${certificate.RenewableFuelType}<br/>
//       - <strong>Facility Location:</strong> ${certificate.RenewableFacilityLocation}<br/>
//       - <strong>Nameplate Capacity:</strong> ${certificate.NameplateCapacityOfProject}<br/>
//       - <strong>Emissions Rate:</strong> ${certificate.EmissionsRateOfRenewableResource}</p>
      
//       <p>Verification Status: ${certificate.stateA ? "Verified" : "Not Verified"}.</p>
      
//       <p>Celebrate the power of renewable energy with this certificate, a testament to clean and sustainable energy efforts.</p>`,
//             image: `ipfs://${imageCid}`,
//             attributes: certificate,
//         };

//         const tempFilePath = path.join(__dirname, `certificate_metadata_${index}.json`);
//         fs.writeFileSync(tempFilePath, JSON.stringify(metadata, null, 2));

//         const metadataCid = await uploadFileToPinata(tempFilePath, `certificate_metadata_${index}.json`);

//         // Clean up temporary file
//         fs.unlinkSync(tempFilePath);

//         return metadataCid;
//     } catch (error) {
//         console.error(`Error uploading certificate ${index} metadata to Pinata:`, error);
//         return null;
//     }
// }

// // Function to check if a token exists
// async function tokenExists(tokenId) {
//     try {
//         const owner = await myTokenContract.methods.ownerOf(tokenId).call();
//         return !!owner;
//     } catch (error) {
//         return false; // If there's an error, it means the token does not exist
//     }
// }
// // Function to overlay a logo on a background image
// // async function createCertificateImage(logoPath, backgroundPath, outputPath) {
// //     try {
// //         const logo = sharp(logoPath).resize(100); // Resize logo to fit on the certificate
// //         const combinedImage = await sharp(backgroundPath)
// //             .composite([{ input: await logo.toBuffer(), gravity: 'southeast' }]) // Position logo at the bottom right
// //             .toFile(outputPath);

// //         return outputPath;
// //     } catch (error) {
// //         console.error('Failed to create certificate image:', error);
// //         return null;
// //     }
// // }



// // async function createCertificateImage(logoPath, backgroundPath, outputPath) {
// //     try {
// //         const logo = sharp(logoPath).resize(200); // Resize logo to be larger
// //         const combinedImage = await sharp(backgroundPath)
// //             .composite([{ input: await logo.toBuffer(), gravity: 'southeast' }]) // Position logo at the bottom right
// //             .toFile(outputPath);

// //         return outputPath;
// //     } catch (error) {
// //         console.error('Failed to create certificate image:', error);
// //         return null;
// //     }
// // }
// // // Modify the main function to include image processing
// // async function main() {
// //     const certificates = await getCertificates();
// //     if (certificates.length === 0) {
// //         console.log('No certificates found.');
// //         return;
// //     }

// //     // Path to the logo and background image
// //     const logoPath = imagePath; // Update this to your logo's path
// //     const backgroundPath = './standard.jpg'; // Using the background image path from CLI argument
// //     const outputPath = './certificateImage.jpg'; // Define where to save the output image

// //     // Create a combined image with logo
// //     const combinedImagePath = await createCertificateImage(logoPath, backgroundPath, outputPath);
// //     if (!combinedImagePath) {
// //         console.log('Failed to create combined image.');
// //         return;
// //     }

// //     // Upload the combined image to Pinata
// //     const imageCid = await uploadFileToPinata(combinedImagePath, path.basename(combinedImagePath));
// //     if (!imageCid) {
// //         console.log('Failed to upload image to Pinata.');
// //         return;
// //     }

// //     // Continue with the rest of your existing code
// //     const metadataCids = [];
// //     const addressMetadataMap = {};
// //     const certificateIdMap = {};

// //     for (let i = 0; i < certificates.length; i++) {
// //         const metadataCid = await uploadCertificateToPinata(certificates[i], imageCid, i);
// //         if (metadataCid) {
// //             metadataCids.push(metadataCid);
// //             addressMetadataMap[certificates[i].ProjectAddress] = metadataCid;
// //             certificateIdMap[certificates[i].ProjectAddress] = certificates[i].CertificateUniqueID;
// //         }
// //     }

// //     console.log('All Metadata CIDs:', metadataCids);
// //     console.log('Address to Metadata CID map:', addressMetadataMap);
// // 	console.log('All Metadata CIDs:');
// //     console.log(metadataCids);

// //     console.log('Address to Metadata CID map:');
// //     console.log(addressMetadataMap);

// //     const accounts = await web3.eth.getAccounts();
// //     const sender = accounts[0];

// //     for (const address in addressMetadataMap) {
// //         if (addressMetadataMap.hasOwnProperty(address)) {
// //             const metadataCid = addressMetadataMap[address];
// //             const uri = `ipfs://${metadataCid}`;
// //             const tokenId = certificateIdMap[address]; // Get the CertificateUniqueID for the tokenId
// //             const exists = await tokenExists(tokenId);
// //             if (!exists) {
// //                 try {
// //                     await myTokenContract.methods.safeMint(address, tokenId, uri).send({ from: sender, gas: 5000000 });
// //                     console.log(`NFT minted successfully for address ${address} with Metadata CID ${metadataCid} and tokenId ${tokenId}`);
// //                 } catch (error) {
// //                     console.error(`Error minting NFT for address ${address} with Metadata CID ${metadataCid}:`, error);
// //                 }
// //             } else {
// //                 console.log(`Token with ID ${tokenId} already exists. Skipping minting.`);
// //             }
// //         }
// //     }

// //     try {
// //         await certificateListingContract.methods.storeCIDs(metadataCids).send({ from: sender, gas: 5000000 });
// //         console.log('CIDs stored successfully in the smart contract.');
// //     } catch (error) {
// //         console.error('Error storing CIDs in the smart contract:', error);
// //     }
// // }

// // main();


// async function main() {
//     const certificates = await getCertificates();
//     if (certificates.length === 0) {
//         console.log('No certificates found.');
//         return;
//     }

//     // Path to the logo and background image
//     const logoPath = imagePath; // Update this to your logo's path
//     const backgroundPath = './standard.jpg'; // Using the background image path from CLI argument
//     const outputPath = './certificateImage.jpg'; // Define where to save the output image

//     // Create a combined image with logo
//     const combinedImagePath = await createCertificateImage(logoPath, backgroundPath, outputPath);
//     if (!combinedImagePath) {
//         console.log('Failed to create combined image.');
//         return;
//     }

//     // Upload the combined image to Pinata
//     const imageCid = await uploadFileToPinata(combinedImagePath, path.basename(combinedImagePath));
//     if (!imageCid) {
//         console.log('Failed to upload image to Pinata.');
//         return;
//     }

//     // Continue with the rest of your existing code
//     const metadataCids = [];
//     const addressMetadataMap = {};
//     const certificateIdMap = {};

//     for (let i = 0; i < certificates.length; i++) {
//         const metadataCid = await uploadCertificateToPinata(certificates[i], imageCid, i);
//         if (metadataCid) {
//             metadataCids.push(metadataCid);
//             addressMetadataMap[certificates[i].ProjectAddress] = metadataCid;
//             certificateIdMap[certificates[i].ProjectAddress] = certificates[i].CertificateUniqueID;
//         }
//     }

//     console.log('All Metadata CIDs:', metadataCids);
//     console.log('Address to Metadata CID map:', addressMetadataMap);

//     const accounts = await web3.eth.getAccounts();
//     const sender = accounts[0];

//     for (const address in addressMetadataMap) {
//         if (addressMetadataMap.hasOwnProperty(address)) {
//             const metadataCid = addressMetadataMap[address];
//             const uri = `ipfs://${metadataCid}`;
//             const tokenId = certificateIdMap[address]; // Get the CertificateUniqueID for the tokenId
//             const exists = await tokenExists(tokenId);
//             if (!exists) {
//                 try {
//                     await myTokenContract.methods.safeMint(address, tokenId, uri).send({ from: sender, gas: 5000000 });
//                     console.log(`NFT minted successfully for address ${address} with Metadata CID ${metadataCid} and tokenId ${tokenId}`);
//                 } catch (error) {
//                     console.error(`Error minting NFT for address ${address} with Metadata CID ${metadataCid}:`, error);
//                 }
//             } else {
//                 console.log(`Token with ID ${tokenId} already exists. Skipping minting.`);
//             }
//         }
//     }

//     try {
//         await certificateListingContract.methods.storeCIDs(metadataCids).send({ from: sender, gas: 5000000 });
//         console.log('CIDs stored successfully in the smart contract.');
//     } catch (error) {
//         console.error('Error storing CIDs in the smart contract:', error);
//     }
// }

// main();
