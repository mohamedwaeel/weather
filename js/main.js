let mainCard = document.querySelector("#card1");
let secCard = document.querySelector("#card2");
let thirdCard = document.querySelector("#card3");
let currentDate = new Date();
let day = currentDate.getDate();
let month = currentDate.getMonth();
let year = currentDate.getFullYear();
let dayOfWeek = currentDate.getDay();
let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let dayName = daysOfWeek[dayOfWeek];
let day2 = daysOfWeek[(dayOfWeek + 1) % 7];
let day3 = daysOfWeek[(dayOfWeek + 2) % 7];
let monthNumber = currentDate.getMonth();
let monthNames = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];
let monthName = monthNames[monthNumber];




async function CurrentWeather(res) {
  let blackBox = "";
  blackBox += `<div class="header-custom-light card-header d-flex justify-content-between">
                <div class="day">${dayName}</div>
                <div class="date">${day}${monthName}</div>
              </div>
              <div class="body-custom-light card-body ">
                <h5 class="card-title ">${res.location.name}</h5>
                <div class="card-text">
                    <!-- degree div -->
                    <div class="degree d-flex justify-content-between ">
                        <h1>${res.current.temp_c}<sub class="sub-top">o</sub>C</h1>
                        <img src="${res.current.condition.icon}" alt="weather icon">
                    </div>
                    <p class="weatherCondition ">${res.current.condition.text}</p>
                    <span class="px-2"><img src="images/icon-umberella@2x.png" alt=""> ${res.forecast.forecastday[0].day.daily_chance_of_rain}% </span>
                    <span class="px-2"><img src="images/icon-wind@2x.png" alt=""> ${res.current.wind_kph}km/h </span>
                    <span class="px-2"><img src="images/icon-compass@2x.png" alt=""> ${res.current.wind_dir} </span>
                </div>
              </div>`;

  mainCard.innerHTML = blackBox;
}
async function secondWeather(res) {
  let blackBox = "";
  blackBox += `  <div class="header-custom-dark card-header d-flex justify-content-center">
            <div class="day">${day2}</div>
          </div>
          <div class="body-custom-dark card-body text-center ">
             <div class="cardImg">
            <img src="${res.forecast.forecastday[1].day.condition.icon}" alt="">
          </div>
          <div class="degreeAfter">
            <h4>${res.forecast.forecastday[1].day.maxtemp_c}<sub class="sub-top">o</sub>C</h4>
          </div>
          <small>${res.forecast.forecastday[1].day.mintemp_c}<sub class="sub-top">o</sub></small>
          <p class="weatherCondition">${res.forecast.forecastday[1].day.condition.text}</p>
          </div>
          `
  secCard.innerHTML = blackBox;
}

async function thirdWeather(res) {
  let blackBox = "";
  blackBox += `  <div class="header-custom-light card-header d-flex justify-content-center">
                <div class="day">${day3}</div>
              </div>
              <div class="body-custom-light2 card-body text-center  ">
    
                 <div class="cardImg">
                <img src="${res.forecast.forecastday[2].day.condition.icon}" alt="">
              </div>
              <div class="degreeAfter">
                <h4>${res.forecast.forecastday[2].day.maxtemp_c}<sub class="sub-top">o</sub>C</h4>
              </div>
              <small>${res.forecast.forecastday[2].day.mintemp_c}<sub class="sub-top">o</sub></small>
              <p class="weatherCondition">${res.forecast.forecastday[2].day.condition.text}</p>
              </div>`
  thirdCard.innerHTML = blackBox;

}




fetchProcess()
async function fetchProcess(x) {

  let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=bdb8207a8b9c41beb24175721232812&q=${x ? x : "egypt"}&days=3&aqi=no&alerts=no`)
  let res = await data.json();

  await CurrentWeather(res);
  await secondWeather(res);
  await thirdWeather(res);

};

let searchBtn = document.getElementById("searchBtn").addEventListener('click', () => {
  let country = document.getElementById("countrySearch").value;
  fetchProcess(country);
});
let input = document.getElementById("countrySearch").addEventListener('input', () => {
  let country = document.getElementById("countrySearch").value;
  
  fetchProcess(country);
})