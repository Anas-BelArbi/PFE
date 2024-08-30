// import React, { useEffect, useState } from 'react';
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   CardBody,
//   CardTitle,
//   CardText,
//   CardImg,
//   Alert,
//   Spinner,
//   Button,
//   CardGroup
// } from 'reactstrap';
// import Web3 from 'web3';
// import detectEthereumProvider from '@metamask/detect-provider';
// import MarketplaceABI from '../../ABIs/NFTMarketplaceABI.json';
// import MyTokenABI from '../../ABIs/NFTToken.json';
// import { contractAddressNftMarketplace, contractAddressNftToken } from '../../ABIs/config';
// import axios from 'axios';

// const BidNft = () => {
//   const [auctions, setAuctions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchAuctions = async () => {
//       try {
//         const provider = await detectEthereumProvider();

//         if (provider) {
//           const web3 = new Web3(provider);
//           const marketplaceContract = new web3.eth.Contract(MarketplaceABI.abi, contractAddressNftMarketplace);
//           const myTokenContract = new web3.eth.Contract(MyTokenABI.abi, contractAddressNftToken);
//           const auctions = await marketplaceContract.methods.getActiveAuctions().call();

//           const auctionDataPromises = auctions.map(async (auction) => {
//             try {
//               const tokenUri = await myTokenContract.methods.tokenURI(auction.tokenId).call();
//               const metadata = await axios.get(`https://gateway.pinata.cloud/ipfs/${tokenUri.replace('ipfs://', '')}`);
//               const image = `https://gateway.pinata.cloud/ipfs/${metadata.data.image.replace('ipfs://', '')}`;
//               console.log(`Fetched metadata for auction ${auction._auctionIdCounter}:`, metadata.data);
//               return { ...auction, image, minBid: auction.minBid };
//             } catch (err) {
//               console.error(`Error fetching metadata for auction ${auction.auctionId}:`, err);
//               return null;
//             }
//           });

//           const auctionData = await Promise.all(auctionDataPromises);
//           setAuctions(auctionData.filter(auction => auction !== null));
//         } else {
//           setError('MetaMask is not installed');
//         }

//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching auctions:', err);
//         setError('Failed to load auctions');
//         setLoading(false);
//       }
//     };

//     fetchAuctions();
//   }, []);

//   const handlePlaceBid = async (auctionId, minBid) => {
//     try {
//       const provider = await detectEthereumProvider();

//       if (provider) {
//         const web3 = new Web3(provider);
//         const marketplaceContract = new web3.eth.Contract(MarketplaceABI.abi, contractAddressNftMarketplace);
//         const accounts = await web3.eth.getAccounts();
//         const bidderAddress = accounts[0];

//         // Convert minBid to Wei
//         const minBidInWei = Web3.utils.toWei(minBid.toString(), 'ether');
//         console.log(`Placing bid on auction ID ${auctionId} for ${minBid} ETH`);
//         await marketplaceContract.methods.placeBid(auctionId).send({
//           from: bidderAddress,
//           value: minBidInWei
//         });

//         console.log(`Bid placed on auction ID ${auctionId} for ${minBid} ETH`);
//       } else {
//         console.error('MetaMask is not installed');
//       }
//     } catch (err) {
//       console.error('Error placing bid:', err);
//     }
//   };

//   return (
//     <Container>
//       <Row className="justify-content-center">
//         <Col md="8">
//           <Card className="mt-5">
//             <CardBody>
//               <CardTitle tag="h3" className="text-center">Active Auctions</CardTitle>
//               {loading ? (
//                 <div className="text-center">
//                   <Spinner color="primary" />
//                 </div>
//               ) : error ? (
//                 <Alert color="danger">{error}</Alert>
//               ) : auctions.length === 0 ? (
//                 <Alert color="warning">No active auctions</Alert>
//               ) : (
//                 <CardGroup>
//                   {auctions.map((auction, index) => (
//                     <Card key={index}>
//                       <CardImg top width="100%" src={auction.image} alt={`Auction ${index}`} />
//                       <CardBody>
//                         <CardTitle tag="h5">{`Auction ${index}`}</CardTitle>
//                         <CardText>Minimum Bid: {Web3.utils.fromWei(auction.minBid.toString(), 'ether')} ETH</CardText>
//                         <Button className="btn" outline color="primary" size="lg" block onClick={() => handlePlaceBid(auction._auctionIdCounter, Web3.utils.fromWei(auction.minBid.toString(), 'ether'))}>Place Bid</Button>
//                       </CardBody>
//                     </Card>
//                   ))}
//                 </CardGroup>
//               )}
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default BidNft;


// import React, { useEffect, useState } from 'react';
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   CardBody,
//   CardTitle,
//   CardText,
//   CardImg,
//   Alert,
//   Spinner,
//   Button,
//   CardGroup
// } from 'reactstrap';
// import Web3 from 'web3';
// import detectEthereumProvider from '@metamask/detect-provider';
// import MarketplaceABI from '../../ABIs/NFTMarketplaceABI.json';
// import MyTokenABI from '../../ABIs/NFTToken.json';
// import { contractAddressNftMarketplace, contractAddressNftToken } from '../../ABIs/config';
// import axios from 'axios';
// import { Link } from 'react-router-dom'; // Import Link for navigation

