const request = require('request-promise');

function generateDockerHubUri(imageName) {
  return `https://hub.docker.com/v2/repositories/library/${imageName}`;
}

function getDockerPullsCount(imageName) {
  const options = {
    uri: generateDockerHubUri(imageName),
    json: true,
  };

  return request(options)
    .then((imageData) => {
      const numPulls = imageData.pull_count || 0;
      return Promise.resolve(numPulls);
    });
}

// Get the image name from the command line arguments
const imageName = process.argv[2];

// Check if image name is provided
if (!imageName) {
  console.error('Please provide an image name.');
} else {
  // Call the function with the specified image name
  getDockerPullsCount(imageName)
    .then(console.log)
    .catch((error) => {
      console.error('Error:', error.message);
    });
}
