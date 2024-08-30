// import React, { useState, useEffect } from 'react';
// import Web3 from 'web3';
// import { Card, CardBody, CardTitle, CardSubtitle, Table, Button } from 'reactstrap';
// import RenewableEnergyCertificatesABI from '../../ABIs/RenewableEnergyCertificates.json';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { CONTRACT_ADDRESS } from '../../ABIs/config';

// const ListCertificateAuthority = () => {
//   const [certificates, setCertificates] = useState([]);
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
//     const loadCertificates = async () => {
//       if (contract) {
//         const certificateCount = await contract.methods.nextCertificateID().call();
//         const certificates = [];
//         for (let i = 0; i < certificateCount; i++) {
//           const certificate = await contract.methods.getCertificate(i).call();
//           certificates.push(certificate);
//         }
//         setCertificates(certificates);
//       }
//     };

//     loadCertificates();
//   }, [contract]);

//   const verifyCertificate = async (certificateID) => {
//     if (contract && account) {
//       await contract.methods.verifyCertificate(certificateID).send({ from: account });
//       // Reload the certificates after verification
//       const certificateCount = await contract.methods.nextCertificateID().call();
//       const certificates = [];
//       for (let i = 0; i < certificateCount; i++) {
//         const certificate = await contract.methods.getCertificate(i).call();
//         certificates.push(certificate);
//       }
//       setCertificates(certificates);
//     }
//   };

//   return (
//     <div className="card" >
//       <CardBody>
//         <CardTitle tag="h5">Certificate Listing</CardTitle>
//         <CardSubtitle className="mb-2 text-muted" tag="h6">
//           Overview of the certificates
//         </CardSubtitle>
//         <Table className="no-wrap mt-3 align-middle" responsive borderless>
//           <thead>
//             <tr>
//               <th>Certificate ID</th>
//               <th>Certificate Data</th>
//               <th>Certificate Type</th>
//               <th>Tracking System ID</th>
//               <th>Renewable Fuel Type</th>
//               <th>Facility Location</th>
//               <th>Capacity</th>
//               <th>Project Name</th>
//               <th>Emissions Rate</th>
//               <th>Verification</th>
//             </tr>
//           </thead>
//           <tbody>
//             {certificates.map((certificate, index) => (
//               <tr key={index} className="border-top">
//                 <td>{certificate.CertificateUniqueID.toString()}</td>
//                 <td>{certificate.certificateData}</td>
//                 <td>{certificate.certificateType}</td>
//                 <td>{certificate.TrackingSystemID}</td>
//                 <td>{certificate.RenewableFuelType}</td>
//                 <td>{certificate.RenewableFacilityLocation}</td>
//                 <td>{certificate.NameplateCapacityOfProject}</td>
//                 <td>{certificate.ProjectName}</td>
//                 <td>{certificate.EmissionsRateOfRenewableResource}</td>
//                 <td>
//                   <Button
//                     onClick={() => verifyCertificate(certificate.CertificateUniqueID)}
//                     disabled={certificate.stateA}
//                     className="btn" outline color="success"
//                   >
//                     Verify
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </CardBody>
//     </div>
//   );
// };

// export default ListCertificateAuthority;


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
  TextField,
  TableSortLabel
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

const ListCertificateAuthority = () => {
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

      const contract = new web3.eth.Contract(RenewableEnergyCertificatesABI.abi, CONTRACT_ADDRESS);
      setContract(contract);
    };

    initWeb3();
  }, []);

  useEffect(() => {
    const loadCertificates = async () => {
      if (contract) {
        const certificateCount = await contract.methods.nextCertificateID().call();
        const certificates = [];
        for (let i = 0; i < certificateCount; i++) {
          const certificate = await contract.methods.getCertificate(i).call();
          certificates.push(certificate);
        }
        setCertificates(certificates);
        setFilteredCertificates(certificates);
      }
    };

    if (contract && account) {
      loadCertificates();
    }
  }, [contract, account]);

  // const verifyCertificate = async (certificateID) => {
  //   try {
  //     if (contract && account) {
  //       await contract.methods.verifyCertificate(certificateID).send({ from: account });
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

  const verifyCertificate = async (certificateID) => {
    if (contract && account) {
      await contract.methods.verifyCertificate(certificateID).send({ from: account });
      // Reload the certificates after verification
      const certificateCount = await contract.methods.nextCertificateID().call();
      const certificates = [];
      for (let i = 0; i < certificateCount; i++) {
        const certificate = await contract.methods.getCertificate(i).call();
        certificates.push(certificate);
      }
      setCertificates(certificates);
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
        <CardTitle tag="h5">Certificate Authority Listing</CardTitle>
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
          <Table sx={{ minWidth: 700 }} aria-label="customized table" component={Paper} striped >
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
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stableSort(filteredCertificates, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((certificate) => (
                  <StyledTableRow key={certificate.CertificateUniqueID}>
                    <StyledTableCell>{certificate.CertificateUniqueID.toString()}</StyledTableCell>
                    <StyledTableCell>{certificate.certificateData}</StyledTableCell>
                    <StyledTableCell>{certificate.certificateType}</StyledTableCell>
                    <StyledTableCell>{certificate.TrackingSystemID}</StyledTableCell>
                    <StyledTableCell>{certificate.RenewableFuelType}</StyledTableCell>
                    <StyledTableCell>{certificate.RenewableFacilityLocation}</StyledTableCell>
                    <StyledTableCell>{certificate.NameplateCapacityOfProject}</StyledTableCell>
                    <StyledTableCell>{certificate.ProjectName}</StyledTableCell>
                    <StyledTableCell>
                      <Button onClick={() => verifyCertificate(certificate.CertificateUniqueID)} disabled={certificate.stateA} className="btn" outline color="primary">
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

export default ListCertificateAuthority;
