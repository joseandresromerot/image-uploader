const express = require('express');
const serverless = require('serverless-http');
const cloudinary = require('cloudinary');
const cors = require('cors');
//const bodyParser = require('body-parser');

require('dotenv').config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();

// app.use( bodyParser.json() );       // to support JSON-encoded bodies

// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//   extended: true
// }));

app.use(cors());

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: "Hola desde el servidor!"
    });
});

router.post('/upload', (req, res) => {
    // Get the file that was set to our field named "image"

    console.info('req', req.body);
    //res.sendStatus(200);

    // If no files submitted, exit
    if (!req.body) return res.sendStatus(400);

    // const jsonBody = JSON.stringify(req.body);

    // console.info('jsonBody',jsonBody);

    // const { imageBase64 } = req.body;

    // // If no image submitted, exit
    // if (!imageBase64) return res.sendStatus(400);

    // const imageName = Date.now() + '.jpg';
    // // Move the uploaded image to our upload folder
    // //image.mv(process.env.UPLOADS_PATH + imageName);

    cloudinary.v2.uploader
        .upload(req.body, {
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

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);   