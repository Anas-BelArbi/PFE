
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   Navbar,
//   Collapse,
//   Nav,
//   NavItem,
//   NavbarBrand,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   Dropdown,
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   Form,
//   FormGroup,
//   Label,
//   Input,
// } from "reactstrap";
// import SuperLogo from "../assets/images/logos/image-1.png";
// import user1 from "../assets/images/users/user1.jpg";
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useLocation } from "react-router-dom";
// import Web3 from 'web3';
// import NFTToken from '../ABIs/NFTToken.json';
// import { contractAddressNftToken } from '../ABIs/config';
// import jsPDF from 'jspdf';


// const Header = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [modal, setModal] = useState(false);
//   const [burnedTokens, setBurnedTokens] = useState([]);
//   const [selectedTokens, setSelectedTokens] = useState({});
//   const navigate = useNavigate();
//   const location = useLocation();
//   const toggle = () => setDropdownOpen((prevState) => !prevState);
//   const Handletoggle = () => {
//     setIsOpen(!isOpen);
//   };
//   const showMobilemenu = () => {
//     document.getElementById("sidebarArea").classList.toggle("showSidebar");
//   };

//   const redirectToSignin = () => {
//     axios.get('http://localhost:5001/logout').then((response) => {
//       console.log(response);
//       document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"; // Clear the cookie
//       localStorage.removeItem('token'); // Clear the role from local storage
//       navigate('/login');
//     }).catch((error) => {
//       console.error('Error logging out:', error);
//     });
//   };

//   const fetchBurnedTokens = async () => {
//     try {
//       if (window.ethereum) {
//         const web3 = new Web3(window.ethereum);
//         await window.ethereum.enable();
//         const accounts = await web3.eth.getAccounts();
//         const account = accounts[0];
        
//         const contract = new web3.eth.Contract(NFTToken.abi, contractAddressNftToken);

//         const tokens = await contract.methods.burnedTokensOfOwner(account).call();
//         console.log('Burned tokens:', tokens);

//         // Convert BigNumber to string or number
//         const formattedTokens = tokens.map(token => ({
//           ...token,
//           tokenId: token.tokenId.toString(),
//           price: token.price.toString()
//         }));

//         setBurnedTokens(formattedTokens);
//         setModal(true);
//       } else {
//         console.error("Ethereum provider not found");
//       }
//     } catch (error) {
//       console.error("Error fetching burned tokens:", error);
//     }
//   };

//   const handleCheckboxChange = (tokenId) => {
//     setSelectedTokens((prevState) => ({
//       ...prevState,
//       [tokenId]: !prevState[tokenId],
//     }));
//   };

//   const handleDownloadPDF = (tokenId) => {
//     // Find the token details based on the tokenId
//     const token = burnedTokens.find(token => token.tokenId === tokenId);
    
//     // Check if token exists
//     if (!token) {
//       alert('Token not found');
//       return;
//     }
  
//     // Create a new PDF document
//     const doc = new jsPDF();
  
//     // Add token details to the PDF
//     doc.text(`Token ID: ${token.tokenId}`, 10, 10);
//     doc.text(`URI: ${token.uri}`, 10, 20);
//     doc.text(`Price: ${token.price}`, 10, 30);
//     doc.text(`Burned By: ${token.burnedBy}`, 10, 40);
  
//     // Save the PDF
//     doc.save(`Token_${token.tokenId}.pdf`);
//   };

//   return (
//     <>
//       <Navbar color="primary" dark expand="md">
//         <div className="d-flex align-items-center">
//           <NavbarBrand href="/" className="d-lg-none">
            
