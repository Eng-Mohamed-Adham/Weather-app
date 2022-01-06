const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p ");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");




//App data
const weather = {};

weather.temperature = {
    unit:"celsius",

}
// App Consts and vars
const kelven =273;
// App Key
const key = "1c38756a19e288ba8c253c99363fd590";

// Check if browser supports geolocation
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPostion,showError);

}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser Doesn't Support Geolocation";
}

// Set User's Location

function setPostion(position){
    let latitude =position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude,longitude);

}
//  Show Error When there is an issue with deolocation service

function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>${error.message}</p>`;
}

// Get Weather From Api Provder
function getWeather(latitude,longitude){
    let api =  `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
    .then((response) => {
        let data = response.json();
        return data;
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - kelven);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;

    })
    .then(function(){
        displayWeather();
    })

}


// Display Weather to ui 
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}॰<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}



// C To F conversion
function celsiusToFahrnheit(temperature){
    return (temperature * 9/5) + 32;
}

//  When the user clicks no the temperture element 
tempElement.addEventListener("click",function(){
    if(weather.temperature.value === undefined)return;

    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrnheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        tempElement.innerHTML = `${fahrenheit}<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}॰<span>C</span>`;
        weather.temperature.unit = "celsius";
    }
});
