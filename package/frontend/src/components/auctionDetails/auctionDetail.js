

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
//   Input,
// } from 'reactstrap';
// import Web3 from 'web3';
// import detectEthereumProvider from '@metamask/detect-provider';
// import MarketplaceABI from '../../ABIs/NFTMarketplaceABI.json';
// import MyTokenABI from '../../ABIs/NFTToken.json';
// import { contractAddressNftMarketplace, contractAddressNftToken } from '../../ABIs/config';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const AuctionDetails = () => {
//   const { auctionId } = useParams(); // Get the auction ID from the route parameters
//   const [auction, setAuction] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [timeLeft, setTimeLeft] = useState({}); // State for countdown timer
//   const [currentUser, setCurrentUser] = useState(null); // State for current user
//   const [bidAmount, setBidAmount] = useState(''); // State for bid amount

//   useEffect(() => {
//     const fetchAuctionDetails = async () => {
//       try {
//         const provider = await detectEthereumProvider();

//         if (provider) {
//           const web3 = new Web3(provider);
//           const marketplaceContract = new web3.eth.Contract(MarketplaceABI.abi, contractAddressNftMarketplace);
//           const myTokenContract = new web3.eth.Contract(MyTokenABI.abi, contractAddressNftToken);
//           const auctionData = await marketplaceContract.methods.auctions(auctionId).call();

//           console.log('Fetched auction data:', auctionData);

//           const tokenUri = await myTokenContract.methods.tokenURI(auctionData.tokenId).call();
//           const metadata = await axios.get(`https://gateway.pinata.cloud/ipfs/${tokenUri.replace('ipfs://', '')}`);
//           const image = `https://gateway.pinata.cloud/ipfs/${metadata.data.image.replace('ipfs://', '')}`;
//           console.log(`Fetched metadata for auction ${auctionData._auctionIdCounter.toString()}:`, metadata.data);

//           const endTime = new Date(Number(auctionData.endTime) * 1000); // Convert UNIX timestamp to Date object
//           console.log('Auction end time:', endTime);

//           // Convert minBid and highestBid from Wei to Ether for display
//           const minBidInEther = Web3.utils.fromWei(auctionData.minBid.toString(), 'ether');
//           const highestBidInEther = Web3.utils.fromWei(auctionData.highestBid.toString(), 'ether');

//           setAuction({ ...auctionData, image, endTime, minBidInEther, highestBidInEther });
//           setTimeLeft(calculateTimeLeft(endTime));
//           setLoading(false);

//           const accounts = await web3.eth.getAccounts();
//           if (accounts.length > 0) {
//             setCurrentUser(accounts[0]);
//           }

//           const intervalId = setInterval(() => {
//             const newTimeLeft = calculateTimeLeft(endTime);
//             setTimeLeft(newTimeLeft);

//             // If auction has ended, stop the timer
//             if (newTimeLeft.hours === 0 && newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
//               clearInterval(intervalId);
//             }
//           }, 1000);

//           return () => clearInterval(intervalId); // Cleanup interval on component unmount
//         } else {
//           setError('MetaMask is not installed');
//           setLoading(false);
//         }
//       } catch (err) {
//         console.error('Error fetching auction details:', err);
//         setError('Failed to load auction details');
//         setLoading(false);
//       }
//     };

//     fetchAuctionDetails();
//   }, [auctionId]);

//   const calculateTimeLeft = (endTime) => {
//     const difference = endTime - new Date();
//     let timeLeft = {};

//     if (difference > 0) {
//       timeLeft = {
//         hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//         minutes: Math.floor((difference / 1000 / 60) % 60),
//         seconds: Math.floor((difference / 1000) % 60),
//       };
//     } else {
//       timeLeft = {
//         hours: 0,
//         minutes: 0,
//         seconds: 0,
//       };
//     }
//     console.log('Time left:', timeLeft);
//     return timeLeft;
//   };

//   const handlePlaceBid = async () => {
//     try {
//       const provider = await detectEthereumProvider();

//       if (provider) {
//         const web3 = new Web3(provider);
//         const marketplaceContract = new web3.eth.Contract(MarketplaceABI.abi, contractAddressNftMarketplace);
//         const accounts = await web3.eth.getAccounts();
//         const bidderAddress = accounts[0];