//           <img src={SuperLogo} alt="logo" width="100" height="90"/>
//             NFT Marketplace
//           </NavbarBrand>
//           <Button
//             color="primary"
//             className="d-lg-none"
//             onClick={() => showMobilemenu()}
//           >
//             <i className="bi bi-list"></i>
//           </Button>
//         </div>
//         <div className="hstack gap-2">
//           <Button
//             color="primary"
//             size="sm"
//             className="d-sm-block d-md-none"
//             onClick={Handletoggle}
//           >
//             {isOpen ? (
//               <i className="bi bi-x"></i>
//             ) : (
//               <i className="bi bi-three-dots-vertical"></i>
//             )}
//           </Button>
//         </div>

//         <Collapse navbar isOpen={isOpen}>
//           <Nav className="me-auto" navbar>
//             <NavItem>
//               <Link to="/starter" className="nav-link">
//                 Starter
//               </Link>
//             </NavItem>
//             <NavItem>
//               <Link to="/about" className="nav-link">
//                 About
//               </Link>
//             </NavItem>
//             <UncontrolledDropdown inNavbar nav>
//               <DropdownToggle caret nav>
//                 DD Menu
//               </DropdownToggle>
//               <DropdownMenu end>
//                 <DropdownItem>Option 1</DropdownItem>
//                 <DropdownItem>Option 2</DropdownItem>
//                 <DropdownItem divider />
//                 <DropdownItem>Reset</DropdownItem>
//               </DropdownMenu>
//             </UncontrolledDropdown>
//           </Nav>
//           <Dropdown isOpen={dropdownOpen} toggle={toggle}>
//             <DropdownToggle color="primary">
//               <img
//                 src={user1}
//                 alt="profile"
//                 className="rounded-circle"
//                 width="30"
//               ></img>
//             </DropdownToggle>
//             <DropdownMenu>
//               <DropdownItem header>Info</DropdownItem>
//               <DropdownItem>My Account</DropdownItem>
//               <DropdownItem>Edit Profile</DropdownItem>
//               <DropdownItem divider />
//               <DropdownItem onClick={fetchBurnedTokens}>My Balance</DropdownItem>
//               <DropdownItem>Inbox</DropdownItem>
//               <DropdownItem onClick={redirectToSignin}>Logout</DropdownItem>
//             </DropdownMenu>
//           </Dropdown>
//         </Collapse>
//       </Navbar>

//       <Modal isOpen={modal} toggle={() => setModal(!modal)}>
//         <ModalHeader toggle={() => setModal(!modal)}>Burned Tokens</ModalHeader>
//         <ModalBody>
//           {burnedTokens.length === 0 ? (
//             <p>No burned tokens found.</p>
//           ) : (
//             <Form>
//               {burnedTokens.map((token, index) => (
//                 <FormGroup check key={index}>
//                   <Label check>
//                     <Input
//                       type="checkbox"
//                       checked={!!selectedTokens[token.tokenId]}
//                       onChange={() => handleCheckboxChange(token.tokenId)}
//                     />
//                     Token ID: {token.tokenId}
//                     URI: {token.uri}
//                     Price: {token.price}
//                     Burned By: {token.burnedBy}
//                     Burned At: {token.burnedAt}
//                     <Button
//                       color="secondary"
//                       size="sm"
//                       className="ml-2"
//                       onClick={() => handleDownloadPDF(token.tokenId)}
//                     >
//                       Download Certificate
//                     </Button>
//                   </Label>
//                 </FormGroup>
//               ))}
//             </Form>
//           )}
//         </ModalBody>
//       </Modal>
//     </>
//   );
// };

// export default Header;

//////////////////////////////////////////////////


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   Navbar,
//   Collapse,
//   Nav,
//   NavItem,
//   NavbarBrand,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   Dropdown,
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   Form,
//   FormGroup,
//   Label,
//   Input,
// } from "reactstrap";
// import SuperLogo from "../assets/images/logos/image-1.png";
// import user1 from "../assets/images/users/user1.jpg";
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useLocation } from "react-router-dom";
// import Web3 from 'web3';
// import NFTToken from '../ABIs/NFTToken.json';
// import { contractAddressNftToken } from '../ABIs/config';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import './Header.css'; // Ensure this line is present at the top

