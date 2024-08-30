// import { Button, Nav, NavItem } from "reactstrap";
// import Logo from "./Logo";
// import { Link, useLocation } from "react-router-dom";

// const navigation = [
//   {
//     title: "Dashboard",
//     href: "/starter",
//     icon: "bi bi-speedometer2",
//   },
//   // {
//   //   title: "Alert",
//   //   href: "/alerts",
//   //   icon: "bi bi-bell",
//   // },
//   // {
//   //   title: "Badges",
//   //   href: "/badges",
//   //   icon: "bi bi-patch-check",
//   // },
//   // {
//   //   title: "Buttons",
//   //   href: "/buttons",
//   //   icon: "bi bi-hdd-stack",
//   // },
//   // {
//   //   title: "Cards",
//   //   href: "/cards",
//   //   icon: "bi bi-card-text",
//   // },
//   // {
//   //   title: "Grid",
//   //   href: "/grid",
//   //   icon: "bi bi-columns",
//   // },
//   // {
//   //   title: "Table",
//   //   href: "/table",
//   //   icon: "bi bi-layout-split",
//   // },
//   // {
//   //   title: "Forms",
//   //   href: "/forms",
//   //   icon: "bi bi-textarea-resize",
//   // },
//   // {
//   //   title: "Breadcrumbs",
//   //   href: "/breadcrumbs",
//   //   icon: "bi bi-link",
//   // },
//   // {
//   //   title: "About",
//   //   href: "/about",
//   //   icon: "bi bi-people",
//   // },
//   {
//     title: "Inventory",
//     href: "/Inventory",
//     icon: "bi bi-people",
//   },
//   {
//     title: "Add Project",
//     href: "/AddProject",
//     icon: "bi bi-people",
//   },
//   {
//     title: "List Project",
//     href: "/ListProject",
//     icon: "bi bi-people",
//   },
//   {
//     title: "Add Certificate",
//     href: "/AddCertificate",
//     icon: "bi bi-people",
//   },
//   {
//     title: "List Certificate Authority",
//     href: "/ListCertificateAuthority",
//     icon: "bi bi-people",
//   },
//   {
//     title: "List Certificate Registry",
//     href: "/ListCertificateRegistry",
//     icon: "bi bi-people",
//   },
//   {
//     title: "Login",
//     href: "/Login",
//     icon: "bi bi-people",
//   },
//   {
//     title: "Signup",
//     href: "/Signup",
//     icon: "bi bi-people",
//   },
//   {
//     title: "List Nft",
//     href: "/ListNft",
//     icon: "bi bi-people",
//   },
//   {
//     title: "Bid Nft",
//     href: "/BidNft",
//     icon: "bi bi-people",
//   },
// ];

// const Sidebar = () => {
//   const showMobilemenu = () => {
//     document.getElementById("sidebarArea").classList.toggle("showSidebar");
//   };
//   let location = useLocation();

//   return (
//     <div className="p-3">
//       <div className="d-flex align-items-center">
//         <Logo />
//         <span className="ms-auto d-lg-none">
//         <Button
//           close
//           size="sm"
//           className="ms-auto d-lg-none"
//           onClick={() => showMobilemenu()}
//         ></Button>
//         </span>
//       </div>
//       <div className="pt-4 mt-2">
//         <Nav vertical className="sidebarNav">
//           {navigation.map((navi, index) => (
//             <NavItem key={index} className="sidenav-bg">
//               <Link
//                 to={navi.href}
//                 className={
//                   location.pathname === navi.href
//                     ? "text-primary nav-link py-3"
//                     : "nav-link text-secondary py-3"
//                 }
//               >
//                 <i className={navi.icon}></i>
//                 <span className="ms-3 d-inline-block">{navi.title}</span>
//               </Link>
//             </NavItem>
//           ))}
//           <Button
//             color="danger"
//             tag="a"
//             target="_blank"
//             className="mt-3"
//             href="https://www.wrappixel.com/templates/xtreme-react-redux-admin/?ref=33"
//           >
//             Upgrade To Pro
//           </Button>
//         </Nav>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

//////////////////////////////////////////////last side bar below

// import { jwtDecode } from "jwt-decode";
// import ExpandRoundedIcon from '@mui/icons-material/ExpandRounded';
// import { Button, Nav, NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
// import Logo from "./Logo";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import user1 from "../assets/images/users/user1.jpg";
// import SuperLogo from "../assets/images/logos/image-1.png";

