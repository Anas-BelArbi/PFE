// import React from 'react';
// import { Bar } from 'react-chartjs-2';

// const StackedBarChart = ({ data }) => {
//   const chartData = {
//     labels: ['Certificates'],
//     datasets: [
//       {
//         label: 'Not Verified by Authority',
//         data: [data.notVerifiedByAuthority.length],
//         backgroundColor: 'rgba(255, 99, 132, 0.6)',
//       },
//       {
//         label: 'Not Verified by Registry',
//         data: [data.notVerifiedByRegistry.length],
//         backgroundColor: 'rgba(54, 162, 235, 0.6)',
//       },
//       {
//         label: 'Fully Verified',
//         data: [data.fullyVerified.length],
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//       }
//     ]
//   };

//   const options = {
//     scales: {
//       x: {
//         stacked: true,
//       },
//       y: {
//         stacked: true
//       }
//     }
//   };

//   return <div style={{ height: '500px', width: '100%' }}><Bar data={chartData} options={options} /> </div>;
// };

// export default StackedBarChart;

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Card, CardBody, CardTitle } from 'reactstrap';

const StackedBarChart = ({ data }) => {
  const chartData = {
    labels: ['Certificates'],
    datasets: [
      {
        label: 'Not Verified by Authority',
        data: [data.notVerifiedByAuthority.length],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        stack: 'stack1'
      },
      {
        label: 'Not Verified by Registry',
        data: [data.notVerifiedByRegistry.length],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        stack: 'stack2'
      },
      {
        label: 'Fully Verified',
        data: [data.fullyVerified.length],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        stack: 'stack3'
      }
    ]
  };

  const options = {
    scales: {
      x: {
        stacked: false,  // Set this to false to disable stacking
      },
      y: {
        stacked: false,  // Set this to false to disable stacking
      }
    },
    plugins: {
      legend: {
        display: true
      }
    }
  };

//   return <div style={{ height: '500px', width: '100%' }}><br></br><br></br><Bar data={chartData} options={options} /></div>;

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Certificate Verification Distribution</CardTitle>
        <div style={{ height: '400px', width: '100%' }}>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        <div ><Bar data={chartData} options={options} /></div> 
        </div>
      </CardBody>
    </Card>
  );
};


export default StackedBarChart;
