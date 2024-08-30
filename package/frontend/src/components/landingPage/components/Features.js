import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import EdgesensorHighRoundedIcon from '@mui/icons-material/EdgesensorHighRounded';
import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded';

const items = [
  {
    icon: <DevicesRoundedIcon />,
    title: 'Tradability',
    description:
      'Enhances the ease of trading RECs within the marketplace, making it simple for users to buy and sell certificates.',
    imageLight: 'url("/static/images/templates/templates-images/trade-light.png")',
    imageDark: 'url("/static/images/templates/templates-images/trade-dark.png")',
    logo: '/images/logos/swing-trading.png', // Updated logo path
    moredesc:'Our NFT platform revolutionizes the trade of Renewable Energy Certificates (RECs) by utilizing blockchain technology to streamline and secure transactions. By tokenizing RECs as NFTs, each certificate is uniquely identifiable and easily transferable on the digital marketplace. This tokenization allows users to trade RECs seamlessly without the need for intermediaries, reducing transaction times and costs. The platform s user-friendly interface and transparent transaction history further enhance the trading experience, providing real-time updates on certificate availability, pricing, and ownership. This ease of trade encourages more participants to engage in the market, thereby increasing liquidity and market efficiency.'
  },
  {
    icon: <ViewQuiltRoundedIcon />,
    title: 'Certification Issuance',
    description:
      'Issues verified certificates to authenticate RECs, ensuring each certificate is legitimate and approved by relevant authorities.',
    imageLight: 'url("/static/images/templates/templates-images/certify-light.png")',
    imageDark: 'url("/static/images/templates/templates-images/certify-dark.png")',
    logo: '/images/logos/certificat.png', // Updated logo path
    moredesc:'Our platform ensures the authenticity and legitimacy of RECs through a robust certification issuance process. When a renewable energy producer generates electricity, they are issued a REC, which is then tokenized and recorded on the blockchain. This process involves rigorous verification by authorized bodies to ensure that each REC represents a genuine megawatt-hour (MWh) of renewable energy. The use of smart contracts automates and enforces compliance with regulatory standards, providing immutable proof of origin and validity for each certificate. This verified issuance builds trust among buyers and sellers, as they can be confident in the legitimacy of the certificates they trade, thus maintaining the integrity of the marketplace.'
  },
  {
    icon: <EdgesensorHighRoundedIcon />,
    title: 'Incentives',
    description:
      'Rewards REC purchases with reduced taxes and lower carbon emissions, promoting sustainability and encouraging participation.',
    imageLight: 'url("/static/images/templates/templates-images/incentives-light.png")',
    imageDark: 'url("/static/images/templates/templates-images/incentives-dark.png")',
    logo: '/images/logos/tax.png', // Updated logo path
    moredesc: 'To promote the adoption of renewable energy and encourage active participation in the REC market, our platform offers various incentives. Purchasers of RECs are rewarded with tangible benefits such as reduced taxes, reflecting governmental support for sustainable practices. Additionally, buying RECs contributes to lower carbon emissions by supporting renewable energy projects, which helps in meeting corporate social responsibility (CSR) goals and environmental regulations. The platform may also offer additional rewards, such as loyalty points or discounts on future purchases, to further incentivize users. These incentives not only make the purchase of RECs financially attractive but also align with the broader goal of promoting environmental sustainability.'
  },
  {
    icon: <DevicesRoundedIcon />,
    title: 'Accessibility',
    description:
      'Enables both individuals and institutions to purchase RECs, broadening market participation and making renewable energy investment more inclusive.',
    imageLight: 'url("/static/images/templates/templates-images/access-light.png")',
    imageDark: 'url("/static/images/templates/templates-images/access-dark.png")',
    logo: '/images/logos/porte.png', // Updated logo path
    moredesc: 'Our NFT platform is designed to be accessible to a wide range of participants, including individuals, small businesses, and large institutions. By lowering the barriers to entry, we enable more diverse participation in the REC market. The platform provides educational resources and support to help new users understand the benefits and processes of trading RECs. Additionally, the use of blockchain technology ensures transparency and security, making the market more trustworthy for all participants. The platform s design caters to the needs of users in Africa and the Middle East, regions that are often underserved in global markets. This inclusivity not only democratizes access to renewable energy investments but also fosters a broader commitment to sustainable energy practices across different sectors and regions.'
  },
];

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <div>
            <Typography component="h2" variant="h4" color="text.primary">
              Product Features
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: { xs: 2, sm: 4 } }}
            >
              Our platform offers a range of features designed to enhance the trading experience, ensure certification authenticity, provide sustainability incentives, and broaden accessibility to renewable energy investments.
            </Typography>
          </div>
          <Grid container item gap={1} sx={{ display: { xs: 'auto', sm: 'none' } }}>
            {items.map(({ title }, index) => (
              <Chip
                key={index}
                label={title}
                onClick={() => handleItemClick(index)}
                sx={{
                  borderColor: (theme) => {
                    if (theme.palette.mode === 'light') {
                      return selectedItemIndex === index ? 'primary.light' : '';
                    }
                    return selectedItemIndex === index ? 'primary.light' : '';
                  },
                  background: (theme) => {
                    if (theme.palette.mode === 'light') {
                      return selectedItemIndex === index ? 'none' : '';
                    }
                    return selectedItemIndex === index ? 'none' : '';
                  },
                  backgroundColor: selectedItemIndex === index ? 'primary.main' : '',
                  '& .MuiChip-label': {
                    color: selectedItemIndex === index ? '#fff' : '',
                  },
                }}
              />
            ))}
          </Grid>
          <Box
            component={Card}
            variant="outlined"
            sx={{
              display: { xs: 'auto', sm: 'none' },
              mt: 4,
            }}
          >
            <Box
              sx={{
                backgroundImage: (theme) =>
                  theme.palette.mode === 'light'
                    ? items[selectedItemIndex].imageLight
                    : items[selectedItemIndex].imageDark,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: 280,
              }}
            />
            <Box sx={{ px: 2, pb: 2 }}>
              <Typography color="text.primary" variant="body2" fontWeight="bold">
                {selectedFeature.title}
              </Typography>
              <Typography color="text.secondary" variant="body2" sx={{ my: 0.5 }}>
                {selectedFeature.description}
              </Typography>
              <Link
                color="primary"
                variant="body2"
                fontWeight="bold"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  '& > svg': { transition: '0.2s' },
                  '&:hover > svg': { transform: 'translateX(2px)' },
                }}
              >
                <span>Learn more</span>
                <ChevronRightRoundedIcon
                  fontSize="small"
                  sx={{ mt: '1px', ml: '2px' }}
                />
              </Link>
            </Box>
          </Box>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            useFlexGap
            sx={{ width: '100%', display: { xs: 'none', sm: 'flex' } }}
          >
            {items.map(({ icon, title, description, moredesc }, index) => (
              <Card
                key={index}
                variant="outlined"
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={{
                  p: 3,
                  height: 'fit-content',
                  width: '100%',
                  background: 'none',
                  backgroundColor:
                    selectedItemIndex === index ? 'action.selected' : undefined,
                  borderColor: (theme) => {
                    if (theme.palette.mode === 'light') {
                      return selectedItemIndex === index
                        ? 'primary.light'
                        : 'grey.200';
                    }
                    return selectedItemIndex === index ? 'primary.dark' : 'grey.800';
                  },
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    textAlign: 'left',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { md: 'center' },
                    gap: 2.5,
                  }}
                >
                  <Box
                    sx={{
                      color: (theme) => {
                        if (theme.palette.mode === 'light') {
                          return selectedItemIndex === index
                            ? 'primary.main'
                            : 'grey.300';
                        }
                        return selectedItemIndex === index
                          ? 'primary.main'
                          : 'grey.700';
                      },
                    }}
                  >
                    {icon}
                  </Box>
                  <Box sx={{ textTransform: 'none' }}>
                    <Typography
                      color="text.primary"
                      variant="body2"
                      fontWeight="bold"
                    >
                      {title}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                      sx={{ my: 0.5 }}
                    >
                      {description}
                    </Typography>
                    <Link
                      color="primary"
                      variant="body2"
                      fontWeight="bold"
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        '& > svg': { transition: '0.2s' },
                        '&:hover > svg': { transform: 'translateX(2px)' },
                      }}
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                    >
                      <span>Learn more</span>
                      <ChevronRightRoundedIcon
                        fontSize="small"
                        sx={{ mt: '1px', ml: '2px' }}
                      />
                    </Link>
                  </Box>
                </Box>
              </Card>
            ))}
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { xs: 'none', sm: 'flex' }, width: '100%' }}
        >
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              width: '100%',
              display: { xs: 'none', sm: 'flex' },
              pointerEvents: 'none',
            }}
          >
            <Box
              sx={{
                m: 'auto',
                width: 420,
                height: 500,
                backgroundSize: 'contain',
                backgroundImage: (theme) =>
                  theme.palette.mode === 'light'
                    ? items[selectedItemIndex].imageLight
                    : items[selectedItemIndex].imageDark,
              }}
            />
            <Box sx={{ p: 3 }}>
              <center><img src={selectedFeature.logo} alt={`${selectedFeature.title} logo`} style={{ width: '100px', height: 'auto', marginBottom: '16px' }} /></center>
              <br></br>
              <br></br>
              <br></br>
              <Typography color="text.primary" variant="body2" fontWeight="bold">
                {selectedFeature.title}
              </Typography>
              <Typography color="text.secondary" variant="body2" sx={{ my: 0.5 }}>
                {selectedFeature.moredesc}
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
