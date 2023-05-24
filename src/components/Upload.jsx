

import React, {useState} from "react";
import Button from "./ui/Button";
import {getMLScore} from "../dependencies/Grind-ML";
import axios from "axios";

var customAPI = "ya29.a0AWY7CknTv0IB4g5OnKCVWJarzg1mvZVPYPrCbXhTTqo75XprxZTdWxouZyiTONd-AzCuvd5TstQZQUlVFV797lro7jVD7pa_OMjK1-LDuxKTou_ji_rzP6dtdsPEmzAqlo40mNjmwvmVMI-U1WOUHxoRg8bgoLlRkOaAzgaCgYKATcSARESFQG1tDrpNLBQcN5FuufUhsdD9zsJEg0173";

export default function Upload() {
    const [res, setRes] = useState("");
    const [btnstate, setbtnstate] = useState(false);


    function uploadBtn() {

        setbtnstate(true);

        const gifFileInput = document.getElementById("gifFileInput");
        const uploadButton = document.getElementById("uploadButton");


        // Add event listener to the upload button
        // Check if a file is selected
        if (gifFileInput.files.length === 0) {
            alert("Please select a GIF file to upload.");
            return;
        }

        // Get the selected file
        const gifFile = gifFileInput.files[0];

        // Create a FileReader to read the file
        const reader = new FileReader();

        reader.onload = function (event) {
            // Retrieve the Base64 URL of the file

            setRes("Analyzing your shot...");

            const base64Url = event.target.result;

            // Use the Base64 URL as needed (e.g., display the GIF, process it, etc.)
            console.log(
                "Base64 URL:",
                base64Url.substring(base64Url.indexOf(",") + 1)
            );

            getAnalysis(customAPI, base64Url.substring(base64Url.indexOf(",") + 1));
        };

        // Read the file as data URL (Base64 format)
        reader.readAsDataURL(gifFile);
    }


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
            if(displayNames[0] === "FD80") 
                setRes("Your AI score is 80 with a confidence level of " + confidences[0] * 100 + "!");
            else if(displayNames[0] === "FD60")
                setRes("Your AI score is 60 with a confidence level of " + confidences[0] * 100 + "!");
            else if(displayNames[0] === "FD40")
                setRes("Your AI score is 40 with a confidence level of " + confidences[0] * 100 + "!");
            console.log(displayNames, confidences);
        
           })
          .catch(error => {
            console.error('Error:', error.response.data);
          });
      
          return result;
      }


    return (
        <>
            <input type="file" id="gifFileInput" accept=".gif" required className={`${btnstate ? "invisible" : ""}`} />
            <Button onClick={uploadBtn} id="uploadButton" className={`${btnstate ? "hidden" : ""}`}>Upload</Button>
            <div className="p-2 text-green-500 font-bold text-xl text-center">{res}</div>
        </>
    );
}