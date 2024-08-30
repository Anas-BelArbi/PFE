import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { Pie } from 'react-chartjs-2';
import { Card, CardBody, CardTitle } from 'reactstrap';
import RenewableEnergyCertificates from '../../ABIs/RenewableEnergyCertificates.json';
import { CONTRACT_ADDRESS } from '../../ABIs/config';
import 'chart.js/auto';
import axios from 'axios';

const RankProjectsByCountry = () => {
  const [projectsByCountry, setProjectsByCountry] = useState([]);

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          await window.ethereum.request({ method: 'eth_requestAccounts' });
        } else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider);
        } else {
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
          return;
        }

        const web3 = window.web3;
        const contract = new web3.eth.Contract(RenewableEnergyCertificates.abi, CONTRACT_ADDRESS);

        try {
          const allProjects = await contract.methods.getAllProjects().call();
          const verifiedProjects = allProjects.filter(project => project.verif);
          
          const projectsWithCountry = await Promise.all(verifiedProjects.map(async (project) => {
            const country = await fetchCountryName(project.latitude, project.longitude);
            return { ...project, country };
          }));

          const countryCount = projectsWithCountry.reduce((acc, project) => {
            acc[project.country] = (acc[project.country] || 0) + 1;
            return acc;
          }, {});

          const chartData = Object.keys(countryCount).map(country => ({
            name: country,
            value: countryCount[country]
          }));

          setProjectsByCountry(chartData);
        } catch (fetchError) {
          console.error("Error fetching projects from contract:", fetchError);
        }
      } catch (initError) {
        console.error("Error initializing web3 or setting up contract:", initError);
      }
    };

    const fetchCountryName = async (lat, lon) => {
      try {
        const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=9961e6bfcb2b4af8a0217dbd33e4ab44`);
        const country = response.data.results[0].components.country;
        return country;
      } catch (error) {
        console.error('Failed to fetch country name:', error);
        return 'Unknown';
      }
    };

    initWeb3();
  }, []);

  const data = {
    labels: projectsByCountry.map(project => project.name),
    datasets: [
      {
        data: projectsByCountry.map(project => project.value),
        backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF6666', '#66FF66', '#6666FF'],
        hoverBackgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF6666', '#66FF66', '#6666FF'],
      },
    ],
  };

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Verified Projects by Country</CardTitle>
        <div style={{ height: '400px', width: '100%' }}>
          <Pie data={data} />
        </div>
      </CardBody>
    </Card>
  );
};

export default RankProjectsByCountry;