// const Header = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [modal, setModal] = useState(false);
//   const [burnedTokens, setBurnedTokens] = useState([]);
//   const [selectedTokens, setSelectedTokens] = useState({});
//   const navigate = useNavigate();
//   const location = useLocation();
//   const toggle = () => setDropdownOpen((prevState) => !prevState);
//   const Handletoggle = () => {
//     setIsOpen(!isOpen);
//   };
//   const showMobilemenu = () => {
//     document.getElementById("sidebarArea").classList.toggle("showSidebar");
//   };

//   const redirectToInventory = () => {
//     navigate('/inventory');
//   }

//   const redirectToSignin = () => {
//     axios.get('http://localhost:5001/logout').then((response) => {
//       console.log(response);
//       document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"; // Clear the cookie
//       localStorage.removeItem('token'); // Clear the role from local storage
//       navigate('/login');
//     }).catch((error) => {
//       console.error('Error logging out:', error);
//     });
//   };

//   const fetchBurnedTokens = async () => {
//     try {
//       if (window.ethereum) {
//         const web3 = new Web3(window.ethereum);
//         await window.ethereum.enable();
//         const accounts = await web3.eth.getAccounts();
//         const account = accounts[0];
        
//         const contract = new web3.eth.Contract(NFTToken.abi, contractAddressNftToken);

//         const tokens = await contract.methods.burnedTokensOfOwner(account).call();
//         console.log('Burned tokens:', tokens);

//         // Convert BigNumber to string or number
//         const formattedTokens = tokens.map(token => ({
//           ...token,
//           tokenId: token.tokenId.toString(),
//           transactionHash: token.transactionHash
//         }));

//         setBurnedTokens(formattedTokens);
//         setModal(true);
//       } else {
//         console.error("Ethereum provider not found");
//       }
//     } catch (error) {
//       console.error("Error fetching burned tokens:", error);
//     }
//   };

//   const handleCheckboxChange = (tokenId) => {
//     setSelectedTokens((prevState) => ({
//       ...prevState,
//       [tokenId]: !prevState[tokenId],
//     }));
//   };

//   const handleDownloadPDF = () => {
//     const selectedTokenIds = Object.keys(selectedTokens).filter(tokenId => selectedTokens[tokenId]);
//     if (selectedTokenIds.length === 0) {
//       alert('No tokens selected');
//       return;
//     }

//     const doc = new jsPDF();

//     doc.setFontSize(18);
//     doc.text('NFT Burn Certificate', 14, 22);
//     doc.setFontSize(12);
//     doc.setTextColor(100);

//     const headers = [["Attribute", "Value"]];

//     const data = [];
    
//     selectedTokenIds.forEach(tokenId => {
//       const token = burnedTokens.find(token => token.tokenId === tokenId);
//       if (token) {
//         // Convert burnedAt from timestamp to readable date
//         const burnedAtDate = new Date(Number(token.burnedAt) * 1000).toLocaleString();

//         data.push(["Token ID", token.tokenId.toString()]);
//         data.push(["URI", token.uri]);
//         data.push(["TransactionHash", token.transactionHash]);
//         data.push(["Burned By", token.burnedBy]);
//         data.push(["Burned At", burnedAtDate]);
//         data.push(["", ""]); // Add an empty row for spacing
//       }
//     });

//     doc.autoTable({
//       startY: 30,
//       head: headers,
//       body: data,
//       styles: {
//         fontSize: 10
//       },
//       headStyles: {
//         fillColor: [22, 160, 133]
//       },
//       margin: { top: 30 },
//       theme: 'striped'
//     });

//     doc.save(`Burned_Tokens_Certificate.pdf`);
//   };

