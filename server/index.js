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
    console.info('req', req);
    const { image } = req;

    // If no image submitted, exit
    if (!image) return res.sendStatus(400);

    // If does not have image mime type prevent from uploading
    if (/^image/.test(image.mimetype)) return res.sendStatus(400);

    // Move the uploaded image to our upload folder
    image.mv(__dirname + '/upload/' + image.name);

    // All good
    res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});