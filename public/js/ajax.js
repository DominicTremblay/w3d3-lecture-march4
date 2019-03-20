// url that the request is going to be sent
const url = 'http://jsonplaceholder.typicode.com/posts';

// a reusable function to do ajax request
const request = (method, url, async, data, cb) => {
  // create a new XMLhttp object
  const httpRequest = new XMLHttpRequest();

  // error validation
  if (!httpRequest) {
    console.log('Error, could not create request');
  }

  // using onreadystatechange to handle to response
  httpRequest.onreadystatechange = function() {
    // XMLHttpRequest.DONE (state is 4) - Request is completed
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      // Checking the status code. 200 means ok.
      if (httpRequest.status === 200) {
        // responseText stored the data sent back by the requet
        // calling the callback function with the responseText
        cb(JSON.parse(httpRequest.responseText));
      } else {
        // Problem with the request
        console.log(
          `Error with the request, status code: ${httpRequest.status}`
        );
      }
    }
  };

  // Open the request with a method, a url, true or false for Async or not
  httpRequest.open(method, url, async);
  // checking if its not a post request
  if (!data) {
    // Create the request
    // we don't need to send any data, because it's a GET request. Not sending data to back-end.
    httpRequest.send(null);
  } else {
    // in the case of a post request
    httpRequest.send(JSON.stringify(data));
  }
};

// calling the request function
request('GET', url, true, '', function(response) {
  console.log(response);
});
