const express = require("express");
const fileUpload = require('express-fileupload');

const PORT = process.env.PORT || 3001;

const app = express();

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
    if (!req.files) return res.sendStatus(400);

    const { image } = req.files;
    console.info('0', image);

    // If no image submitted, exit
    if (!image) return res.sendStatus(400);
    console.info('1', !image.mimetype.includes('image'));

    // If does not have image mime type prevent from uploading
    //if (/^image/.test(image.mimetype)) return res.sendStatus(400);
    if (!image.mimetype.includes('image')) return res.sendStatus(400);
    console.info('2');

    // Move the uploaded image to our upload folder
    image.mv(__dirname + '/upload/' + image.name);
    console.info('3');

    // All good
    res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});