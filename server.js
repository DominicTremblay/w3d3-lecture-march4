const express = require('express');
const app = express();

const port = process.env.PORT || 8000;
const host = process.env.HOSTNAME || 'localhost';

app.use(express.static('public'));

app.listen(port, host, function() {
  console.log(`Server Running on ${host} on port ${port}`);
});
