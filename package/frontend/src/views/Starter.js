

import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { Card, Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import CertificateDistributionPieChart from "../components/dashboard/CertificateDistributionPieChart";
import Feeds from "../components/dashboard/Feeds";
import ProjectTables from "../components/dashboard/ProjectTable";
import TopCards from "../components/dashboard/TopCards";
// import Blog from "../components/dashboard/Blog";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// import bg1 from "../assets/images/bg/bg1.jpg";
// import bg2 from "../assets/images/bg/bg2.jpg";
// import bg3 from "../assets/images/bg/bg3.jpg";
// import bg4 from "../assets/images/bg/bg4.jpg";
import StackedBarChart from '../components/dashboard/StackedBarChart';
import RenewableEnergyCertificates from '../ABIs/RenewableEnergyCertificates.json';
import CertificateReceiver from '../ABIs/CertificateReceiver.json';
import CertificateListing from '../ABIs/CertificateListing.json';
import NFTTokenABI from '../ABIs/NFTToken.json';
import NFTMarketplaceABI from '../ABIs/NFTMarketplaceABI.json';
import { CONTRACT_ADDRESS, contractAddressrec, ListingContractaddress, contractAddressNftToken ,contractAddressNftMarketplace } from '../ABIs/config';
import './starter.css';
import axios from 'axios';
 


// const BlogData = [
//   {
//     image: bg1,
//     title: "This is simple blog",
//     subtitle: "2 comments, 1 Like",
//     description:
//       "This is a wider card with supporting text below as a natural lead-in to additional content.",
//     btnbg: "primary",
//   },
//   {
//     image: bg2,
//     title: "Lets be simple blog",
//     subtitle: "2 comments, 1 Like",
//     description:
//       "This is a wider card with supporting text below as a natural lead-in to additional content.",
//     btnbg: "primary",
//   },
//   {
//     image: bg3,
//     title: "Don't Lamp blog",
//     subtitle: "2 comments, 1 Like",
//     description:
//       "This is a wider card with supporting text below as a natural lead-in to additional content.",
//     btnbg: "primary",
//   },
//   {
//     image: bg4,
//     title: "Simple is beautiful",
//     subtitle: "2 comments, 1 Like",
//     description:
//       "This is a wider card with supporting text below as a natural lead-in to additional content.",
//     btnbg: "primary",
//   },
// ];

// Fixing leaflet's default icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Starter = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [certificatesData, setCertificatesData] = useState({
    notVerifiedByAuthority: [],
    notVerifiedByRegistry: [],
    fullyVerified: []
  });
  const [totalSales, setTotalSales] = useState(0);
  const [verifiedProjectsCount, setVerifiedProjectsCount] = useState(0);
  const [weeklySales, setWeeklySales] = useState(0);
  const [burnedCertificatesCount, setBurnedCertificatesCount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);


  const fetchUserName = async (publicKey) => {
    try {
      const response = await axios.post('http://localhost:5001/user-details', { publicKey });
      return response.data.user.name;
    } catch (error) {
      console.error('Failed to fetch user name:', error);
      return publicKey; // fallback to displaying publicKey
    }
  };
 
  const fetchCountryName = async (lat, lon) => {
    try {
      const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=9961e6bfcb2b4af8a0217dbd33e4ab44`);
      const country = response.data.results[0].components.country;
      return country;
    } catch (error) {
      console.error('Failed to fetch country name:', error);
      return 'Unknown';
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }

      const web3 = window.web3;
      const contract = new web3.eth.Contract(RenewableEnergyCertificates.abi, CONTRACT_ADDRESS);

      try {
        const allProjects = await contract.methods.getAllProjects().call();
        const projectsWithNames = await Promise.all(
          allProjects.map(async (project) => {
            const userName = await fetchUserName(project.owner);
            const country = await fetchCountryName(project.latitude, project.longitude);
            return { ...project, ownerName: userName, country };
          })
        );
        setProjects(projectsWithNames);

        const verifiedCount = projectsWithNames.filter(project => project.verif).length;
        setVerifiedProjectsCount(verifiedCount);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }

      



      const recContract = new web3.eth.Contract(RenewableEnergyCertificates.abi, CONTRACT_ADDRESS);
    const crcContract = new web3.eth.Contract(CertificateReceiver.abi, contractAddressrec);
    const clcContract = new web3.eth.Contract(CertificateListing.abi, ListingContractaddress);

    const allCertificates = await recContract.methods.getAllCertificates().call();
    const notVerifiedByAuthority = allCertificates.filter(cert => !cert.stateA);

    const allCertificatesFromCRC = await crcContract.methods.getAllCertificatesFromFirstContract().call();
    const notVerifiedByRegistry = allCertificatesFromCRC.filter(cert => !cert.stateR);

    const fullyVerified = await clcContract.methods.getStoredVerifiedCertificates().call();

    setCertificatesData({
      notVerifiedByAuthority,
      notVerifiedByRegistry,
      fullyVerified
    });
    };
    const fetchData = async () => {
      if (!window.ethereum) {
        alert('Non-Ethereum browser detected. Consider trying MetaMask!');
        return;
      }
  
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
  
      // Initialize nftTokenContract here
      const nftTokenContract = new web3.eth.Contract(NFTTokenABI.abi, contractAddressNftToken);
  
      // Fetch total sales and weekly sales
      const contract = new web3.eth.Contract(NFTMarketplaceABI.abi, contractAddressNftMarketplace);
      const sales = await contract.methods.getSalesTable().call();
      let totalSales = 0;
      let weeklySales = 0;
      let salesCount = sales.length; // Total number of sales
      const currentTime = Math.floor(Date.now() / 1000);
      const oneWeekAgo = currentTime - (7 * 24 * 60 * 60);
  
      for (const sale of sales) {
        const saleAmount = parseFloat(web3.utils.fromWei(sale[4].toString(), 'ether'));
        totalSales += saleAmount;
        if (sale[5] >= oneWeekAgo) {
          weeklySales += saleAmount;
        }
      }
  
      setTotalSales(totalSales);
      setWeeklySales(weeklySales);
      setSalesCount(salesCount); // Set the total number of sales
  
      // Fetch number of burned certificates
      const totalSupply = await nftTokenContract.methods.totalSupply().call();
      const burnedCount = totalSupply; // Assuming that `totalSupply` reflects the burned tokens
  
      setBurnedCertificatesCount(burnedCount);
  
      console.log('Total sales:', totalSales);
      console.log('Weekly sales:', weeklySales);
      console.log('Burned certificates:', burnedCount);
      console.log('Sales count:', salesCount); // Log the sales count
    };
  
  

    fetchProjects();
    fetchData();

  }, []);

  return (
    <div>
      {/***Top Cards***/}
      <Row>
        <Col sm="6" lg="3">
        <TopCards
            bg="bg-light-success text-success"
            title="Profit"
            subtitle="Yearly Earning"
            earning={`${totalSales.toFixed(2)}ETH`}
            icon="bi bi-wallet"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-danger text-danger"
            title="Burned Certificates"
            subtitle="Total Supply Of Certificates"
            earning={burnedCertificatesCount.toString()}
            icon="bi bi-coin"
          />
        </Col>
        <Col sm="6" lg="3">
        <TopCards
          bg="bg-light-warning text-warning"
          title="Verified Projects"
          subtitle="Yearly Verified Projects"
          earning={verifiedProjectsCount.toString()}
          icon="bi bi-basket3"
        />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-info text-into"
            title="Sales"
            subtitle="Total Sales"
            earning={`${salesCount}`} // Display the total sales count
            icon="bi bi-bag"
          />
        </Col>
      </Row>
      {/***Sales & Feed***/}
      <Row>
        <Col sm="6" lg="6" xl="7" xxl="8">
          <SalesChart />
        </Col>
        <Col sm="6" lg="6" xl="5" xxl="4">
          <Feeds />
        </Col>
      </Row>
      <Row>
        <Col sm="6" lg="6" xl="3" xxl="6">
          
          <CertificateDistributionPieChart />
          
        </Col>
        <Col sm="6" lg="6" xl="3" xxl="6">
          
          <StackedBarChart data={certificatesData} />
          
        </Col>
      </Row>
      {/***Table ***/}
      <Row>
        <Col lg="12">
          <ProjectTables />
        </Col>
      </Row>
      {/***Map***/}
      <div className='card'>
      <Row>
        {/* <Col lg="12">
          <MapContainer center={[36.640215, 10.156875]} zoom={5} style={{ height: '400px', width: '100%' }}>
            <TileLayer
              url="https://api.maptiler.com/maps/satellite/256/{z}/{x}/{y}.jpg?key=lPEKpIvVRQA3tm7vvJRG"
            />
            {projects.map((project, index) => (
              <Marker
                key={index}
                position={[project.latitude, project.longitude]}
                eventHandlers={{
                  click: () => {
                    setSelectedProject(project);
                  },
                }}
              >
                {selectedProject && selectedProject.projectID === project.projectID && (
                  <Popup>
                    <div>
                      <h4>{selectedProject.projectName}</h4>
                      <p>{selectedProject.vision}</p>
                      <p>Domain: {selectedProject.domain}</p>
                      <p>Latitude: {selectedProject.latitude}</p>
                      <p>Longitude: {selectedProject.longitude}</p>
                    </div>
                  </Popup>
                )}
              </Marker>
            ))}
          </MapContainer>
        </Col> */}
        <Col lg="12">
      <MapContainer center={[36.640215, 10.156875]} zoom={5} style={{ height: '400px', width: '100%' }}>
        {/* Satellite layer from MapTiler */}
        <TileLayer
          url="https://api.maptiler.com/maps/satellite/256/{z}/{x}/{y}.jpg?key=lPEKpIvVRQA3tm7vvJRG"
        />
        {/* Overlay layer with labels from OpenStreetMap */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {projects.map((project, index) => (
          <Marker
            key={index}
            position={[project.latitude, project.longitude]}
            eventHandlers={{
              click: () => {
                setSelectedProject(project);
              },
            }}
          >
            {/* {selectedProject && selectedProject.projectID === project.projectID && (
              <Popup>
                <div className="popup-container">
                  <div className="popup-header">
                    <h4>{selectedProject.projectName}</h4>
                  </div>
                  <p>Project Owner: {selectedProject.owner}</p>
                  <p>vision: {selectedProject.vision}</p>
                  <p>Domain: {selectedProject.domain}</p>
                  <p>Latitude: {selectedProject.latitude}</p>
                  <p>Longitude: {selectedProject.longitude}</p>
                  <p>Verified: {selectedProject.verif.toString()}</p>
                </div>
              </Popup>
            )} */}
            {selectedProject && selectedProject.projectID === project.projectID && (
                <Popup>
                  <div className="popup-container">
                    <div className="popup-header">
                      <h4>{selectedProject.projectName}</h4>
                      <span className="popup-close" onClick={() => setSelectedProject(null)}>×</span>
                    </div>
                    <div className="popup-content">
                      <table className="popup-table">
                        <tbody>
                          <tr>
                            <td><strong>Domain:</strong></td>
                            <td>{selectedProject.domain}</td>
                          </tr>
                          <tr>
                            <td><strong>Project Owner:</strong></td>
                            <td>{selectedProject.ownerName}</td>
                          </tr>
                          <tr>
                            <td><strong>Location:</strong></td>
                            <td>{selectedProject.country}</td> {/* Display the country name */}
                          </tr>
                          <tr>
                            <td><strong>Verification:</strong></td>
                            <td>{selectedProject.verif.toString()}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Popup>
              )}



          </Marker>
        ))}
      </MapContainer>
    </Col>
      </Row>
      </div>
      {/***Blog Cards***/}
      <Row>
        {/* {BlogData.map((blg, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <Blog
              image={blg.image}
              title={blg.title}
              subtitle={blg.subtitle}
              text={blg.description}
              color={blg.btnbg}
            />
          </Col>
        ))} */}
      </Row>
    </div>
  );
};

export default Starter;
