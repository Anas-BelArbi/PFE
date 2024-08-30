// import React, { useState, useEffect } from 'react';
// import Web3 from 'web3';
// import { Card, CardBody, CardTitle, CardSubtitle, Table, Button } from 'reactstrap';
// import CertificateReceiverABI from '../../ABIs/CertificateReceiver.json';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { contractAddressrec } from '../../ABIs/config';
// import axios from 'axios';
// import {
//   tableCellClasses,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Paper,
//   TablePagination
// } from '@mui/material';
// import { styled } from '@mui/material/styles';

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.white,
//     color: theme.palette.common.black,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

// const ListCertificateRegistry = () => {
//   const [certificates, setCertificates] = useState([]);
//   const [account, setAccount] = useState('');
//   const [contract, setContract] = useState(null);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

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

//       const contract = new web3.eth.Contract(CertificateReceiverABI.abi, contractAddressrec);
//       setContract(contract);
//     };

//     initWeb3();
//   }, []);

//   useEffect(() => {
//     const loadCertificates = async () => {
//       if (contract) {
//         const certificates = await contract.methods.getAllCertificatesFromFirstContract().call({ from: account });
//         console.log("response after execution", certificates);
//         setCertificates(certificates);
//       }
//     };

//     if (contract && account) {
//       loadCertificates();
//     }
//   }, [contract, account]);

//   const verifyCertificate = async (certificateUniqueId) => {
//     try {
//       if (contract && account) {
//         const certificateIndex = certificates.findIndex(certificate => certificate.CertificateUniqueID === certificateUniqueId);
//         await contract.methods.verifyCertificateRegistry(certificateIndex).send({ from: account });
//         const updatedCertificates = await contract.methods.getAllCertificatesFromFirstContract().call({ from: account });
//         setCertificates(updatedCertificates);
//         const response = await axios.post('http://localhost:5001/run-upload-script');
//         console.log(response.data);
//       }
//     } catch (error) {
//       console.error("Error verifying certificate:", error);
//     }
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <Card>
//       <CardBody>
//         <CardTitle tag="h5">Certificate Registry Listing</CardTitle>
//         <CardSubtitle className="mb-2 text-muted" tag="h6">
//           Overview of the certificates
//         </CardSubtitle>
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 700 }} aria-label="customized table">
//             <TableHead>
//               <TableRow>
//                 <StyledTableCell>Certificate ID</StyledTableCell>
//                 <StyledTableCell>Certificate Data</StyledTableCell>
//                 <StyledTableCell>Certificate Type</StyledTableCell>
//                 <StyledTableCell>Tracking System ID</StyledTableCell>
//                 <StyledTableCell>Renewable Fuel Type</StyledTableCell>
//                 <StyledTableCell>Facility Location</StyledTableCell>
//                 <StyledTableCell>Capacity</StyledTableCell>
//                 <StyledTableCell>Project Name</StyledTableCell>
//                 <StyledTableCell>Emissions Rate</StyledTableCell>
//                 <StyledTableCell>Verification</StyledTableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {certificates.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((certificate, index) => (
//                 <StyledTableRow key={index}>
//                   <StyledTableCell>{certificate.CertificateUniqueID.toString()}</StyledTableCell>
//                   <StyledTableCell>{certificate.certificateData}</StyledTableCell>
//                   <StyledTableCell>{certificate.certificateType}</StyledTableCell>
//                   <StyledTableCell>{certificate.TrackingSystemID}</StyledTableCell>
//                   <StyledTableCell>{certificate.RenewableFuelType}</StyledTableCell>
//                   <StyledTableCell>{certificate.RenewableFacilityLocation}</StyledTableCell>
//                   <StyledTableCell>{certificate.NameplateCapacityOfProject}</StyledTableCell>
//                   <StyledTableCell>{certificate.ProjectName}</StyledTableCell>
//                   <StyledTableCell>{certificate.EmissionsRateOfRenewableResource}</StyledTableCell>
//                   <StyledTableCell>
//                     <Button
//                       onClick={() => verifyCertificate(certificate.CertificateUniqueID)}
//                       disabled={certificate.stateR}
//                       outline color="success"
//                     >
//                       Verify
//                     </Button>
//                   </StyledTableCell>
//                 </StyledTableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={certificates.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </CardBody>
//     </Card>
//   );
// };

// export default ListCertificateRegistry;


import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';
import CertificateReceiverABI from '../../ABIs/CertificateReceiver.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import { contractAddressrec } from '../../ABIs/config';
import axios from 'axios';
import {
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination,
  TextField,
  TableSortLabel
} from '@mui/material';

import { Table } from 'reactstrap';
import { styled } from '@mui/material/styles';

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

