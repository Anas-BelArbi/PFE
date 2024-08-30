const Web3 = require('web3');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const sharp = require('sharp');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;
const saltRounds = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Middleware
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST" , "PUT", "DELETE"],
    credentials: true,
}));
app.use(cookieParser());

// Database connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'talan',
});

const web3 = new Web3('http://127.0.0.1:7545'); // Assuming Ganache is running on this address
const JWT_PINATA = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0MjMyNmNmMi00NjAzLTQzNjMtYTgzNi01YjYyYzM2NDU3MjYiLCJlbWFpbCI6Im1vdWhhbWVkYW5hcy5iZWxhcmJpQGVzcHJpdC50biIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIyYmQ5YWNjNTZjNTgwZTdkZjcwMyIsInNjb3BlZEtleVNlY3JldCI6ImU5ZjJkNWQ4M2NjM2I4OTg4ZTg3Nzg5MjY3YzY4ODAyOGUxNzAxZmVkNGUwNGQ5OGVkNDAwNTVjZmRiNTEyMjciLCJpYXQiOjE3MTYxNTE4Njl9.Qyj8Pf4E4KZvUbjLvn8GmJP5ihYGnhGzW8DDdhaBi6c'; // Replace with your actual Pinata JWT

const certificateListingABI =  [
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

const myTokenABI = [
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

const certificateListingContract = new web3.eth.Contract(certificateListingABI, certificateListingAddress);
const myTokenContract = new web3.eth.Contract(myTokenABI, myTokenAddress);



// Verify user middleware
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.json({ error: "unauthorized" });
    jwt.verify(token, JWT_SECRET, (err, result) => {
        if (err) return res.json({ error: "unauthorized" });
        req.name = result.name;
        req.role = result.role; // include the user's role in the request
        next();
    });
};
 
// Routes
app.get('/', verifyUser, (req, res) => {
    return res.json({ Status: "Success", name: req.name, role: req.role });
});

app.post('/chatbot', (req, res) => {
    const userQuestion = req.body.question;

    exec(`python chatbot.py "${userQuestion}"`, (error, stdout, stderr) => {
        if (error) {
            console.error('Error executing Python script:', error);
            return res.status(500).json({ error: 'Failed to execute chatbot script' });
        }
        if (stderr) {
            console.error('Python script stderr:', stderr);
            return res.status(500).json({ error: stderr });
        }
        res.json({ response: stdout.trim() });
    });
});
app.get('/users', (req, res) => {
	const sql = 'SELECT name, publicKey FROM user';
	pool.query(sql, (err, results) => {
	  if (err) {
		console.error('Database query error:', err);
		return res.status(500).json({ error: 'Internal server error' });
	  }
	  return res.json({ users: results });
	});
  });
  

app.post('/register', (req, res) => {
    const checkUserSql = 'SELECT * FROM user WHERE email = ?';
    pool.query(checkUserSql, [req.body.email], (err, results) => {
        if (err) return res.status(500).json({ error: 'Internal server error' });

        if (results.length > 0) return res.status(400).json({ error: 'User already exists' });

        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
            if (err) return res.status(500).json({ error: 'Error hashing password' });

            const sql = 'INSERT INTO user (`name`, `email`, `password`, `role`, `publicKey`) VALUES (?, ?, ?, ?, ?)';
            const values = [
                req.body.name,
                req.body.email,
                hash,
                req.body.role,
                req.body.publicKey,
                // req.body.privateKey
            ];

            pool.query(sql, values, (err, result) => {
                if (err) return res.status(500).json({ error: 'Error inserting data' });
                return res.json({ message: 'User registered successfully' });
            });
        });
    });
});

app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM user WHERE email = ?';
    pool.query(sql, [req.body.email], (err, results) => {
        if (err) return res.json({ error: "error selecting data" });
        if (results.length === 0) return res.json({ error: "email not found" });

        const user = results[0];

        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) return res.json({ error: "error comparing password" });
            if (!result) return res.json({ error: "password incorrect" });

            const { name, role } = user;

            // Add timestamp to the token payload
            const tokenPayload = { name, role, timestamp: Date.now() };
            const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1h' });

            return res.json({ message: "logged in", token, role });
        });
    });
});

