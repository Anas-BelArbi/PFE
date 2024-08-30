import { useState, useEffect } from "react";
import { ethers } from "ethers";
import NFTMarketplaceABI from "../../ABIs/NFTMarketplaceABI.json"; // Add your ABI file

const useSalesData = (contractAddress) => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, NFTMarketplaceABI, signer);

      // Fetch project addresses from the contract or hardcode them if known
      const projectAddresses = [
        "0xProject1Address", // Replace with your project's NFT contract address
        "0xProject2Address", // Replace with your project's NFT contract address
        // Add more project addresses
      ];

      const salesDataArray = await Promise.all(projectAddresses.map(async (address) => {
        const sales = await contract.getYearlySalesData(address);
        const totalSales = sales.reduce((acc, val) => acc + parseInt(val.toString()), 0);
        return {
          name: address, // Use project name if available
          data: sales.map((sales) => parseInt(sales.toString())),
          totalSales,
        };
      }));

      // Sort by total sales and get top 2
      salesDataArray.sort((a, b) => b.totalSales - a.totalSales);
      const top2SalesData = salesDataArray.slice(0, 2);

      setSalesData(top2SalesData);
    };

    fetchSalesData();
  }, [contractAddress]);

  return salesData;
};

export default useSalesData;
