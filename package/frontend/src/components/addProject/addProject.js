


// import React, { useState, useEffect } from 'react';
// import Web3 from 'web3';
// import { Card, Row, Col, CardTitle, CardBody, Button, Form, FormGroup, Label, Input } from "reactstrap";
// import RenewableEnergyCertificatesABI from '../../ABIs/RenewableEnergyCertificates.json';
// import { CONTRACT_ADDRESS } from '../../ABIs/config';
// import RankProjectsByCertificateCount from './RankProjectsByCertificateCount';
// import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// // Fixing leaflet's default icon issue in React
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });

// const AddProject = () => {
//   const [formData, setFormData] = useState({
//     projectName: '',
//     vision: '',
//     domain: '',
//     latitude: null,
//     longitude: null
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
//         await contract.methods.addProject(
//           formData.projectName,
//           formData.vision,
//           formData.domain,
//           formData.latitude,
//           formData.longitude
//         ).send({ from: account });
//         setMessage('Project added successfully');
//       } catch (error) {
//         setMessage('Error adding project');
//         console.error(error);
//       }
//     }
//   };

//   const MapClickHandler = () => {
//     useMapEvents({
//       click: (e) => {
//         console.log('Map clicked at', e.latlng); // Log click location
//         setFormData({
//           ...formData,
//           latitude: e.latlng.lat,
//           longitude: e.latlng.lng
//         });
//       },
//     });
//     return null;
//   };

//   return (
//     <Row>
//       <Col>
//         <Card>
//           <CardTitle tag="h6" className="border-bottom p-3 mb-0">
//             <i className="bi bi-bell me-2"> </i>
//             Project Form
//           </CardTitle>
//           <CardBody>
//             <Form onSubmit={handleSubmit}>
//               <FormGroup>
//                 <Label for="projectName">Project Name</Label>
//                 <Input
//                   id="projectName"
//                   name="projectName"
//                   placeholder="Project Name"
//                   type="text"
//                   value={formData.projectName}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <Label for="vision">Vision</Label>
//                 <Input
//                   id="vision"
//                   name="vision"
//                   placeholder="Vision"
//                   type="text"
//                   value={formData.vision}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <Label for="domain">Domain</Label>
//                 <Input
//                   type="select"
//                   id="domain"
//                   name="domain"
//                   value={formData.domain}
//                   onChange={handleInputChange}
//                   required
//                 >
//                   <option value="">Select Domain</option>
//                   <option value="Solar power">Solar power</option>
//                   <option value="Wind power">Wind power</option>
//                   <option value="Hydroelectricity">Hydroelectricity</option>
//                   <option value="Geothermal energy">Geothermal energy</option>
//                   <option value="Biomass">Biomass</option>
//                 </Input>
//               </FormGroup>
//               <FormGroup>
//                 <Label for="latitude">Latitude</Label>
//                 <Input
//                   id="latitude"
//                   name="latitude"
//                   placeholder="Latitude"
//                   type="text"
//                   value={formData.latitude || ''}
//                   readOnly
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <Label for="longitude">Longitude</Label>
//                 <Input
//                   id="longitude"
//                   name="longitude"
//                   placeholder="Longitude"
//                   type="text"
//                   value={formData.longitude || ''}
//                   readOnly
//                 />
//               </FormGroup>

//               <MapContainer center={[36.640215, 10.156875]} zoom={5} style={{ height: '400px', width: '100%' }}>
//           <TileLayer
//             url="https://api.maptiler.com/maps/satellite/256/{z}/{x}/{y}.jpg?key=lPEKpIvVRQA3tm7vvJRG"
//           />
//           <MapClickHandler />
//           {formData.latitude && formData.longitude && (
//             <Marker position={[formData.latitude, formData.longitude]} />
//           )}
//         </MapContainer>
//               <Button type="submit" className="btn" outline color="primary" size="lg" block>Submit</Button>
//             </Form>
//             {message && <p>{message}</p>}
//           </CardBody>
//         </Card>
        
//       </Col>
//       <Col sm="6" lg="6" xl="5" xxl="4">
//         <RankProjectsByCertificateCount />
//       </Col>
//     </Row>
//   );
// };

// export default AddProject;
// import React, { useState, useEffect } from 'react';
// import Web3 from 'web3';
// import { Card, Row, Col, CardTitle, CardBody, Button, Form, FormGroup, Label, Input } from "reactstrap";
// import RenewableEnergyCertificatesABI from '../../ABIs/RenewableEnergyCertificates.json';
// import { CONTRACT_ADDRESS } from '../../ABIs/config';
// import RankProjectsByCertificateCount from './RankProjectsByCertificateCount';
// import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// // Fixing leaflet's default icon issue in React
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });

// const AddProject = () => {
//   const [formData, setFormData] = useState({
//     projectName: '',
//     vision: '',
//     domain: '',
//     latitude: null,
//     longitude: null
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
//         await contract.methods.addProject(
//           formData.projectName,
//           formData.vision,
//           formData.domain,
//           formData.latitude,
//           formData.longitude
//         ).send({ from: account });
//         setMessage('Project added successfully');
//       } catch (error) {
//         setMessage('Error adding project');
//         console.error(error);
//       }
//     }
//   };

//   const MapClickHandler = () => {
//     useMapEvents({
//       click: (e) => {
//         console.log('Map clicked at', e.latlng); // Log click location
//         setFormData({
//           ...formData,
//           latitude: e.latlng.lat,
//           longitude: e.latlng.lng
//         });
//       },
//     });
//     return null;
//   };

//   return (
//     <Row>
//       <Col>
//         <Card>
//           <CardTitle tag="h6" className="border-bottom p-3 mb-0">
//             <i className="bi bi-bell me-2"> </i>
//             Project Form
//           </CardTitle>
//           <CardBody>
//             <Form onSubmit={handleSubmit}>
//               <FormGroup>
//                 <Label for="projectName">Project Name</Label>
//                 <Input
//                   id="projectName"
//                   name="projectName"
//                   placeholder="Project Name"
//                   type="text"
//                   value={formData.projectName}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <Label for="vision">Vision</Label>
//                 <Input
//                   id="vision"
//                   name="vision"
//                   placeholder="Vision"
//                   type="text"
//                   value={formData.vision}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <Label for="domain">Domain</Label>
//                 <Input
//                   type="select"
//                   id="domain"
//                   name="domain"
//                   value={formData.domain}
//                   onChange={handleInputChange}
//                   required
//                 >
//                   <option value="">Select Domain</option>
//                   <option value="Solar power">Solar power</option>
//                   <option value="Wind power">Wind power</option>
//                   <option value="Hydroelectricity">Hydroelectricity</option>
//                   <option value="Geothermal energy">Geothermal energy</option>
//                   <option value="Biomass">Biomass</option>
//                 </Input>
//               </FormGroup>
//               <FormGroup>
//                 <Label for="latitude">Latitude</Label>
//                 <Input
//                   id="latitude"
//                   name="latitude"
//                   placeholder="Latitude"
//                   type="text"
//                   value={formData.latitude || ''}
//                   readOnly
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <Label for="longitude">Longitude</Label>
//                 <Input
//                   id="longitude"
//                   name="longitude"
//                   placeholder="Longitude"
//                   type="text"
//                   value={formData.longitude || ''}
//                   readOnly
//                 />
//               </FormGroup>
//               <MapContainer center={[36.640215, 10.156875]} zoom={5} style={{ height: '400px', width: '100%' }}>
//                 <TileLayer
//                   url="https://api.maptiler.com/maps/satellite/256/{z}/{x}/{y}.jpg?key=lPEKpIvVRQA3tm7vvJRG"
//                 />
//                 <MapClickHandler />
//                 {formData.latitude && formData.longitude && (
//                   <Marker position={[formData.latitude, formData.longitude]} />
//                 )}
//               </MapContainer>
//               <Button type="submit" className="btn" outline color="primary" size="lg" block>Submit</Button>
//             </Form>
//             {message && <p>{message}</p>}
//           </CardBody>
//         </Card>
//       </Col>
//       <Col sm="6" lg="6" xl="5" xxl="4">
//         <RankProjectsByCertificateCount />
//       </Col>
//     </Row>
//   );
// };

// export default AddProject;


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// import React, { useState, useEffect } from 'react';
// import Web3 from 'web3';
// import { Card, Row, Col, CardTitle, CardBody, Button, Form, FormGroup, Label, Input } from "reactstrap";
// import RenewableEnergyCertificatesABI from '../../ABIs/RenewableEnergyCertificates.json';
// import { CONTRACT_ADDRESS } from '../../ABIs/config';
// import RankProjectsByCertificateCount from './RankProjectsByCertificateCount';
// import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// // Fixing leaflet's default icon issue in React
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });

// const AddProject = () => {
//   const [formData, setFormData] = useState({
//     projectName: '',
//     vision: '',
//     domain: '',
//     latitude: '',
//     longitude: ''
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
//         await contract.methods.addProject(
//           formData.projectName,
//           formData.vision,
//           formData.domain,
//           formData.latitude,
//           formData.longitude
//         ).send({ from: account });
//         setMessage('Project added successfully');
//       } catch (error) {
//         setMessage('Error adding project');
//         console.error(error);
//       }
//     }
//   };