app.post('/check-public-key', (req, res) => {
    const { publicKey } = req.body;
    const sql = 'SELECT * FROM user WHERE publicKey = ?';
    pool.query(sql, [publicKey], (err, results) => {
        if (err) return res.status(500).json({ error: 'Internal server error' });
        if (results.length === 0) return res.status(404).json({ error: 'User not found' });

        return res.json({ message: 'Public key exists' });
    });
});

app.post('/public-key-login', (req, res) => {
    const { publicKey } = req.body;
    const sql = 'SELECT * FROM user WHERE publicKey = ?';
    pool.query(sql, [publicKey], (err, results) => {
        if (err) return res.status(500).json({ error: 'Internal server error' });
        if (results.length === 0) return res.status(404).json({ error: 'User not found' });

        const user = results[0];

        // Add timestamp to the token payload
        const tokenPayload = { name: user.name, email: user.email, imageUser: user.imageuser, role: user.role, timestamp: Date.now() };
        const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1h' });

        return res.json({ message: 'Logged in with public key', token, role: user.role });
    });
});

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success" });
});

// app.post('/run-upload-script', (req, res) => {
//     const { ProjectAddress, ProjectName } = req.body;

//     // Query the database for the project's image
//     const query = 'SELECT image FROM project WHERE owner = ? AND projectName = ?';
//     pool.query(query, [ProjectAddress, ProjectName], (err, results) => {
//         if (err) {
//             return res.status(500).send('Database query error');
//         }
//         if (results.length === 0) {
//             return res.status(404).send('Project not found');
//         }

//         const image = results[0].image;
//         const imagePath = path.join(__dirname, `${ProjectName}.png`);

//         // Save the image locally
//         fs.writeFile(imagePath, image, 'base64', (err) => {
//             if (err) {
//                 return res.status(500).send('Error saving image');
//             }

//             // Execute the script after saving the image
//             const scriptPath = path.join(__dirname, 'upload.js');
//             exec(`node ${scriptPath}`, (error, stdout, stderr) => {
//                 if (error) return res.status(500).send('Error executing script');
//                 if (stderr) return res.status(500).send('Script error');
//                 res.status(200).send('Script executed successfully');
//             });
//         });
//     });
// });

// app.post('/run-upload-script', (req, res) => {
//     const { ProjectAddress, ProjectName } = req.body;
//     const query = 'SELECT image FROM project WHERE owner = ? AND projectName = ?';
//     pool.query(query, [ProjectAddress, ProjectName], (err, results) => {
//         if (err) {
//             console.error('Database query error:', err);
//             return res.status(500).send('Database query error');
//         }
//         if (results.length === 0) {
//             return res.status(404).send('Project not found');
//         }

//         let image = results[0].image;
//         image = image.replace(/^data:image\/\w+;base64,/, '');
//         const imagePath = path.join(__dirname, `${ProjectName}.png`);

//         fs.writeFile(imagePath, image, 'base64', (err) => {
//             if (err) {
//                 console.error('Error saving image:', err);
//                 return res.status(500).send('Error saving image');
//             }

