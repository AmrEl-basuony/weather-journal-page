/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?id=';
const key = '779e4b58ea0317e919553d94aae43020';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', perform);

function perform(e){
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getTemp(baseURL, zip, key)
    .then(function (APItemperature){
        // Add data to POST request
        postData('http://localhost:8000/addWeatherData', {temperature: APItemperature, date: newDate, user_response: feelings } )
        // Function which updates UI
        .then(function() {
            update()
        })
    })
}

// Async GET
const getTemp = async (baseURL, zip, key)=>{
    const res = await fetch(baseURL + zip +'&appid='+ key)
    try {
        const data = await res.json();
        APItemperature = data.main.temp;
        return APItemperature
    }
    catch(error) {
        console.log('Error : ', error);
    }
}

// Async POST
const postData = async (url = '', data = {}) => {
    const postReq = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const freshData = await postReq.json();
        return freshData;
    }
    catch (error) {
        console.log('Error : ', error);
    }
}

// Update user interface
const update = async () => {
    const req = await fetch('http://localhost:8000/all');
    try {
        const data = await req.json();
        document.getElementById('date').innerHTML = 'Date: ' +data.date;
        document.getElementById('temp').innerHTML = 'Temperature: ' +data.temperature;
        document.getElementById('content').innerHTML = 'Feelings: ' +data.user_response;
    }
    catch (error) {
        console.log('Error : ', error);
    }
}