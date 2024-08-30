// import React, { useState, useEffect } from 'react';
// import Web3 from 'web3';
// import { Card, Row, Col, CardTitle, CardBody, Button, Form, FormGroup, Label, Input } from "reactstrap";
// import RenewableEnergyCertificatesABI from '../../ABIs/RenewableEnergyCertificates.json';
// import { Link } from 'react-router-dom';
// import { CONTRACT_ADDRESS } from '../../ABIs/config';

// const AddCertificate = () => {
//   const [formData, setFormData] = useState({
//     certificateData: '',
//     certificateType: '',
//     TrackingSystemID: '',
//     RenewableFuelType: '',
//     RenewableFacilityLocation: '',
//     NameplateCapacityOfProject: '',
//     ProjectName: '',
//     EmissionsRateOfRenewableResource: ''
//   });
//   const [message, setMessage] = useState('');
//   const [account, setAccount] = useState('');
//   const [contract, setContract] = useState(null);

//   useEffect(() => {
//     const initWeb3 = async () => {
//       if (window.ethereum) {
//         window.web3 = new Web3(window.ethereum);
//         await window.ethereum.request({ method: 'eth_requestAccounts' });
//       } else if (window.web3) {
//         window.web3 = new Web3(window.web3.currentProvider);
//       } else {
//         window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
//       }

//       const web3 = window.web3;
//       const accounts = await web3.eth.getAccounts();
//       setAccount(accounts[0]);

//       // Replace with your contract's deployed address
//       // const contractAddress = '0x1c3346E85B1FA5822C12c436dcA28A4eFD371C25';

//       const contract = new web3.eth.Contract(RenewableEnergyCertificatesABI.abi, CONTRACT_ADDRESS);
//       setContract(contract);
//     };

//     initWeb3();
//   }, []);

//   const handleInputChange = (event) => {
//     setFormData({
//       ...formData,
//       [event.target.name]: event.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (contract) {
//       try {
//         await contract.methods.addCertificate(
//           formData.certificateData,
//           formData.certificateType,
//           formData.TrackingSystemID,
//           formData.RenewableFuelType,
//           formData.RenewableFacilityLocation,
//           formData.NameplateCapacityOfProject,
//           formData.ProjectName,
//           formData.EmissionsRateOfRenewableResource
//         ).send({ from: account });
//         setMessage('Certificate added successfully');
//       } catch (error) {
//         setMessage('Error adding certificate');
//         console.error(error);
//       }
//     }
//   };

//   return (
//     <Row>
//       <Col>
//         <Card>
//           <CardTitle tag="h6" className="border-bottom p-3 mb-0">
//             <i className="bi bi-bell me-2"> </i>
//             Certificate Form
//           </CardTitle>
//           <CardBody>
//             <Form onSubmit={handleSubmit}>
//               {Object.keys(formData).map((key) => (
//                 <FormGroup key={key}>
//                   <Label for={key}>{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
//                   <Input
//                     id={key}
//                     name={key}
//                     placeholder={key.replace(/([A-Z])/g, ' $1').trim()}
//                     type="text"
//                     value={formData[key]}
//                     onChange={handleInputChange}
//                   />
//                 </FormGroup>
//               ))}
//               <Button type="submit" className="btn"  outline color="primary"  size="lg" block>Submit</Button>
//             </Form>
//             {/* {message && <p>{message}</p>}
//             <span className="link">
//               Want to go back?{' '}
//               <Link to="/" style={{ cursor: 'pointer' }}>
//                 Click here
//               </Link>
//             </span> */}
//           </CardBody>
//         </Card>
//       </Col>
//     </Row>
//   );
// };

// export default AddCertificate;



import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { Card, Row, Col, CardTitle, CardBody, Button, Form, FormGroup, Label, Input } from "reactstrap";
import RenewableEnergyCertificatesABI from '../../ABIs/RenewableEnergyCertificates.json';
import { CONTRACT_ADDRESS } from '../../ABIs/config';
import RankCertifByEmission from './RankCertifByEmission';
import RankCertifByCapacity from './RankCertifByCapacity';

