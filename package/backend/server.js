// const express = require('express');
// const { exec } = require('child_process');
// const path = require('path');
// const cors = require('cors');
// const mysql = require('mysql');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const cookieParser = require('cookie-parser');
// const axios = require('axios'); // Add axios

// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 5001;
// const saltRounds = 10;
// const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// // Middleware
// app.use(express.json());
// app.use(cors({
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST"],
//     credentials: true,
// }));
// app.use(cookieParser());

// // Database connection pool
// const pool = mysql.createPool({
//     connectionLimit: 10,
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'talan',
// });

// // Verify user middleware
// const verifyUser = (req, res, next) => {
//     const token = req.cookies.token;
//     if (!token) return res.json({ error: "unauthorized" });
//     jwt.verify(token, JWT_SECRET, (err, result) => {
//         if (err) return res.json({ error: "unauthorized" });
//         req.name = result.name;
//         req.role = result.role; // include the user's role in the request
//         next();
//     });
// };

// // Routes
// app.get('/', verifyUser, (req, res) => {
//     return res.json({ Status: "Success", name: req.name, role: req.role });
// });

// app.post('/register', (req, res) => {
//     const checkUserSql = 'SELECT * FROM user WHERE email = ?';
//     pool.query(checkUserSql, [req.body.email], (err, results) => {
//         if (err) return res.status(500).json({ error: 'Internal server error' });

//         if (results.length > 0) return res.status(400).json({ error: 'User already exists' });

//         bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
//             if (err) return res.status(500).json({ error: 'Error hashing password' });

//             const sql = 'INSERT INTO user (`name`, `email`, `password`, `role`, `publicKey`) VALUES (?, ?, ?, ?, ?)';
//             const values = [
//                 req.body.name,
//                 req.body.email,
//                 hash,
//                 req.body.role,
//                 req.body.publicKey,
//                 // req.body.privateKey
//             ];

//             pool.query(sql, values, (err, result) => {
//                 if (err) return res.status(500).json({ error: 'Error inserting data' });
//                 return res.json({ message: 'User registered successfully' });
//             });
//         });
//     });
// });



// app.post('/login', (req, res) => {
//     const sql = 'SELECT * FROM user WHERE email = ?';
//     pool.query(sql, [req.body.email], (err, results) => {
//         if (err) return res.json({ error: "error selecting data" });
//         if (results.length === 0) return res.json({ error: "email not found" });

//         const user = results[0];

//         bcrypt.compare(req.body.password, user.password, (err, result) => {
//             if (err) return res.json({ error: "error comparing password" });
//             if (!result) return res.json({ error: "password incorrect" });

//             const { name, role } = user;

//             // Add timestamp to the token payload
//             const tokenPayload = { name, role, timestamp: Date.now() };
//             const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1d' });

//             return res.json({ message: "logged in", token, role });
//         });
//     });
// });

// // // In your /public-key-login route
// // app.post('/public-key-login', (req, res) => {
// //     const { publicKey } = req.body;
// //     const sql = 'SELECT * FROM user WHERE publicKey = ?';
// //     pool.query(sql, [publicKey], (err, results) => {
// //         if (err) return res.status(500).json({ error: 'Internal server error' });
// //         if (results.length === 0) return res.status(404).json({ error: 'User not found' });

// //         const user = results[0];

// //         // Add timestamp to the token payload
// //         const tokenPayload = { name: user.name, role: user.role, timestamp: Date.now() };
// //         const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1d' });

// //         return res.json({ message: 'Logged in with public key', token, role: user.role });
// //     });
// // });
//   // New endpoint to check if the public key exists
// app.post('/check-public-key', (req, res) => {
//     const { publicKey } = req.body;
//     const sql = 'SELECT * FROM user WHERE publicKey = ?';
//     pool.query(sql, [publicKey], (err, results) => {
//         if (err) return res.status(500).json({ error: 'Internal server error' });
//         if (results.length === 0) return res.status(404).json({ error: 'User not found' });

//         return res.json({ message: 'Public key exists' });
//     });
// });

// // Existing endpoint to log in with public key and create token
// app.post('/public-key-login', (req, res) => {
//     const { publicKey } = req.body;
//     const sql = 'SELECT * FROM user WHERE publicKey = ?';
//     pool.query(sql, [publicKey], (err, results) => {
//         if (err) return res.status(500).json({ error: 'Internal server error' });
//         if (results.length === 0) return res.status(404).json({ error: 'User not found' });

//         const user = results[0];

//         // Add timestamp to the token payload
//         const tokenPayload = { name: user.name, role: user.role, timestamp: Date.now() };
//         const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1d' });

//         return res.json({ message: 'Logged in with public key', token, role: user.role });
//     });
// });


// app.get('/logout', (req, res) => {
//     res.clearCookie('token');
//     return res.json({ Status: "Success" });
// });

// // API endpoint to run the upload script
// app.post('/run-upload-script', (req, res) => {
//     const scriptPath = path.join(__dirname, 'upload.js');
//     exec(`node ${scriptPath}`, (error, stdout, stderr) => {
//         if (error) return res.status(500).send('Error executing script');
//         if (stderr) return res.status(500).send('Script error');
//         res.status(200).send('Script executed successfully');
//     });
// });

