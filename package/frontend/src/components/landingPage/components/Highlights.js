import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
// import CertificateRoundedIcon from '@mui/icons-material/CertificateRounded';
// import FireRoundedIcon from '@mui/icons-material/FireRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import ExpandRoundedIcon from '@mui/icons-material/ExpandRounded';
// import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';

const items = [
  {
    icon: <SecurityRoundedIcon />,
    title: 'Authentication',
    description:
      'Ensure secure access to the platform with robust authentication mechanisms, protecting user identities and data.',
  },
  {
    icon: <InventoryRoundedIcon />,
    title: 'Check Inventory',
    description:
      'Monitor and manage your NFT inventory effortlessly, keeping track of your assets in real-time.',
  },
  {
    icon: <AddCircleOutlineRoundedIcon />,
    title: 'List NFT for Sale',
    description:
      'Easily list your NFTs for sale on the marketplace, reaching a wide audience of potential buyers.',
  },
  {
    icon: <GavelRoundedIcon />,
    title: 'List NFT for Bidding',
    description:
      'Engage the community by listing your NFTs for bidding, allowing buyers to compete for ownership.',
  },
  {
    icon: <AssignmentRoundedIcon />,
    title: 'Add Project',
    description:
      'Add new renewable energy projects to the platform, contributing to a sustainable future.',
  },
  {
    icon: <VerifiedRoundedIcon />,
    title: 'Verify Project',
    description:
      'Ensure project authenticity and legitimacy through a rigorous verification process by authorities.',
  },
  {
    icon: <AddCircleOutlineRoundedIcon />,
    title: 'Add Certificate',
    description:
      'Tokenize Renewable Energy Certificates (RECs) and add them to the blockchain for secure trading.',
  },
  {
    icon: <VerifiedRoundedIcon />,
    title: 'Verify Certificate by Authority',
    description:
      'Authorized bodies verify each certificate to ensure it represents genuine renewable energy production.',
  },
  {
    icon: <VerifiedRoundedIcon />,
    title: 'Verify Certificate by Registry',
    description:
      'Ensure compliance and validity of certificates through registry verification, maintaining market integrity.',
  },
  {
    icon: <VerifiedRoundedIcon />,
    title: 'Burning Certificates',
    description:
      'Retire certificates from circulation through secure burning processes, ensuring accurate tracking of energy credits.',
  },
  {
    icon: <ShieldRoundedIcon />,
    title: 'Security',
    description:
      'Secure transactions and data protection using advanced encryption and blockchain technology, safeguarding user information.',
  },
  {
    icon: <VisibilityRoundedIcon />,
    title: 'Transparency',
    description:
      'Maintain transparent and immutable transaction records via blockchain, ensuring accountability and trust.',
  },
  {
    icon: <ExpandRoundedIcon />,
    title: 'Scalability',
    description:
      'Efficiently handle an increasing number of users and transactions, ensuring seamless platform performance.',
  },
  {
    icon: <GavelRoundedIcon />,
    title: 'Compliance',
    description:
      'Adhere to legal and regulatory standards for energy certificates, ensuring all operations meet required guidelines.',
  },
  {
    icon: <BarChartRoundedIcon />,
    title: 'Visualizing Charts and Analyzing Them',
    description:
      'Leverage data visualization tools to create charts and analyze market trends, helping users make informed decisions.',
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: '#06090a',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4">
            Highlights
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
            Discover the standout features of our platform: robust authentication, efficient inventory management, seamless listing for sales and bidding, comprehensive project and certificate management, and strong focus on security, transparency, scalability, and compliance.
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'grey.800',
                  background: 'transparent',
                  backgroundColor: 'grey.900',
                }}
              >
                <Box sx={{ opacity: '50%' }}><center>{item.icon}</center></Box>
                <div>
                  <Typography fontWeight="medium" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
