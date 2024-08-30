// import React from "react";
// import {
//   Card,
//   CardBody,
//   CardTitle,
//   ListGroup,
//   CardSubtitle,
//   ListGroupItem,
//   Button,
// } from "reactstrap";

// const FeedData = [
//   {
//     title: "Cras justo odio",
//     icon: "bi bi-bell",
//     color: "primary",
//     date: "6 minute ago",
//   },
//   {
//     title: "New user registered.",
//     icon: "bi bi-person",
//     color: "info",
//     date: "6 minute ago",
//   },
//   {
//     title: "Server #1 overloaded.",
//     icon: "bi bi-hdd",
//     color: "danger",
//     date: "6 minute ago",
//   },
//   {
//     title: "New order received.",
//     icon: "bi bi-bag-check",
//     color: "success",
//     date: "6 minute ago",
//   },
//   {
//     title: "Cras justo odio",
//     icon: "bi bi-bell",
//     color: "dark",
//     date: "6 minute ago",
//   },
//   {
//     title: "Server #1 overloaded.",
//     icon: "bi bi-hdd",
//     color: "warning",
//     date: "6 minute ago",
//   },
// ];

// const Feeds = () => {
//   return (
//     <Card>
//       <CardBody>
//         <CardTitle tag="h5">Feeds</CardTitle>
//         <CardSubtitle className="mb-2 text-muted" tag="h6">
//           Widget you can use
//         </CardSubtitle>
//         <ListGroup flush className="mt-4">
//           {FeedData.map((feed, index) => (
//             <ListGroupItem
//               key={index}
//               action
//               href="/"
//               tag="a"
//               className="d-flex align-items-center p-3 border-0"
//             >
//               <Button
//                 className="rounded-circle me-3"
//                 size="sm"
//                 color={feed.color}
//               >
//                 <i className={feed.icon}></i>
//               </Button>
//               {feed.title}
//               <small className="ms-auto text-muted text-small">
//                 {feed.date}
//               </small>
//             </ListGroupItem>
//           ))}
//         </ListGroup>
//       </CardBody>
//     </Card>
//   );
// };

// export default Feeds;






// import React, { useEffect, useState } from "react";
// import Web3 from "web3";
// import {
//   Card,
//   CardBody,
//   CardTitle,
//   ListGroup,
//   CardSubtitle,
//   ListGroupItem,
//   Button,
// } from "reactstrap";

// import NFTToken from '../../ABIs/NFTToken.json';
// import { contractAddressNftToken } from '../../ABIs/config';

// const Feeds = () => {
//   const [minters, setMinters] = useState([]);
//   const [mintedCounts, setMintedCounts] = useState([]);
//   const [account, setAccount] = useState(null);
//   const [contract, setContract] = useState(null);

//   useEffect(() => {
//     const initWeb3 = async () => {
//       try {
//         if (window.ethereum) {
//           window.web3 = new Web3(window.ethereum);
//           await window.ethereum.request({ method: 'eth_requestAccounts' });
//         } else if (window.web3) {
//           window.web3 = new Web3(window.web3.currentProvider);
//         } else {
//           window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
//           return;
//         }

//         const web3 = window.web3;
//         const accounts = await web3.eth.getAccounts();
//         if (accounts.length === 0) {
//           window.alert('No accounts found. Please make sure MetaMask is connected.');
//           return;
//         }
//         setAccount(accounts[0]);

//         const contractInstance = new web3.eth.Contract(NFTToken.abi, contractAddressNftToken);
//         setContract(contractInstance);

//         // Fetch top minters
//         const result = await contractInstance.methods.getTopMinters().call();
//         const fetchedMinters = result[0];
//         const fetchedMintedCounts = result[1];

//         // Filter out the invalid addresses and zero values
//         const validMinters = [];
//         const validMintedCounts = [];

//         for (let i = 0; i < fetchedMinters.length; i++) {
//           if (fetchedMinters[i] !== '0x0000000000000000000000000000000000000000' && fetchedMintedCounts[i] > 0) {
//             validMinters.push(fetchedMinters[i]);
//             validMintedCounts.push(fetchedMintedCounts[i]);
//           }
//         }

