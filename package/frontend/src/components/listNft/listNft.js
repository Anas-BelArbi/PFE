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

// const ListNft = () => {
//   const [nfts, setNfts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [accounts, setAccounts] = useState([]);

//   useEffect(() => {
//     const fetchListings = async () => {
//       try {
//         const provider = await detectEthereumProvider();

//         if (provider) {
//           const web3 = new Web3(provider);
//           const accounts = await web3.eth.getAccounts();
//           setAccounts(accounts); // Set accounts state here
//           const marketplaceContract = new web3.eth.Contract(MarketplaceABI.abi, contractAddressNftMarketplace);
//           const myTokenContract = new web3.eth.Contract(MyTokenABI.abi, contractAddressNftToken);
//           const listings = await marketplaceContract.methods.getActiveListings().call();

//           const nftDataPromises = listings.map(async (listing) => {
//             try {
//               const tokenUri = await myTokenContract.methods.tokenURI(listing.tokenId).call();
//               const metadata = await axios.get(`https://gateway.pinata.cloud/ipfs/${tokenUri.replace('ipfs://', '')}`);
//               const image = `https://gateway.pinata.cloud/ipfs/${metadata.data.image.replace('ipfs://', '')}`;
//               console.log(`Fetched metadata for token ${listing.tokenId}:`, metadata.data);
//               return { ...listing, image, price: listing.price };
//             } catch (err) {
//               console.error(`Error fetching metadata for token ${listing.tokenId}:`, err);
//               return null;
//             }
//           });

//           const nftData = await Promise.all(nftDataPromises);
//           setNfts(nftData.filter(nft => nft !== null));
//         } else {
//           setError('MetaMask is not installed');
//         }

//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching NFTs:', err);
//         setError('Failed to load NFTs');
//         setLoading(false);
//       }
//     };

//     fetchListings();
//   }, []);

//   const handleBuyNFT = async (listingId, price) => {
//     try {
//       const provider = await detectEthereumProvider();

//       if (provider) {
//         const web3 = new Web3(provider);
//         const marketplaceContract = new web3.eth.Contract(MarketplaceABI.abi, contractAddressNftMarketplace);
//         const accounts = await web3.eth.getAccounts();
//         const buyerAddress = accounts[0];

//         const priceInWei = Web3.utils.toWei(price.toString(), 'ether');
//         console.log(`Buying NFT with listing ID ${listingId} for ${price} ETH`);
//         await marketplaceContract.methods.buyNFT(listingId).send({
//           from: buyerAddress,
//           value: priceInWei
//         });

//         console.log(`NFT with listing ID ${listingId} purchased for ${price} ETH`);
//       } else {
//         console.error('MetaMask is not installed');
//       }
//     } catch (err) {
//       console.error('Error purchasing NFT:', err);
//     }
//   };

//   const cancelListing = async (listingId) => {
//     try {
//       const provider = await detectEthereumProvider();

//       if (provider) {
//         const web3 = new Web3(provider);
//         const marketplaceContract = new web3.eth.Contract(MarketplaceABI.abi, contractAddressNftMarketplace);
//         const accounts = await web3.eth.getAccounts();
//         const currentUserAddress = accounts[0];

//         const listing = nfts.find(nft => nft.listingId === listingId);
//         if (!listing) {
//           console.error(`Listing with ID ${listingId} not found.`);
//           return;
//         }

//         if (currentUserAddress.toLowerCase() !== listing.seller.toLowerCase()) {
//           console.error('You are not the seller of this listing.');
//           return;
//         }

//         await marketplaceContract.methods.cancelListing(listingId).send({
//           from: currentUserAddress
//         });

//         console.log(`Listing with ID ${listingId} has been cancelled.`);
//       } else {
//         console.error('MetaMask is not installed');
//       }
//     } catch (err) {
//       console.error('Error cancelling listing:', err);
//     }
//   };