//   const MapClickHandler = () => {
//     useMapEvents({
//       click: (e) => {
//         setFormData({
//           ...formData,
//           latitude: e.latlng.lat.toString(),
//           longitude: e.latlng.lng.toString()
//         });
//       },
//     });
//     return null;
//   };

//   return (
//     <Row>
//       <Col>
//         <Card>
//           <CardTitle tag="h6" className="border-bottom p-3 mb-0">
//             <i className="bi bi-bell me-2"> </i>
//             Project Form
//           </CardTitle>
//           <CardBody>
//             <Form onSubmit={handleSubmit}>
//               <FormGroup>
//                 <Label for="projectName">Project Name</Label>
//                 <Input
//                   id="projectName"
//                   name="projectName"
//                   placeholder="Project Name"
//                   type="text"
//                   value={formData.projectName}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <Label for="vision">Vision</Label>
//                 <Input
//                   id="vision"
//                   name="vision"
//                   placeholder="Vision"
//                   type="text"
//                   value={formData.vision}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <Label for="domain">Domain</Label>
//                 <Input
//                   type="select"
//                   id="domain"
//                   name="domain"
//                   value={formData.domain}
//                   onChange={handleInputChange}
//                   required
//                 >
//                   <option value="">Select Domain</option>
//                   <option value="Solar power">Solar power</option>
//                   <option value="Wind power">Wind power</option>
//                   <option value="Hydroelectricity">Hydroelectricity</option>
//                   <option value="Geothermal energy">Geothermal energy</option>
//                   <option value="Biomass">Biomass</option>
//                 </Input>
//               </FormGroup>
//               <FormGroup>
//                 <Label for="latitude">Latitude</Label>
//                 <Input
//                   id="latitude"
//                   name="latitude"
//                   placeholder="Latitude"
//                   type="text"
//                   value={formData.latitude}
//                   readOnly
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <Label for="longitude">Longitude</Label>
//                 <Input
//                   id="longitude"
//                   name="longitude"
//                   placeholder="Longitude"
//                   type="text"
//                   value={formData.longitude}
//                   readOnly
//                 />
//               </FormGroup>
//               <MapContainer center={[36.640215, 10.156875]} zoom={5} style={{ height: '400px', width: '100%' }}>
//                 <TileLayer
//                   url="https://api.maptiler.com/maps/satellite/256/{z}/{x}/{y}.jpg?key=lPEKpIvVRQA3tm7vvJRG"
//                 />
//                 <MapClickHandler />
//                 {formData.latitude && formData.longitude && (
//                   <Marker position={[formData.latitude, formData.longitude]} />
//                 )}
//               </MapContainer>
//               <Button type="submit" className="btn" outline color="primary" size="lg" block>Submit</Button>
//             </Form>
//             {message && <p>{message}</p>}
//           </CardBody>
//         </Card>
//       </Col>
//       <Col sm="6" lg="6" xl="5" xxl="4">
//         <RankProjectsByCertificateCount />
//       </Col>
//     </Row>
//   );
// };

// export default AddProject;
//////////////////////////////////////////////////////////////***************************************************** */
// import React, { useState, useEffect } from 'react';
// import Web3 from 'web3';
// import { Card, Row, Col, CardTitle, CardBody, Button, Form, FormGroup, Label, Input } from "reactstrap";
// import RenewableEnergyCertificatesABI from '../../ABIs/RenewableEnergyCertificates.json';
// import { CONTRACT_ADDRESS } from '../../ABIs/config';
// import RankProjectsByCertificateCount from './RankProjectsByCertificateCount';
// import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// // Fixing leaflet's default icon issue in React
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });

// const AddProject = () => {
//   const [formData, setFormData] = useState({
//     projectName: '',
//     vision: '',
//     domain: '',
//     latitude: '',
//     longitude: '',
//     image: ''
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

//       const contract = new web3.eth.Contract(RenewableEnergyCertificatesABI.abi, CONTRACT_ADDRESS);
//       setContract(contract);
//     };

//     initWeb3();
//   }, []);

