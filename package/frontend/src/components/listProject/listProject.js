// import React, { useState, useEffect } from 'react';
// import Web3 from 'web3';
// import { Card, CardBody, CardTitle, CardSubtitle, Table, Button } from 'reactstrap';
// import RenewableEnergyCertificatesABI from '../../ABIs/RenewableEnergyCertificates.json';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { CONTRACT_ADDRESS } from '../../ABIs/config';

// const ListProject = () => {
//   const [projects, setProjects] = useState([]);
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

//       // const contractAddress = '0x1c3346E85B1FA5822C12c436dcA28A4eFD371C25';
//       const contract = new web3.eth.Contract(RenewableEnergyCertificatesABI.abi, CONTRACT_ADDRESS);
//       setContract(contract);
//     };

//     initWeb3();
//   }, []);

//   useEffect(() => {
//     const loadProjects = async () => {
//       if (contract) {
//         const projectCount = await contract.methods.nextProjectID().call();
//         const projects = [];
//         for (let i = 0; i < projectCount; i++) {
//           const project = await contract.methods.getProject(i).call();
//           projects.push(project);
//         }
//         setProjects(projects);
//         console.log(projects);
//       }
//     };

//     loadProjects();
//   }, [contract]);

//   const verifyProject = async (projectID) => {
//     if (contract && account) {
//       const projectIDUint = Number(projectID);
//       await contract.methods.verifyProject(projectIDUint).send({ from: account });
//       // Reload the projects after verification
//       const projectCount = await contract.methods.nextProjectID().call();
//       const projects = [];
//       for (let i = 0; i < projectCount; i++) {
//         const project = await contract.methods.getProject(i).call();
//         projects.push(project);
//       }
//       setProjects(projects);
//     }
//   };

//   return (
    
//     <div class="card">
      
//         <CardBody>
//           <CardTitle tag="h5">Project Listing</CardTitle>
//           <CardSubtitle className="mb-2 text-muted" tag="h6">
//             Overview of the projects
//           </CardSubtitle>

//           <Table className="no-wrap mt-3 align-middle" responsive borderless>
//             <thead>
//               <tr>
//                 <th>Project ID</th>
//                 <th>Project Name</th>
//                 <th>Vision</th>
//                 <th>Domain</th>
//                 <th>Owner</th>
//                 <th>Verification</th>
//               </tr>
//             </thead>
//             <tbody>
//               {projects.map((project, index) => (
//   <tr key={index} className="border-top">
//     <td>{project.projectID.toString()}</td> 
//     <td>{project.projectName}</td>
//     <td>{project.vision}</td>
//     <td>{project.domain}</td>
//     <td>{project.owner}</td>
//     <td>
//     <Button
//   onClick={() => {
//     verifyProject(project.projectID.toString());
//     console.log("Verifying project:", project.projectID);
//   }}
//   disabled={project.verif}
//   className="btn" outline color="success"
// >
//   Verify
// </Button>
//     </td>
//   </tr>
// ))}
//             </tbody>
//           </Table>
//         </CardBody>
      
//     </div>



//   );

// };

// export default ListProject;

import axios from 'axios';

