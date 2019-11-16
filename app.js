
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

visualRecognition.classify(params)
    .then(response => {
        console.log(JSON.stringify(response.result, null, 2));
    })
    .catch(err => {
        console.log(err);
    });
