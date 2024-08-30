// import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import Header from "./Header";
// import { Container } from "reactstrap";
// import { useAuth } from '../components/login/auth';
// import React, { useEffect } from 'react';


// const FullLayout = ({ children }) => {
//   const { verifyToken } = useAuth();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       verifyToken();
//     }, 60000); // Check every 1 minute

//     return () => clearInterval(interval);
//   }, [verifyToken]);
//   return (
//     <main>
//       <div className="pageWrapper d-lg-flex">
//         {/********Sidebar**********/}
//         <aside className="sidebarArea shadow" id="sidebarArea">
//           <Sidebar />
//         </aside>
//         {/********Content Area**********/}

//         <div className="contentArea">
//           {/********header**********/}
//           <Header />
//           {/********Middle Content**********/}
//           <Container className="p-4 wrapper" fluid>
//             <Outlet />
//           </Container>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default FullLayout;


// FullLayout.js
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
// import Header from "./Header";
import { Container } from "reactstrap";
import { useAuth } from '../components/login/auth';
import React, { useEffect } from 'react';
import Chatbot from '../components/chatBot/chatBot';

const FullLayout = ({ children }) => {
  const { verifyToken } = useAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      verifyToken();
    }, 60000); // Check every 1 minute

    return () => clearInterval(interval);
  }, [verifyToken]);

  return (
    <main>
      <div className="pageWrapper d-lg-flex">
        {/********Sidebar**********/}
        <aside className="sidebarArea shadow" id="sidebarArea">
          <Sidebar />
        </aside>
        {/********Content Area**********/}
        <div className="contentArea">
          {/********header**********/}
          {/* <Header /> */}
          {/********Middle Content**********/}
          

          <Container className="p-4 wrapper" fluid style={{marginTop:'20px'}}>
            <Outlet />
            <Chatbot />
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