//   return (
//     <>
//       <Navbar color="primary" dark expand="md">
//         <div className="d-flex align-items-center">
//           <NavbarBrand href="/" className="d-lg-none">
//             <img src={SuperLogo} alt="logo" width="100" height="90" />
//             NFT Marketplace
//           </NavbarBrand>
//           <Button
//             color="primary"
//             className="d-lg-none"
//             onClick={() => showMobilemenu()}
//           >
//             <i className="bi bi-list"></i>
//           </Button>
//         </div>
//         <div className="hstack gap-2">
//           <Button
//             color="primary"
//             size="sm"
//             className="d-sm-block d-md-none"
//             onClick={Handletoggle}
//           >
//             {isOpen ? (
//               <i className="bi bi-x"></i>
//             ) : (
//               <i className="bi bi-three-dots-vertical"></i>
//             )}
//           </Button>
//         </div>

//         <Collapse navbar isOpen={isOpen}>
//           <Nav className="me-auto" navbar>
//             {/* <NavItem>
//               <Link to="/starter" className="nav-link">
//                 Starter
//               </Link>
//             </NavItem>
//             <NavItem>
//               <Link to="/about" className="nav-link">
//                 About
//               </Link>
//             </NavItem>
//             <UncontrolledDropdown inNavbar nav>
//               <DropdownToggle caret nav>
//                 DD Menu
//               </DropdownToggle>
//               <DropdownMenu end>
//                 <DropdownItem>Option 1</DropdownItem>
//                 <DropdownItem>Option 2</DropdownItem>
//                 <DropdownItem divider />
//                 <DropdownItem>Reset</DropdownItem>
//               </DropdownMenu>
//             </UncontrolledDropdown> */}
//           </Nav>
//           <Dropdown isOpen={dropdownOpen} toggle={toggle}>
//             <DropdownToggle color="primary">
//               <img
//                 src={user1}
//                 alt="profile"
//                 className="rounded-circle"
//                 width="30"
//               ></img>
//             </DropdownToggle>
//             <DropdownMenu>
//               <DropdownItem header>Info</DropdownItem>
//               <DropdownItem onClick={redirectToInventory}>My Inventory</DropdownItem>
//               <DropdownItem>Edit Profile</DropdownItem>
//               <DropdownItem divider />
//               <DropdownItem onClick={fetchBurnedTokens}>My Balance</DropdownItem>
//               <DropdownItem onClick={redirectToSignin}>Logout</DropdownItem>
//             </DropdownMenu>
//           </Dropdown>
//         </Collapse>
//       </Navbar>

//       <Modal isOpen={modal} toggle={() => setModal(!modal)} className="wider-modal">
//         <ModalHeader toggle={() => setModal(!modal)}>Burned Tokens</ModalHeader>
//         <ModalBody>
//           {burnedTokens.length === 0 ? (
//             <p>No burned tokens found.</p>
//           ) : (
//             <Form>
//               {burnedTokens.map((token, index) => (
//                 <FormGroup check key={index}>
//                   <Label check>
//                     <Input
//                       type="checkbox"
//                       checked={!!selectedTokens[token.tokenId]}
//                       onChange={() => handleCheckboxChange(token.tokenId)}
//                     />
//                     <div className="token-details">
//                       <div><strong>Token ID:</strong> {token.tokenId}</div>
//                       <div><strong>URI:</strong> {token.uri}</div>
//                       <div><strong>Transaction Hash:</strong> {token.transactionHash}</div>
//                       <div><strong>Burned By:</strong> {token.burnedBy}</div>
//                       <div><strong>Burned At:</strong> {new Date(Number(token.burnedAt) * 1000).toLocaleString()}</div>
//                     </div>
//                   </Label>
//                 </FormGroup>
//               ))}
//               <Button
//                 color="secondary"
//                 className="ml-2"
//                 onClick={handleDownloadPDF}
//                 block
//               >
//                 Download Selected Certificates
//               </Button>
//             </Form>
//           )}
//         </ModalBody>
//       </Modal>
//     </>
//   );
// };

// export default Header;

