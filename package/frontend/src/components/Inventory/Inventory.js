

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
  CardGroup,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import axios from 'axios';
import NFTTokenABI from '../../ABIs/NFTToken.json';
import MarketplaceABI from '../../ABIs/NFTMarketplaceABI.json';
import { contractAddressNftToken, contractAddressNftMarketplace } from '../../ABIs/config';



const Inventory = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [modal, setModal] = useState(false);
  const [auctionModal, setAuctionModal] = useState(false);
  const [selectedTokenId, setSelectedTokenId] = useState(null);
  const [listingPrice, setListingPrice] = useState('');
  const [minBid, setMinBid] = useState('');
  const [duration, setDuration] = useState('');
  const [transferModal, setTransferModal] = useState(false);
  const [newOwnerAddress, setNewOwnerAddress] = useState('');
  const [selectedTokenIdForTransfer, setSelectedTokenIdForTransfer] = useState(null);
  const [detailsModal, setDetailsModal] = useState(false);
  const [selectedNft, setSelectedNft] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterFuelType, setFilterFuelType] = useState('');

  const toggleDropdown = (tokenId) => {
    setDropdownOpen(prevState => ({
      ...prevState,
      [tokenId]: !prevState[tokenId]
    }));
  };
  const toggleDetailsModal = (nft) => {
    setSelectedNft(nft); // Set the selected NFT to state
    setDetailsModal(!detailsModal); // Toggle the visibility of the modal
  };
  const toggleModal = () => setModal(!modal);
  const toggleAuctionModal = () => setAuctionModal(!auctionModal);
  const filteredNfts = nfts.filter(nft =>
    nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    nft.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const listForSale = (tokenId) => {
    setSelectedTokenId(tokenId);
    toggleModal();
  };

  const listForBidding = (tokenId) => {
    setSelectedTokenId(tokenId);
    toggleAuctionModal();
  };

  const handleApproveAndList = async () => {
    try {
      const provider = await detectEthereumProvider();

      if (provider) {
        const web3 = new Web3(provider);
        const nftContract = new web3.eth.Contract(NFTTokenABI.abi, contractAddressNftToken);
        const marketplaceContract = new web3.eth.Contract(MarketplaceABI.abi, contractAddressNftMarketplace);
        const accounts = await web3.eth.getAccounts();
        const ownerAddress = accounts[0];

        // Approve the token
        await nftContract.methods.approve(contractAddressNftMarketplace, selectedTokenId).send({ from: ownerAddress });
        console.log(`Token ${selectedTokenId} approved for marketplace`);

        // List the token for sale
        const priceInWei = web3.utils.toWei(listingPrice, 'ether');
        await marketplaceContract.methods.listNFT(contractAddressNftToken, selectedTokenId, priceInWei).send({
          from: ownerAddress,
          value: web3.utils.toWei('0.000000000000000001', 'ether') // Assuming listing fee is 1 wei
        });

        console.log(`Token ${selectedTokenId} listed for sale at price ${listingPrice} ETH`);
        window.location.reload();

      } else {
        console.error('MetaMask is not installed');
      }
    } catch (err) {
      console.error('Error listing token for sale:', err);
    } finally {
      toggleModal();
    }
  };

  const handleApproveAndCreateAuction = async () => {
    try {
      const provider = await detectEthereumProvider();

      if (provider) {
        const web3 = new Web3(provider);
        const nftContract = new web3.eth.Contract(NFTTokenABI.abi, contractAddressNftToken);
        const marketplaceContract = new web3.eth.Contract(MarketplaceABI.abi, contractAddressNftMarketplace);
        const accounts = await web3.eth.getAccounts();
        const ownerAddress = accounts[0];

        // Approve the token
        await nftContract.methods.approve(contractAddressNftMarketplace, selectedTokenId).send({ from: ownerAddress });
        console.log(`Token ${selectedTokenId} approved for marketplace`);

        // Create the auction
        const minBidInWei = web3.utils.toWei(minBid, 'ether');
        await marketplaceContract.methods.createAuction(contractAddressNftToken, selectedTokenId, minBidInWei, duration).send({
          from: ownerAddress,
          value: web3.utils.toWei('0.000000000000000001', 'ether') // Assuming auction fee is 1 wei
        });

        console.log(`Token ${selectedTokenId} listed for auction with min bid ${minBid} ETH and duration ${duration} seconds`);
        window.location.reload();

      } else {
        console.error('MetaMask is not installed');
      }
    } catch (err) {
      console.error('Error creating auction:', err);
    } finally {
      toggleAuctionModal();
    }
  };

  
  const burnToken = async (tokenId) => {
        try {
          const provider = await detectEthereumProvider();
          if (provider) {
            const web3 = new Web3(provider);
            const nftContract = new web3.eth.Contract(NFTTokenABI.abi, contractAddressNftToken);
            const accounts = await web3.eth.getAccounts();
            const ownerAddress = accounts[0];
    
            await nftContract.methods.burn(tokenId).send({ from: ownerAddress });
            console.log(`Token ${tokenId} burned`);
            window.location.reload();

            // Fetch updated NFTs
            //fetchNFTs();
          } else {
            console.error('MetaMask is not installed');
          }
        } catch (err) {
          console.error('Error burning token:', err);
        }
      };

      const viewOnExplorer = (tokenId) => {
        const explorerUrl = `https://etherscan.io/token/${contractAddressNftToken}?a=${tokenId}`;
        window.open(explorerUrl, '_blank');
      };

      const toggleTransferModal = () => setTransferModal(!transferModal);

      const transferOwnership = (tokenId) => {
      setSelectedTokenIdForTransfer(tokenId);
      toggleTransferModal();
    };


    const handleTransferOwnership = async () => {
      try {
        const provider = await detectEthereumProvider();
        if (provider) {
          const web3 = new Web3(provider);
          const nftContract = new web3.eth.Contract(NFTTokenABI.abi, contractAddressNftToken);
          const accounts = await web3.eth.getAccounts();
          const ownerAddress = accounts[0];
          console.log(ownerAddress,newOwnerAddress,selectedTokenIdForTransfer);
          await nftContract.methods.transferFrom(ownerAddress, newOwnerAddress, selectedTokenIdForTransfer).send({ from: ownerAddress });
          console.log(`Token ${selectedTokenIdForTransfer} transferred to ${newOwnerAddress}`);
        } else {
          console.error('MetaMask is not installed');
        }
      } catch (err) {
        console.error('Error transferring ownership:', err);
      } finally {
        toggleTransferModal();
      }
    };
    

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const provider = await detectEthereumProvider();

        if (provider) {
          const web3 = new Web3(provider);

          const contract = new web3.eth.Contract(NFTTokenABI.abi, contractAddressNftToken);
          const accounts = await web3.eth.getAccounts();
          const ownerAddress = accounts[0];

          const tokenIds = await contract.methods.tokensOfOwner(ownerAddress).call();

          const uniqueTokenIds = [...new Set(tokenIds)];

          if (uniqueTokenIds.length > 0) {
            const nftDataPromises = uniqueTokenIds.map(async (tokenId) => {
              const tokenUri = await contract.methods.tokenURI(tokenId).call();
              const metadata = await axios.get(`https://gateway.pinata.cloud/ipfs/${tokenUri.replace('ipfs://', '')}`);
              const image = `https://gateway.pinata.cloud/ipfs/${metadata.data.image.replace('ipfs://', '')}`;
              console.log(metadata.data);
              console.log(image);
              console.log(tokenId);
              return { ...metadata.data, tokenId, image };
            });
            console.log(nftDataPromises);

            const nftData = await Promise.all(nftDataPromises);
            setNfts(nftData);
          } else {
            setError('You do not own any NFTs');
          }
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
    
    
    

    fetchNFTs();
  }, []);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="8">
        <Card className="mt-3">
            <CardBody>
              <CardTitle tag="h3" className="text-center" style={{color:"#13274c" }}>My NFT Inventory</CardTitle>
              <Input
                type="text"
                placeholder="Search by name or description"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: '20px' }}
              />

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
                <Alert color="warning">No NFTs found in your wallet</Alert>
              ) : (
                <CardGroup>
                  {filteredNfts.map((nft, index) => (
                    <Card key={`${nft.tokenId}-${index}`}>
                      <CardBody>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div><center><CardTitle tag="h5">{nft.name}</CardTitle></center></div>
                          <Dropdown isOpen={dropdownOpen[nft.tokenId]} toggle={() => toggleDropdown(nft.tokenId)}>
                            <DropdownToggle caret style={{backgroundColor:'#13274c'}}>
                              <i className="bi bi-list" title='menu'  ></i>
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem onClick={() => toggleDetailsModal(nft)}>See More Details</DropdownItem>
                              <DropdownItem onClick={() => listForSale(nft.tokenId)}>List for Sale</DropdownItem>
                              <DropdownItem onClick={() => listForBidding(nft.tokenId)}>List for Bidding</DropdownItem>
                              <DropdownItem onClick={() => burnToken(nft.tokenId)}>Burn</DropdownItem>
                              <DropdownItem onClick={() => transferOwnership(nft.tokenId)}>Transfer Ownership</DropdownItem>
                              <DropdownItem onClick={() => viewOnExplorer(nft.tokenId)}>View on Explorer</DropdownItem>
                              {/* <DropdownItem>Remove from Sale</DropdownItem> */}
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                      </CardBody>
                      <CardImg top width="100%" src={nft.image} alt={nft.name} />
                      {/* <CardText><small>{nft.description}</small></CardText> */}
                      <hr/>
                      <CardText>
                         
                        <div>
                          <center><CardTitle tag="h5">Description :</CardTitle></center>
                        </div>
                          <div dangerouslySetInnerHTML={{ __html: nft.description.length > 100 ? `${nft.description.substring(0, 100)}...` : nft.description }} />
                        
                        
                      </CardText>
                    </Card>
                  ))}
                </CardGroup>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>List NFT for Sale</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="listingPrice">Listing Price (ETH)</Label>
              <Input
                type="number"
                name="price"
                id="listingPrice"
                placeholder="Enter price in ETH"
                value={listingPrice}
                onChange={(e) => setListingPrice(e.target.value)}
              />
            </FormGroup>
          </Form>
          Are you sure you want to approve and list this NFT for sale?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleApproveAndList}>Approve and List</Button>{' '}
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={auctionModal} toggle={toggleAuctionModal}>
        <ModalHeader toggle={toggleAuctionModal}>List NFT for Auction</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="minBid">Minimum Bid (ETH)</Label>
              <Input
                type="number"
                name="minBid"
                id="minBid"
                placeholder="Enter minimum bid in ETH"
                value={minBid}
                onChange={(e) => setMinBid(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="duration">Duration (seconds)</Label>
              <Input
                type="number"
                name="duration"
                id="duration"
                placeholder="Enter duration in seconds"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </FormGroup>
          </Form>
          Are you sure you want to approve and list this NFT for auction?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleApproveAndCreateAuction}>Approve and Create Auction</Button>{' '}
          <Button color="secondary" onClick={toggleAuctionModal}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={transferModal} toggle={toggleTransferModal}>
  <ModalHeader toggle={toggleTransferModal}>Transfer NFT Ownership</ModalHeader>
  <ModalBody>
    <Form>
      <FormGroup>
        <Label for="newOwnerAddress">New Owner Address</Label>
        <Input
          type="text"
          name="address"
          id="newOwnerAddress"
          placeholder="Enter the new owner's address"
          value={newOwnerAddress}
          onChange={(e) => setNewOwnerAddress(e.target.value)}
        />
      </FormGroup>
    </Form>
    Are you sure you want to transfer this NFT to the new owner?
  </ModalBody>
  <ModalFooter>
    <Button color="primary" onClick={handleTransferOwnership}>Transfer Ownership</Button>{' '}
    <Button color="secondary" onClick={toggleTransferModal}>Cancel</Button>
  </ModalFooter>
</Modal>
          <Modal isOpen={detailsModal} toggle={() => setDetailsModal(!detailsModal)} >
            <ModalHeader toggle={() => setDetailsModal(!detailsModal)} style={{ backgroundColor: '#ccdaff' }}>
              <h4 style={{ color: '#325186' }}>NFT Details</h4>
            </ModalHeader>
            <ModalBody>
              {selectedNft ? (
                <>
                  <CardTitle tag="h5" style={{ color: '#325186' }}>{selectedNft.name}</CardTitle>
                  <img src={selectedNft.image} alt={selectedNft.name} style={{ width: '100%' }} />
                  <small><div dangerouslySetInnerHTML={{ __html: selectedNft.description }} /></small>
                  </>
              ) : (
                <p>No details available.</p>
              )}
            </ModalBody>
            
          </Modal>

    </Container>
  );
};

export default Inventory;
