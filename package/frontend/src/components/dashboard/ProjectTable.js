// import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
// import user1 from "../../assets/images/users/user1.jpg";
// import user2 from "../../assets/images/users/user2.jpg";
// import user3 from "../../assets/images/users/user3.jpg";
// import user4 from "../../assets/images/users/user4.jpg";
// import user5 from "../../assets/images/users/user5.jpg";

// const tableData = [
//   {
//     avatar: user1,
//     name: "Hanna Gover",
//     email: "hgover@gmail.com",
//     project: "Flexy React",
//     status: "pending",
//     weeks: "35",
//     budget: "95K",
//   },
//   {
//     avatar: user2,
//     name: "Hanna Gover",
//     email: "hgover@gmail.com",
//     project: "Lading pro React",
//     status: "done",
//     weeks: "35",
//     budget: "95K",
//   },
//   {
//     avatar: user3,
//     name: "Hanna Gover",
//     email: "hgover@gmail.com",
//     project: "Elite React",
//     status: "holt",
//     weeks: "35",
//     budget: "95K",
//   },
//   {
//     avatar: user4,
//     name: "Hanna Gover",
//     email: "hgover@gmail.com",
//     project: "Flexy React",
//     status: "pending",
//     weeks: "35",
//     budget: "95K",
//   },
//   {
//     avatar: user5,
//     name: "Hanna Gover",
//     email: "hgover@gmail.com",
//     project: "Ample React",
//     status: "done",
//     weeks: "35",
//     budget: "95K",
//   },
// ];

// const ProjectTables = () => {
//   return (
//     <div>
//       <Card>
//         <CardBody>
//           <CardTitle tag="h5">Project Listing</CardTitle>
//           <CardSubtitle className="mb-2 text-muted" tag="h6">
//             Overview of the projects
//           </CardSubtitle>

//           <Table className="no-wrap mt-3 align-middle" responsive borderless>
//             <thead>
//               <tr>
//                 <th>Team Lead</th>
//                 <th>Project</th>

//                 <th>Status</th>
//                 <th>Weeks</th>
//                 <th>Budget</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tableData.map((tdata, index) => (
//                 <tr key={index} className="border-top">
//                   <td>
//                     <div className="d-flex align-items-center p-2">
//                       <img
//                         src={tdata.avatar}
//                         className="rounded-circle"
//                         alt="avatar"
//                         width="45"
//                         height="45"
//                       />
//                       <div className="ms-3">
//                         <h6 className="mb-0">{tdata.name}</h6>
//                         <span className="text-muted">{tdata.email}</span>
//                       </div>
//                     </div>
//                   </td>
//                   <td>{tdata.project}</td>
//                   <td>
//                     {tdata.status === "pending" ? (
//                       <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
//                     ) : tdata.status === "holt" ? (
//                       <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
//                     ) : (
//                       <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
//                     )}
//                   </td>
//                   <td>{tdata.weeks}</td>
//                   <td>{tdata.budget}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </CardBody>
//       </Card>
//     </div>
//   );
// };

// export default ProjectTables;

import React, { useEffect, useState } from "react";
import Web3 from "web3";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table
} from "reactstrap";
import axios from 'axios';

import RenewableEnergyCertificates from '../../ABIs/RenewableEnergyCertificates.json';
import { CONTRACT_ADDRESS } from '../../ABIs/config';

  const ProjectTables = () => {
  const [projects, setProjects] = useState([]);
  const fetchUserName = async (publicKey) => {
    try {
      const response = await axios.post('http://localhost:5001/user-details', { publicKey });
      return response.data.user.name;
    } catch (error) {
      console.error('Failed to fetch user name:', error);
      return null; // or return publicKey if you want to fallback to displaying publicKeys
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
        const contractInstance = new web3.eth.Contract(RenewableEnergyCertificates.abi, CONTRACT_ADDRESS);

        // Fetch all projects
        const projectsArray = await contractInstance.methods.getAllProjects().call();
        const projectsWithNames = await Promise.all(
          projectsArray.map(async (project) => {
            const userName = await fetchUserName(project.owner);
            const country = await fetchCountryName(project.latitude, project.longitude);
            return { ...project, ownerName: userName, country };
          })
        );
        console.log(projectsArray);
        setProjects(projectsWithNames);
      } catch (error) {
        console.error("Error initializing web3 or fetching projects:", error);
      }
    };

    initWeb3();
  }, []);

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Project Listing</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Overview of the projects
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Owner</th> 
                <th>Project Name</th>
                <th>Vision</th>
                <th>Domain</th>
                <th>Status</th>
                <th>Country</th>
                
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={index} className="border-top">
                  <td>{project.ownerName}</td>
                  <td>{project.projectName}</td>
                  <td>{project.vision}</td>
                  <td>{project.domain}</td>
                  <td>
                    {project.verif ? (
                      <span className="p-2 bg-success rounded-circle d-inline-block"></span>
                    ) : (
                      <span className="p-2 bg-danger rounded-circle d-inline-block"></span>
                    )}
                  </td>
                  <td>{project.country}</td>
                  
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProjectTables;