//   const handleInputChange = (event) => {
//     const { name, value, files } = event.target;
//     if (name === 'image' && files.length > 0) {
//       const reader = new FileReader();
//       reader.readAsDataURL(files[0]);
//       reader.onloadend = () => {
//         setFormData({
//           ...formData,
//           [name]: reader.result,
//         });
//       };
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (contract) {
//       try {
//         // Save the project to the blockchain
//         await contract.methods.addProject(
//           formData.projectName,
//           formData.vision,
//           formData.domain,
//           formData.latitude,
//           formData.longitude
//         ).send({ from: account });

//         // Save the project data and image to the server
//         const response = await fetch('http://localhost:5001/add-project', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             owner: account,
//             projectName: formData.projectName,
//             vision: formData.vision,
//             domain: formData.domain,
//             latitude: formData.latitude,
//             longitude: formData.longitude,
//             image: formData.image,
//             publicKey: account,
//           }),
//         });
//         console.log(account);

//         const data = await response.json();
//         if (data.success) {
//           setMessage('Project added successfully');
//           window.location.reload();
//         } else {
//           setMessage('Error adding project');
//         }
//       } catch (error) {
//         setMessage('Error adding project');
//         console.error(error);
//       }
//     }
//   };

//   const MapClickHandler = () => {
//     useMapEvents({
//       click: (e) => {
//         setFormData({
//           ...formData,
//           latitude: e.latlng.lat.toString(),
//           longitude: e.latlng.lng.toString()
//         });
//       },
//     });
//     return null;
//   };

//   return (
//     <Row>
//       <Col>
//         <Card>
//           <CardTitle tag="h6" className="border-bottom p-3 mb-0">
//             <i className="bi bi-bell me-2"> </i>
//             Project Form
//           </CardTitle>
//           <CardBody>
//             <Form onSubmit={handleSubmit}>
//               <FormGroup>
//                 <Label for="projectName">Project Name</Label>
//                 <Input
//                   id="projectName"
//                   name="projectName"
//                   placeholder="Project Name"
//                   type="text"
//                   value={formData.projectName}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <Label for="vision">Vision</Label>
//                 <Input
//                   id="vision"
//                   name="vision"
//                   placeholder="Vision"
//                   type="text"
//                   value={formData.vision}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <Label for="domain">Domain</Label>
//                 <Input
//                   type="select"
//                   id="domain"
//                   name="domain"
//                   value={formData.domain}
//                   onChange={handleInputChange}
//                   required
//                 >
//                   <option value="">Select Domain</option>
//                   <option value="Solar power">Solar power</option>
//                   <option value="Wind power">Wind power</option>
//                   <option value="Hydroelectricity">Hydroelectricity</option>
//                   <option value="Geothermal energy">Geothermal energy</option>
//                   <option value="Biomass">Biomass</option>
//                 </Input>
//               </FormGroup>
//               <FormGroup>
//                 <Label for="latitude">Latitude</Label>
//                 <Input
//                   id="latitude"
//                   name="latitude"
//                   placeholder="Latitude"
//                   type="text"
//                   value={formData.latitude}
//                   readOnly
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <Label for="longitude">Longitude</Label>
//                 <Input
//                   id="longitude"
//                   name="longitude"
//                   placeholder="Longitude"
//                   type="text"
//                   value={formData.longitude}
//                   readOnly
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <Label for="image">Image</Label>
//                 <Input
//                   id="image"
//                   name="image"
//                   type="file"
//                   accept="image/*"
//                   onChange={handleInputChange}
//                   required
//                 />
//               </FormGroup>
//               <Card>
//               <MapContainer center={[36.640215, 10.156875]} zoom={5} style={{ height: '400px', width: '100%' }}>
//                 <TileLayer
//                   url="https://api.maptiler.com/maps/satellite/256/{z}/{x}/{y}.jpg?key=lPEKpIvVRQA3tm7vvJRG"
//                 />
//                 <MapClickHandler />
//                 {formData.latitude && formData.longitude && (
//                   <Marker position={[formData.latitude, formData.longitude]} />
//                 )}
//               </MapContainer>
//               </Card>
//               <Button type="submit" className="btn" outline color="primary" size="lg" block>Submit</Button>
//             </Form>
//             {message && <p>{message}</p>}
//           </CardBody>
//         </Card>
//       </Col>
//       <Col sm="6" lg="6" xl="5" xxl="4">
//         <RankProjectsByCertificateCount />
//       </Col>
//     </Row>
//   );
// };

// export default AddProject;
//////////////////////////////////////////////////////////////************************************ */

import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { Card, Row, Col, CardTitle, CardBody, Button, Form, FormGroup, Label, Input } from "reactstrap";
import RenewableEnergyCertificatesABI from '../../ABIs/RenewableEnergyCertificates.json';
import { CONTRACT_ADDRESS } from '../../ABIs/config';
import RankProjectsByCertificateCount from './RankProjectsByCertificateCount';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './addProject.css';
import { RiProjectorLine } from "react-icons/ri";

// Fixing leaflet's default icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const AddProject = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    vision: '',
    domain: '',
    latitude: '',
    longitude: '',
    country: '',
    image: ''
  });
  const [message, setMessage] = useState('');
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);

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
    };

    initWeb3();
  }, []);

  useEffect(() => {
    const getCurrentPosition = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setFormData((prevData) => ({
              ...prevData,
              latitude: latitude.toString(),
              longitude: longitude.toString()
            }));
            await reverseGeocode(latitude, longitude);
          },
          (error) => {
            console.error('Error getting position:', error);
          }
        );
      }
    };

    getCurrentPosition();
  }, []);

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'image' && files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          [name]: reader.result,
        }));
      };
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=9961e6bfcb2b4af8a0217dbd33e4ab44`);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const country = data.results[0].components.country;
        setFormData((prevData) => ({
          ...prevData,
          country
        }));
      }
    } catch (error) {
      console.error('Error during reverse geocoding:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contract) {
      try {
        // Save the project to the blockchain
        await contract.methods.addProject(
          formData.projectName,
          formData.vision,
          formData.domain,
          formData.latitude,
          formData.longitude
        ).send({ from: account });

        // Save the project data and image to the server
        const response = await fetch('http://localhost:5001/add-project', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            owner: account,
            projectName: formData.projectName,
            vision: formData.vision,
            domain: formData.domain,
            latitude: formData.latitude,
            longitude: formData.longitude,
            country: formData.country,
            image: formData.image,
            publicKey: account,
          }),
        });
        console.log(account);

        const data = await response.json();
        if (data.success) {
          setMessage('Project added successfully');
        } else {
          setMessage('Error adding project');
        }
      } catch (error) {
        setMessage('Error adding project');
        console.error(error);
      }
    }
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setFormData((prevData) => ({
          ...prevData,
          latitude: lat.toString(),
          longitude: lng.toString()
        }));
        reverseGeocode(lat, lng);
      },
    });
    return null;
  };

  const CurrentLocationMarker = () => {
    const map = useMap();

    useEffect(() => {
      if (formData.latitude && formData.longitude) {
        map.setView([formData.latitude, formData.longitude], 13);
      }
    }, [formData.latitude, formData.longitude, map]);

    return formData.latitude && formData.longitude ? (
      <Marker position={[formData.latitude, formData.longitude]} />
    ) : null;
  };

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0" style={{ color: "#13274c", backgroundColor: "#ccdaff" }}>
            <strong>
              <center>
            Project Form
              </center>
            </strong>
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="projectName">Project Name</Label>
                <Input
                  id="projectName"
                  name="projectName"
                  placeholder="Project Name"
                  type="text"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="vision">Vision</Label>
                <Input
                  id="vision"
                  name="vision"
                  placeholder="Vision"
                  type="text"
                  value={formData.vision}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="domain">Domain</Label>
                <Input
                  type="select"
                  id="domain"
                  name="domain"
                  value={formData.domain}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Domain</option>
                  <option value="Solar power">Solar power</option>
                  <option value="Wind power">Wind power</option>
                  <option value="Hydroelectricity">Hydroelectricity</option>
                  <option value="Geothermal energy">Geothermal energy</option>
                  <option value="Biomass">Biomass</option>
                </Input>
              </FormGroup>
              <FormGroup className='invisible'>
                <Label for="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  name="latitude"
                  placeholder="Latitude"
                  type="text"
                  value={formData.latitude}
                  readOnly
                />
              </FormGroup>
              <FormGroup className='invisible'>
                <Label for="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  name="longitude"
                  placeholder="Longitude"
                  type="text"
                  value={formData.longitude}
                  readOnly
                />
              </FormGroup>
              <FormGroup>
                <Label for="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  placeholder="Country"
                  type="text"
                  value={formData.country}
                  readOnly
                />
              </FormGroup>
              <FormGroup>
                <Label for="image">Image</Label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <Card>
                <MapContainer center={[36.640215, 10.156875]} zoom={5} style={{ height: '400px', width: '100%' }}>
                  <TileLayer
                    url="https://api.maptiler.com/maps/satellite/256/{z}/{x}/{y}.jpg?key=lPEKpIvVRQA3tm7vvJRG"
                  />
                  <MapClickHandler />
                  <CurrentLocationMarker />
                </MapContainer>
              </Card>
              <Button type="submit" className="btn" outline color="primary" size="lg" block>Submit</Button>
            </Form>
            {message && <p>{message}</p>}
          </CardBody>
        </Card>
      </Col>
      <Col sm="6" lg="6" xl="5" xxl="4">
        <RankProjectsByCertificateCount />
      </Col>
    </Row>
  );
};

export default AddProject;