//         // Convert bidAmount to Wei
//         const bidAmountInWei = Web3.utils.toWei(bidAmount, 'ether');
//         console.log(`Placing bid on auction ID ${auction._auctionIdCounter.toString()} for ${Web3.utils.fromWei(bidAmountInWei, 'ether')} ETH`);
//         await marketplaceContract.methods.placeBid(auction._auctionIdCounter).send({
//           from: bidderAddress,
//           value: bidAmountInWei
//         });

//         console.log(`Bid placed on auction ID ${auction._auctionIdCounter.toString()} for ${Web3.utils.fromWei(bidAmountInWei, 'ether')} ETH`);
//       } else {
//         console.error('MetaMask is not installed');
//       }
//     } catch (err) {
//       console.error('Error placing bid:', err);
//     }
//   };

//   const triggerEndAuction = async (auctionId) => {
//     try {
//       const provider = await detectEthereumProvider();

//       if (provider) {
//         const web3 = new Web3(provider);
//         const marketplaceContract = new web3.eth.Contract(MarketplaceABI.abi, contractAddressNftMarketplace);
//         const accounts = await web3.eth.getAccounts();
//         const currentUserAddress = accounts[0]; // Get the current user's address

//         // Ensure the current user is the seller
//         if (currentUserAddress.toLowerCase() !== auction.seller.toLowerCase()) {
//           console.error('You are not the seller of this auction.');
//           setError('Only the seller can end the auction.');
//           return;
//         }

//         await marketplaceContract.methods.endAuction(auctionId).send({
//           from: currentUserAddress
//         });

//         console.log(`Auction ID ${auctionId} has been ended.`);
//       } else {
//         console.error('MetaMask is not installed');
//       }
//     } catch (err) {
//       console.error('Error ending auction:', err);
//     }
//   };

//   return (
//     <Container>
//       <Row className="justify-content-center">
//         <Col md="8">
//           <Card className="mt-5">
//             <CardBody>
//               <CardTitle tag="h3" className="text-center">Auction Details</CardTitle>
//               {loading ? (
//                 <div className="text-center">
//                   <Spinner color="primary" />
//                 </div>
//               ) : error ? (
//                 <Alert color="danger">{error}</Alert>
//               ) : auction === null ? (
//                 <Alert color="warning">Auction not found</Alert>
//               ) : (
//                 <>
//                   <CardImg top width="100%" src={auction.image} alt={`Auction ${auction._auctionIdCounter.toString()}`} />
//                   <CardBody>
//                     <CardTitle tag="h5">{`Auction ${auction._auctionIdCounter.toString()}`}</CardTitle>
//                     <CardText><strong>Token ID:</strong> {auction.tokenId}</CardText>
//                     <CardText><strong>Seller:</strong> {auction.seller}</CardText>
//                     <CardText><strong>Highest Bidder:</strong> {auction.highestBidder}</CardText>
//                     <CardText><strong>Highest Bid:</strong> {auction.highestBidInEther} ETH</CardText>
//                     <CardText><strong>Minimum Bid:</strong> {auction.minBidInEther} ETH</CardText>
//                     <CardText><strong>Auction End Time:</strong> {auction.endTime.toString()}</CardText>
//                     <CardText><strong>Time Left:</strong> {`${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}</CardText>
//                     {currentUser && currentUser.toLowerCase() !== auction.seller.toLowerCase() ? (
//                       <>
//                         <Input
//                           type="number"
//                           value={bidAmount}
//                           onChange={(e) => setBidAmount(e.target.value)}
//                           placeholder="Enter your bid in ETH"
//                         />
//                         <Button color="primary" onClick={handlePlaceBid}>
//                           Place Bid
//                         </Button>
//                       </>
//                     ) : (
//                       <Button className="btn" outline color="primary" size="lg" block onClick={() => triggerEndAuction(auctionId)}>
//                         End Auction
//                       </Button>
                      