// const insertInitialUsers = () => {
//     const users = [
//         {
//             name: 'Authority',
//             email: 'Authority@talan.com',
//             password: 'Authority',
//             role: 'Authority',
//             privatekey: '11cf83fa07766e30e1f327a808fbf8d296c487c315bc831092a25a74377bd917',
//             publickey: '0x49c1300A03fE810098651e390F55f3389dAb04B3'
//         },
//         {
//             name: 'Registry',
//             email: 'Registry@talan.com',
//             password: 'Registry',
//             role: 'Registry',
//             privatekey: 'cd7b8eacaabb6b4b3ef1814da03278cd983f6d285ff8d803a5c53c3ab988792b',
//             publickey: '0x1dA720567c24A05Dc1a9D3CB5B078a7e122a156a'
//         }
//     ];

//     users.forEach(user => {
//         const sqlSelect = 'SELECT * FROM user WHERE email = ?';
//         pool.query(sqlSelect, [user.email], (err, results) => {
//             if (err) return;

//             if (results.length > 0) return;

//             bcrypt.hash(user.password, saltRounds, (err, hash) => {
//                 if (err) return;

//                 const values = [
//                     user.name,
//                     user.email,
//                     hash,
//                     user.role,
//                     user.privatekey,
//                     user.publickey
//                 ];
//                 const sqlInsert = 'INSERT INTO user (`name`, `email`, `password`, `role`, `privatekey`, `publickey`) VALUES (?)';
//                 pool.query(sqlInsert, [values], (err, result) => {
//                     if (err) return;
//                 });
//             });
//         });
//     });
// };

// app.post('/add-project', (req, res) => {
//     const { projectName, vision, domain, latitude, longitude, image, publicKey } = req.body;

//     // First, find the user ID based on the public key
//     pool.query('SELECT id FROM user WHERE publickey = ?', [publicKey], (err, results) => {
//         if (err) {
//             console.error('Error finding user:', err);
//             return res.status(500).json({ success: false, message: 'Error finding user' });
//         }

//         if (results.length === 0) {
//             return res.status(404).json({ success: false, message: 'User not found' });
//         }

//         const userID = results[0].id;

//         // Insert the project into the database
//         const sql = 'INSERT INTO project (projectName, vision, domain, latitude, longitude, image, userID) VALUES (?, ?, ?, ?, ?, ?, ?)';
//         const values = [projectName, vision, domain, latitude, longitude, image, userID];

//         pool.query(sql, values, (err, result) => {
//             if (err) {
//                 console.error('Error adding project:', err);
//                 return res.status(500).json({ success: false, message: 'Error adding project' });
//             }

//             res.json({ success: true, project: { id: result.insertId, projectName, vision, domain, latitude, longitude, image, userID } });
//         });
//     });
// });

// // Start the server and insert initial users
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//     insertInitialUsers();
// });



const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const axios = require('axios'); // Add axios

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;
const saltRounds = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Middleware
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
}));
app.use(cookieParser());

// Database connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'talan',
});

// Verify user middleware
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.json({ error: "unauthorized" });
    jwt.verify(token, JWT_SECRET, (err, result) => {
        if (err) return res.json({ error: "unauthorized" });
        req.name = result.name;
        req.role = result.role; // include the user's role in the request
        next();
    });
};

// Routes
app.get('/', verifyUser, (req, res) => {
    return res.json({ Status: "Success", name: req.name, role: req.role });
});

app.post('/register', (req, res) => {
    const checkUserSql = 'SELECT * FROM user WHERE email = ?';
    pool.query(checkUserSql, [req.body.email], (err, results) => {
        if (err) return res.status(500).json({ error: 'Internal server error' });

        if (results.length > 0) return res.status(400).json({ error: 'User already exists' });

        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
            if (err) return res.status(500).json({ error: 'Error hashing password' });

            const sql = 'INSERT INTO user (`name`, `email`, `password`, `role`, `publicKey`) VALUES (?, ?, ?, ?, ?)';
            const values = [
                req.body.name,
                req.body.email,
                hash,
                req.body.role,
                req.body.publicKey,
                // req.body.privateKey
            ];

            pool.query(sql, values, (err, result) => {
                if (err) return res.status(500).json({ error: 'Error inserting data' });
                return res.json({ message: 'User registered successfully' });
            });
        });
    });
});



app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM user WHERE email = ?';
    pool.query(sql, [req.body.email], (err, results) => {
        if (err) return res.json({ error: "error selecting data" });
        if (results.length === 0) return res.json({ error: "email not found" });

        const user = results[0];

        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) return res.json({ error: "error comparing password" });
            if (!result) return res.json({ error: "password incorrect" });

            const { name, role } = user;

            // Add timestamp to the token payload
            const tokenPayload = { name, role, timestamp: Date.now() };
            const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1h' });

            return res.json({ message: "logged in", token, role });
        });
    });
});