// const navigation = [
//       // {
//       //   title: "Alert",
//       //   href: "/alerts",
//       //   icon: "bi bi-bell",
//       //   roles: ["Authority", "Registry"]
//       // },
//       // {
//       //   title: "Badges",
//       //   href: "/badges",
//       //   icon: "bi bi-patch-check",
//       //   roles: ["Authority", "Registry"]
//       // },
//       // {
//       //   title: "Buttons",
//       //   href: "/buttons",
//       //   icon: "bi bi-hdd-stack",
//       //   roles: ["Authority", "Registry"]
//       // },
//       // {
//       //   title: "Cards",
//       //   href: "/cards",
//       //   icon: "bi bi-card-text",
//       //   roles: ["Authority", "Registry"]
//       // },
//       // {
//       //   title: "Grid",
//       //   href: "/grid",
//       //   icon: "bi bi-columns",
//       //   roles: ["Authority", "Registry"]
//       // },
//       // {
//       //   title: "Table",
//       //   href: "/table",
//       //   icon: "bi bi-layout-split",
//       //   roles: ["Authority", "Registry"]
//       // },
//       // {
//       //   title: "Forms",
//       //   href: "/forms",
//       //   icon: "bi bi-textarea-resize",
//       //   roles: ["Authority", "Registry"]
//       // },
//       // {
//       //   title: "Breadcrumbs",
//       //   href: "/breadcrumbs",
//       //   icon: "bi bi-link",
//       //   roles: ["Authority", "Registry"]
//       // },
//       // {
//       //   title: "About",
//       //   href: "/about",
//       //   icon: "bi bi-people",
//       //   roles: ["Authority", "Registry"]
//       // },
//   {
//     title: "Dashboard",
//     href: "/starter",
//     icon: "bi bi-speedometer2",
//     roles: ["Authority", "Registry"],
//   },
//   {
//     title: "My Certificates",
//     href: "/MyCertificates",
//     icon: "bi bi-people",
//     roles: ["User"],
//   },
//   {
//     title: "Inventory",
//     href: "/Inventory",
//     icon: "bi bi-people",
//     roles: ["User"],
//   },
//   {
//     title: "Add Project",
//     href: "/AddProject",
//     icon: "bi bi-people",
//     roles: ["User"],
//   },
//   {
//     title: "List Project",
//     href: "/ListProject",
//     icon: "bi bi-people",
//     roles: ["Authority"],
//   },
//   {
//     title: "Add Certificate",
//     href: "/AddCertificate",
//     icon: "bi bi-people",
//     roles: ["User"],
//   },
//   {
//     title: "Certificate Authority",
//     href: "/ListCertificateAuthority",
//     icon: "bi bi-patch-check",
//     roles: ["Authority"],
//   },
//   {
//     title: "Certificate Registry",
//     href: "/ListCertificateRegistry",
//     icon: "bi bi-patch-check",
//     roles: ["Registry"],
//   },
//   {
//     title: "Login",
//     href: "/Login",
//     icon: "bi bi-people",
//     roles: ["Guest"],
//   },
//   {
//     title: "Signup",
//     href: "/Signup",
//     icon: "bi bi-people",
//     roles: ["Guest"],
//   },
//   {
//     title: "List Nft",
//     href: "/ListNft",
//     icon: "bi bi-link",
//     roles: ["User", "Authority", "Registry"],
//   },
//   {
//     title: "Bid Nft",
//     href: "/BidNft",
//     icon: "bi bi-bell",
//     roles: ["User", "Authority", "Registry"],
//   },
//   // {
//   //   title: "NFT Prices",
//   //   href: "/newCollection",
//   //   icon: "bi bi-people",
//   //   roles: ["User", "Authority", "Registry"],
//   // },
// ];

// const Sidebar = () => {
//   const showMobilemenu = () => {
//     document.getElementById("sidebarArea").classList.toggle("showSidebar");
//   };
//   let location = useLocation();
//   const navigate = useNavigate();
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [modal, setModal] = useState(false);
//   const toggle = () => setDropdownOpen((prevState) => !prevState);
//   // Fetch the token from local storage and decode it to get the user's role
//   const token = localStorage.getItem("token");
//   let userRole = "Guest"; // Default role
//   if (token) {
//     const decodedToken = jwtDecode(token);
//     userRole = decodedToken.role;
//   }