//                     )}
//                   </CardBody>
//                 </>
//               )}
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default AuctionDetails;









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
} from 'reactstrap';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import MarketplaceABI from '../../ABIs/NFTMarketplaceABI.json';
import MyTokenABI from '../../ABIs/NFTToken.json';
import { contractAddressNftMarketplace, contractAddressNftToken } from '../../ABIs/config';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AuctionDetails = () => {
  const { auctionId } = useParams(); // Get the auction ID from the route parameters
  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState({}); // State for countdown timer
  const [currentUser, setCurrentUser] = useState(null); // State for current user
  const [bidAmount, setBidAmount] = useState(''); // State for bid amount
  const [bidError, setBidError] = useState('');

  useEffect(() => {
    const fetchAuctionDetails = async () => {
      try {
        const provider = await detectEthereumProvider();

        if (provider) {
          const web3 = new Web3(provider);
          const marketplaceContract = new web3.eth.Contract(MarketplaceABI.abi, contractAddressNftMarketplace);
          const myTokenContract = new web3.eth.Contract(MyTokenABI.abi, contractAddressNftToken);
          const auctionData = await marketplaceContract.methods.auctions(auctionId).call();

          console.log('Fetched auction data:', auctionData);

          const tokenUri = await myTokenContract.methods.tokenURI(auctionData.tokenId).call();
          const metadata = await axios.get(`https://gateway.pinata.cloud/ipfs/${tokenUri.replace('ipfs://', '')}`);
          const image = `https://gateway.pinata.cloud/ipfs/${metadata.data.image.replace('ipfs://', '')}`;
          console.log(`Fetched metadata for auction ${auctionData._auctionIdCounter.toString()}:`, metadata.data);

          const endTime = new Date(Number(auctionData.endTime) * 1000); // Convert UNIX timestamp to Date object
          console.log('Auction end time:', endTime);

          // Convert minBid and highestBid from Wei to Ether for display
          const minBidInEther = Web3.utils.fromWei(auctionData.minBid.toString(), 'ether');
          const highestBidInEther = Web3.utils.fromWei(auctionData.highestBid.toString(), 'ether');

          setAuction({ ...auctionData, image, endTime, minBidInEther, highestBidInEther, description: metadata.data.description });
          setTimeLeft(calculateTimeLeft(endTime));
          setLoading(false);

          const accounts = await web3.eth.getAccounts();
          if (accounts.length > 0) {
            setCurrentUser(accounts[0]);
          }

          const intervalId = setInterval(() => {
            const newTimeLeft = calculateTimeLeft(endTime);
            setTimeLeft(newTimeLeft);

            // If auction has ended, stop the timer
            if (newTimeLeft.hours === 0 && newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
              clearInterval(intervalId);
            }
          }, 1000);

          return () => clearInterval(intervalId); // Cleanup interval on component unmount
        } else {
          setError('MetaMask is not installed');
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching auction details:', err);
        setError('Failed to load auction details');
        setLoading(false);
      }
    };

    fetchAuctionDetails();
  }, [auctionId]);

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
    console.log('Time left:', timeLeft);
    return timeLeft;
  };

  const handlePlaceBid = async () => {
    try {
      const provider = await detectEthereumProvider();
      const bidAmountInWei = Web3.utils.toWei(bidAmount, 'ether');
    if (parseFloat(bidAmount) <= parseFloat(auction.highestBidInEther) || parseFloat(bidAmount) <= parseFloat(auction.minBidInEther)) {
      setBidError(`Bid must be higher than both the highest bid (${auction.highestBidInEther} ETH) and the minimum bid (${auction.minBidInEther} ETH).`);
    } else if (provider) {
      
        const web3 = new Web3(provider);
        const marketplaceContract = new web3.eth.Contract(MarketplaceABI.abi, contractAddressNftMarketplace);
        const accounts = await web3.eth.getAccounts();
        const bidderAddress = accounts[0];

        // Convert bidAmount to Wei
        const bidAmountInWei = Web3.utils.toWei(bidAmount, 'ether');
        console.log(`Placing bid on auction ID ${auction._auctionIdCounter.toString()} for ${Web3.utils.fromWei(bidAmountInWei, 'ether')} ETH`);
        await marketplaceContract.methods.placeBid(auction._auctionIdCounter).send({
          from: bidderAddress,
          value: bidAmountInWei
        });

        console.log(`Bid placed on auction ID ${auction._auctionIdCounter.toString()} for ${Web3.utils.fromWei(bidAmountInWei, 'ether')} ETH`);
      } else {
        console.error('MetaMask is not installed');
      }
    } catch (err) {
      console.error('Error placing bid:', err);
    }
  };

  const triggerEndAuction = async (auctionId) => {
    try {
      const provider = await detectEthereumProvider();

      if (provider) {
        const web3 = new Web3(provider);
        const marketplaceContract = new web3.eth.Contract(MarketplaceABI.abi, contractAddressNftMarketplace);
        const accounts = await web3.eth.getAccounts();
        const currentUserAddress = accounts[0]; // Get the current user's address

        // Ensure the current user is the seller
        if (currentUserAddress.toLowerCase() !== auction.seller.toLowerCase()) {
          console.error('You are not the seller of this auction.');
          setError('Only the seller can end the auction.');
          return;
        }

        await marketplaceContract.methods.endAuction(auctionId).send({
          from: currentUserAddress
        });

        console.log(`Auction ID ${auctionId} has been ended.`);
      } else {
        console.error('MetaMask is not installed');
      }
    } catch (err) {
      console.error('Error ending auction:', err);
    }
  };

  const cancelAuction = async (auctionId) => {
    try {
      const provider = await detectEthereumProvider();

      if (provider) {
        const web3 = new Web3(provider);
        const marketplaceContract = new web3.eth.Contract(MarketplaceABI.abi, contractAddressNftMarketplace);
        const accounts = await web3.eth.getAccounts();
        const currentUserAddress = accounts[0]; // Get the current user's address

        // Ensure the current user is the seller
        if (currentUserAddress.toLowerCase() !== auction.seller.toLowerCase()) {
          console.error('You are not the seller of this auction.');
          setError('Only the seller can cancel the auction.');
          return;
        }

        await marketplaceContract.methods.cancelAuction(auctionId).send({
          from: currentUserAddress
        });

        console.log(`Auction ID ${auctionId} has been cancelled.`);
      } else {
        console.error('MetaMask is not installed');
      }
    } catch (err) {
      console.error('Error cancelling auction:', err);
    }
  };

  return (
    // <Container>
    //   <Row className="justify-content-center">
    //     <Col md="8">
    //       <Card className="mt-5" style={{backgroundColor:"#ccdaff"}}>
    //         <CardBody>
    //         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    //           <CardTitle tag="h3" ><h2 style={{marginLeft:"10px", color:"#13274c"}}>Auction Details</h2></CardTitle>
    //           <CardTitle tag="h5" style={{ color: "#13274c" }}><strong>{`Auction ${auction._auctionIdCounter.toString()}`}</strong></CardTitle>
    //         </div>
    //           {loading ? (
    //             <div className="text-center">
    //               <Spinner color="primary" />
    //             </div>
    //           ) : error ? (
    //             <Alert color="danger">{error}</Alert>
    //           ) : auction === null ? (
    //             <Alert color="warning">Auction not found</Alert>
    //           ) : (
    //             <>
    //               <CardImg top width="100%" src={auction.image} alt={`Auction ${auction._auctionIdCounter.toString()}`} />
    //               <CardBody>
                    
    //                 <CardText><strong>Token ID:</strong> {auction.tokenId.toString()}</CardText>
    //                 <CardText><strong>Seller:</strong> {auction.seller}</CardText>
    //                 <CardText><strong>Highest Bidder:</strong> {auction.highestBidder}</CardText>
    //                 <CardText><strong>Highest Bid:</strong> {auction.highestBidInEther} ETH</CardText>
    //                 <CardText><strong>Minimum Bid:</strong> {auction.minBidInEther} ETH</CardText>
    //                 <CardText><strong>Auction End Time:</strong> {auction.endTime.toString()}</CardText>
    //                 <CardText><strong>Time Left:</strong> {`${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}</CardText>
    //                 {currentUser && currentUser.toLowerCase() !== auction.seller.toLowerCase() ? (
    //                   <>
    //                     <Input
    //                       type="number"
    //                       value={bidAmount}
    //                       onChange={(e) => setBidAmount(e.target.value)}
    //                       placeholder="Enter your bid in ETH"
    //                     />
    //                     <Button color="primary" size="lg" block onClick={handlePlaceBid}>
    //                       Place Bid
    //                     </Button>
    //                   </>
    //                 ) : (
    //                   <>
    //                     <Button className="btn" outline color="primary" size="lg" block onClick={() => triggerEndAuction(auctionId)}>
    //                       End Auction
    //                     </Button>
    //                     <Button className="btn" outline color="danger" size="lg" block onClick={() => cancelAuction(auctionId)}>
    //                       Cancel Auction
    //                     </Button>
    //                   </>
    //                 )}
    //               </CardBody>
    //             </>
    //           )}
    //         </CardBody>
    //       </Card>
    //     </Col>
    //   </Row>
    // </Container>
    <Container>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <div className="text-center">
              <Spinner color="primary" />
            </div>
          ) : error ? (
            <Alert color="danger">{error}</Alert>
          ) : auction === null ? (
            <Alert color="warning">Auction not found</Alert>
          ) : (
            <>
              <Card className="mt-5" style={{ backgroundColor: "#ccdaff", padding: "10px", marginBottom: "0" }}>
                <CardBody>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <CardTitle tag="h3">
                      <h2 style={{ marginLeft: "10px", color: "#13274c" }}>Auction Details</h2>
                    </CardTitle>
                    <CardTitle tag="h5" style={{ color: "#13274c" }}>
                      <strong>{`Auction ${auction._auctionIdCounter.toString()}`}</strong>
                    </CardTitle>
                  </div>
                  <Card style={{ marginTop: "10px", marginBottom: "10px" }}>
                    <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                      <CardImg top style={{ maxHeight: '100%', maxWidth: '100%' }} src={auction.image} alt={`Auction ${auction._auctionIdCounter.toString()}`} />
                    </div>
                  </Card>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <table style={{ width: "100%", borderCollapse: 'collapse' }}>
                    <tbody>
                      <tr>
                        <td><strong>Token ID:</strong></td>
                        <td>{auction.tokenId.toString()}</td>
                      </tr>
                      <tr>
                        <td><strong>Seller:</strong></td>
                        <td>{auction.seller}</td>
                      </tr>
                      <tr>
                        <td><strong>Highest Bidder:</strong></td>
                        <td>{auction.highestBidder}</td>
                      </tr>
                      <tr>
                        <td><strong>Highest Bid:</strong></td>
                        <td>{auction.highestBidInEther} ETH</td>
                      </tr>
                      <tr>
                        <td><strong>Minimum Bid:</strong></td>
                        <td>{auction.minBidInEther} ETH</td>
                      </tr>
                      <tr>
                        <td><strong>Auction End Time:</strong></td>
                        <td>{auction.endTime.toLocaleString({ timeZoneName: 'short' })}</td>
                      </tr>
                      <tr>
                        <td><strong>Time Left:</strong></td>
                        <td>{`${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}</td>
                      </tr>
                    </tbody>
                  </table>
                  <strong>Description:</strong>
                  <small>
                    <div dangerouslySetInnerHTML={{ __html: auction.description }} />
                  </small>
                  {currentUser && currentUser.toLowerCase() !== auction.seller.toLowerCase() ? (
                    <>
                      <br />
                      <Row>
                        <Col md="10">
                          <Input
                            type="number"
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                            placeholder="Enter your bid in ETH ..."
                          />
                        </Col>
                        <Col md="2">
                          <Button color="primary" outline onClick={handlePlaceBid}>
                            Place Bid
                          </Button>
                        </Col>
                      </Row>
                    </>
                  ) : (
                    <>
                      <br />
                      <Button className="btn" outline color="primary" size="lg" block onClick={() => triggerEndAuction(auctionId)}>
                        End Auction
                      </Button>
                      <Button className="btn" outline color="danger" size="lg" block onClick={() => cancelAuction(auctionId)}>
                        Cancel Auction
                      </Button>
                    </>
                  )}
                </CardBody>
              </Card>
            </>
          )}
        </Col>
      </Row>
    </Container>

  );
};

export default AuctionDetails;
