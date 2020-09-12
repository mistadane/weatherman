const api = {
    key: "cab773fc6e0209c2dfea520ed1ecdaaa",
    base: "http://api.openweathermap.org/data/2.5/"
}




const searchbox = document.querySelector('.search-box');
const searchbutton = document.querySelector('.search-button');
searchbutton.addEventListener('click', setQuery);
searchbox.addEventListener('keypress', getQuery);

/*nextButton = document.querySelector('.next');
nextButton.addEventListener('click', next); */

const searchboxlocation = document.querySelector('.search-box-location');
const searchbuttonlocation = document.querySelector('.search-button-location');
searchbuttonlocation.addEventListener('click', weatherQuery);
searchboxlocation.addEventListener('keypress', locQuery); 

let error = document.querySelector('#error');
let errormessage = document.querySelector('#errormessage');


function weatherQuery() {
    if (searchboxlocation.value == "" ) {
        errormessage.innerHTML = `You must enter a city`;
        
    } else {   
        errormessage.innerHTML = ""; 
        getResults(searchboxlocation.value);
        console.log(searchboxlocation.value);
    }
}

function setQuery() { 
    if (searchbox.value == "" ) {
        error.innerHTML = `You must enter a city`;
        
    } else {
        
        getResults(searchbox.value);
        console.log(searchbox.value);

        document.querySelector('.homepage-container').style.display = "none"
        document.querySelector('#weather-condition').style.display = "block";
    }
}

function getQuery(e) {
    if (e.keyCode == 13) {
        getResults(searchbox.value);
        console.log(searchbox.value);

        document.querySelector('.homepage-container').style.display = "none"
        document.querySelector('#weather-condition').style.display = "block";
    }
}

function locQuery(e) {
    if (e.keyCode == 13) {
        getResults(searchboxlocation.value);
        console.log(searchboxlocation.value);
    }
}


function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults)
}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector('.city');
    let cityWhite = document.querySelector('.city-white')
    let country = document.querySelector('.country');
    let countryWhite = document.querySelector('.country-white');
    city.innerText = `${weather.name}, `;
    cityWhite.innerText = `${weather.name}, `;
    country.innerText = `${weather.sys.country}`;
    countryWhite.innerText = `${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.date');
    date.innerText = dateBuilder(now);

    let weatherEL = document.querySelector('.weather');
    weatherEL.innerText = `${weather.weather[0].main}`;

    let temp = document.querySelector('.temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`

    let locationicon = document.querySelector('.img-icon');
    locationicon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" style = width:2rem/>`;


}

function dateBuilder(d) {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];

    return `${day}, ${date} ${month}`
}

/*function next() {
    document.querySelector('#weather-condition').style.display = "none";
    document.querySelector('#weather-days-container').style.display = "block";
} */