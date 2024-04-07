// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const cors = require("cors")
const User = require('./modal/user'); // Assuming the User model is defined in a separate file
const IncidentReport = require('./modal/incident'); // Assuming the IncidentReport model is defined in a separate file

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://vtu19865:JaIBfJgceFNQ14Gp@safezonecluster.ezygspx.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Signup Route

app.post('/signup', async (req, res) => {
    try {
        const { name, phoneNumber, email, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

        // Create a new user with hashed password
        const newUser = new User({
            name,
            phoneNumber,
            email,
            password: hashedPassword // Store the hashed password in the database
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the hashed password from the database with the provided password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/incident-report', async (req, res) => {
    try {
        const { firstName, lastName, mobileNumber, email, incidentDate, incidentDescription, incidentPhotos } = req.body;

        // Create a new incident report with received data
        const newIncidentReport = new IncidentReport({
            firstName,
            lastName,
            mobileNumber,
            email,
            incidentDate,
            incidentDescription,
            // incidentPhotos
        });

        // Save the new incident report
        await newIncidentReport.save();

        // Send success response
        res.status(201).json({ message: 'Incident report created successfully' });
    } catch (error) {
        // Handle errors
        console.error('Error creating incident report:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Create Incident Report Route

// app.post('/incident-report', async (req, res) => {
//     try {
//         const { firstName, lastName, mobileNumber, email } = req.body;
//         console.log(req.body)
//         // mobileNumber = mobileNumber.toString()
//         // Encrypt sensitive data
//         const encryptedFirstName = encryptData(firstName);
//         const encryptedLastName = encryptData(lastName);
//         const encryptedMobileNumber = encryptData(mobileNumber);
//         const encryptedEmail = encryptData(email);

//         // Stringify encrypted data
//         const encryptedFirstNameString = JSON.stringify(encryptedFirstName);
//         const encryptedLastNameString = JSON.stringify(encryptedLastName);
//         const encryptedMobileNumberString = JSON.stringify(encryptedMobileNumber);
//         const encryptedEmailString = JSON.stringify(encryptedEmail);

//         // Create a new incident report with encrypted sensitive data
//         const newIncidentReport = new IncidentReport({
//             firstName: encryptedFirstNameString,
//             lastName: encryptedLastNameString,
//             mobileNumber: encryptedMobileNumberString,
//             email: encryptedEmailString,
//             incidentDate: req.body.incidentDate,
//             incidentDescription: req.body.incidentDescription,
//             incidentPhotos: req.body.incidentPhotos
//         });

//         await newIncidentReport.save();
//         res.status(201).json({ message: 'Incident report created successfully' });
//     } catch (error) {
//         console.error('Error creating incident report:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// Function to encrypt data
// function encryptData(data) {
//     // Check if data is not a string
//     if (typeof data !== 'string') {
//         throw new Error('Data to encrypt must be a string');
//     }

//     // Generate a random key
//     const key = generateRandomBytes(32);

//     // Generate a random initialization vector (IV)
//     const iv = generateRandomBytes(16);

//     // Encrypt the data
//     let encryptedData = xorEncrypt(data, key);

//     // Return an object containing the encrypted data and the initialization vector (IV)
//     return {
//         data: encryptedData,
//         iv: iv.toString('hex')
//     };
// }

// // Function to generate random bytes
// function generateRandomBytes(length) {
//     const randomBytes = new Uint8Array(length);
//     for (let i = 0; i < length; i++) {
//         randomBytes[i] = Math.floor(Math.random() * 256);
//     }
//     return randomBytes;
// }

// // Function to perform XOR encryption
// function xorEncrypt(data, key) {
//     const encryptedData = [];
//     for (let i = 0; i < data.length; i++) {
//         encryptedData.push(data.charCodeAt(i) ^ key[i % key.length]);
//     }
//     return Buffer.from(encryptedData).toString('hex');
// }


// Get All Incident Reports Route
app.get('/incident-reports', async (req, res) => {
    try {
        const allIncidentReports = await IncidentReport.find();
        res.status(200).json(allIncidentReports);
    } catch (error) {
        console.error('Error fetching incident reports:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000; // Use port 3000 by default if PORT environment variable is not set
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});