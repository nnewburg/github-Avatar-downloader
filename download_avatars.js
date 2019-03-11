var request = require('request');
var secrets = require('./secrets');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  // ...
 var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': "token " + secrets.GITHUB_TOKEN
    }
  };



  request(options, function(err, res, body) {
    let output = JSON.parse(body)

    for(key in output) {
      console.log(output[key].avatar_url);
    //cb(err, output);
    }
  });
}


// getRepoContributors("jquery", "jquery", function(err, result) {
//   console.log("Errors:", err);
//   console.log("Result:", result);
// });

function downloadImageByURL() {

request.get('https://avatars2.githubusercontent.com/u/2741?v=3&s=466')
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
         console.log('Response Status Code: ', response.statusCode);
       })
       .pipe(fs.createWriteStream('./avatars/kvirani.jpg'));

}

downloadImageByURL()

