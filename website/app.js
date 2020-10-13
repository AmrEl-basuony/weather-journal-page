/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?id=';
const key = '&appid=779e4b58ea0317e919553d94aae43020';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    const postCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    console.log(newDate);
    getTemperature(baseURL, postCode, key)
    .then(function (APItemperature){
        // Add data to POST request
        postData('http://localhost:8000/addWeatherData', {temperature: APItemperature, date: newDate, user_response: feelings } )
        // Function which updates UI
        .then(function() {
            updateUI()
        })
    })
}

// Async GET
const getTemperature = async (baseURL, code, key)=>{
    const response = await fetch(baseURL + code + key)
    console.log(response);
    try {
        const data = await response.json();
        APItemperature = data.main.temp;
        return APItemperature
    }
    catch(error) {
        console.log('Error : ', error);
    }
}

// Async POST
const postData = async (url = '', data = {}) => {
    const postRequest = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await postRequest.json();
        return newData;
    }
    catch (error) {
        console.log('Error : ', error);
    }
}

// Update user interface
const updateUI = async () => {
    const request = await fetch('http://localhost:8000/all');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = 'Date: ' +allData.date;
        document.getElementById('temp').innerHTML = 'Temperature: ' +allData.temperature;
        document.getElementById('content').innerHTML = 'Feelings: ' +allData.user_response;
    }
    catch (error) {
        console.log('error', error);
    }
}