//   // Filter navigation items based on the user's role
//   const filteredNavigation = navigation.filter((navi) =>
//     navi.roles.includes(userRole)
//   );
  
//   const redirectToInventory = () => navigate('/inventory');
//   const redirectToSignin = () => {
//     localStorage.removeItem('token'); // Clear the token from local storage
//     navigate('/login');
//   };

//   return (
//     <div className="p-3" >
//   {/* <div style={{ backgroundColor: '#ccdaff', padding: '10px' }}> */}
//     <div className="d-flex align-items-center">
//       <Logo />
//       <br />
//       <br />
//       <strong>
//         <h5 style={{ color: '#325186', marginTop: '20px' }} >NFT Marketplace</h5>
//       </strong>
//       <span className="ms-auto d-lg-none">
//         <Button
//           close
//           size="sm"
//           className="ms-auto d-lg-none"
//           onClick={() => showMobilemenu()}
//         />
//       </span>
//     </div>
//   {/* </div> */}
//   <hr className="my-4" style={{ borderTop: '2px solid #0d6efd' }} /> {/* Thick line with custom styling */}
  
//   <div className=" mt-2">
//     <Nav vertical className="sidebarNav">
//       {filteredNavigation.map((navi, index) => (
//         <NavItem key={index} className="sidenav-bg">
//           <Link
//             to={navi.href}
//             className={
//               location.pathname === navi.href
//                 ? "text-primary nav-link py-3"
//                 : "nav-link text-secondary py-3"
//             }
//           >
//             <i className={navi.icon}></i>
//             <span className="ms-3 d-inline-block">{navi.title}</span>
//           </Link>
//         </NavItem>
//       ))}
//     </Nav>
//     <hr className="my-4" style={{ borderTop: '2px solid #0d6efd' }} /> {/* Thick line with custom styling */}
//     <div className="position-relative" style={{ marginLeft: '160px' }}>
//       <Dropdown isOpen={dropdownOpen} toggle={toggle}>
//         <DropdownToggle color="#ffffff">
//           <img
//             src={user1}
//             alt="profile"
//             className="rounded-circle"
//             width="30"
//           />
//         </DropdownToggle>
//         <DropdownMenu>
//           <DropdownItem header>Info</DropdownItem>
//           <DropdownItem onClick={redirectToInventory}>My Inventory</DropdownItem>
//           <DropdownItem onClick={() => navigate('/editProfile')}>Edit Profile</DropdownItem>
//           <DropdownItem divider />
//           <DropdownItem onClick={() => setModal(true)}>My Balance</DropdownItem>
//           <DropdownItem onClick={redirectToSignin}>Logout</DropdownItem>
//         </DropdownMenu>
//       </Dropdown>
//     </div>
//   </div>
// </div>

//   );
// };

// export default Sidebar;





import { useEffect } from "react";
import axios from 'axios';
import Web3 from 'web3';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import user1 from '../assets/images/users/user1.jpg';
import SuperLogo from '../assets/images/logos/image-1.png'; // Assuming logo path
import Typography from '@mui/material/Typography';
import Header from './Header';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'; // for "My Certificates", "Add Certificate", and others involving user identity
import InventoryIcon from '@mui/icons-material/Inventory2'; // for "Inventory"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // for "Add Project"
import ListIcon from '@mui/icons-material/List'; // for "Certificate Registry"
import LoginIcon from '@mui/icons-material/Login'; // for "Login"
import PersonAddIcon from '@mui/icons-material/PersonAdd'; // for "Signup"
import LinkIcon from '@mui/icons-material/Link'; // for "List Nft"
import GavelIcon from '@mui/icons-material/Gavel'; // for "Bid Nft"
import { useState } from 'react';

const drawerWidth = 270;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);



