const express = require('express');
const morgan = require('morgan');
const path = require('path');
const multer = require('multer'); // Import multer for file uploads

const connectDB = require('./server/database/connection');

const app = express();

const PORT = 3000;

// Log requests
app.use(morgan('tiny'));

// MongoDB connection
connectDB();

// Set view engine


app.set('view engine', 'ejs');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Load assets
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); // Destination directory for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original filename for storing files
    }
});

const upload = multer({ storage: storage });

// Load routers
const router = require('./server/routes/router');
app.use('/', router(upload)); // Pass upload middleware to router

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
