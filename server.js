// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
const port = 8000;

// Setup Server
const server = app.listen(port, listening);

function listening() {
	console.log("server is on");
	console.log('the port is '+port);
}

// respond with projectData object when a GET request is made to the homepage
app.get('/all', function (req, res) {
	res.send(projectData);
});

// POST method route
app.post('/addWeatherData', addData)

function addData(req, res) {
    projectData.temperature = req.body.temperature;
    projectData.date = req.body.date;
    projectData.user_response = req.body.user_response;
    res.end();
    console.log(projectData)
}