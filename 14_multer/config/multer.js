const multer = require('multer');
const crypto = require('crypto');  // for generating unique file names for uploaded files
const path = require('path');

// diskstroage setup
const storage = require('multer').diskStorage({
    // setting destination
    destination: function (req, file, cb) {
      cb(null, './public/images/uploads') // specify the destination folder for uploaded files
    },  
    // setting filename
    filename: function (req, file, cb) {
      crypto.randomBytes(16, (err, bytes) => {
        if (err) return cb(bytes);
        const fn = bytes.toString('hex') + path.extname(file.originalname);  // will convert the bytes into hexa decimal
        //path.extname(file.originalname) using this we can get the extension of the file like .jpg, .png etc.
        // file.originalname is the original name of the file uploaded by the user.
        cb(null, fn);
      });
    }
  })            

const upload = multer({ storage: storage });  // multer is a middleware for handling multipart/form-data, which is primarily used for uploading files.

module.exports = upload;  // exporting the upload middleware so that it can be used in other files like app.js  