//             const scriptPath = path.join(__dirname, 'index2.js');
//             exec(`node ${scriptPath} "${imagePath}"`, (error, stdout, stderr) => {
//                 if (error) {
//                     console.error('Error executing script:', error);
//                     return res.status(500).send('Error executing script');
//                 }
//                 if (stderr) {
//                     console.error('Script error:', stderr);
//                     return res.status(500).send('Script error');
//                 }
//                 res.status(200).send('Script executed successfully');
//             });
//         });
//     });
// });
app.post('/run-upload-script', (req, res) => {
    const { ProjectAddress, ProjectName } = req.body;
    const query = 'SELECT image FROM project WHERE owner = ? AND projectName = ?';
    pool.query(query, [ProjectAddress, ProjectName], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send('Database query error');
        }
        if (results.length === 0) {
            return res.status(404).send('Project not found');
        }

        let imageBuffer = Buffer.from(results[0].image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
        const standardPath = path.join(__dirname, 'standard.jpg');
        const imagePath = path.join(__dirname, `${ProjectName}.png`);

        // Combine images using sharp
        sharp(standardPath)
            .composite([{ input: imageBuffer, gravity: 'center' }])
            .toFile(imagePath)
            .then(() => {
                // Continue with the rest of your script here
                const scriptPath = path.join(__dirname, 'index2.js');
                exec(`node ${scriptPath} "${imagePath}"`, (error, stdout, stderr) => {
                    if (error) {
                        console.error('Error executing script:', error);
                        return res.status(500).send('Error executing script');
                    }
                    if (stderr) {
                        console.error('Script error:', stderr);
                        return res.status(500).send('Script error');
                    }
                    res.status(200).send('Script executed successfully');
                });
            })
            .catch(err => {
                console.error('Error processing image:', err);
                return res.status(500).send('Error processing image');
            });
    });
});
const insertInitialUsers = () => {
    const users = [
        {
            name: 'Authority',
            email: 'Authority@talan.com',
            password: 'Authority',
            role: 'Authority',
            privatekey: '11cf83fa07766e30e1f327a808fbf8d296c487c315bc831092a25a74377bd917',
            publickey: '0x49c1300A03fE810098651e390F55f3389dAb04B3'
        },
        {
            name: 'Registry',
            email: 'Registry@talan.com',
            password: 'Registry',
            role: 'Registry',
            privatekey: 'cd7b8eacaabb6b4b3ef1814da03278cd983f6d285ff8d803a5c53c3ab988792b',
            publickey: '0x1dA720567c24A05Dc1a9D3CB5B078a7e122a156a'
        }
    ];

    users.forEach(user => {
        const sqlSelect = 'SELECT * FROM user WHERE email = ?';
        pool.query(sqlSelect, [user.email], (err, results) => {
            if (err) return;

            if (results.length > 0) return;

            bcrypt.hash(user.password, saltRounds, (err, hash) => {
                if (err) return;

                const values = [
                    user.name,
                    user.email,
                    hash,
                    user.role,
                    user.privatekey,
                    user.publickey
                ];
                const sqlInsert = 'INSERT INTO user (`name`, `email`, `password`, `role`, `privatekey`, `publickey`) VALUES (?)';
                pool.query(sqlInsert, [values], (err, result) => {
                    if (err) return;
                });
            });
        });
    });
};

app.post('/add-project', (req, res) => {
    const {owner, projectName, vision, domain, latitude, longitude, image, publicKey } = req.body;
  
    const insertProjectQuery = `
      INSERT INTO project (owner, projectName, vision, domain, latitude, longitude, image, userID) 
      VALUES (?, ?, ?, ?, ?, ?, ?, (SELECT id FROM user WHERE publicKey = ?))
    `;
  
    pool.query(insertProjectQuery, [owner, projectName, vision, domain, latitude, longitude, image, publicKey], (err, result) => {
      if (err) {
        console.error('Error adding project:', err);
        return res.status(500).json({ success: false, message: 'Error adding project' });
      }
  
      res.json({ success: true, project: result.insertId });
    });
  });


  
  app.post('/user-details', (req, res) => {
    const { publicKey } = req.body; // Receive publicKey from the request body
    if (!publicKey) {
        return res.status(400).json({ error: 'Public key is required' });
    }
    
    const sql = 'SELECT name, email, imageuser FROM user WHERE publicKey = ?';
    pool.query(sql, [publicKey], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.json({ user: results[0] });
    });
});


  app.get('/user/:publicKey', (req, res) => {
	const { publicKey } = req.params;
	const sql = 'SELECT name, email, publicKey, imageuser FROM user WHERE publicKey = ?';
	pool.query(sql, [publicKey], (err, results) => {
		if (err) return res.status(500).json({ error: 'Internal server error' });
		if (results.length === 0) return res.status(404).json({ error: 'User not found' });

		return res.json({ user: results[0] });
	});
});


app.get('/user/:publicKey', (req, res) => {
	const { publicKey } = req.params;
	const sql = 'SELECT name, email, publicKey, imageuser FROM user WHERE publicKey = ?';
	pool.query(sql, [publicKey], (err, results) => {
		if (err) return res.status(500).json({ error: 'Internal server error' });
		if (results.length === 0) return res.status(404).json({ error: 'User not found' });

		return res.json({ user: results[0] });
	});
});


