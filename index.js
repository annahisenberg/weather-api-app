$(document).ready(function () {

  let latitude;
  let longitude;
  let response;
  let result;



  function checkLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successFunction);
    } else {
      alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
    }
  }

  function successFunction(position) {
    latitude = Number(position.coords.latitude);
    longitude = Number(position.coords.longitude);
    console.log('Your latitude is :' + latitude + ' and longitude is ' + longitude);

    $(apiCall);
  }

  function apiCall() {
    // https://fcc-weather-api.glitch.me/api/current?lat=40.6574469&lon=-73.9577848
    let api = `https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`;
    $.getJSON(api)
      .done(function (resp) {
        response = resp;
        $(displayWeather);
      });

  }



  function displayWeather() {
    $('#display-weather').append(`<p>${response.name}, ${response.sys.country}</p><p><span class="temperature">${response.main.temp}</span> <span class="cels-fahr"><a href="#">℃</a></span></p> <p>${response.weather[0].description}</p><i>${response.weather[0].icon}</i>`);

    $(toggleTemp);
  }

  function toggleTemp() {
    result = $('.temperature').text()

    $('p').on('click', '.cels-fahr', function () {
      result = $('.temperature').text()

      var temp = $('.cels-fahr').text();

      console.log($('.cels-fahr').text());
      console.log(result);

      if (temp === '℃') {
        result = (response.main.temp * 1.8) + 32;
        $('.temperature').text(result);
        $('.cels-fahr').replaceWith(`<span class="cels-fahr"><a href="#">℉</a></span>`);
      }
      if (temp === '℉') {
        result = (response.main.temp - 32) * (5 / 9);
        $('.temperature').text(result);
        $('.cels-fahr').replaceWith(`<span class="cels-fahr"><a href="#">℃</a></span>`);
      }

    });
  }



  function init() {
    $(checkLocation);
  }

  init();

});