//         setMinters(validMinters);
//         setMintedCounts(validMintedCounts);
//       } catch (error) {
//         console.error("Error initializing web3 or fetching minters:", error);
//       }
//     };

//     initWeb3();
//   }, []);

//   return (
//     <Card>
//       <CardBody>
//         <CardTitle tag="h5">Top Owners of Certificates</CardTitle>
//         <CardSubtitle className="mb-2 text-muted" tag="h6">
//           Sorted from largest to lowest Owners
//         </CardSubtitle>
//         <ListGroup flush className="mt-4">
//           {minters.map((miner, index) => (
//             <ListGroupItem
//               key={index}
//               className="d-flex align-items-center p-3 border-0"
//               style={{ fontSize: "0.7em" }} // Adjust font size here
//             >
//               <Button
//                 className="rounded-circle me-3"
//                 size="sm"
//                 color="primary" // You can set color based on your logic
//               >
//                 <i className="bi bi-file-earmark"></i>
//               </Button>
//               <span style={{ fontSize: "0.8em", overflowWrap: "break-word" }}>{miner}</span>
//               <small className="ms-auto text-muted text-small">
//                 {console.log(mintedCounts[index].toString())}
//                 {mintedCounts[index].toString()}
//               </small>
//             </ListGroupItem>
//           ))}
//         </ListGroup>
//       </CardBody>
//     </Card>
//   );
// };

// export default Feeds;
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  CardSubtitle,
  ListGroupItem,
  Button,
} from "reactstrap";
import axios from 'axios'; // Include axios for making HTTP requests

import NFTToken from '../../ABIs/NFTToken.json';
import { contractAddressNftToken } from '../../ABIs/config';

const Feeds = () => {
  const [topOwners, setTopOwners] = useState([]);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          await window.ethereum.request({ method: 'eth_requestAccounts' });
        } else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider);
        } else {
          alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
          return;
        }

        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        if (accounts.length === 0) {
          alert('No accounts found. Please make sure MetaMask is connected.');
          return;
        }
        setAccount(accounts[0]);

        const contractInstance = new web3.eth.Contract(NFTToken.abi, contractAddressNftToken);
        setContract(contractInstance);

        // Fetch all users
        const users = await fetchAllUsers();

        // Fetch tokens for each user and calculate top owners
        const topOwnersData = await fetchTopOwners(users, contractInstance);

        setTopOwners(topOwnersData);
      } catch (error) {
        console.error("Error initializing web3 or fetching top owners:", error);
      }
    };

    const fetchAllUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/users');
        return response.data.users;
      } catch (error) {
        console.error('Failed to fetch users:', error);
        return [];
      }
    };

    const fetchTopOwners = async (users, contractInstance) => {
      const ownerData = [];

      for (const user of users) {
        const tokens = await contractInstance.methods.tokensOfOwner(user.publicKey).call();
        if (tokens.length > 0) {
          ownerData.push({ publicKey: user.publicKey, name: user.name, tokenCount: tokens.length });
        }
      }

      // Sort by tokenCount and get top 5
      ownerData.sort((a, b) => b.tokenCount - a.tokenCount);
      return ownerData.slice(0, 5);
    };

    initWeb3();
  }, []);

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Top Owners of Certificates</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Sorted from largest to lowest Owners
        </CardSubtitle>
        <ListGroup flush className="mt-4">
          {topOwners.map((owner, index) => (
            <ListGroupItem
              key={index}
              className="d-flex align-items-center p-3 border-0"
              style={{ fontSize: "0.7em" }}
            >
              <Button
                className="rounded-circle me-3"
                size="sm"
                color="primary"
              >
                <i className="bi bi-file-earmark"></i>
              </Button>
              <span style={{ fontSize: "1.5em", overflowWrap: "break-word" }}>{owner.name}</span>
              <h6 className="ms-auto text-muted text-small">
                {owner.tokenCount.toString()}
              </h6>
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default Feeds;