//   return (
//     <Container>
//       <Row className="justify-content-center">
//         <Col md="8">
//           <Card className="mt-5">
//             <CardBody>
//               <CardTitle tag="h3" className="text-center">NFT Marketplace</CardTitle>
//               {loading ? (
//                 <div className="text-center">
//                   <Spinner color="primary" />
//                 </div>
//               ) : error ? (
//                 <Alert color="danger">{error}</Alert>
//               ) : nfts.length === 0 ? (
//                 <Alert color="warning">No NFTs listed for sale</Alert>
//               ) : (
//                 <CardGroup>
//                   {nfts.map((nft, index) => (
//                     <Card key={index}>
//                       <CardImg top width="100%" src={nft.image} alt={`NFT ${index}`} />
//                       <CardBody>
//                         <CardTitle tag="h5">{`NFT ${index}`}</CardTitle>
//                         <CardText>Price: {Web3.utils.fromWei(nft.price.toString(), 'ether')} ETH</CardText>
//                         <Button className="btn" outline color="primary" size="lg" block onClick={() => handleBuyNFT(nft.listingId, Web3.utils.fromWei(nft.price.toString(), 'ether'))}>Buy</Button>
//                         {nft.seller.toLowerCase() === accounts[0].toLowerCase() && (
//                           <Button className="btn" outline color="danger" size="lg" block onClick={() => cancelListing(nft.listingId)}>Cancel Listing</Button>
//                         )}
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

// export default ListNft;




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
  CardGroup,
  Input,
  FormGroup,
  Label
} from 'reactstrap';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import MarketplaceABI from '../../ABIs/NFTMarketplaceABI.json';
import MyTokenABI from '../../ABIs/NFTToken.json';
import { contractAddressNftMarketplace, contractAddressNftToken } from '../../ABIs/config';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
 