const ListCertificateRegistry = () => {
  const [certificates, setCertificates] = useState([]);
  const [filteredCertificates, setFilteredCertificates] = useState([]);
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');

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

      const contract = new web3.eth.Contract(CertificateReceiverABI.abi, contractAddressrec);
      setContract(contract);
    };

    initWeb3();
  }, []);

  useEffect(() => {
    const loadCertificates = async () => {
      if (contract) {
        const certificates = await contract.methods.getAllCertificatesFromFirstContract().call({ from: account });
        setCertificates(certificates);
        setFilteredCertificates(certificates);
      }
    };

    if (contract && account) {
      loadCertificates();
    }
  }, [contract, account]);

  // const verifyCertificate = async (certificateUniqueId) => {
  //   try {
  //     if (contract && account) {
  //       const certificateIndex = certificates.findIndex(certificate => certificate.CertificateUniqueID === certificateUniqueId);
  //       await contract.methods.verifyCertificateRegistry(certificateIndex).send({ from: account });
  //       const updatedCertificates = await contract.methods.getAllCertificatesFromFirstContract().call({ from: account });
  //       setCertificates(updatedCertificates);
  //       setFilteredCertificates(updatedCertificates);
  //       const response = await axios.post('http://localhost:5001/run-upload-script');
  //       console.log(response.data);
  //       window.location.reload();
  //     }
  //   } catch (error) {
  //     console.error("Error verifying certificate:", error);
  //   }
  // };

  const verifyCertificate = async (certificateUniqueId) => {
    try {
      if (contract && account) {
        const certificateIndex = certificates.findIndex(certificate => certificate.CertificateUniqueID === certificateUniqueId);
        const certificate = certificates[certificateIndex];
        
        await contract.methods.verifyCertificateRegistry(certificateIndex).send({ from: account });
        const updatedCertificates = await contract.methods.getAllCertificatesFromFirstContract().call({ from: account });
        setCertificates(updatedCertificates);
        setFilteredCertificates(updatedCertificates);
        
        const response = await axios.post('http://localhost:5001/run-upload-script', {
          ProjectAddress: certificate.ProjectAddress,
          ProjectName: certificate.ProjectName
        });
        console.log(response.data);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error verifying certificate:", error);
    }
  };


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const filtered = certificates.filter(certificate => {
      return Object.keys(certificate).some(key =>
        certificate[key].toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredCertificates(filtered);
  }, [searchTerm, certificates]);

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
    return stabilizedThis.map((el) => el[0]);
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
        <CardTitle tag="h5">Certificate Registry Listing</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Overview of the certificates
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
                <StyledTableCell sortDirection={orderBy === 'CertificateUniqueID' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'CertificateUniqueID'}
                    direction={orderBy === 'CertificateUniqueID' ? order : 'asc'}
                    onClick={() => handleRequestSort('CertificateUniqueID')}
                  >
                    Certificate ID
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell sortDirection={orderBy === 'certificateData' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'certificateData'}
                    direction={orderBy === 'certificateData' ? order : 'asc'}
                    onClick={() => handleRequestSort('certificateData')}
                  >
                    Certificate Data
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell sortDirection={orderBy === 'certificateType' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'certificateType'}
                    direction={orderBy === 'certificateType' ? order : 'asc'}
                    onClick={() => handleRequestSort('certificateType')}
                  >
                    Certificate Type
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell sortDirection={orderBy === 'TrackingSystemID' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'TrackingSystemID'}
                    direction={orderBy === 'TrackingSystemID' ? order : 'asc'}
                    onClick={() => handleRequestSort('TrackingSystemID')}
                  >
                    Tracking System ID
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell sortDirection={orderBy === 'RenewableFuelType' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'RenewableFuelType'}
                    direction={orderBy === 'RenewableFuelType' ? order : 'asc'}
                    onClick={() => handleRequestSort('RenewableFuelType')}
                  >
                    Renewable Fuel Type
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell sortDirection={orderBy === 'RenewableFacilityLocation' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'RenewableFacilityLocation'}
                    direction={orderBy === 'RenewableFacilityLocation' ? order : 'asc'}
                    onClick={() => handleRequestSort('RenewableFacilityLocation')}
                  >
                    Facility Location
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell sortDirection={orderBy === 'NameplateCapacityOfProject' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'NameplateCapacityOfProject'}
                    direction={orderBy === 'NameplateCapacityOfProject' ? order : 'asc'}
                    onClick={() => handleRequestSort('NameplateCapacityOfProject')}
                  >
                    Capacity
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell sortDirection={orderBy === 'ProjectName' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'ProjectName'}
                    direction={orderBy === 'ProjectName' ? order : 'asc'}
                    onClick={() => handleRequestSort('ProjectName')}
                  >
                    Project Name
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell sortDirection={orderBy === 'EmissionsRateOfRenewableResource' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'EmissionsRateOfRenewableResource'}
                    direction={orderBy === 'EmissionsRateOfRenewableResource' ? order : 'asc'}
                    onClick={() => handleRequestSort('EmissionsRateOfRenewableResource')}
                  >
                    Emissions Rate
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell>
                  Verification
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stableSort(filteredCertificates, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((certificate, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{certificate.CertificateUniqueID.toString()}</StyledTableCell>
                    <StyledTableCell>{certificate.certificateData}</StyledTableCell>
                    <StyledTableCell>{certificate.certificateType}</StyledTableCell>
                    <StyledTableCell>{certificate.TrackingSystemID}</StyledTableCell>
                    <StyledTableCell>{certificate.RenewableFuelType}</StyledTableCell>
                    <StyledTableCell>{certificate.RenewableFacilityLocation}</StyledTableCell>
                    <StyledTableCell>{certificate.NameplateCapacityOfProject}</StyledTableCell>
                    <StyledTableCell>{certificate.ProjectName}</StyledTableCell>
                    <StyledTableCell>{certificate.EmissionsRateOfRenewableResource}</StyledTableCell>
                    <StyledTableCell>
                      <Button
                        onClick={() => verifyCertificate(certificate.CertificateUniqueID)}
                        disabled={certificate.stateR}
                        outline color="primary"
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
          count={filteredCertificates.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </CardBody>
    </Card>
  );
};

export default ListCertificateRegistry;
