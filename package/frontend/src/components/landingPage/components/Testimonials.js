import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';
import imageurl from '../../../assets/images/1719089092944.jpg';

const talanDescription = `
Founded in 2008, Talan Tunisia is the "Nearshore" development center of the Talan group, bringing together over 500 new technology development engineers from the top Tunisian and European engineering schools, working for major European clients.

Our services focus on:
- Digital: Establishment of outsourced service centers / Implementation of digital transformation projects / Web development (JAVA/JEE/.NET/PHP, etc.) and mobile development (Android/iOS)
- Integration: Integration of CRM solutions (Salesforce) / Integration of ERP (Oracle / Forms / EBS) / Integration of Middleware (Tibco) / Implementation of BI and DATA solutions
- Testing: Coaching / support in implementing testing methodologies / Execution of manual tests / Test automation / Third-party application testing
- Support: Application and functional support N2 and N3 / Monitoring of business applications in production / Management of changes / Continuous improvement
- Innovation Factory: One of Talan's research and development centers. We bring value to our clients through both technological and usage innovation, using disruptive technologies such as Metaverse, Blockchain, artificial intelligence...
- Cyber Security: Cyber Resilience and digital trust: Cyber Consulting, Compliance/GRC, Red Teaming, Pentesting

Our offering has allowed the companies that have trusted us to accelerate the implementation of their projects, reduce costs, and relieve them of the constraints of sourcing and human resource management.
`;

export default function AboutTalan() {
  return (
    <Container
      id="about-talan"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
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
        <Typography component="h2" variant="h4" color="text.primary">
          About Talan Tunisia
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {talanDescription}
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              p: 2,
            }}
          >
            <Box
              component="img"
              sx={{
                height: 'auto',
                width: '40%',
                maxHeight: { xs: 233, md: 300 },
                maxWidth: { xs: 350, md: '80%' },
              }}
              alt="Talan Tunisia"
              src={imageurl}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {talanDescription}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
