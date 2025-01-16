var https = require('follow-redirects').https;
var fs = require('fs');
require('dotenv').config()

// Options for the API request
var options = {
  method: 'POST',
  hostname: 'driver-vehicle-licensing.api.gov.uk',
  path: '/vehicle-enquiry/v1/vehicles',
  headers: {
    'x-api-key': process.env.API_KEY, // Replace with your API key
    'Content-Type': 'application/json',
  },
  maxRedirects: 20,
};

var postData = JSON.stringify({ registrationNumber: 'BX16BUJ' });

// Call dataHelper with a callback
dataHelper(postData, blankObject(), (error, updatedObject) => {
  if (error) {
    console.error('Error fetching API data:', error);
  } else {
    console.log('Search Result:', updatedObject); // Output updated object
  }
});

// dataHelper function
function dataHelper(data, object, callback) {
  const req = https.request(options, function (res) {
    let chunks = [];

    // Collect data chunks
    res.on('data', function (chunk) {
      chunks.push(chunk);
    });

    res.on('end', function () {
      const body = Buffer.concat(chunks).toString();
      try {
        // Parse JSON and update the object
        const apiData = JSON.parse(body);
        object.colour = apiData.colour;
        object.engineSize = apiData.engineCapacity;
        object.reg = apiData.registrationNumber;
        object.make = apiData.make;

        callback(null, object); // Pass the updated object to callback
      } catch (error) {
        callback(error, null); // Pass error to callback
      }
    });

    res.on('error', function (error) {
      callback(error, null); // Pass request error to callback
    });
  });

  req.write(data); // Send the request
  req.end();
}

// Function to create a blank object
function blankObject() {
  return {
    reg: "",
    make: "",
    colour: "",
    engineSize: "",
  };
}

//add save function for saved vehicles


// function addSearch(user, message){
//     let newSearch={
//         user: user,
//         message: message,
//         likes: 0,
//         time: Date.now()
//     }
//     // postData.push(newPost)
//     postData.create(newPost)
//         .catch(err=>{
//             console.log("error: "+err)
//         })
//     console.log(postData)
// }

module.exports={
    dataHelper,
    blankObject
}