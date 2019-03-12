var request = require('request');
var secrets = require('./secrets');
var fs = require('fs');
console.log('Welcome to the GitHub Avatar Downloader!');

//main function to input name of the repository to and a callback function to execute a muttable
//function
function getRepoContributors(repoOwner, repoName, cb) {
  //conditional to terminate program if an argument is not passed
  if(arguments[0] === undefined || arguments[1] === undefined){
    return console.log("Error input a name or repo!!!!!!!!!!!!!!!!!!!!");
  }

  //function to make a directory called Avatars in the cd
  fs.mkdir('./avatars',function(err) {
   if (err) {
      return console.error(err);
   }
  });

  //object to authorize the request function and its target(repoOwner/repoName)
 var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': "token " + secrets.GITHUB_TOKEN
    }
  };

    //request function to parse the string of objects
    //iterate through the object and apply the call back function onto each of the
    //objects found
  request(options, function(err, res, body) {
    let output = JSON.parse(body);

    for(key in output) {
      cb(output[key].avatar_url, 'avatars/' + output[key].login+'.jpg');
    }
  });
}

//creates two variables to intake command line arguments
let owner = process.argv[2];
let name = process.argv[3];

//call the function with the input values and callback function
getRepoContributors(owner, name, downloadImageByURL)

//the call back function that gets the image URL and writes the image to a new folder
function downloadImageByURL(url, filePath) {
  request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
         console.log('Response Status Code: ', response.statusCode);
       })
       .pipe(fs.createWriteStream(filePath));
}