app.put('/user/:publicKey', (req, res) => {
	const { publicKey } = req.params;
	const { name, email, password, imageuser } = req.body;
	let sql = 'UPDATE user SET name = ?, email = ?, imageuser = ? WHERE publicKey = ?';
	const values = [name, email, imageuser, publicKey];
  
	if (password) {
	  bcrypt.hash(password, saltRounds, (err, hash) => {
		if (err) return res.status(500).json({ error: 'Error hashing password' });
		sql = 'UPDATE user SET name = ?, email = ?, password = ?, imageuser = ? WHERE publicKey = ?';
		values.splice(2, 0, hash);
		pool.query(sql, values, (err, results) => {
		  if (err) return res.status(500).json({ error: 'Internal server error' });
		  return res.json({ message: 'User updated successfully' });
		});
	  });
	} else {
	  pool.query(sql, values, (err, results) => {
		if (err) return res.status(500).json({ error: 'Internal server error' });
		return res.json({ message: 'User updated successfully' });
	  });
	}
  });
  


function getImageFromDatabase(projectName, callback) {
    const query = 'SELECT image FROM project WHERE projectName = ?';
    pool.query(query, [projectName], (err, results) => {
        if (err) {
            console.error('Error fetching image from database:', err);
            callback(err, null);
        } else {
            if (results.length > 0) {
                callback(null, results[0].image);
            } else {
                callback('Image not found', null);
            }
        }
    });
}

// Function to decode base64 image and save locally
function saveBase64Image(base64String, filePath) {
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");
    fs.writeFileSync(filePath, base64Data, { encoding: 'base64' });
}

// Function to upload a file to Pinata and return the CID
async function uploadFileToPinata(filePath, fileName) {
    try {
        const formData = new FormData();
        const fileStream = fs.createReadStream(filePath);
        formData.append('file', fileStream, fileName);

        const pinataMetadata = JSON.stringify({ name: fileName });
        formData.append('pinataMetadata', pinataMetadata);

        const pinataOptions = JSON.stringify({ cidVersion: 1 });
        formData.append('pinataOptions', pinataOptions);

        const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
            headers: {
                Authorization: `Bearer ${JWT_PINATA}`,
                ...formData.getHeaders(),
            },
        });

        return res.data.IpfsHash;
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

// Function to get certificates from the contract
async function getCertificates() {
    try {
        const certificates = await certificateListingContract.methods.getStoredVerifiedCertificates().call();
        return certificates;
    } catch (error) {
        console.error('Error fetching certificates:', error);
        return [];
    }
}

async function main() {
    // const certificates = await getCertificates();

    // if (certificates.length === 0) {
    //     console.log('No certificates found.');
    //     return;
    // }

    // const projectName = certificates[0].ProjectName; // Assuming all certificates belong to the same project
    // getImageFromDatabase(projectName, async (err, base64Image) => {
    //     if (err) {
    //         console.error(err);
    //         return;
    //     }

    //     const imagePath = path.join(__dirname, 'project_image.png');
    //     saveBase64Image(base64Image, imagePath);

    //     const imageCid = await uploadFileToPinata(imagePath, 'project_image.png');

    //     if (!imageCid) {
    //         console.log('Failed to upload image.');
    //         return;
    //     }

    //     const metadataCids = [];
    //     const addressMetadataMap = {};
    //     const certificateIdMap = {}; // To keep track of the CertificateUniqueID for each address
    //     for (let i = 0; i < certificates.length; i++) {
    //         const metadataCid = await uploadCertificateToPinata(certificates[i], imageCid, i);
    //         if (metadataCid) {
    //             metadataCids.push(metadataCid);
    //             addressMetadataMap[certificates[i].ProjectAddress] = metadataCid;
    //             certificateIdMap[certificates[i].ProjectAddress] = certificates[i].CertificateUniqueID;
    //         }
    //     }

    //     console.log('All Metadata CIDs:');
    //     console.log(metadataCids);

    //     console.log('Address to Metadata CID map:');
    //     console.log(addressMetadataMap);

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
    // });
}

// Start the server and insert initial users
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    insertInitialUsers();
});

main();
