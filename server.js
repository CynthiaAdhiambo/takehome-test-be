const http = require('http'); // importing http
const app = require('./app'); // imports the local apps.js file - the request handler


const port = process.env.PORT || 7000; // specifying port running the server

const server = http.createServer(app);

server.listen(port); // restarting the server to listen to the response from teh server