// const BidNft = () => {
//   const [auctions, setAuctions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchAuctions = async () => {
//       try {
//         const provider = await detectEthereumProvider();

//         if (provider) {
//           const web3 = new Web3(provider);
//           const marketplaceContract = new web3.eth.Contract(MarketplaceABI.abi, contractAddressNftMarketplace);
//           const myTokenContract = new web3.eth.Contract(MyTokenABI.abi, contractAddressNftToken);
//           const auctions = await marketplaceContract.methods.getActiveAuctions().call();

//           const auctionDataPromises = auctions.map(async (auction) => {
//             try {
//               const tokenUri = await myTokenContract.methods.tokenURI(auction.tokenId).call();
//               const metadata = await axios.get(`https://gateway.pinata.cloud/ipfs/${tokenUri.replace('ipfs://', '')}`);
//               const image = `https://gateway.pinata.cloud/ipfs/${metadata.data.image.replace('ipfs://', '')}`;
//               console.log(`Fetched metadata for auction ${auction._auctionIdCounter}:`, metadata.data);
//               return { ...auction, image, minBid: auction.minBid };
//             } catch (err) {
//               console.error(`Error fetching metadata for auction ${auction.auctionId}:`, err);
//               return null;
//             }
//           });

//           const auctionData = await Promise.all(auctionDataPromises);
//           setAuctions(auctionData.filter(auction => auction !== null));
//         } else {
//           setError('MetaMask is not installed');
//         }

//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching auctions:', err);
//         setError('Failed to load auctions');
//         setLoading(false);
//       }
//     };

//     fetchAuctions();
//   }, []);

//   return (
//     <Container>
//       <Row className="justify-content-center">
//         <Col md="8">
//           <Card className="mt-5">
//             <CardBody>
//               <CardTitle tag="h3" className="text-center">Active Auctions</CardTitle>
//               {loading ? (
//                 <div className="text-center">
//                   <Spinner color="primary" />
//                 </div>
//               ) : error ? (
//                 <Alert color="danger">{error}</Alert>
//               ) : auctions.length === 0 ? (
//                 <Alert color="warning">No active auctions</Alert>
//               ) : (
//                 <CardGroup>
//                   {auctions.map((auction, index) => (
//                     <Card key={index}>
//                       <CardImg top width="100%" src={auction.image} alt={`Auction ${index}`} />
//                       <CardBody>
//                         <CardTitle tag="h5">{`Auction ${index}`}</CardTitle>
//                         <CardText>Minimum Bid: {Web3.utils.fromWei(auction.minBid.toString(), 'ether')} ETH</CardText>
//                         <Link to={`/auction/${auction._auctionIdCounter}`}>
//                           <Button className="btn" outline color="primary" size="lg" block>See Bid</Button>
//                         </Link>
//                       </CardBody>
//                     </Card>
//                   ))}
//                 </CardGroup>
//               )}
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default BidNft;


