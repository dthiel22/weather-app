const citySearch = document.querySelector('#searchInput')
const searchButton = document.querySelector('#searchBtn')
const cityHistoryEl = document.querySelector('#cityHistory')
const cityEl = document.querySelector('#city')
const currentDateEl = document.querySelector('#currentDate')
const currentIconEl = document.querySelector('#currentIcon')
const currentTempEL = document.querySelector('#currentTemp')
const currentWindEl = document.querySelector('#currentWind')
const currentHumidEl = document.querySelector('#currentHumid')
const forcast = document.querySelector('#forcast')


function fetchLatLon () {
    if (citySearch.value === ""){
        return alert('must have city name')
    }else
        forcast.innerText = ""
        window.location.reload();
        storeCity(citySearch.value)
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${citySearch.value}&limit=1&appid=7231a1783add28c302dd0ac7d0c01197`
        )
        // citySearch.reset()
        .then((response) => response.json())
        .then((data => fetchCityWeather(data[0].lat,data[0].lon)))
}

function fetchCityWeather (lat,lon) {
    fetch5Day = () => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=7231a1783add28c302dd0ac7d0c01197&units=imperial`
        )
        .then((response) => response.json())
        // .then((data => createForcast(data.list[2].dt_txt,data.list[2].main.temp,data.list[2].wind.speed,data.list[2].main.humidity)))
        .then((data=>createForcast(data.list)))
    }
    fetchCurrentWeather = () => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7231a1783add28c302dd0ac7d0c01197&units=imperial`)
        .then((response) => response.json())
        .then((data => createCurrent(data)))
    }
    fetch5Day()
    fetchCurrentWeather()
}

function createCurrent(data) {
    // console.log(data)
    cityEl.innerText = 'City Selected: '+data.name
    currentDateEl.innerText = 'Date and Time: '+new Date()

    currentIconEl.innerText = ""
    var iconCreateEl = document.createElement("img");
    iconCreateEl.className = "w-fit border-2 bg-white";
    imageUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    iconCreateEl.setAttribute("src", imageUrl);
    currentIconEl.appendChild(iconCreateEl);

    currentTempEL.innerText = 'Temperature: '+data.main.temp
    currentWindEl.innerText = 'Wind Speed: '+data.wind.speed+'mph'
    currentHumidEl.innerText = 'Humidity: '+data.main.humidity+''
}

function createForcast(data){
    for (let i = 2; i <= 34; i+=8) {
        var div = document.createElement("div");
        div.className = "w-1/5 border-y-4 border-x-2 border-black bg-white";
    
        var dateCreateEl = document.createElement("h1");
        dateCreateEl.className = "";
        dateCreateEl.innerText = "Date: "+data[i].dt_txt;
        div.appendChild(dateCreateEl);
    
        var tempCreateEl = document.createElement("h1");
        tempCreateEl.className = "";
        tempCreateEl.innerText = "Temp: "+data[i].main.temp+"°F";
        div.appendChild(tempCreateEl);
    
        var iconCreateEl = document.createElement("img");
        iconCreateEl.className = "w-fit";
        imageUrl = `https://openweathermap.org/img/wn/${data[i].weather[0].icon}@2x.png`
        iconCreateEl.setAttribute("src", imageUrl);
        div.appendChild(iconCreateEl);

        var windCreateEl = document.createElement("h1");
        windCreateEl.className = "";
        windCreateEl.innerText = "Wind: " +data[i].wind.speed+"mph";
        div.appendChild(windCreateEl);
    
        var humidityCreateEl = document.createElement("h1");
        humidityCreateEl.className = "";
        humidityCreateEl.innerText = "Humidity: "+data[i].main.humidity;
        div.appendChild(humidityCreateEl);
        
        forcast.appendChild(div)
    }
}

function storeCity (city) {
    let citiesSearched = getSearchedCities()
    if (citiesSearched.indexOf(city) == -1){
        citiesSearched.unshift(city)
    }
    localStorage.setItem("cityHistory", JSON.stringify(citiesSearched));
}

function getSearchedCities(){
    let cityHistory = JSON.parse(localStorage.getItem("cityHistory"));
    return cityHistory ? cityHistory : [];  
} 

function loadCityHistory(){
    cityHistoryEl.innerText=""
    let cityHistory = JSON.parse(localStorage.getItem("cityHistory"));
    if (cityHistory=== null){
        return console.log('nothing in local storage!')
    }else
    for (let i = 0; i < cityHistory.length; i++) {
        var city = document.createElement("button");
        city.className = "historyBtn border border-black m-2 p-2 bg-white";
        city.innerText = cityHistory[i];
        cityHistoryEl.appendChild(city);
    }
}

searchButton.addEventListener("click",fetchLatLon);

loadCityHistory();


//TODO: city history search
const historyButtonsEl = document.querySelectorAll('.historyBtn');

function fetchHistoryCity (city) {
    forcast.innerText = ""
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=7231a1783add28c302dd0ac7d0c01197`)
    .then((response) => response.json())
    .then((data => fetchCityWeather(data[0].lat,data[0].lon)))
}

for ( i=0; i < historyButtonsEl.length; i++) {
    historyButtonsEl[i].innerText
    historyButtonsEl[i].addEventListener('click', function onClick(e) 
    {fetchHistoryCity(e.target.innerText)
    console.log('clicked on '+e.target.innerText)});
}