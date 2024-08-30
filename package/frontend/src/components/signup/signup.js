// // src/components/signup/Signup.js

// import React, { useState } from 'react';
// import {
//   Button,
//   Form,
//   FormGroup,
//   Label,
//   Input,
//   FormFeedback,
//   Container,
//   Row,
//   Col,
//   Card,
//   CardBody,
//   CardTitle,
// } from 'reactstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Signup = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [privateKey, setPrivateKey] = useState('');
//   const [emailValid, setEmailValid] = useState(null);
//   const [passwordValid, setPasswordValid] = useState(null);
//   const [confirmPasswordValid, setConfirmPasswordValid] = useState(null);
//   const [privateKeyVisible, setPrivateKeyVisible] = useState(false); // State to toggle private key visibility
//   const navigate = useNavigate();

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//   };

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//     setEmailValid(e.target.value.includes('@'));
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//     setPasswordValid(e.target.value.length >= 6);
//   };

//   const handleConfirmPasswordChange = (e) => {
//     setConfirmPassword(e.target.value);
//     setConfirmPasswordValid(e.target.value === password);
//   };

//   const handlePrivateKeyChange = (e) => {
//     setPrivateKey(e.target.value);
//   };

//   const togglePrivateKeyVisibility = () => {
//     setPrivateKeyVisible(!privateKeyVisible);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (emailValid && passwordValid && confirmPasswordValid) {
//       try {
//         const publicKey = await getMetamaskPublicKey();
//         console.log(publicKey);
//         const response = await axios.post('http://localhost:5001/register', {
//           name,
//           email,
//           password,
//           role: "User",
//           publicKey,
//           // privateKey,
//         });
//         console.log(response.data);
//       } catch (error) {
//         console.error('Error signing up:', error.response.data);
//       }
//     } else {
//       console.log('Signup failed: Please check your inputs.');
//     }
//   };

//   const redirectToSignin = () => {
//     navigate('/login');
//   };

//   const getMetamaskPublicKey = async () => {
//     // Assuming you have Web3.js or ethers.js initialized
//     if (window.ethereum) {
//       try {
//         // Request account access if needed
//         await window.ethereum.request({ method: 'eth_requestAccounts' });
//         // Get public key from MetaMask
//         const accounts = await window.ethereum.request({ method: 'eth_accounts' });
//         if (accounts.length > 0) {
//           const address = accounts[0]; // Assuming the first address is the user's
//           return address;
//         } else {
//           throw new Error('No accounts found in MetaMask');
//         }
//       } catch (error) {
//         console.error('Error getting public key from MetaMask:', error);
//         throw error;
//       }
//     } else {
//       throw new Error('MetaMask not detected');
//     }
//   };

//   return (
//     <Container>
//       <Row className="justify-content-center">
//         <Col md="6">
//           <Card>
//             <CardBody>
//               <CardTitle tag="h3" className="text-center">GreenCertify Signup</CardTitle>
//               <Form onSubmit={handleSubmit}>
//                 <FormGroup>
//                   <Label for="name">Name</Label>
//                   <Input
//                     type="text"
//                     name="name"
//                     id="name"
//                     placeholder="Enter your name"
//                     value={name}
//                     onChange={handleNameChange}
//                   />
//                 </FormGroup>
//                 <FormGroup>
//                   <Label for="email">Email</Label>
//                   <Input
//                     type="email"
//                     name="email"
//                     id="email"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={handleEmailChange}
//                     valid={emailValid === true}
//                     invalid={emailValid === false}
//                   />
//                   <FormFeedback valid>Email looks good!</FormFeedback>
//                   <FormFeedback>Please enter a valid email.</FormFeedback>
//                 </FormGroup>
//                 <FormGroup>
//                   <Label for="password">Password</Label>
//                   <Input
//                     type="password"
//                     name="password"
//                     id="password"
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={handlePasswordChange}
//                     valid={passwordValid === true}
//                     invalid={passwordValid === false}
//                   />
//                   <FormFeedback valid>Password looks good!</FormFeedback>
//                   <FormFeedback>Password must be at least 6 characters long.</FormFeedback>
//                 </FormGroup>
//                 <FormGroup>
//                   <Label for="confirmPassword">Confirm Password</Label>
//                   <Input
//                     type="password"
//                     name="confirmPassword"
//                     id="confirmPassword"
//                     placeholder="Confirm your password"
//                     value={confirmPassword}
//                     onChange={handleConfirmPasswordChange}
//                     valid={confirmPasswordValid === true}
//                     invalid={confirmPasswordValid === false}
//                   />
//                   <FormFeedback valid>Passwords match!</FormFeedback>
//                   <FormFeedback>Passwords do not match.</FormFeedback>
//                 </FormGroup>
//                 {/* <FormGroup>
//                   <Label for="privateKey">Private Key</Label>
//                   <Input
//                     type={privateKeyVisible ? "text" : "password"} // Show/hide private key based on visibility state
//                     name="privateKey"
//                     id="privateKey"
//                     placeholder="Enter your private key"
//                     value={privateKey}
//                     onChange={handlePrivateKeyChange}
//                   />
//                   <Button color="secondary" onClick={togglePrivateKeyVisibility} className="mt-2" size="sm">
//                     {privateKeyVisible ? "Hide" : "Show"} Private Key
//                   </Button>
//                 </FormGroup> */}
//                 <Button type="submit" color="primary" block>
//                   Sign Up
//                 </Button>
//                 <Button color="secondary" onClick={redirectToSignin} block>Sign In</Button>
//               </Form>
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Signup;
///////////////////////////////////////////////////////////////////////////////////////////////


// import React, { useState } from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const theme = createTheme();

