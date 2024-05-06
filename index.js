const express = require('express');
const morgan = require('morgan');
const path = require('path');
const multer = require('multer'); // Import multer for file uploads

const connectDB = require('./server/database/connection');



const app = express();
app.use(express.static('public'));
const PORT = 7000;

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
    destination: (req, file, cb) => {
        // Specify the destination directory for uploaded files
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        // Save the file with its original name
        cb(null, file.originalname);
    }
});


// File filter function to allow only images
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|gif/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true); // Accept file
    } else {
        cb(new Error('Only images are allowed'), false); // Reject file
    }
};


const upload = multer({ storage, fileFilter });

// Load routers
const router = require('./server/routes/router');
app.use('/', router(upload)); // Pass upload middleware to router

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