//////////////////////////////////////////////////*********** */
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   Navbar,
//   Collapse,
//   Nav,
//   NavbarBrand,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   Dropdown,
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   Form,
//   FormGroup,
//   Label,
//   Input,
// } from "reactstrap";
// import SuperLogo from "../assets/images/logos/image-1.png";
// import user1 from "../assets/images/users/user1.jpg";
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Web3 from 'web3';
// import NFTToken from '../ABIs/NFTToken.json';
// import { contractAddressNftToken } from '../ABIs/config';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import './Header.css';

// const Header = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [modal, setModal] = useState(false);
//   const [burnedTokens, setBurnedTokens] = useState([]);
//   const [selectedTokens, setSelectedTokens] = useState({});
//   const navigate = useNavigate();
//   const toggle = () => setDropdownOpen((prevState) => !prevState);
//   const Handletoggle = () => setIsOpen(!isOpen);
//   const showMobilemenu = () => document.getElementById("sidebarArea").classList.toggle("showSidebar");

//   const redirectToInventory = () => navigate('/inventory');

//   const redirectToSignin = () => {
//     axios.get('http://localhost:5001/logout').then((response) => {
//       console.log(response);
//       document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"; // Clear the cookie
//       localStorage.removeItem('token'); // Clear the role from local storage
//       navigate('/login');
//     }).catch((error) => {
//       console.error('Error logging out:', error);
//     });
//   };

//   const fetchBurnedTokens = async () => {
//     try {
//       if (window.ethereum) {
//         const web3 = new Web3(window.ethereum);
//         await window.ethereum.enable();
//         const accounts = await web3.eth.getAccounts();
//         const account = accounts[0];

//         const contract = new web3.eth.Contract(NFTToken.abi, contractAddressNftToken);
//         const tokens = await contract.methods.burnedTokensOfOwner(account).call();
//         console.log('Burned tokens:', tokens);

//         const formattedTokens = tokens.map(token => ({
//           ...token,
//           tokenId: token.tokenId.toString(),
//           transactionHash: token.transactionHash
//         }));

//         setBurnedTokens(formattedTokens);
//         setModal(true);
//       } else {
//         console.error("Ethereum provider not found");
//       }
//     } catch (error) {
//       console.error("Error fetching burned tokens:", error);
//     }
//   };

//   const handleCheckboxChange = (tokenId) => {
//     setSelectedTokens((prevState) => ({
//       ...prevState,
//       [tokenId]: !prevState[tokenId],
//     }));
//   };

//   const handleDownloadPDF = () => {
//     const selectedTokenIds = Object.keys(selectedTokens).filter(tokenId => selectedTokens[tokenId]);
//     if (selectedTokenIds.length === 0) {
//       alert('No tokens selected');
//       return;
//     }

//     const doc = new jsPDF();
//     doc.setFontSize(18);
//     doc.text('NFT Burn Certificate', 14, 22);
//     doc.setFontSize(12);
//     doc.setTextColor(100);

//     const headers = [["Attribute", "Value"]];
//     const data = [];

//     selectedTokenIds.forEach(tokenId => {
//       const token = burnedTokens.find(token => token.tokenId === tokenId);
//       if (token) {
//         const burnedAtDate = new Date(Number(token.burnedAt) * 1000).toLocaleString();
//         data.push(["Token ID", token.tokenId.toString()]);
//         data.push(["URI", token.uri]);
//         data.push(["TransactionHash", token.transactionHash]);
//         data.push(["Burned By", token.burnedBy]);
//         data.push(["Burned At", burnedAtDate]);
//         data.push(["", ""]);
//       }
//     });

//     doc.autoTable({
//       startY: 30,
//       head: headers,
//       body: data,
//       styles: {
//         fontSize: 10
//       },
//       headStyles: {
//         fillColor: [22, 160, 133]
//       },
//       margin: { top: 30 },
//       theme: 'striped'
//     });

//     doc.save(`Burned_Tokens_Certificate.pdf`);
//   };

