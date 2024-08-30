// import { element, exact } from "prop-types";
import { lazy } from "react";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));
const ListProject = lazy(() => import("../components/listProject/listProject.js"));
const AddProject = lazy(() => import("../components/addProject/addProject.js"));
const AddCertificate = lazy(() => import("../components/addCertificate/addCertificate.js"));
const ListCertificateAuthority = lazy(() => import("../components/listCertificateAuthority/listCertficateAuthority.js"));
const ListCertificateRegistry = lazy(() => import("../components/listCertificateRegistry/listCertificateRegistry.js"));
const Login = lazy(() => import("../components/login/login.js"));
const Signup = lazy(() => import("../components/signup/signup.js"));
const Inventory = lazy(() => import("../components/Inventory/Inventory.js"));
const ListNft = lazy(() => import("../components/listNft/listNft.js"));
const BidNft = lazy(() => import("../components/bidNft/bidNft.js"));
const AuctionDetails = lazy(() => import("../components/auctionDetails/auctionDetail.js"));
const MyCertificates = lazy(() => import("../components/myCertificates/myCertificates.js"));
const LandingPage = lazy(() => import("../components/landingPage/landingPage.js"));
const EditProfile = lazy(() => import("../components/editProfile/editProfile.js"));

/*****Routes******/

// const ThemeRoutes = [
//   {
//     path: "/",
//     children: [
//       { path: "/", element: <Navigate to="/landingPage" /> },
//       { path: "/landingPage", element: <LandingPage /> },
//       { path: "/login", element: <Login /> },
//       { path: "/signup", element: <Signup /> },
//     ],
//   },
//   {
//     path: "/",
//     element: <FullLayout />,
//     children: [
//       { path: "/starter", exact: true, element: <Starter /> },
//       { path: "/about", exact: true, element: <About /> },
//       { path: "/alerts", exact: true, element: <Alerts /> },
//       { path: "/badges", exact: true, element: <Badges /> },
//       { path: "/buttons", exact: true, element: <Buttons /> },
//       { path: "/cards", exact: true, element: <Cards /> },
//       { path: "/grid", exact: true, element: <Grid /> },
//       { path: "/table", exact: true, element: <Tables /> },
//       { path: "/forms", exact: true, element: <Forms /> },
//       { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
//       { path: "/listProject", exact: true, element: <ProtectedRoute allowedRoles={['Authority']}><ListProject /></ProtectedRoute> },
//       { path: "/addProject", exact: true, element: <ProtectedRoute allowedRoles={['User']}><AddProject /></ProtectedRoute> },
//       { path: "/addCertificate", exact: true, element: <ProtectedRoute allowedRoles={['User']}><AddCertificate /></ProtectedRoute> },
//       { path: "/listCertificateAuthority", exact: true, element: <ProtectedRoute allowedRoles={['Authority']}><ListCertificateAuthority /></ProtectedRoute> },
//       { path: "/listCertificateRegistry", exact: true, element: <ProtectedRoute allowedRoles={['Registry']}><ListCertificateRegistry /></ProtectedRoute> },
//       { path: "/inventory", exact: true, element: <Inventory /> },
//       { path: "/login", exact: true, element: < Login/>},
//       { path: "/signup", exact: true, element: < Signup/>},
//       { path: "/listNft", exact: true, element: <ListNft /> }, // Add a new route for the NFTsPage component
//       { path: "/bidNft", exact: true, element: <BidNft /> }, // Add a new route for the BidNft 
//       { path: "/auction/:auctionId", exact: true, element: <AuctionDetails /> }, // Add a new route for the AuctionDetails component
//       { path: "/newCollection", exact: true, element: <NewCollection /> }, // Add a new route for the NewCollection component
//       { path: "/myCertificates", exact: true, element: <MyCertificates /> },
//       { path: "/landingPage", exact: true, element: <LandingPage /> },
//       { path: "/editProfile/:publicKey", exact: true, element: <EditProfile />}
//     ],
//   },
// ];

// export default ThemeRoutes;

const ThemeRoutes = [
  {
    path: "/",
    children: [
      { path: "/", element: <Navigate to="/landingPage" /> },
      { path: "/landingPage", element: <LandingPage /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/starter", exact: true, element: <ProtectedRoute allowedRoles={['Authority', 'Registry']}> <Starter /> </ProtectedRoute>},
      { path: "/about", exact: true, element: <About /> },
      { path: "/alerts", exact: true, element: <Alerts /> },
      { path: "/badges", exact: true, element: <Badges /> },
      { path: "/buttons", exact: true, element: <Buttons /> },
      { path: "/cards", exact: true, element: <Cards /> },
      { path: "/grid", exact: true, element: <Grid /> },
      { path: "/table", exact: true, element: <Tables /> },
      { path: "/forms", exact: true, element: <Forms /> },
      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
      { path: "/listProject", exact: true, element: <ProtectedRoute allowedRoles={['Authority']}><ListProject /></ProtectedRoute> },
      { path: "/addProject", exact: true, element: <ProtectedRoute allowedRoles={['User']}><AddProject /></ProtectedRoute> },
      { path: "/addCertificate", exact: true, element: <ProtectedRoute allowedRoles={['User']}><AddCertificate /></ProtectedRoute> },
      { path: "/listCertificateAuthority", exact: true, element: <ProtectedRoute allowedRoles={['Authority']}><ListCertificateAuthority /></ProtectedRoute> },
      { path: "/listCertificateRegistry", exact: true, element: <ProtectedRoute allowedRoles={['Registry']}><ListCertificateRegistry /></ProtectedRoute> },
      { path: "/inventory", exact: true, element: <ProtectedRoute allowedRoles={['User', 'Authority', 'Registry']}><Inventory /></ProtectedRoute> },
      { path: "/login", exact: true, element: <ProtectedRoute allowedRoles={['User', 'Authority', 'Registry']}><Login /></ProtectedRoute> },
      { path: "/signup", exact: true, element: <ProtectedRoute allowedRoles={['User', 'Authority', 'Registry']}><Signup /></ProtectedRoute> },
      { path: "/listNft", exact: true, element: <ProtectedRoute allowedRoles={['User', 'Authority', 'Registry']}><ListNft /></ProtectedRoute> }, // Add a new route for the NFTsPage component
      { path: "/bidNft", exact: true, element: <ProtectedRoute allowedRoles={['User', 'Authority', 'Registry']}><BidNft /></ProtectedRoute> }, // Add a new route for the BidNft 
      { path: "/auction/:auctionId", exact: true, element: <ProtectedRoute allowedRoles={['User', 'Authority', 'Registry']}><AuctionDetails /></ProtectedRoute> }, // Add a new route for the AuctionDetails component
      { path: "/myCertificates", exact: true, element: <ProtectedRoute allowedRoles={['User', 'Authority', 'Registry']}><MyCertificates /></ProtectedRoute> },
      { path: "/landingPage", exact: true, element: <ProtectedRoute allowedRoles={['User', 'Authority', 'Registry']}><LandingPage /></ProtectedRoute> },
      { path: "/editProfile/:publicKey", exact: true, element: <ProtectedRoute allowedRoles={['User', 'Authority', 'Registry']}><EditProfile /></ProtectedRoute> }
    ],
  },
];

export default ThemeRoutes;
