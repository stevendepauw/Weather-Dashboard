let key = "a9af494297ce4884afaeb94856474568"

let apiUrl ="https://api.openweathermap.org/data/2.5/weather?q=orlando&appid=" +key;
    
function test() {
    fetch(apiUrl)
        .then(function(data) {
            data.json())
        } 
        .then((data) => console.log(data))
}

test();

// let desiredCityWeather = () => {
//     let apiUrl ="http://api.openweathermap.org/geo/1.0/direct?q=" +desiredCity + "&appid=" +key;
//     fetch(apiUrl)
//         .then((response) => {

//         })
// }


//works all the way down to the second console.log

// $(".btn").on("click", function () {
//     let desiredCity = $(this).siblings(".searchCity").val();
//     fetch("http://api.openweathermap.org/geo/1.0/direct?q=" +desiredCity + "&appid=" +key)
//         .then((data) => data.json())
//          .then((data) => console.log(data[0].lon))
//          .then((data) => console.log(data[0].lat))
// });

// base geocoding link
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// base forecast link
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// // append this to the created div for forecat later
// <div class="col-md-2 py-3 card text-white bg-primary">
//     <div class="card-body p-1">
//         <h5 class="card-title">Date</h5>
//         <img src="https://openweathermap.org/img/wn/` + data.list[i].weather[0].icon + `.png" alt="rain"/>
//         <p class="card-text">Temp:</p>
//         <p class="card-text">Wind:</p>
//         <p class="card-text">Humidity:</p>
//     </div>
// </div>

// format it like this

// <div class="col-md-2 py-3 card text-white bg-primary">
//     <div class="card-body p-1">
//         <h5 class="card-title">` + dayjs(data.list[i].dt * 1000).format("MM/DD/YYYY") + `</h5>
//         <img src="https://openweathermap.org/img/wn/` + data.list[i].weather[0].icon + `.png" alt="rain"/>
//         <p class="card-text">Temp: ` + data.list[i].main.temp + `</p>
//         <p class="card-text">Humidity: ` + data.list[i].main.humidity + `</p>
//     </div>
// </div>