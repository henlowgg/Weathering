// need to insert the api key then call the api, had to set up account with openweathermap for unique key
var key = '1ebad6dcbb596d8ab5b95e33edfb6d7c';
var getCityForecast = async(city) => {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=imperial&appid=1ebad6dcbb596d8ab5b95e33edfb6d7c"
    await fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayWeather(data, city);
            console.log(data);
        });
    });
};