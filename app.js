
const fs = require('fs');
const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const visualRecognition = new VisualRecognitionV3({
    url: 'https://gateway.watsonplatform.net/visual-recognition/api',
    version: '2018-03-19',
    authenticator: new IamAuthenticator({ apikey: 'N1dS58xbeIT2KyN_ndkIxyfoAYJ7TYEr_BXSPYyAtSnH' }),
});

const params = {
    imagesFile: fs.createReadStream('./images/test.jpg')
};


// Build a server with Node's HTTP module
const http = require('http');
const port = 3001;
const server = http.createServer();

server.on('request', (request, response) => {
    console.log(`URL: ${request.url}`);
    
    visualRecognition.classify(params)
        .then(responseFromIBM => {
            response.end(JSON.stringify(responseFromIBM.result, null, 2));
        })
        .catch(err => {
            response.end(err);
        });
});

// Start the server
server.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server is listening on port ${port}`)
});
