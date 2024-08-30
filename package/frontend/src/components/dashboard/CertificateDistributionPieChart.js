
    import React, { useEffect, useState } from 'react';
    import Web3 from 'web3';
    import { Pie } from 'react-chartjs-2';
    import { Card, CardBody, CardTitle } from 'reactstrap';
    import CertificateListing from '../../ABIs/CertificateListing.json';
    import { ListingContractaddress } from '../../ABIs/config';
    import 'chart.js/auto';
    
    const CertificateDistributionPieChart = () => {
      const [certificateCounts, setCertificateCounts] = useState({
        solar: 0,
        wind: 0,
        hydro: 0,
        geothermal: 0,
        biomass: 0,
      });
    
      useEffect(() => {
        const fetchCertificateCounts = async () => {
          if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const web3 = window.web3;
            const contract = new web3.eth.Contract(CertificateListing.abi, ListingContractaddress);
    
            try {
              const counts = await contract.methods.getCertificateTypeCounts().call();
              setCertificateCounts({
                solar: parseInt(counts.solar),
                wind: parseInt(counts.wind),
                hydro: parseInt(counts.hydro),
                geothermal: parseInt(counts.geothermal),
                biomass: parseInt(counts.biomass),
              });
            } catch (error) {
              console.error('Error fetching certificate counts:', error);
            }
          } else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
          }
        };
    
        fetchCertificateCounts();
      }, []);
    
      // Log the data to ensure it is fetched correctly
      console.log('Certificate Counts:', certificateCounts);
    
      const data = {
        labels: ['Solar', 'Wind', 'Hydro', 'Geothermal', 'Biomass'],
        datasets: [
          {
            data: [
              certificateCounts.solar,
              certificateCounts.wind,
              certificateCounts.hydro,
              certificateCounts.geothermal,
              certificateCounts.biomass,
            ],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0'],
          },
        ],
      };
    
      return (
        <Card>
          <CardBody>
            <CardTitle tag="h5">Certificate Type Distribution</CardTitle>
            <div style={{ height: '400px', width: '100%' }}>
              <Pie style={{marginLeft:'60px'}} data={data} />
            </div>
          </CardBody>
        </Card>
      );
    };
    
    export default CertificateDistributionPieChart;
    