const ListNft = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [accounts, setAccounts] = useState([]);
  const toggleModal = () => setDetailsModal(!detailsModal);
  const [detailsModal, setDetailsModal] = useState(false);
  const [selectedNft, setSelectedNft] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterFuelType, setFilterFuelType] = useState('');

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const provider = await detectEthereumProvider();

        if (provider) {
          const web3 = new Web3(provider);
          const accounts = await web3.eth.getAccounts();
          setAccounts(accounts); // Set accounts state here
          const marketplaceContract = new web3.eth.Contract(MarketplaceABI.abi, contractAddressNftMarketplace);
          const myTokenContract = new web3.eth.Contract(MyTokenABI.abi, contractAddressNftToken);
          const listings = await marketplaceContract.methods.getActiveListings().call();

          const nftDataPromises = listings.map(async (listing) => {
            try {
              const tokenUri = await myTokenContract.methods.tokenURI(listing.tokenId).call();
              const metadata = await axios.get(`https://gateway.pinata.cloud/ipfs/${tokenUri.replace('ipfs://', '')}`);
              const image = `https://gateway.pinata.cloud/ipfs/${metadata.data.image.replace('ipfs://', '')}`;
              console.log(`Fetched metadata for token ${listing.tokenId}:`, metadata.data);
              return { ...listing, image, price: listing.price , name: metadata.data.name ,description: metadata.data.description };
            } catch (err) {
              console.error(`Error fetching metadata for token ${listing.tokenId}:`, err);
              return null;
            }
          });

          const nftData = await Promise.all(nftDataPromises);
          setNfts(nftData.filter(nft => nft !== null));
        } else {
          setError('MetaMask is not installed');
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching NFTs:', err);
        setError('Failed to load NFTs');
        setLoading(false);
      }
    };

    fetchListings();
  }, []);
  

  // const filteredNfts = nfts.filter((nft) =>
  //   nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   nft.description.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  const filteredNfts = nfts.filter((nft) => {
    const matchesSearchTerm = nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nft.description.toLowerCase().includes(searchTerm.toLowerCase());
  
    const matchesType = filterType === '' || nft.description.includes(`- Type: ${filterType}`);
    const matchesFuelType = filterFuelType === '' || nft.description.includes(`- Renewable Fuel Type: ${filterFuelType}`);
  
    return matchesSearchTerm && matchesType && matchesFuelType;
  });
  

  const handleBuyNFT = async (listingId, price) => {
    try {
      const provider = await detectEthereumProvider();

      if (provider) {
        const web3 = new Web3(provider);
        const marketplaceContract = new web3.eth.Contract(MarketplaceABI.abi, contractAddressNftMarketplace);
        const accounts = await web3.eth.getAccounts();
        const buyerAddress = accounts[0];

        const priceInWei = Web3.utils.toWei(price.toString(), 'ether');
        console.log(`Buying NFT with listing ID ${listingId} for ${price} ETH`);
        await marketplaceContract.methods.buyNFT(listingId).send({
          from: buyerAddress,
          value: priceInWei
        });

        console.log(`NFT with listing ID ${listingId} purchased for ${price} ETH`);
        window.location.reload();
      } else {
        console.error('MetaMask is not installed');
      }
    } catch (err) {
      console.error('Error purchasing NFT:', err);
    }
  };

  const openDetailsModal = (nft) => {
    setSelectedNft(nft);
    toggleModal();
  };
  const shortenDescription = (description) => {
    // Adjust the number of characters as needed
    const maxLength = 150;
    return description.length > maxLength ? description.substring(0, maxLength) + '...' : description;
  };
  const cancelListing = async (listingId) => {
    try {
      const provider = await detectEthereumProvider();

      if (provider) {
        const web3 = new Web3(provider);
        const marketplaceContract = new web3.eth.Contract(MarketplaceABI.abi, contractAddressNftMarketplace);
        const accounts = await web3.eth.getAccounts();
        const currentUserAddress = accounts[0];

        const listing = nfts.find(nft => nft.listingId === listingId);
        if (!listing) {
          console.error(`Listing with ID ${listingId} not found.`);
          return;
        }

        if (currentUserAddress.toLowerCase() !== listing.seller.toLowerCase()) {
          console.error('You are not the seller of this listing.');
          return;
        }

        await marketplaceContract.methods.cancelListing(listingId).send({
          from: currentUserAddress
        });

        console.log(`Listing with ID ${listingId} has been cancelled.`);
      } else {
        console.error('MetaMask is not installed');
      }
    } catch (err) {
      console.error('Error cancelling listing:', err);
    }
  };

  return (
<Container>
  <Row className="justify-content-center">
    <Col md="8">
      <Card className="mt-3">
        <CardBody>
          <CardTitle tag="h3" className="text-center" style={{ color: "#13274c", padding: "10px" }}>NFT Marketplace</CardTitle>
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
              ) : nfts.length === 0 ? (
                <Alert color="warning">No NFTs listed for sale</Alert>
              ) : (
                <CardGroup>
                  {filteredNfts.map((nft, index) => (
                    <Card key={index} style={{ marginBottom: '20px' }}>
                      <CardImg top width="100%" height="50%" src={nft.image} alt={`NFT ${index}`} />
                      <CardBody>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <CardTitle tag="h5">{nft.name}</CardTitle>
                        </div>
                        <CardText>Seller: {nft.seller}</CardText>
                        <CardText>Description: <small><div dangerouslySetInnerHTML={{__html:nft.description.length > 100 ? `${nft.description.substring(0, 100)}...` : nft.description}}/></small></CardText>
                        <CardText>Price: {Web3.utils.fromWei(nft.price.toString(), 'ether')} ETH</CardText>
                        {nft.seller.toLowerCase() !== accounts[0].toLowerCase() && (
                          <Button className="btn" outline color="primary" size="lg" block onClick={() => handleBuyNFT(nft.listingId, Web3.utils.fromWei(nft.price.toString(), 'ether'))}>Buy</Button>
                        )}
                        {nft.seller.toLowerCase() === accounts[0].toLowerCase() && (
                          <Button className="btn" outline color="danger" size="lg" block onClick={() => cancelListing(nft.listingId)}>Cancel Listing</Button>
                        )}
                        <Button outline color="info" size="sm" block onClick={() => openDetailsModal(nft)} className="mt-2">
                          See Full Description
                        </Button>
                      </CardBody>
                    </Card>
                  ))}
                </CardGroup>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal isOpen={detailsModal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal} style={{ backgroundColor: '#ccdaff' }}>
          <h4 style={{ color: '#325186' }}>NFT Details</h4>
        </ModalHeader>
        <ModalBody>
          {selectedNft ? (
            <>
              <CardTitle tag="h5" style={{ color: '#325186' }}>{selectedNft.name}</CardTitle>
              <img src={selectedNft.image} alt={selectedNft.name} style={{ width: '100%' }} />
              <small><div dangerouslySetInnerHTML={{__html:selectedNft.description}}/></small>
            </>
          ) : (
            <p>No details available.</p>
          )}
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default ListNft;
