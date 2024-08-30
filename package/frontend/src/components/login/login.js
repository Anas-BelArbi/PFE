
// import React, { useEffect, useState, useCallback } from 'react';
// import { 
//   Avatar, 
//   Button, 
//   CssBaseline, 
//   TextField, 
//   FormControlLabel, 
//   Checkbox, 
//   Link, 
//   Paper, 
//   Box, 
//   Grid, 
//   Typography, 
//   Modal 
// } from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';

// const theme = createTheme();

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [publicKey, setPublicKey] = useState('');
//   const [modalOpen, setModalOpen] = useState(false);
//   const navigate = useNavigate();

//   const toggleModal = useCallback(() => setModalOpen(prev => !prev), []);

//   useEffect(() => {
//     const checkPublicKey = async () => {
//       if (window.ethereum) {
//         try {
//           const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//           if (accounts.length > 0) {
//             const publicKey = accounts[0];
//             setPublicKey(publicKey);

//             const response = await axios.post('http://localhost:5001/check-public-key', {
//               publicKey,
//             }, { withCredentials: true });
//             if (response.data.message === 'Public key exists') {
//               toggleModal();
//             }
//           }
//         } catch (error) {
//           console.error('Error fetching public key:', error);
//         }
//       } else {
//         console.log('MetaMask is not installed');
//       }
//     };

//     checkPublicKey();

//     window.ethereum.on('accountsChanged', (accounts) => {
//       if (accounts.length > 0) {
//         setPublicKey(accounts[0]);
//         window.location.reload();
//       }
//     });

//     return () => {
//       window.ethereum.removeListener('accountsChanged', () => {});
//     };
//   }, [navigate, toggleModal]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');
//     if (!email || !password) {
//       setError('Email and password are required');
//       return;
//     }
//     try {
//       const response = await axios.post('http://localhost:5001/login', {
//         email,
//         password,
//       }, { withCredentials: true });
//       if (response.data.message === 'logged in') {
//         const token = response.data.token;
//         const decodedToken = jwtDecode(token);
//         const role = decodedToken.role;
//         localStorage.setItem("token", token.toString());
        
//         switch (role) {
//           case 'User':
//             navigate('/inventory');
//             break;
//           case 'Authority':
//             navigate('/starter');
//             break;
//           case 'Registry':
//             navigate('/starter');
//             break;
//           default:
//             navigate('/starter');
//         }
//       } else {
//         setError(response.data.error || 'Login failed. Please check your credentials.');
//       }
//     } catch (error) {
//       console.error('Error logging in:', error.response ? error.response.data : error.message);
//       setError('Login failed. Please try again.');
//     }
//   };  

//   const handlePublicKeyLogin = async () => {
//     try {
//       const response = await axios.post('http://localhost:5001/public-key-login', {
//         publicKey,
//       }, { withCredentials: true });
//       if (response.data.message === 'Logged in with public key') {
//         const { token, role } = response.data; 
//         localStorage.setItem('token', token); 
//         const decodedToken = jwtDecode(token);
        
//         switch (role) {
//           case 'User':
//             navigate('/inventory');
//             break;
//           case 'Authority':
//             navigate('/starter');
//             break;
//           case 'Registry':
//             navigate('/starter');
//             break;
//           default:
//             navigate('/starter');
//         }
//       }
//     } catch (error) {
//       console.error('Error logging in with public key:', error);
//     }
//   };

//   const redirectToSignup = () => {
//     navigate('/signup');
//   };

//   const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 500,  // Increased width
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 5,  // Increased padding
//   };

//   const buttonStyle = {
//     width: '400px',  // Increased button width
//     margin: '3px',  // Added margin between buttons
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Grid container component="main" sx={{ height: '100vh' }}>
//         <CssBaseline />
//         <Grid
//           item
//           xs={false}
//           sm={4}
//           md={7}
//           sx={{
//             backgroundImage: 'url(/sign-in-side-bg.png)',  // Updated path
//             backgroundColor: (t) =>
//               t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//           }}
//         />
//         <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
//               Sign in
//             </Typography>
//             {error && <Typography color="error">{error}</Typography>}
//             <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1 }}>
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 name="email"
//                 autoComplete="email"
//                 autoFocus
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 autoComplete="current-password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <FormControlLabel
//                 control={<Checkbox value="remember" color="primary" />}
//                 label="Remember me"
//               />
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2 }}
//               >
//                 Sign In
//               </Button>
//               <Grid container>
//                 <Grid item xs>
//                   <Link href="#" variant="body2">
//                     Forgot password?
//                   </Link>
//                 </Grid>
//                 <Grid item>
//                   <Link variant="body2" onClick={redirectToSignup}>
//                     {"Don't have an account? Sign Up"}
//                   </Link>
//                 </Grid>
//                 <Grid container sx={{ mt: 2 }}>
//                   <Grid item xs>
//                     <Link href="http://localhost:3000/#/landingPage" variant="body2">
//                       {"Back to Landing Page"}
//                     </Link>
//                   </Grid>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>

