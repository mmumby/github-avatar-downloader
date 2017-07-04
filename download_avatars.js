const request = require('request');
const fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRequestOptions() {
  return {
    uri: 'https://api.github.com/repos/jquery/jquery/contributors',
    headers: {
      'User-Agent': 'mmumby'
    },
    // saved access token to the environment
    qs: {
      access_token: process.env.GITHUB_ACCESS_TOKEN
    }
  }
}

//function to request url

function getRepoContributors(repoOwner, repoName, cb) {
  request(getRequestOptions(), function (error, response, body) {
    try {
      // convert body response into javascript object
      const data = JSON.parse(body);
      console.log('Just called the callback');
     // called the callback function, first peramater is null second is the data
      cb(null, data);

    } catch (err) {
      console.log('failed to parse content body')
    }
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
 // loop to iterate through contributors and list only the avatar_url
  for (i = 0; i < result.length; i ++) {
       const avatar_url = result[i].avatar_url;
       console.log(avatar_url);
      }
  console.log('the callback ran');
  console.log("Errors:", err);

});