import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import RenewableEnergyCertificatesABI from '../../ABIs/RenewableEnergyCertificates.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CONTRACT_ADDRESS } from '../../ABIs/config';
import {
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination,
  TableSortLabel,
  TextField
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Table } from 'reactstrap';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ListProject = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');


  const fetchUserName = async (publicKey) => {
    try {
      const response = await axios.post('http://localhost:5001/user-details', { publicKey });
      return response.data.user.name;
    } catch (error) {
      console.error('Failed to fetch user name:', error);
      return publicKey; // fallback to displaying publicKey
    }
  };
  
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
    const loadProjects = async () => {
      if (contract) {
        const projectCount = await contract.methods.nextProjectID().call();
        const projects = [];
        for (let i = 0; i < projectCount; i++) {
          const project = await contract.methods.getProject(i).call();
          project.owner = await fetchUserName(project.owner);
          projects.push(project);
        }
        fetchUserName(projects.owner);
        setProjects(projects);
        setFilteredProjects(projects); // Initialize filteredProjects with all projects
        console.log(projects);
      }
    };
    fetchUserName(projects.owner);
    loadProjects();
  }, [contract]);

  // const verifyProject = async (projectID) => {
  //   if (contract && account) {
  //     const projectIDUint = Number(projectID);
  //     await contract.methods.verifyProject(projectIDUint).send({ from: account });
  //     const projectCount = await contract.methods.nextProjectID().call();
  //     const projects = [];
  //     for (let i = 0; i < projectCount; i++) {
  //       const project = await contract.methods.getProject(i).call();
  //       projects.push(project);
  //     }
  //     setProjects(projects);
      
  //     setFilteredProjects(projects); // Update filteredProjects after verification
  //   }
  // };

  const verifyProject = async (projectID) => {
    if (contract && account) {
      const projectIDUint = Number(projectID);
      await contract.methods.verifyProject(projectIDUint).send({ from: account });
      const projectCount = await contract.methods.nextProjectID().call();
      const projects = [];
      for (let i = 0; i < projectCount; i++) {
        const project = await contract.methods.getProject(i).call();
        project.owner = await fetchUserName(project.owner); // Fetch user name after verification
        projects.push(project);
      }
      setProjects(projects);
      setFilteredProjects(projects); // Update filteredProjects after verification
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredProjects(projects); // Reset filteredProjects when search term is cleared
    } else {
      const filtered = projects.filter(project =>
        Object.keys(project).some(key =>
          project[key].toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredProjects(filtered);
    }
  }, [searchTerm, projects]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  };

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Project Listing</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Overview of the projects
        </CardSubtitle>
        <TextField
          label="Search"
          variant="outlined"
          margin="normal"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ marginBottom: 16 }}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table" striped>
            <TableHead>
              <TableRow>
                <StyledTableCell sortDirection={orderBy === 'projectID' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'projectID'}
                    direction={orderBy === 'projectID' ? order : 'asc'}
                    onClick={() => handleRequestSort('projectID')}
                  >
                    Project ID
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell sortDirection={orderBy === 'projectName' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'projectName'}
                    direction={orderBy === 'projectName' ? order : 'asc'}
                    onClick={() => handleRequestSort('projectName')}
                  >
                    Project Name
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell sortDirection={orderBy === 'vision' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'vision'}
                    direction={orderBy === 'vision' ? order : 'asc'}
                    onClick={() => handleRequestSort('vision')}
                  >
                    Vision
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell sortDirection={orderBy === 'domain' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'domain'}
                    direction={orderBy === 'domain' ? order : 'asc'}
                    onClick={() => handleRequestSort('domain')}
                  >
                    Domain
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell sortDirection={orderBy === 'owner' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'owner'}
                    direction={orderBy === 'owner' ? order : 'asc'}
                    onClick={() => handleRequestSort('owner')}
                  >
                    Owner
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell>Verification</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stableSort(filteredProjects, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((project, index) => (
                  <StyledTableRow key={index} className="border-top">
                    <StyledTableCell>{project.projectID.toString()}</StyledTableCell>
                    <StyledTableCell>{project.projectName}</StyledTableCell>
                    <StyledTableCell>{project.vision}</StyledTableCell>
                    <StyledTableCell>{project.domain}</StyledTableCell>
                    <StyledTableCell>{project.owner}</StyledTableCell>
                    <StyledTableCell>
                      <Button
                        onClick={() => {
                          verifyProject(project.projectID.toString());
                          console.log("Verifying project:", project.projectID);
                        }}
                        disabled={project.verif}
                        className="btn" outline color="primary"
                      >
                        Verify
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={projects.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </CardBody>
    </Card>
  );
};

export default ListProject;