//       <Modal
//         open={modalOpen}
//         onClose={toggleModal}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Wallet Detected
//           </Typography>
//           <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//             Your wallet is already saved. Would you like to continue with your current wallet?
//           </Typography>
//           <Button variant="contained" color="success" onClick={handlePublicKeyLogin} sx={buttonStyle}>Yes</Button>
//           <Button variant="outlined" color="error" onClick={toggleModal} sx={buttonStyle}>No</Button>
//         </Box>
//       </Modal>
//     </ThemeProvider>
//   );
// };

// export default Login;


import React, { useEffect, useState, useCallback } from 'react';
import { 
  Avatar, 
  Button, 
  CssBaseline, 
  TextField, 
  FormControlLabel, 
  Checkbox, 
  Link, 
  Paper, 
  Box, 
  Grid, 
  Typography, 
  Modal 
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import imagelogo from '../../assets/images/logos/image-1.png';
const theme = createTheme();

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleModal = useCallback(() => setModalOpen(prev => !prev), []);

  useEffect(() => {
    const checkPublicKey = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          if (accounts.length > 0) {
            const publicKey = accounts[0];
            setPublicKey(publicKey);

            const response = await axios.post('http://localhost:5001/check-public-key', {
              publicKey,
            }, { withCredentials: true });
            if (response.data.message === 'Public key exists') {
              toggleModal();
            }
          }
        } catch (error) {
          console.error('Error fetching public key:', error);
        }
      } else {
        console.log('MetaMask is not installed');
      }
    };

    checkPublicKey();

    window.ethereum.on('accountsChanged', (accounts) => {
      if (accounts.length > 0) {
        setPublicKey(accounts[0]);
        window.location.reload();
      }
    });

    return () => {
      window.ethereum.removeListener('accountsChanged', () => {});
    };
  }, [navigate, toggleModal]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5001/login', {
        email,
        password,
      }, { withCredentials: true });
      if (response.data.message === 'logged in') {
        const token = response.data.token;
        const decodedToken = jwtDecode(token);
        const role = decodedToken.role;
        localStorage.setItem("token", token.toString());
        
        switch (role) {
          case 'User':
            navigate('/inventory');
            break;
          case 'Authority':
            navigate('/starter');
            break;
          case 'Registry':
            navigate('/starter');
            break;
          default:
            navigate('/starter');
        }
      } else {
        setError(response.data.error || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error logging in:', error.response ? error.response.data : error.message);
      setError('Login failed. Please try again.');
    }
  };  

  const handlePublicKeyLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5001/public-key-login', {
        publicKey,
      }, { withCredentials: true });
      if (response.data.message === 'Logged in with public key') {
        const { token } = response.data; 
        
        
        localStorage.setItem('token', token); 
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        switch (decodedToken.role) {
          case 'User':
            navigate('/inventory');
            break;
          case 'Authority':
            navigate('/starter');
            break;
          case 'Registry':
            navigate('/starter');
            break;
          default:
            navigate('/starter');
        }
      }
    } catch (error) {
      console.error('Error logging in with public key:', error);
    }
  };

  const redirectToSignup = () => {
    navigate('/signup');
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,  // Increased width
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 5,  // Increased padding
  };

  const buttonStyle = {
    width: '400px',  // Increased button width
    margin: '3px',  // Added margin between buttons
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            position: 'relative',  // Add relative positioning
            backgroundImage: 'url(/sign-in-side-bg.png)',  // Updated path
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Box
            component="img"
            src={imagelogo}  // Updated path
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
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
              Sign in
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link variant="body2" onClick={redirectToSignup}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
                <Grid container sx={{ mt: 2 }}>
                  <Grid item xs>
                    <Link href="http://localhost:3000/#/landingPage" variant="body2">
                      {"Back to Landing Page"}
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Modal
        open={modalOpen}
        onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Wallet Detected
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Your wallet is already saved. Would you like to continue with your current wallet?
          </Typography>
          <Button variant="contained" color="success" onClick={handlePublicKeyLogin} sx={buttonStyle}>Yes</Button>
          <Button variant="outlined" color="error" onClick={toggleModal} sx={buttonStyle}>No</Button>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default Login;