const AddCertificate = () => {
  const [formData, setFormData] = useState({
    certificateData: new Date().toISOString().split('T')[0], // Set current date
    certificateType: '',
    TrackingSystemID: 'TX-REC-',
    RenewableFuelType: '',
    RenewableFacilityLocation: '',
    NameplateCapacityOfProject: '',
    ProjectName: '',
    EmissionsRateOfRenewableResource: ''
  });
  const [unit, setUnit] = useState('kWh');
  const [message, setMessage] = useState('');
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [projects, setProjects] = useState([]);


  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }

      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      const contract = new web3.eth.Contract(RenewableEnergyCertificatesABI.abi, CONTRACT_ADDRESS);
      setContract(contract);

      // Fetch projects for the current user
      const fetchedProjects = await contract.methods.getProjectsByAddress(accounts[0]).call();
      const activeProjects = fetchedProjects.filter(project => project.verif); // Assuming each project has a 'state' boolean

      setProjects(activeProjects);
    };

    initWeb3();
  }, []);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trackingSystemIDPattern = /^TX-REC-\d+$/;
    if (!trackingSystemIDPattern.test(formData.TrackingSystemID)) {
      setMessage('Tracking System ID must follow the pattern TX-REC- followed by a number.');
      return;
    }
    const combinedCapacity = `${formData.NameplateCapacityOfProject} ${unit}`;
    if (contract) {
      try {
        await contract.methods.addCertificate(
          formData.certificateData,
          formData.certificateType,
          formData.TrackingSystemID,
          formData.RenewableFuelType,
          formData.RenewableFacilityLocation,
          combinedCapacity,
          formData.ProjectName,
          formData.EmissionsRateOfRenewableResource
        ).send({ from: account });
        setMessage('Certificate added successfully');
        window.location.reload();
      } catch (error) {
        setMessage('Error adding certificate');
        console.error(error);
      }
    }
  };

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0" style={{ color: "#13274c", backgroundColor: "#ccdaff" }}>
            <strong><center>
            Certificate Form
            </center></strong>
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="certificateData">Certificate Data</Label>
                <Input
                  id="certificateData"
                  name="certificateData"
                  type="date"
                  value={formData.certificateData}
                  onChange={handleInputChange}
                  readOnly
                />
              </FormGroup>
              <FormGroup>
                <Label for="certificateType">Certificate Type</Label>
                <Input
                  id="certificateType"
                  name="certificateType"
                  type="select"
                  value={formData.certificateType}
                  onChange={handleInputChange}
                required>
                  <option value="">Select Certificate Type</option>
                  <option value="Solar">Solar</option>
                  <option value="Wind">Wind</option>
                  <option value="Hydro">Hydro</option>
                  <option value="Geothermal">Geothermal</option>
                  <option value="Biomass">Biomass</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="TrackingSystemID">Tracking System ID</Label>
                <Input
                  id="TrackingSystemID"
                  name="TrackingSystemID"
                  type="text"
                  value={formData.TrackingSystemID}
                  onChange={handleInputChange}
                  placeholder="TX-REC-"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="RenewableFuelType">Renewable Fuel Type</Label>
                <Input
                  id="RenewableFuelType"
                  name="RenewableFuelType"
                  type="select"
                  value={formData.RenewableFuelType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Renewable Fuel Type</option>
                  <option value="Solar Photovoltaic">Solar Photovoltaic</option>
                  <option value="Wind">Wind</option>
                  <option value="Hydropower">Hydropower</option>
                  <option value="Geothermal">Geothermal</option>
                  <option value="Biomass">Biomass</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="RenewableFacilityLocation">Renewable Facility Location</Label>
                <Input
                  id="RenewableFacilityLocation"
                  name="RenewableFacilityLocation"
                  type="select"
                  value={formData.RenewableFacilityLocation}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Location</option>
                  <option value="Algeria">Algeria</option>
                  <option value="Angola">Angola</option>
                  <option value="Bahrain">Bahrain</option>
                  <option value="Botswana">Botswana</option>
                  <option value="Cameroon">Cameroon</option>
                  <option value="Chad">Chad</option>
                  <option value="Egypt">Egypt</option>
                  <option value="Ethiopia">Ethiopia</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Ivory Coast">Ivory Coast</option>
                  <option value="Jordan">Jordan</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Kuwait">Kuwait</option>
                  <option value="Lebanon">Lebanon</option>
                  <option value="Libya">Libya</option>
                  <option value="Morocco">Morocco</option>
                  <option value="Namibia">Namibia</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Oman">Oman</option>
                  <option value="Qatar">Qatar</option>
                  <option value="Rwanda">Rwanda</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Senegal">Senegal</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Tanzania">Tanzania</option>
                  <option value="Tunisia">Tunisia</option>
                  <option value="Uganda">Uganda</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Zambia">Zambia</option>
                  <option value="Zimbabwe">Zimbabwe</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="NameplateCapacityOfProject">Nameplate Capacity of Project</Label>
                <Input
                  id="NameplateCapacityOfProject"
                  name="NameplateCapacityOfProject"
                  type="number"
                  value={formData.NameplateCapacityOfProject}
                  onChange={handleInputChange}
                  placeholder='MW-h'
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="ProjectName">Project Name</Label>
                <Input
                  id="ProjectName"
                  name="ProjectName"
                  type="select"
                  value={formData.ProjectName}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Project</option>
                  {projects.map((project, index) => (
                    <option key={index} value={project.projectName}>
                      {project.projectName}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="EmissionsRateOfRenewableResource">Emissions Rate of Renewable Resource</Label>
                <Input
                  id="EmissionsRateOfRenewableResource"
                  name="EmissionsRateOfRenewableResource"
                  type="number"
                  value={formData.EmissionsRateOfRenewableResource}
                  onChange={handleInputChange}
                  placeholder='KG CO2e/MWh'
                  required
                />
              </FormGroup>
              <Button type="submit" outline color="primary" size="lg" block>Submit</Button>
            </Form>
            {message && <p>{message}</p>}
          </CardBody>
        </Card>
      </Col>
      <Col sm="6" lg="6" xl="5" xxl="4">
          <Row>
          <RankCertifByEmission />
          </Row>
          <Row>
            <RankCertifByCapacity />
          </Row>
        </Col>

        
    </Row>
    
  );
}
export default AddCertificate;