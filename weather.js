
// Get the users' current latitude and longitude
// Use the OpenWeatherMap.org API to get the current weather at the user's location
// Update the widget's icon, temperature, and city name

function updateWeather(){
  getLocation();
  //alert('Congrats! You will now know the weather.');
}

function getLocation(){
   navigator.geolocation.getCurrentPosition(parsePosition)
}

function parsePosition(position){
  let latitude = position.coords.latitude
  let longitude = position.coords.longitude
  console.log("latitude:"+latitude+"," + " longitude:"+longitude)
  fetchWeather(latitude,longitude)
}

function fetchWeather(latitude,longitude){

  let openweathermap_api_url = 'https://api.openweathermap.org/data/2.5/weather?'
  // openweathermap_api_url = openweathermap_api_url + 'lat=' + latitude
  openweathermap_api_url += 'lat=' + latitude
  openweathermap_api_url += '&lon=' + longitude
  openweathermap_api_url +='&appid=4ce6f502d38ddae567bf1702b05e168c&units=imperial'
  //https://api.openweathermap.org/data/2.5/weather?lat=41.8781&lon=-87.6298&appid=4ce6f502d38ddae567bf1702b05e168c&units=imperial

  fetch(openweathermap_api_url)
    .then(convertToJSON)
    .then(updateWidget)
    .catch(displayError);
}

let displayError = function(error) {
    console.debug(error);
    window.alert("Sorry, something went wrong.");
  }

let convertToJSON = function(response) {
  return response.json();
}

function updateWidget(weatherData){
  let locationName = weatherData.name;
  let temperature = weatherData.main.temp;
  temperature = Math.round(temperature)
  let sentenceText = "It is " + temperature + " degrees outside."
  let sentenceEl = document.querySelector('.card-text');
  // querySelector parameters:
  // p - get the element "p"
  // .p - get the element with the class "p"
  // #p - get the element with id "p"
  sentenceEl.innerText = sentenceText
  let locationNameEl = document.querySelector('.card-title')
  locationNameEl.innerText = locationName
  console.log(sentenceEl);

  let picture = weatherData.weather[0].icon
  let pictureEl = document.querySelector('.card-img-top')
  pictureEl.src = "http://openweathermap.org/img/w/" + picture + ".png"

}



// var x = document.getElementById("demo");
//   function getLocation() {
//       if (weatherData.geolocation) {
//           navigator.geolocation.getCurrentPosition(showPosition);
//       } else {
//           x.innerHTML = "Geolocation is not supported by this browser.";
//       }


      // // You can use x.toFixed(n) to round a floating-point number
      // // where   x  is a floating-point number
      // //   and   n  is the number of digits after the decimal point


 //   function showPosition(position) {
 //       x.innerHTML = "Latitude: " + position.coords.latitude +
 //       "<br>Longitude: " + position.coords.longitude;
 //   }


//
// var getWeather = function(zipcode) {
//   var openweathermap_api_url = 'https://api.openweathermap.org/data/2.5/weather?zip=' + zipcode + ',us&appid=4ce6f502d38ddae567bf1702b05e168c&units=imperial'
//
//
//
//
//
//
//
//
//
// let link = document.getElementById("get_location")
// link.addEventListener("click", function(event) {
//   event.preventDefault();
//   navigator.geolocation.getCurrentPosition(handlePosition);
// });
//
// // HINT:
// // Weather icon example: http://openweathermap.org/img/w/10d.png
// // The very last part ('10d.png') can change based on the current conditions.
//
//
//
//
//
//
// let handlePosition = function(info) {
//   // Emitting to a console so you can read the code:
//   console.info(info)
//   let div = document.getElementById("location");
//   let url = "https://maps.googleapis.com/maps/api/staticmap?center=" + info.coords.latitude.toFixed(4) + "," + info.coords.longitude.toFixed(4) + "&zoom=15&size=600x400&maptype=hybrid&key=AIzaSyBrLfaqBHZNoiI8463XDdy57fJHiwA8vy4"
//   div.innerHTML = "<img src=\"" + url + "\">";
// };
//
// // Convert the movie service's raw response into JSON
// // (ie. a JavaScript object)
// let convertDataToJSON = function(response) {
//   return response.json();
