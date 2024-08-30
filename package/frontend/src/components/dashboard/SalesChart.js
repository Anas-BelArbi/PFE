// import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
// import Chart from "react-apexcharts";

// const SalesChart = () => {
//   const chartoptions = {
//     series: [
//       {
//         name: "Iphone 13",
//         data: [0, 31, 40, 28, 51, 42, 109, 100],
//       },
//       {
//         name: "Oneplue 9",
//         data: [0, 11, 32, 45, 32, 34, 52, 41],
//       },
//     ],
//     options: {
//       chart: {
//         type: "area",
//       },
//       dataLabels: {
//         enabled: false,
//       },
//       grid: {
//         strokeDashArray: 3,
//       },

//       stroke: {
//         curve: "smooth",
//         width: 1,
//       },
//       xaxis: {
//         categories: [
//           "Jan",
//           "Feb",
//           "March",
//           "April",
//           "May",
//           "June",
//           "July",
//           "Aug",
//         ],
//       },
//     },
//   };
//   return (
//     <Card>
//       <CardBody>
//         <CardTitle tag="h5">Sales Summary</CardTitle>
//         <CardSubtitle className="text-muted" tag="h6">
//           Yearly Sales Report
//         </CardSubtitle>
//         <Chart
//           type="area"
//           width="100%"
//           height="390"
//           options={chartoptions.options}
//           series={chartoptions.series}
//         ></Chart>
//       </CardBody>
//     </Card>
//   );
// };

// export default SalesChart;



// import React, { useEffect, useState } from "react";
// import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
// import Chart from "react-apexcharts";
// import Web3 from "web3";
// import NFTMarketplaceABI from '../../ABIs/NFTMarketplaceABI.json'; // Make sure to have your ABI here
// import { contractAddressNftMarketplace } from '../../ABIs/config';

// const SalesChart = () => {
//   const [chartData, setChartData] = useState({
//     series: [],
//     options: {
//       chart: {
//         type: "area",
//       },
//       dataLabels: {
//         enabled: false,
//       },
//       grid: {
//         strokeDashArray: 3,
//       },
//       stroke: {
//         curve: "smooth",
//         width: 1,
//       },
//       xaxis: {
//         categories: [], // Will be populated with day labels
//       },
//     },
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       if (window.ethereum) {
//         window.web3 = new Web3(window.ethereum);
//         await window.ethereum.request({ method: 'eth_requestAccounts' });
//       } else if (window.web3) {
//         window.web3 = new Web3(window.web3.currentProvider);
//       } else {
//         window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
//         return;
//       }

//       const web3 = window.web3;
//       const contract = new web3.eth.Contract(NFTMarketplaceABI.abi, contractAddressNftMarketplace);

//       try {
//         const sales = await contract.methods.getSalesTable().call();
//         const processedData = processSalesData(sales, web3);
//         setChartData(processedData);
//       } catch (error) {
//         console.error("Error fetching sales data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const processSalesData = (sales, web3Instance) => {
//     const days = {};
//     const categories = [];

//     sales.forEach((sale) => {
//       const date = new Date(Number(sale[5]) * 1000); // Convert BigInt to Number
//       const day = date.toISOString().split('T')[0]; // Get the date in YYYY-MM-DD format

//       if (!days[day]) {
//         days[day] = {};
//       }

//       if (!days[day][sale[0]]) { // Assuming the seller address is the 1st element
//         days[day][sale[0]] = 0;
//       }

//       days[day][sale[0]] += parseFloat(web3Instance.utils.fromWei(sale[4].toString(), 'ether')); // Convert BigInt to string then to float
//     });

//     const series = [];
//     const sellers = new Set();

//     for (const [day, sellersData] of Object.entries(days)) {
//       categories.push(day);
//       for (const [seller, amount] of Object.entries(sellersData)) {
//         sellers.add(seller);
//       }
//       console.log(sellers);
//     }

//     sellers.forEach((seller) => {
//       const data = categories.map((day) => (days[day][seller] || 0));
//       series.push({
//         name: seller,
//         data,
//       });
//     });

//     return {
//       series,
//       options: {
//         ...chartData.options,
//         xaxis: {
//           categories,
//         },
//       },
      
//     };
    
//   };

//   return (
//     <Card>
//       <CardBody>
//         <CardTitle tag="h5">Sales Summary</CardTitle>
//         <CardSubtitle className="text-muted" tag="h6">
//           Daily Sales Report
//         </CardSubtitle>
//         <Chart
//           type="area"
//           width="100%"
//           height="390"
//           options={chartData.options}
//           series={chartData.series}
//         />
//       </CardBody>
//     </Card>
//   );
// };

// export default SalesChart;
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import Chart from "react-apexcharts";
import Web3 from "web3";
import axios from 'axios'; // Import axios to make HTTP requests
import NFTMarketplaceABI from '../../ABIs/NFTMarketplaceABI.json';
import { contractAddressNftMarketplace } from '../../ABIs/config';

const SalesChart = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        strokeDashArray: 3,
      },
      stroke: {
        curve: "smooth",
        width: 1,
      },
      xaxis: {
        categories: [],
      },
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (!window.ethereum) {
      alert('Non-Ethereum browser detected. Consider trying MetaMask!');
      return;
    }
    const web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const contract = new web3.eth.Contract(NFTMarketplaceABI.abi, contractAddressNftMarketplace);
    const sales = await contract.methods.getSalesTable().call();
    const processedData = await processSalesData(sales, web3);
    setChartData(processedData);
  };

  const fetchUserName = async (publicKey) => {
    try {
      const response = await axios.post('http://localhost:5001/user-details', { publicKey });
      return response.data.user.name;
    } catch (error) {
      console.error('Failed to fetch user name:', error);
      return null; // or return publicKey if you want to fallback to displaying publicKeys
    }
  };

  const processSalesData = async (sales, web3Instance) => {
    const days = {};
    const categories = [];
    const sellerNames = {};

    for (const sale of sales) {
      const day = new Date(Number(sale[5]) * 1000).toISOString().split('T')[0];
      days[day] = days[day] || {};
      const amount = parseFloat(web3Instance.utils.fromWei(sale[4].toString(), 'ether'));
      days[day][sale[0]] = (days[day][sale[0]] || 0) + amount;

      if (!sellerNames[sale[0]]) {
        sellerNames[sale[0]] = await fetchUserName(sale[0]);
      }
    }

    const series = Object.entries(sellerNames).map(([key, name]) => ({
      name,
      data: Object.keys(days).map(day => days[day][key] || 0)
    }));

    categories.push(...Object.keys(days));

    return {
      series,
      options: { ...chartData.options, xaxis: { categories } }
    };
  };

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Sales Summary</CardTitle>
        <CardSubtitle className="text-muted" tag="h6">Daily Sales Report</CardSubtitle>
        <Chart type="area" width="100%" height="390" options={chartData.options} series={chartData.series} />
      </CardBody>
    </Card>
  );
};

export default SalesChart;