app.post('/check-public-key', (req, res) => {
    const { publicKey } = req.body;
    const sql = 'SELECT * FROM user WHERE publicKey = ?';
    pool.query(sql, [publicKey], (err, results) => {
        if (err) return res.status(500).json({ error: 'Internal server error' });
        if (results.length === 0) return res.status(404).json({ error: 'User not found' });

        return res.json({ message: 'Public key exists' });
    });
});

// Existing endpoint to log in with public key and create token
app.post('/public-key-login', (req, res) => {
    const { publicKey } = req.body;
    const sql = 'SELECT * FROM user WHERE publicKey = ?';
    pool.query(sql, [publicKey], (err, results) => {
        if (err) return res.status(500).json({ error: 'Internal server error' });
        if (results.length === 0) return res.status(404).json({ error: 'User not found' });

        const user = results[0];

        // Add timestamp to the token payload
        const tokenPayload = { name: user.name, role: user.role, timestamp: Date.now() };
        const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1h' });

        return res.json({ message: 'Logged in with public key', token, role: user.role });
    });
});


app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success" });
});

// API endpoint to run the upload script
app.post('/run-upload-script', (req, res) => {
    const scriptPath = path.join(__dirname, 'upload.js');
    exec(`node ${scriptPath}`, (error, stdout, stderr) => {
        if (error) return res.status(500).send('Error executing script');
        if (stderr) return res.status(500).send('Script error');
        res.status(200).send('Script executed successfully');
    });
});

const insertInitialUsers = () => {
    const users = [
        {
            name: 'Authority',
            email: 'Authority@talan.com',
            password: 'Authority',
            role: 'Authority',
            privatekey: '11cf83fa07766e30e1f327a808fbf8d296c487c315bc831092a25a74377bd917',
            publickey: '0x49c1300A03fE810098651e390F55f3389dAb04B3'
        },
        {
            name: 'Registry',
            email: 'Registry@talan.com',
            password: 'Registry',
            role: 'Registry',
            privatekey: 'cd7b8eacaabb6b4b3ef1814da03278cd983f6d285ff8d803a5c53c3ab988792b',
            publickey: '0x1dA720567c24A05Dc1a9D3CB5B078a7e122a156a'
        }
    ];

    users.forEach(user => {
        const sqlSelect = 'SELECT * FROM user WHERE email = ?';
        pool.query(sqlSelect, [user.email], (err, results) => {
            if (err) return;

            if (results.length > 0) return;

            bcrypt.hash(user.password, saltRounds, (err, hash) => {
                if (err) return;

                const values = [
                    user.name,
                    user.email,
                    hash,
                    user.role,
                    user.privatekey,
                    user.publickey
                ];
                const sqlInsert = 'INSERT INTO user (`name`, `email`, `password`, `role`, `privatekey`, `publickey`) VALUES (?)';
                pool.query(sqlInsert, [values], (err, result) => {
                    if (err) return;
                });
            });
        });
    });
};

app.post('/add-project', (req, res) => {
    const {owner, projectName, vision, domain, latitude, longitude, image, publicKey } = req.body;
  
    const insertProjectQuery = `
      INSERT INTO project (owner, projectName, vision, domain, latitude, longitude, image, userID) 
      VALUES (?, ?, ?, ?, ?, ?, ?, (SELECT id FROM user WHERE publicKey = ?))
    `;
  
    pool.query(insertProjectQuery, [owner, projectName, vision, domain, latitude, longitude, image, publicKey], (err, result) => {
      if (err) {
        console.error('Error adding project:', err);
        return res.status(500).json({ success: false, message: 'Error adding project' });
      }
  
      res.json({ success: true, project: result.insertId });
    });

    app.get('/user/:publicKey', (req, res) => {
        const { publicKey } = req.params;
        const sql = 'SELECT name, email, publicKey, imageuser FROM user WHERE publicKey = ?';
        pool.query(sql, [publicKey], (err, results) => {
            if (err) return res.status(500).json({ error: 'Internal server error' });
            if (results.length === 0) return res.status(404).json({ error: 'User not found' });
    
            return res.json({ user: results[0] });
        });
    });
    
    app.put('/user/:publicKey', (req, res) => {
        const { publicKey } = req.params;
        const { name, email, password, imageuser } = req.body;
        let sql = 'UPDATE user SET name = ?, email = ?, imageuser = ? WHERE publicKey = ?';
        const values = [name, email, imageuser, publicKey];
    
        if (password) {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) return res.status(500).json({ error: 'Error hashing password' });
                sql = 'UPDATE user SET name = ?, email = ?, password = ?, imageuser = ? WHERE publicKey = ?';
                values.splice(2, 0, hash);
                pool.query(sql, values, (err, results) => {
                    if (err) return res.status(500).json({ error: 'Internal server error' });
                    return res.json({ message: 'User updated successfully' });
                });
            });
        } else {
            pool.query(sql, values, (err, results) => {
                if (err) return res.status(500).json({ error: 'Internal server error' });
                return res.json({ message: 'User updated successfully' });
            });
        }
    });
    
    
  });

// Start the server and insert initial users
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    insertInitialUsers();
});