//   const handleEditProfile = async () => {
//     if (window.ethereum) {
//       try {
//         const web3 = new Web3(window.ethereum);
//         await window.ethereum.enable();
//         const accounts = await web3.eth.getAccounts();
//         if (accounts.length > 0) {
//           const publicKey = accounts[0];
//           navigate(`/editProfile/${publicKey}`);
//         } else {
//           console.error('No accounts found in MetaMask');
//         }
//       } catch (error) {
//         console.error('Error getting public key from MetaMask:', error);
//       }
//     } else {
//       console.error('MetaMask not detected');
//     }
//   };

//   return (
//     <>
//       <Navbar color="primary" dark expand="md">
//         <div className="d-flex align-items-center">
//           <NavbarBrand href="/" className="d-lg-none">
//             <img src={SuperLogo} alt="logo" width="100" height="90" />
//             NFT Marketplace
//           </NavbarBrand>
//           <Button
//             color="primary"
//             className="d-lg-none"
//             onClick={() => showMobilemenu()}
//           >
//             <i className="bi bi-list"></i>
//           </Button>
//         </div>
//         <div className="hstack gap-2">
//           <Button
//             color="primary"
//             size="sm"
//             className="d-sm-block d-md-none"
//             onClick={Handletoggle}
//           >
//             {isOpen ? (
//               <i className="bi bi-x"></i>
//             ) : (
//               <i className="bi bi-three-dots-vertical"></i>
//             )}
//           </Button>
//         </div>

//         <Collapse navbar isOpen={isOpen}>
//           <Nav className="me-auto" navbar></Nav>
//           <Dropdown isOpen={dropdownOpen} toggle={toggle}>
//             <DropdownToggle color="primary">
//               <img
//                 src={user1}
//                 alt="profile"
//                 className="rounded-circle"
//                 width="30"
//               ></img>
//             </DropdownToggle>
//             <DropdownMenu>
//               <DropdownItem header>Info</DropdownItem>
//               <DropdownItem onClick={redirectToInventory}>My Inventory</DropdownItem>
//               <DropdownItem onClick={handleEditProfile}>Edit Profile</DropdownItem>
//               <DropdownItem divider />
//               <DropdownItem onClick={fetchBurnedTokens}>My Balance</DropdownItem>
//               <DropdownItem onClick={redirectToSignin}>Logout</DropdownItem>
//             </DropdownMenu>
//           </Dropdown>
//         </Collapse>
//       </Navbar>

//       <Modal isOpen={modal} toggle={() => setModal(!modal)} className="wider-modal">
//         <ModalHeader toggle={() => setModal(!modal)}>Burned Tokens</ModalHeader>
//         <ModalBody>
//           {burnedTokens.length === 0 ? (
//             <p>No burned tokens found.</p>
//           ) : (
//             <Form>
//               {burnedTokens.map((token, index) => (
//                 <FormGroup check key={index}>
//                   <Label check>
//                     <Input
//                       type="checkbox"
//                       checked={!!selectedTokens[token.tokenId]}
//                       onChange={() => handleCheckboxChange(token.tokenId)}
//                     />
//                     <div className="token-details">
//                       <div><strong>Token ID:</strong> {token.tokenId}</div>
//                       <div><strong>URI:</strong> {token.uri}</div>
//                       <div><strong>Transaction Hash:</strong> {token.transactionHash}</div>
//                       <div><strong>Burned By:</strong> {token.burnedBy}</div>
//                       <div><strong>Burned At:</strong> {new Date(Number(token.burnedAt) * 1000).toLocaleString()}</div>
//                     </div>
//                   </Label>
//                 </FormGroup>
//               ))}
//               <Button
//                 color="secondary"
//                 className="ml-2"
//                 onClick={handleDownloadPDF}
//                 block
//               >
//                 Download Selected Certificates
//               </Button>
//             </Form>
//           )}
//         </ModalBody>
//       </Modal>
//     </>
//   );
// };