const navigation = [
  {
    title: "Dashboard",
    href: "/starter",
    icon: <DashboardIcon />,
    roles: ["Authority", "Registry"],
  },
  {
    title: "My Certificates",
    href: "/MyCertificates",
    icon: <AssignmentIndIcon />,
    roles: ["User"],
  },
  {
    title: "Inventory",
    href: "/Inventory",
    icon: <InventoryIcon />,
    roles: ["User"],
  },
  {
    title: "Add Project",
    href: "/AddProject",
    icon: <AddCircleOutlineIcon />,
    roles: ["User"],
  },
  {
    title: "List Project",
    href: "/ListProject",
    icon: <FormatListBulletedIcon />,
    roles: ["Authority"],
  },
  {
    title: "Add Certificate",
    href: "/AddCertificate",
    icon: <AssignmentIndIcon />,
    roles: ["User"],
  },
  {
    title: "Certificate Authority",
    href: "/ListCertificateAuthority",
    icon: <VerifiedUserIcon />,
    roles: ["Authority"],
  },
  {
    title: "Certificate Registry",
    href: "/ListCertificateRegistry",
    icon: <ListIcon />,
    roles: ["Registry"],
  },
  {
    title: "Login",
    href: "/Login",
    icon: <LoginIcon />,
    roles: ["Guest"],
  },
  {
    title: "Signup",
    href: "/Signup",
    icon: <PersonAddIcon />,
    roles: ["Guest"],
  },
  {
    title: "List Nft",
    href: "/ListNft",
    icon: <LinkIcon />,
    roles: ["User", "Authority", "Registry"],
  },
  {
    title: "Bid Nft",
    href: "/BidNft",
    icon: <GavelIcon />,
    roles: ["User", "Authority", "Registry"],
  },
];



  export default function MiniDrawer() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [profileImage, setProfileImage] = useState(user1); // default image

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [modal, setModal] = useState(false);
  
    const token = localStorage.getItem("token");
    let userRole = "Guest";
    let username = "";
    let useremail = "";
    let userimage = "";
    if (token) {
      const decodedToken = jwtDecode(token);
      userRole = decodedToken.role;
      username = decodedToken.name;
      useremail = decodedToken.email;
      userimage = decodedToken.imageUser;


    }
    const filteredNavigation = navigation.filter(navi => navi.roles.includes(userRole));
  
    const handleDrawerToggle = () => {
      setOpen(!open);
    };
    
    const redirectToInventory = () => navigate('/inventory');
    const redirectToSignin = () => {
      localStorage.removeItem('token'); // Clear the token from local storage
      navigate('/login');
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
    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        {!open && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{
              position: 'fixed',
              top: 16,
              left: 25,
              zIndex: theme.zIndex.drawer + 1,
              color: '#0d6efd'
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
  
        <Drawer variant="permanent" open={open}>
          <DrawerHeader style={{ backgroundColor: '#ccdaff' }}>
            {open && (
              <Box display="flex" alignItems="center" justifyContent="center" my={2}>
                <img src={SuperLogo} alt="logo" style={{ height: 40, marginRight: 22 }} />
                <Typography variant="h6" style={{ color: '#325186' }}><strong>NFT Marketplace</strong></Typography>
              </Box>
            )}
            {open && (
              <IconButton onClick={handleDrawerToggle} sx={{ color: '#0d6efd' }}>
                <CloseIcon />
              </IconButton>
            )}
          </DrawerHeader>
  
          
            
        <div style={{ backgroundColor: '#ccdaff', padding: '10px' }}>
          {!open && (
            <img src={SuperLogo} alt="logo" style={{ height: 40,width:40, marginRight: 29 }} />
          )}
       </div>
       
       <Divider style={{ backgroundColor: '#002884', padding: '1px' }} />
       
          <List>
            {filteredNavigation.map((item, index) => (
              <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  onClick={() => navigate(item.href)}
                >
                  <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider style={{ backgroundColor: '#002884', padding: '1px' }} />
        {/* <div style={{ backgroundColor: '#ccdaff', padding: '10px' }}>
        {!open && (
        <Header/>
        )}
        </div> */}
        {!open && (
        // <Avatar onClick={handleDrawerToggle} src={user1} alt="profile" sx={{left:10, top:5}}/>
        <Avatar onClick={handleDrawerToggle} src={profileImage} alt="profile" sx={{left:10, top:5}}/>
        )}
        <Box display="flex" alignItems="center" p={2} justifyContent="center">
        <Box ml={2} sx={{ opacity: open ? 1 : 0 }}>
            <Typography variant="subtitle2">{username}</Typography>
            <Typography variant="body2">{useremail}</Typography>
          </Box>
          {/* <Avatar src={user1} alt="profile" /> */}
          {open && (<Header/>)}
        </Box>
      </Drawer>
    </Box>
  );
}
