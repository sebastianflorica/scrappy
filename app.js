
const fs = require('fs');
const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const visualRecognition = new VisualRecognitionV3({
    url: 'https://gateway.watsonplatform.net/visual-recognition/api',
    version: '2018-03-19',
    authenticator: new IamAuthenticator({ apikey: 'N1dS58xbeIT2KyN_ndkIxyfoAYJ7TYEr_BXSPYyAtSnH' }),
});


// import express (after npm install express)
const express = require('express');
// create new express app and save it as "app"
const app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 8080;
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: './images/' });

app.post('/', upload.single('image'), (request, response) => {
    response.header('Access-Control-Allow-Origin', '*');
    
    console.log(`URL: ${request.url}`);
    console.log('POST');

    const fileName = request.file.filename + path.extname(request.file.originalname);
    let file = path.join('./images', fileName);

    fs.rename(request.file.path, file, () => {});

    const params = {
        imagesFile: fs.createReadStream('./images/' + fileName)
    };

    visualRecognition.classify(params)
        .then(responseFromIBM => {
            response.end(JSON.stringify(responseFromIBM.result, null, 2));
        })
        .catch(err => {
            response.end(err);
        });
});

// Start the server
app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server is listening on port ${port}`)
});