// export default Header;

import { useEffect } from "react";
import React, { useState } from "react";
import {
  Navbar,
  Collapse,
  Nav,
  NavbarBrand,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
  Dropdown
} from "reactstrap";
import SuperLogo from "../assets/images/logos/image-1.png";
import user1 from "../assets/images/users/user1.jpg";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Web3 from 'web3';
import NFTToken from '../ABIs/NFTToken.json';
import { contractAddressNftToken } from '../ABIs/config';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [burnedTokens, setBurnedTokens] = useState([]);
  const [selectedTokens, setSelectedTokens] = useState({});
  const [profileImage, setProfileImage] = useState(user1); // default image


  const navigate = useNavigate();
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => setIsOpen(!isOpen);
  const showMobilemenu = () => document.getElementById("sidebarArea").classList.toggle("showSidebar");

  const redirectToInventory = () => navigate('/inventory');

  const redirectToSignin = () => {
    axios.get('http://localhost:5001/logout').then((response) => {
      console.log(response);
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"; // Clear the cookie
      localStorage.removeItem('token'); // Clear the role from local storage
      localStorage.removeItem('userRole');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userImage');
      localStorage.removeItem('userName');
      localStorage.removeItem('userId');
      
      navigate('/login');
    }).catch((error) => {
      console.error('Error logging out:', error);
    });
  };

  const fetchBurnedTokens = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];

        const contract = new web3.eth.Contract(NFTToken.abi, contractAddressNftToken);
        const tokens = await contract.methods.burnedTokensOfOwner(account).call();
        console.log('Burned tokens:', tokens);

        const formattedTokens = tokens.map(token => ({
          ...token,
          tokenId: token.tokenId.toString(),
          transactionHash: token.transactionHash
        }));
        

        setBurnedTokens(formattedTokens);
        setModal(true);
      } else {
        console.error("Ethereum provider not found");
      }
    } catch (error) {
      console.error("Error fetching burned tokens:", error);
    }
  };

  const handleCheckboxChange = (tokenId) => {
    setSelectedTokens((prevState) => ({
      ...prevState,
      [tokenId]: !prevState[tokenId],
    }));
  };

  const handleDownloadPDF = () => {
    const selectedTokenIds = Object.keys(selectedTokens).filter(tokenId => selectedTokens[tokenId]);
    if (selectedTokenIds.length === 0) {
      alert('No tokens selected');
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('NFT Burn Certificate', 14, 22);
    doc.setFontSize(12);
    doc.setTextColor(100);

    const headers = [["Attribute", "Value"]];
    const data = [];

    selectedTokenIds.forEach(tokenId => {
      const token = burnedTokens.find(token => token.tokenId === tokenId);
      if (token) {
        const burnedAtDate = new Date(Number(token.burnedAt) * 1000).toLocaleString();
        data.push(["Token ID", token.tokenId.toString()]);
        data.push(["URI", token.uri]);
        data.push(["TransactionHash", token.transactionHash]);
        data.push(["Burned By", token.burnedBy]);
        data.push(["Burned At", burnedAtDate]);
        data.push(["", ""]);
      }
    });

    doc.autoTable({
      startY: 30,
      head: headers,
      body: data,
      styles: {
        fontSize: 10
      },
      headStyles: {
        fillColor: [22, 160, 133]
      },
      margin: { top: 30 },
      theme: 'striped'
    });

    doc.save(`Burned_Tokens_Certificate.pdf`);
  };

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          await window.ethereum.enable();
          const accounts = await web3.eth.getAccounts();
          const account = accounts[0];
  
          const response = await axios.get(`http://localhost:5001/user/${account}`);
          if (response.data.user && response.data.user.imageuser) {
            setProfileImage(response.data.user.imageuser);
          }
        }
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    };
  
    fetchProfileImage();
  }, []);
  

  const handleEditProfile = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          const publicKey = accounts[0];
          navigate(`/editProfile/${publicKey}`);
        } else {
          console.error('No accounts found in MetaMask');
        }
      } catch (error) {
        console.error('Error getting public key from MetaMask:', error);
      }
    } else {
      console.error('MetaMask not detected');
    }
  };

  return (
    <>
      <Navbar dark expand="md">
        <div className="d-flex align-items-center">
          <NavbarBrand href="/" className="d-lg-none">
            <img src={SuperLogo} alt="logo" width="100" height="90" />
            NFT Marketplace
          </NavbarBrand>
          <Button
            color="primary"
            className="d-lg-none"
            onClick={() => showMobilemenu()}
          >
            <i className="bi bi-list"></i>
          </Button>
        </div>
        <div className="hstack gap-2">
          <Button
            color="primary"
            size="sm"
            className="d-sm-block d-md-none"
            onClick={Handletoggle}
          >
            {isOpen ? (
              <i className="bi bi-x"></i>
            ) : (
              <i className="bi bi-three-dots-vertical"></i>
            )}
          </Button>
        </div>

        <Collapse navbar isOpen={isOpen}>
          <Nav className="me-auto" navbar></Nav>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            {/* <DropdownToggle color="white">
              <img
                src={user1}
                alt="profile"
                className="rounded-circle"
                width="30"
              ></img>
            </DropdownToggle> */}
            <DropdownToggle color="white">
                <img
                  src={profileImage}
                  alt="profile"
                  className="rounded-circle"
                  width="30"
                ></img>
              </DropdownToggle>
            <DropdownMenu className="custom-dropdown-menu">
              <DropdownItem header>Info</DropdownItem>
              <DropdownItem onClick={redirectToInventory}>My Inventory</DropdownItem>
              <DropdownItem onClick={handleEditProfile}>Edit Profile</DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={fetchBurnedTokens}>My Balance</DropdownItem>
              <DropdownItem onClick={redirectToSignin}>Logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Collapse>
      </Navbar>

      <Modal isOpen={modal} toggle={() => setModal(!modal)} className="wider-modal">
        <ModalHeader toggle={() => setModal(!modal)} style={{ backgroundColor: '#ccdaff'  }} ><h4 style={{ color: '#325186' }}>Burned Tokens</h4></ModalHeader>
        <ModalBody >
          {burnedTokens.length === 0 ? (
            <p>No burned tokens found.</p>
          ) : (
            <Form>
              {burnedTokens.map((token, index) => (
                <FormGroup check key={index}>
                  <Label check>
                    <Input
                      type="checkbox"
                      checked={!!selectedTokens[token.tokenId]}
                      onChange={() => handleCheckboxChange(token.tokenId)}
                    />
                    <Table borderless className="token-details">
                      <tbody>
                        <tr>
                          <td><strong><h5 style={{ color: '#325186' }}>Token ID:</h5></strong></td>
                          <td>{token.tokenId}</td>
                        </tr>
                        <tr>
                          <td><strong>URI:</strong></td>
                          <td>{token.uri}</td>
                        </tr>
                        <tr>
                          <td><strong>Transaction Hash:</strong></td>
                          <td>{token.transactionHash}</td>
                        </tr>
                        <tr>
                          <td><strong>Burned By:</strong></td>
                          <td>{token.burnedBy}</td>
                        </tr>
                        <tr>
                          <td><strong>Burned At:</strong></td>
                          <td>{new Date(Number(token.burnedAt) * 1000).toLocaleString()}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Label>
                </FormGroup>
              ))}
              <Button
                color="primary"
                className="ml-2"
                onClick={handleDownloadPDF}
                block
                style={{ backgroundColor: '#0056b3', borderColor: '#0056b3' }}
              >
                Download Selected Certificates
              </Button>
            </Form>
          )}
        </ModalBody>
      </Modal>
    </>
  );
};

export default Header;
