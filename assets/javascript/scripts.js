let key = "a9af494297ce4884afaeb94856474568"
let cardBody = $(".card-title")

let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=orlando&appid=" + key;

$(".btn").on("click", function () {
    let desiredCity = $(this).siblings(".searchCity").val();
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + desiredCity + "&appid=" + key)
        .then((data) => data.json())
        .then(async (data) => {
            const test2 = await getForecast(data[0].lat, data[0].lon)
            console.log(test2)
            setForecast(test2)
            // console.log(test2.list)
        })
});

async function getForecast(lat, lon) {
    let test = await fetch("http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + key)
        .then((res) => res.json())
        return test
}

function setForecast(test3) {
    cardBody.each(function(idx) {
        // console.log($(this).siblings())
        // console.log(test3.list[0].main.temp)
        let currentIdx = 5 + (idx * 8)
        
    //    $(this).val(convert time);
       $(this).siblings(".temp").text("Temp: " +test3.list[currentIdx].main.temp);
       $(this).siblings(".wind").text("Wind: " +test3.list[currentIdx].wind.speed);
       $(this).siblings(".humidity").text("Humidity: " +test3.list[currentIdx].main.humidity);
    })
}



// api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}

// base geocoding link
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// base forecast link
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// append this to the created div for forecat later
{/* <div class="col-md-2 py-3 card text-white bg-primary">
    <div class="card-body p-1">
        <h5 class="card-title">Date</h5>
        <img src="https://openweathermap.org/img/wn/` + data.list[i].weather[0].icon + `.png" alt="rain"/>
        <p class="card-text">Temp:</p>
        <p class="card-text">Wind:</p>
        <p class="card-text">Humidity:</p>
    </div>
</div>  */}

// format it like this

// <div class="col-md-2 py-3 card text-white bg-primary">
//     <div class="card-body p-1">
//         <h5 class="card-title">` + dayjs(data.list[i].dt * 1000).format("MM/DD/YYYY") + `</h5>
//         <img src="https://openweathermap.org/img/wn/` + data.list[i].weather[0].icon + `.png" alt="rain"/>
//         <p class="card-text">Temp: ` + data.list[i].main.temp + `</p>
//         <p class="card-text">Humidity: ` + data.list[i].main.humidity + `</p>
//     </div>
// </div>