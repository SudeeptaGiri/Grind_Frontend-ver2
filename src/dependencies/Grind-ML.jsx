const axios = require('axios');

// const { GoogleAuth } = require('google-auth-library');

async function getMLScore(encodedURL) {
  // const auth = new GoogleAuth();
  // const client = await auth.getClient()
  // const accessToken = await client.getAccessToken();
  // return getAnalysis(accessToken.token, encodedURL);
  //customEncodedURL = encodedURL;
 // return accessToken.token;
  let accessToken = "ya29.a0AWY7Cklhbw179_YyZBpwbE91pgV0hTlyJWOhuQiHjevQYbFX1kqTrPACo1NftKLb7FrT5suwhUqss7V3N5epQ0epaqswEwm59tO7DYTjetvQGMu_wF9syGOK4oT5qkDxKGd3RDdv_7xZmK40dkGIJ5ivE3cH7d0JTv4IJwaCgYKAQASARESFQG1tDrpHWqWGUfw0C3d-yeXRazFUQ0173";
 return getAnalysis(accessToken, encodedURL);
}

// getMLScore(imageToBase64("client/dependencies/gifs/AP_Shot.gif"));

async function getAnalysis(accessTokenier, customEncodedURL) {
  const projectId = 'gfg-grind';
  const endpointId = '4919650429274423296';
  const accessToken = accessTokenier;
  const apiUrl = `https://us-central1-aiplatform.googleapis.com/v1/projects/${projectId}/locations/us-central1/endpoints/${endpointId}:predict`;
  
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
  
  
  const payLoad = {
      instances: [{
          content: customEncodedURL
          }],
      parameters: {
        confidenceThreshold: 0.5,
        maxPredictions: 5
      }
  }

  var result;

  await axios.post(apiUrl, payLoad, { headers })
  .then(response => {
      const predictedResult = response.data.predictions;
      const [{ displayNames, confidences }] = predictedResult;
      result = displayNames;
      console.log(displayNames, confidences);
  
     })
    .catch(error => {
      console.error('Error:', error.response.data);
    });

    return result;
}


module.exports = {getMLScore};