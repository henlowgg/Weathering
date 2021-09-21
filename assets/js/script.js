// need to insert the api key then call the api, had to set up account with openweathermap for unique key but keep getting token warnings now?
var key = '1ebad6dcbb596d8ab5b95e33edfb6d7c';
var getCityForecast = async(city) => {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=imperial&appid=1ebad6dcbb596d8ab5b95e33edfb6d7c";
    await fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayWeather(data, city);
            console.log(data);
        });
    });
};

var listGroup = document.querySelector("#today-listgroup");
var citySearch = document.querySelector("#searched-city");
var forecastTitle = document.querySelector("#forecast");
var cityForm = document.querySelector("#form");
var cityInput = document.querySelector("#city");

var displayWeather = function(weather, searchCity){
    listGroup.textContent= "";  
    citySearch.textContent=searchCity;

var todayDate = document.createElement("span")
   todayDate.textContent=" (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
   citySearch.appendChild(todayDate);

// throw in a div for how humid it is
var humidityEl = document.createElement("span");
    humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
    humidityEl.classList = "list-group-item"

// main div for wind speeds
var windSpeedEl = document.createElement("span");
    windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " mph";
    windSpeedEl.classList = "list-group-item"

// how hot is it out today???
var temperatureEl = document.createElement("span");
    temperatureEl.textContent = "Temperature: " + (Math.round(weather.main.temp))+ " °F";
    temperatureEl.classList = "list-group-item"

var uvEL = document.createElement("span");
    uvEL.textContent = "UV Index: " + weather.main.uvi;
    uvEL.classList = "list-group-item"

   
   listGroup.appendChild(temperatureEl);
   listGroup.appendChild(humidityEl);
   listGroup.appendChild(windSpeedEl);
   listGroup.appendChild(uvEL);
}

var fiveDayForcast = async(city) =>{
// call it again for the actual forecast for the next 5 days
    var apiURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ city +"&units=imperial&appid=1ebad6dcbb596d8ab5b95e33edfb6d7c";
     
    await fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
           display5Day(data);
        });
    });
};

// listing out the actual 5 day forecast 
var display5Day = async(weather) =>{
    var forecastContainerEl = document.querySelector("#fiveday-container");
    forecastContainerEl.textContent = ""
    forecastTitle.textContent = "5-Day Forecast:";

    var forecast = weather.list;
        for(var i=5; i < forecast.length; i=i+8){
       var dailyForecast = forecast[i];
        
    var forecastEl=document.createElement("div");
       forecastEl.classList = "card bg-primary text-light m-2";

    var forecastDate = document.createElement("h5")
       forecastDate.textContent= moment.unix(dailyForecast.dt).format("MMM D, YYYY");
       forecastDate.classList = "card-header text-center"
       forecastEl.appendChild(forecastDate);
       
    var forecastTempEl=document.createElement("span");
       forecastTempEl.classList = "card-body text-center";
       forecastTempEl.textContent = "Temp: "+ (Math.round(dailyForecast.main.temp)) + " °F";
       forecastEl.appendChild(forecastTempEl);

    var forecastHumEl=document.createElement("span");
       forecastHumEl.classList = "card-body text-center";
       forecastHumEl.textContent ="Humidity: "+ dailyForecast.main.humidity + "  %";

    forecastEl.appendChild(forecastHumEl);
    forecastContainerEl.appendChild(forecastEl);
    }

}

var searchHistoryBtn = document.querySelector("#past-search-buttons");
var pastSearch = function(pastSearch){
    citySearchHistory = document.createElement("button");
    citySearchHistory.textContent = pastSearch;
    citySearchHistory.classList = "d-flex w-100 btn-dark border p-2";
    citySearchHistory.setAttribute("data-city", pastSearch);
    citySearchHistory.setAttribute("type", "submit");
    searchHistoryBtn.prepend(citySearchHistory);
}

cityForm.addEventListener('submit', e => {
    e.preventDefault();    
    //on click button is acting up sometimes
    //city value
    const city = cityForm.city.value.trim();
    if(city){
        getCityForecast(city);
        fiveDayForcast(city);
        cityInput.value = "";
    } else{
        alert("Please enter a City");
    }
    pastSearch(city);
    cityForm.reset();
    console.log(city);

});

  searchHistoryBtn.addEventListener('click',  e => {
    var city = e.target.getAttribute("data-city")
    if(city){
        getCityForecast(city);
        fiveDayForcast(city);
    }
    // tossed in a search history button 
});