import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Alert,
  Spinner,
  Button,
  Input,
  FormGroup,
  Label,
  CardGroup
} from 'reactstrap';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import MarketplaceABI from '../../ABIs/NFTMarketplaceABI.json';
import MyTokenABI from '../../ABIs/NFTToken.json';
import { contractAddressNftMarketplace, contractAddressNftToken } from '../../ABIs/config';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BidNft = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterFuelType, setFilterFuelType] = useState('');

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const provider = await detectEthereumProvider();

        if (provider) {
          const web3 = new Web3(provider);
          const marketplaceContract = new web3.eth.Contract(MarketplaceABI.abi, contractAddressNftMarketplace);
          const myTokenContract = new web3.eth.Contract(MyTokenABI.abi, contractAddressNftToken);
          const auctions = await marketplaceContract.methods.getActiveAuctions().call();

          const auctionDataPromises = auctions.map(async (auction) => {
            try {
              const tokenUri = await myTokenContract.methods.tokenURI(auction.tokenId).call();
              const metadata = await axios.get(`https://gateway.pinata.cloud/ipfs/${tokenUri.replace('ipfs://', '')}`);
              const image = `https://gateway.pinata.cloud/ipfs/${metadata.data.image.replace('ipfs://', '')}`;
              console.log(`Fetched metadata for auction ${auction._auctionIdCounter}:`, metadata.data);

              const endTime = new Date(Number(auction.endTime) * 1000);

              return { ...auction, image, endTime, name: metadata.data.name ,description: metadata.data.description };
            } catch (err) {
              console.error(`Error fetching metadata for auction ${auction.auctionId}:`, err);
              return null;
            }
          });

          const auctionData = await Promise.all(auctionDataPromises);
          setAuctions(auctionData.filter(auction => auction !== null));
        } else {
          setError('MetaMask is not installed');
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching auctions:', err);
        setError('Failed to load auctions');
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  // const filteredNfts = auctions.filter((nft) =>
  //   nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   nft.description.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  const filteredNfts = auctions.filter((nft) => {
    const matchesSearchTerm = nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nft.description.toLowerCase().includes(searchTerm.toLowerCase());
  
    const matchesType = filterType === '' || nft.description.includes(`- Type: ${filterType}`);
    const matchesFuelType = filterFuelType === '' || nft.description.includes(`- Renewable Fuel Type: ${filterFuelType}`);
  
    return matchesSearchTerm && matchesType && matchesFuelType;
  });
  const truncateAddress = (address) => {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAuctions((prevAuctions) => 
        prevAuctions.map((auction) => {
          const timeLeft = calculateTimeLeft(auction.endTime);
          return { ...auction, timeLeft };
        })
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [auctions]);

  const calculateTimeLeft = (endTime) => {
    const difference = endTime - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = {
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
    return timeLeft;
  };

  return (
<Container>
  <Row className="justify-content-center">
    <Col md="8">
      <Card className="mt-3">
        <CardBody>
          <CardTitle tag="h3" className="text-center" style={{ color: "#13274c" }}>Active Auctions</CardTitle>
          <Row form>
          <Col md={4}>
              <FormGroup>
                <Label for="searchTerm">Search by name or description</Label>
                <Input
                  type="text"
                  id="searchTerm"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ marginBottom: '20px' }}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="filterType">Filter by Type</Label>
                <Input type="select" id="filterType" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                  <option value="">All Types</option>
                  <option value="Solar">Solar</option>
                  <option value="Wind">Wind</option>
                  <option value="Hydro">Hydro</option>
                  <option value="Geothermal">Geothermal</option>
                  <option value="Biomass">Biomass</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="filterFuelType">Filter by Fuel Type</Label>
                <Input type="select" id="filterFuelType" value={filterFuelType} onChange={(e) => setFilterFuelType(e.target.value)}>
                  <option value="">All Fuel Types</option>
                  <option value="Solar Photovoltaic">Solar Photovoltaic</option>
                  <option value="Wind">Wind</option>
                  <option value="Hydropower">Hydropower</option>
                  <option value="Geothermal">Geothermal</option>
                  <option value="Biomass">Biomass</option>
                </Input>
              </FormGroup>
            </Col>
            
          </Row>

              {loading ? (
                <div className="text-center">
                  <Spinner color="primary" />
                </div>
              ) : error ? (
                <Alert color="danger">{error}</Alert>
              ) : auctions.length === 0 ? (
                <Alert color="warning">No active auctions</Alert>
              ) : (
                <CardGroup>
                  {filteredNfts.map((auction, index) => {
                    const timeLeft = auction.timeLeft || calculateTimeLeft(auction.endTime);
                    return (
                      <Col md="6" key={index} className="mb-4">
                        <Card className="mb-5">
                          <CardBody style={{ backgroundColor: "#ccdaff", marginBottom: "0" }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <CardTitle tag="h5" style={{ color: "#13274c" }}>{`Auction ${auction._auctionIdCounter}`}</CardTitle>
                              <CardTitle tag="h5" style={{ color: "#13274c" }}>{`Time Left: ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}</CardTitle>
                            </div>
                          </CardBody>
                          <CardBody style={{ padding: 0 }}>
                            <div style={{ height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                              <CardImg top src={auction.image} alt={`Auction ${auction._auctionIdCounter}`} style={{ maxHeight: '100%', maxWidth: '100%' }} />
                            </div>
                          </CardBody>
                          <CardBody>
                            <table style={{ width: "100%", borderCollapse: 'collapse' }}>
                              <tbody>
                                <tr>
                                  <td><strong>Token ID:</strong></td>
                                  <td>{auction.tokenId.toString()}</td>
                                </tr>
                                <tr>
                                  <td><strong>Seller:</strong></td>
                                  {/* <td>{auction.seller}</td> */}
                                  <td>{truncateAddress(auction.seller)}</td>
                                </tr>
                                <tr>
                                  <td><strong>Highest Bidder:</strong></td>
                                  {/* <td><small>{auction.highestBidder}</small></td> */}
                                  <td>{truncateAddress(auction.highestBidder)}</td>
                                </tr>
                                <tr>
                                  <td><strong>Highest Bid:</strong></td>
                                  <td>{Web3.utils.fromWei(auction.highestBid.toString(), 'ether')} ETH</td>
                                </tr>
                                <tr>
                                  <td><strong>Minimum Bid:</strong></td>
                                  <td>{Web3.utils.fromWei(auction.minBid.toString(), 'ether')} ETH</td>
                                </tr>
                                <tr>
                                  <td colSpan="2"><strong>Description:</strong></td>
                                </tr>
                                <tr>
                                  <td colSpan="2"><small><div dangerouslySetInnerHTML={{ __html: auction.description.slice(0, 50) }} />... </small></td>
                                </tr>
                              </tbody>
                            </table>
                            <Link to={`/auction/${auction._auctionIdCounter}`}>
                              <Button className="btn" outline color="primary" size="lg" block>See Bid</Button>
                            </Link>
                          </CardBody>
                        </Card>
                      </Col>
                    );
                  })}
                </CardGroup>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BidNft;
