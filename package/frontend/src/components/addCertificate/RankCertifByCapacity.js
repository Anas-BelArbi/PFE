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

// import CertificateListingABI from '../../ABIs/CertificateListing.json';
// import { ListingContractaddress } from '../../ABIs/config';

// const RankCertifByCapacity = () => {
//   const [certificates, setCertificates] = useState([]);
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

//         const contractInstance = new web3.eth.Contract(CertificateListingABI.abi, ListingContractaddress);
//         setContract(contractInstance);

//         // Fetch certificates sorted by capacity
//         const fetchedCertificates = await contractInstance.methods.getCertificatesByCapacity().call();
//         setCertificates(fetchedCertificates);
//       } catch (error) {
//         console.error("Error initializing web3 or fetching certificates:", error);
//       }
//     };

//     initWeb3();
//   }, []);

//   return (
//     <Card>
//       <CardBody>
//         <CardTitle tag="h5">Certificates by Capacity</CardTitle>
//         <CardSubtitle className="mb-2 text-muted" tag="h6">
//           Sorted by the largest capacity
//         </CardSubtitle>
//         <ListGroup flush className="mt-4">
//           {certificates.map((certificate, index) => (
//             <ListGroupItem
//               key={index}
//               className="d-flex align-items-center p-3 border-0"
//             >
//               <Button
//                 className="rounded-circle me-3"
//                 size="sm"
//                 color="primary" // You can set color based on your logic
//               >
//                 <i className="bi bi-file-earmark"></i>
//               </Button>
//               {certificate.ProjectName}
//               <small className="ms-auto text-muted text-small">
//                 {certificate.TrackingSystemID}
//               </small>
//               <small className="ms-auto text-muted text-small">
//                 {certificate.NameplateCapacityOfProject}
//               </small>
//             </ListGroupItem>
//           ))}
//         </ListGroup>
//       </CardBody>
//     </Card>
//   );
// };

// export default RankCertifByCapacity;

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

import CertificateListingABI from '../../ABIs/CertificateListing.json';
import { ListingContractaddress } from '../../ABIs/config';

const RankCertifByCapacity = () => {
  const [certificates, setCertificates] = useState([]);
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
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
          return;
        }

        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        if (accounts.length === 0) {
          window.alert('No accounts found. Please make sure MetaMask is connected.');
          return;
        }
        setAccount(accounts[0]);

        const contractInstance = new web3.eth.Contract(CertificateListingABI.abi, ListingContractaddress);
        setContract(contractInstance);

        // Fetch all certificates
        const fetchedCertificates = await contractInstance.methods.getStoredVerifiedCertificates().call();
        setCertificates(fetchedCertificates.slice(0, 5));
      } catch (error) {
        console.error("Error initializing web3 or fetching certificates:", error);
      }
    };

    initWeb3();
  }, []);

  const sortedCertificates = certificates.sort((a, b) => parseInt(b.NameplateCapacityOfProject) - parseInt(a.NameplateCapacityOfProject));

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Top 5 Certificates by Capacity</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Sorted by the largest capacity
        </CardSubtitle>
        <ListGroup flush className="mt-4">
          {sortedCertificates.map((certificate, index) => (
            <ListGroupItem
              key={index}
              className="d-flex align-items-center p-3 border-0"
            >
              <Button
                className="rounded-circle me-3"
                size="sm"
                color="primary" // You can set color based on your logic
              >
                <i className="bi bi-file-earmark"></i>
              </Button>
              {certificate.ProjectName}
              <small className="ms-auto text-muted text-small">
                {certificate.TrackingSystemID}
              </small>
              <small className="ms-auto text-muted text-small">
                {certificate.NameplateCapacityOfProject}
              </small>
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default RankCertifByCapacity;
