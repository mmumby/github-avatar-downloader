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
      const data = JSON.parse(body);
      console.log('Just called the callback');

      cb(data);

    } catch (err) {
      console.log('failed to parse content body')
    }
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log('the callback ran');
  console.log("Errors:", err);
  console.log("Result:", result);
});
