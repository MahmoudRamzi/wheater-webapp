// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const cors = require('cors');
const express = require('express');
// Start up an instance of app
const app = express();


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder]
app.use(express.static('website'));


 app.get('/', (req, res) => {
	let zipCode ;
    let data;
	var request = require('request');
	request(
		`https://samples.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=38e508410202ee9a5d4a716f205f8ea6`,
		function(error, response, body) {
            console.log(body);
			 data = JSON.parse(body).main.temp;
             zipCode=JSON.parse(body).zip;
			if (response.statusCode === 200) {
				res.send(`The weather in your city "${zipCode}" is ${data}`);
			console.log(`The weather in your city "${zipCode}" is ${data}`);
            }
		}
	);
}); 

// Setup Server
const port = 5000;
app.listen(port,()=>{
    console.log(` ${ port} listening`);
})
//save the data came from the client
app.post('/addweather',(req,res)=>{
	const {newDate,temp,feels} =req.body
projectData.date = newDate

projectData.temp = temp
projectData.feels= feels

res.end()
});
//send data again to the client
app.get('/getWeather',(req,res)=>{
res.send(projectData)
})