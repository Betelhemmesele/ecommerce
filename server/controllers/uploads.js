const multer = require('multer');

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: 'uploads/', // Specify the destination folder where uploaded files will be stored
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname); // Set the filename to be unique
  },
});

// Set up Multer file upload middleware
const upload = multer({ storage });

module.exports = upload;