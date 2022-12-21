let key = "a9af494297ce4884afaeb94856474568"
let cardBody = $(".card-title")

let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=orlando&appid=" + key;

//onclick function for the search button to start 
$(".btn").on("click", function () {
    let desiredCity = $(this).siblings(".searchCity").val();
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + desiredCity + "&appid=" + key)
        .then((data) => data.json())
        .then(async (data) => {
            const coords = await getForecast(data[0].lat, data[0].lon)
            // console.log(coords)
            setForecast(coords)
            // console.log(coords.list)
            const daily = await getCurrent(data[0].lat, data[0].lon)
            // .then(() => setCurrent(daily))
            console.log(daily)
        })
});

//api fetch to get the coordinates for the entered city and get the current weather information
async function getCurrent(lat, lon) {
    let currentWeather = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + key)
        .then((res) => res.json())
    return currentWeather
}

//uses information from the get current function to set the values for the current day and weather conditions
// function setCurrent(currentData) {
//     let test = document.getElementById("daily-date")
//     console.log(test)
//     alert("hi")
//     // document.getElementById("daily-date").textContent(dayjs.unix(currentData.main.temp));
//     // document.getElementById("#daily-temp").textContent();
//     // document.getElementById("#daily-wind").textContent();
//     // document.getElementById("#daily-hum").textContent();
// }

//api fetch to convert the entered city name into latitude and longitude coordinates to provide the 5 day weather forecast
async function getForecast(lat, lon) {
    let getFiveDay = await fetch("http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + key)
        .then((res) => res.json())
    return getFiveDay
}

//use information pulled from the getForecast function to set the values of the 5 divs set up for the 5 day weather forecast
function setForecast(fiveDayData) {
    cardBody.each(function (idx) {
        let currentIdx = 5 + (idx * 8)

        $(this).text(dayjs.unix(fiveDayData.list[currentIdx].dt));
        $(this).siblings(".temp").text("Temp: " + fiveDayData.list[currentIdx].main.temp);
        $(this).siblings(".wind").text("Wind: " + fiveDayData.list[currentIdx].wind.speed);
        $(this).siblings(".humidity").text("Humidity: " + fiveDayData.list[currentIdx].main.humidity);
    })
}


//base api call links

//base current weather link
// api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}

// base geocoding link
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// base forecast link
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