// const Signup = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [emailValid, setEmailValid] = useState(null);
//   const [passwordValid, setPasswordValid] = useState(null);
//   const [confirmPasswordValid, setConfirmPasswordValid] = useState(null);
//   const navigate = useNavigate();

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//     setEmailValid(e.target.value.includes('@'));
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//     setPasswordValid(e.target.value.length >= 6);
//   };

//   const handleConfirmPasswordChange = (e) => {
//     setConfirmPassword(e.target.value);
//     setConfirmPasswordValid(e.target.value === password);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (emailValid && passwordValid && confirmPasswordValid) {
//       try {
//         const publicKey = await getMetamaskPublicKey();
//         console.log(publicKey);
//         const response = await axios.post('http://localhost:5001/register', {
//           name,
//           email,
//           password,
//           role: "User",
//           publicKey,
//         });
//         console.log(response.data);
//         navigate('/login');
//       } catch (error) {
//         console.error('Error signing up:', error.response.data);
//       }
//     } else {
//       console.log('Signup failed: Please check your inputs.');
//     }
//   };

//   const getMetamaskPublicKey = async () => {
//     if (window.ethereum) {
//       try {
//         await window.ethereum.request({ method: 'eth_requestAccounts' });
//         const accounts = await window.ethereum.request({ method: 'eth_accounts' });
//         if (accounts.length > 0) {
//           return accounts[0];
//         } else {
//           throw new Error('No accounts found in MetaMask');
//         }
//       } catch (error) {
//         console.error('Error getting public key from MetaMask:', error);
//         throw error;
//       }
//     } else {
//       throw new Error('MetaMask not detected');
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Grid container component="main" sx={{ height: '100vh', position: 'relative' }}>
//         <CssBaseline />
//         <Grid
//           item
//           xs={false}
//           sm={4}
//           md={7}
//           sx={{
//             backgroundImage: 'url(/sign-in-side-bg.png)',
//             backgroundColor: (t) =>
//               t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             position: 'relative',
//           }}
//         />
//         <Grid item xs={12} sm={8} md={5} component={Box} elevation={6} square>
//           <Box
//             sx={{
//               my: 8,
//               mx: 4,
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//             }}
//           >
//             <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//               <LockOutlinedIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5">
//               Sign up
//             </Typography>
//             <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   <TextField
//                     autoComplete="name"
//                     name="name"
//                     required
//                     fullWidth
//                     id="name"
//                     label="Name"
//                     autoFocus
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     fullWidth
//                     id="email"
//                     label="Email Address"
//                     name="email"
//                     autoComplete="email"
//                     value={email}
//                     onChange={handleEmailChange}
//                     error={emailValid === false}
//                     helperText={emailValid === false ? "Please enter a valid email." : ""}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     fullWidth
//                     name="password"
//                     label="Password"
//                     type="password"
//                     id="password"
//                     autoComplete="new-password"
//                     value={password}
//                     onChange={handlePasswordChange}
//                     error={passwordValid === false}
//                     helperText={passwordValid === false ? "Password must be at least 6 characters long." : ""}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     fullWidth
//                     name="confirmPassword"
//                     label="Confirm Password"
//                     type="password"
//                     id="confirmPassword"
//                     autoComplete="new-password"
//                     value={confirmPassword}
//                     onChange={handleConfirmPasswordChange}
//                     error={confirmPasswordValid === false}
//                     helperText={confirmPasswordValid === false ? "Passwords do not match." : ""}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <FormControlLabel
//                     control={<Checkbox value="allowExtraEmails" color="primary" />}
//                     label="I want to receive inspiration, marketing promotions and updates via email."
//                   />
//                 </Grid>
//               </Grid>
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2 }}
//               >
//                 Sign Up
//               </Button>
//               <Grid container justifyContent="flex-end">
//                 <Grid item>
//                   <Link href="#/Login" variant="body2">
//                     Already have an account? Sign in
//                   </Link>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//     </ThemeProvider>
//   );
// };

// export default Signup;

import imagelogo from '../../assets/images/logos/image-1.png';
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(null);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailValid(e.target.value.includes('@'));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordValid(e.target.value.length >= 6);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordValid(e.target.value === password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailValid && passwordValid && confirmPasswordValid) {
      try {
        const publicKey = await getMetamaskPublicKey();
        console.log(publicKey);
        const response = await axios.post('http://localhost:5001/register', {
          name,
          email,
          password,
          role: "User",
          publicKey,
        });
        console.log(response.data);
        navigate('/login');
      } catch (error) {
        console.error('Error signing up:', error.response.data);
      }
    } else {
      console.log('Signup failed: Please check your inputs.');
    }
  };

  const getMetamaskPublicKey = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          return accounts[0];
        } else {
          throw new Error('No accounts found in MetaMask');
        }
      } catch (error) {
        console.error('Error getting public key from MetaMask:', error);
        throw error;
      }
    } else {
      throw new Error('MetaMask not detected');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh', position: 'relative' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            position: 'relative',  // Add relative positioning
            backgroundImage: 'url(/sign-in-side-bg.png)',  // Background image
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Box
            component="img"
            src={imagelogo}  // Updated path to the logo image
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,  // Ensure the image is on top
              width: '200px',  // Adjust the width as needed
            }}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Box} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={handleEmailChange}
                    error={emailValid === false}
                    helperText={emailValid === false ? "Please enter a valid email." : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={handlePasswordChange}
                    error={passwordValid === false}
                    helperText={passwordValid === false ? "Password must be at least 6 characters long." : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    error={confirmPasswordValid === false}
                    helperText={confirmPasswordValid === false ? "Passwords do not match." : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#/Login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Signup;
