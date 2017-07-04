const request = require('request');
const fs = require('fs');
//added process.argv to function
const repoO = process.argv[2];
const repoN = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!');

function getRequestOptions() {
  return {
    //updated uri to work with process.argv variable
    uri: 'https://api.github.com/repos/' + repoO + "/" + repoN + '/contributors',
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
     // called the callback function, first peramater is null second is the data
      cb(null, data);

    } catch (err) {
      console.log('failed to parse content body')
    }
  });
}

getRepoContributors(repoO, repoN, function(err, result) {
 // loop to iterate through contributors and list the avatar_url and login name
 // created a filePath to save imaged locally.
 // called downloadImageByUrl functon to download contributors avators.

  for (i = 0; i < result.length; i ++) {
       const avatar_url = result[i].avatar_url;
       const loginName = result[i].login;
       const filePath = ('./avatars/' + loginName + '.png');

       downloadImageByURL(avatar_url, filePath);
      }
  console.log('the callback ran');
  console.log("Errors:", err);

});


function downloadImageByURL(url, filePath ) {
  request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
         console.log('Response Status Code: ', response.statusCode);
         console.log(response.headers['content-type']);
         console.log('Downloading image...');
         console.log('Download complete.');
       })
       .pipe(fs.createWriteStream(filePath));
}


