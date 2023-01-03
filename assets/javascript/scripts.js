$(function () {
    let key = "a9af494297ce4884afaeb94856474568"
    let cardBody = $(".card-title")

    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=orlando&appid=" + key;
    let searchPlaces = []

    // loads previous search history from local storage
    function reloadHistory() {
        let storedHistory = JSON.parse(localStorage.getItem("history"))
        let buttonList = $("#searchHistory")
        //need to insert value into the .text() from each searched place within the search history array from local storage
        if (storedHistory) {
            for (let i = 0; i < storedHistory.length; i++) {
                let historyItem = $("<button></button>").text(storedHistory[i]);

                historyItem.addClass("btn saveBtn historyCity btn-secondary btn-outline-warning mb-1");
                buttonList.append(historyItem);
            }
        }
    }

    //api fetch to get the coordinates for the entered city and get the current weather information
    async function getCurrent(lat, lon) {
        let currentWeather = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + key)
            .then((res) => res.json())
        return currentWeather
    }

    //uses information from the get current function to set the values for the current day and weather conditions
    function setCurrent(currentData) {
        let test = $("#daily-date")

        test.text(dayjs.unix(currentData.dt).format('MM/DD/YY'));
        test.siblings("#daily-temp").text("Temp: " + currentData.main.temp);
        test.siblings("#daily-wind").text("Wind speed: " + currentData.wind.speed);
        test.siblings("#daily-hum").text("Humidity: " + currentData.main.humidity);
    }

    //api fetch to convert the entered city name into latitude and longitude coordinates to provide the 5 day weather forecast
    async function getForecast(lat, lon) {
        let getFiveDay = await fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + key)
            .then((res) => res.json())
        return getFiveDay
    }

    //use information pulled from the getForecast function to set the values of the 5 divs set up for the 5 day weather forecast
    function setForecast(fiveDayData) {
        cardBody.each(function (idx) {
            let currentIdx = 5 + (idx * 8)

            $(this).text(dayjs.unix(fiveDayData.list[currentIdx].dt).format('MM/DD/YY'));
            $(this).siblings(".temp").text("Temp: " + fiveDayData.list[currentIdx].main.temp);
            $(this).siblings(".wind").text("Wind speed: " + fiveDayData.list[currentIdx].wind.speed);
            $(this).siblings(".humidity").text("Humidity: " + fiveDayData.list[currentIdx].main.humidity);
        })
    }

    //adds new button with previous searched city to be reused
    function historyButtons(input) {
        console.log(searchPlaces);

        let buttonList = $("#searchHistory")
        let historyItem = $("<button></button>").text(input);

        historyItem.addClass("btn saveBtn historyCity btn-secondary btn-outline-warning mb-1");
        buttonList.append(historyItem);
    }

    //onclick function for the search button to start 
    $("#newSearch").on("click", function () {
        let desiredCity = $(this).siblings(".searchCity").val();
        if (searchPlaces.indexOf(desiredCity) === -1 && desiredCity !== "") {
            searchPlaces.push(desiredCity);

            historyButtons(desiredCity);

            fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + desiredCity + "&appid=" + key)
                .then((data) => data.json())
                .then(async (data) => {
                    const coords = await getForecast(data[0].lat, data[0].lon)
                    setForecast(coords)

                    const daily = await getCurrent(data[0].lat, data[0].lon)
                    setCurrent(daily)
                })

            localStorage.setItem("history", JSON.stringify(searchPlaces))
        }
    });

    //onclick function for the search history buttons to search
    $("#searchHistory").on("click", ".historyCity", function () {
        let desiredCity = $(this).text();

        fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + desiredCity + "&appid=" + key)
            .then((data) => data.json())
            .then(async (data) => {
                const coords = await getForecast(data[0].lat, data[0].lon)

                setForecast(coords)

                const daily = await getCurrent(data[0].lat, data[0].lon)
                setCurrent(daily)
            })
    });

    reloadHistory();
});

//base api call links

//base current weather link
// api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}

// base geocoding link
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// base forecast link
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
