import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { Card, CardBody, CardTitle, Table, Button, Modal, ModalHeader, ModalBody, Progress, Container } from 'reactstrap';

import RenewableEnergyCertificates from '../../ABIs/RenewableEnergyCertificates.json';
import CertificateReceiver from '../../ABIs/CertificateReceiver.json';
import { CONTRACT_ADDRESS, contractAddressrec } from '../../ABIs/config';

const CertificatesView = () => {
  const [web3, setWeb3] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [modal, setModal] = useState(false);
  const [receiverCertificates, setReceiverCertificates] = useState([]);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWeb3(web3);

        const accounts = await web3.eth.getAccounts();
        if (accounts.length === 0) {
          console.error('No Ethereum account found');
          return;
        }

        const renewableContract = new web3.eth.Contract(RenewableEnergyCertificates.abi, CONTRACT_ADDRESS);
        const receiverContract = new web3.eth.Contract(CertificateReceiver.abi, contractAddressrec);

        const totalCertificates = await renewableContract.methods.nextCertificateID().call();
        const ownerCertificates = [];

        for (let i = 0; i < totalCertificates; i++) {
          let cert = await renewableContract.methods.getCertificate(i).call();
          if (cert.ProjectAddress.toLowerCase() === accounts[0].toLowerCase()) {
            ownerCertificates.push(cert);
          }
        }

        const allReceiverCerts = await receiverContract.methods.getAllCertificatesFromFirstContract().call();
        setReceiverCertificates(allReceiverCerts.map(cert => ({
          ...cert,
          stateR: cert.stateR,
          TrackingSystemID: cert.TrackingSystemID
        })));
        setCertificates(ownerCertificates);
      } else {
        console.error('Ethereum wallet is not connected');
      }
    };

    initWeb3();
  }, []);

  const toggleModal = () => setModal(!modal);

  const showCertificateDetails = (cert) => {
    setSelectedCertificate(cert);
    toggleModal();
  };

  const getVerificationProgress = (certificate) => {
    let progress = 0;
    if (certificate.stateA) {
      progress += 50;
      const matchedReceiverCert = receiverCertificates.find(cert => cert.TrackingSystemID === certificate.TrackingSystemID);
      if (matchedReceiverCert && matchedReceiverCert.stateR) {
        progress += 50;
      }
    }
    return progress;
  };

  return (
    <Container>
    <Card>
      <CardBody>
        <center><CardTitle tag="h2">My Certificates</CardTitle></center>
        <Table striped>
          <thead>
            <tr>
              <th>Project Name</th>
              <th>TrackingSystemID</th>
              <th>Type</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((cert, index) => (
              <tr key={index}>
                
                <td>{cert.ProjectName}</td>
                <td>{cert.TrackingSystemID}</td>
                <td>{cert.certificateType}</td>
                <td>
                  <Button color="primary" onClick={() => showCertificateDetails(cert)}>
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal isOpen={modal} toggle={toggleModal}>
  <ModalHeader toggle={toggleModal}>Certificate Details</ModalHeader>
  <ModalBody>
    {selectedCertificate ? (
      <div>
        <p><strong>Type:</strong> {selectedCertificate.certificateType}</p>
        <p><strong>Tracking System ID:</strong> {selectedCertificate.TrackingSystemID}</p>
        <p><strong>Date Of Creation:</strong> {selectedCertificate.certificateData}</p>
        <p><strong>Verification Status:</strong> {getVerificationProgress(selectedCertificate) > 0 ? `${getVerificationProgress(selectedCertificate)}% Verified` : 'Not Verified'}</p>
        <Progress value={getVerificationProgress(selectedCertificate)} style={{ minWidth: "100%" }}>
          {getVerificationProgress(selectedCertificate) > 0 ? `${getVerificationProgress(selectedCertificate)}%` : "0%"}
        </Progress>      </div>
    ) : (
      <p>No certificate selected</p>
    )}
  </ModalBody>
</Modal>

      </CardBody>
    </Card>
    </Container>
  );
};

export default CertificatesView;
