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

// const RankCertifByEmission = () => {
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

//         // Fetch certificates sorted by emissions rate
//         const fetchedCertificates = await contractInstance.methods.getCertificatesByEmissionsRate().call();
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
//         <CardTitle tag="h5">Certificates by Emissions Rate</CardTitle>
//         <CardSubtitle className="mb-2 text-muted" tag="h6">
//           Sorted by the least emissions rate
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
//                 color="danger" // You can set color based on your logic
//               >
//                 <i className="bi bi-bag-check"></i>
//               </Button>
//               {certificate.ProjectName}
//               <small className="ms-auto text-muted text-small">
//                 {certificate.TrackingSystemID}
//               </small>
//               <small className="ms-auto text-muted text-small">
//                 {certificate.EmissionsRateOfRenewableResource} <strong>Kg CO2e/kWh</strong>
//               </small>
//             </ListGroupItem>
//           ))}
//         </ListGroup>
//       </CardBody>
//     </Card>
//   );
// };

// export default RankCertifByEmission;

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

const RankCertifByEmission = () => {
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

        // Fetch certificates
        const fetchedCertificates = await contractInstance.methods.getStoredVerifiedCertificates().call();
        setCertificates(fetchedCertificates.slice(0, 5));
      } catch (error) {
        console.error("Error initializing web3 or fetching certificates:", error);
      }
    };

    initWeb3();
  }, []);

  const sortedCertificates = certificates.sort((a, b) => parseInt(a.EmissionsRateOfRenewableResource) - parseInt(b.EmissionsRateOfRenewableResource));

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Top 5 Certificates by Emissions Rate</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Sorted by the least emissions rate
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
                color="danger" // You can set color based on your logic
              >
                <i className="bi bi-bag-check"></i>
              </Button>
              {certificate.ProjectName}
              <small className="ms-auto text-muted text-small">
                {certificate.TrackingSystemID}
              </small>
              <small className="ms-auto text-muted text-small">
                {certificate.EmissionsRateOfRenewableResource} <strong>Kg CO2e/kWh</strong>
              </small>
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default RankCertifByEmission;
