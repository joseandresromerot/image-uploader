const express = require("express");
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary');

require('dotenv').config();

const PORT = process.env.PORT || 3001;

const app = express();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(
    fileUpload({
        limits: {
            fileSize: 10000000,
        },
        abortOnLimit: true,
    })
);

app.get("/api", (req, res) => {
    res.json({ message: "Hola desde el servidor!" });
});

app.post('/upload', (req, res) => {
    // Get the file that was set to our field named "image"

    // If no files submitted, exit
    if (!req.body) return res.sendStatus(400);

    const { imageBase64 } = req.body;

    // If no image submitted, exit
    if (!imageBase64) return res.sendStatus(400);

    const imageName = Date.now() + '.jpg';
    // Move the uploaded image to our upload folder
    //image.mv(process.env.UPLOADS_PATH + imageName);

    cloudinary.v2.uploader
        .upload(imageBase64, {
            //notification_url: "https://mysite.example.com/notify_endpoint",
            //resource_type: "video",
            overwrite: true,
            public_id: "image_uploader/" + imageName
        })
        .then(result => {
            console.info('UPLOAD RESULT: ', result);
            // All good
            res.sendStatus(200);
        })
        .catch(err => {
            console.info('UPLOAD ERROR: ', err);
            res.sendStatus(400);
        });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});