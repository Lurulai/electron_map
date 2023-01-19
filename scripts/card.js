//DATE AND TIME//
//Converted into days, months, hours, day-name, AM/PM
function updateFrontPage(sensor) {
    var dt = new Date()
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"]

    document.getElementById("city").innerHTML = sensors[sensor].sensor.source_id;
    document.getElementById("day").innerHTML = days[dt.getDay()];
    document.getElementById("date").innerHTML = months[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear();
    // document.getElementById("time").innerHTML = (dt.getHours()>12?(dt.getHours()-12):dt.getHours()).toString() + ":" + ((dt.getMinutes() < 10 ? '0' : '').toString() + dt.getMinutes().toString()) + (dt.getHours() < 12 ? ' AM' : ' PM').toString();
    document.getElementById("time").innerHTML = ((dt.getHours() < 10 ? '0' : '').toString() + dt.getHours().toString()) + ":" + ((dt.getMinutes() < 10 ? '0' : '').toString() + dt.getMinutes().toString());

    updateWeatherIcon(api_data[sensor].daily.weathercode[0]);

    document.getElementById("temperature").innerHTML = parseFloat(sensors[sensor].weather_current.temperature_current).toFixed(1);

    document.getElementById("humidity").innerHTML = parseFloat(sensors[sensor].weather_current.humidity_current).toFixed(1) + "%";
    document.getElementById("pressure").innerHTML = parseInt(sensors[sensor].weather_current.pressure_current) + " hPa";
    document.getElementById("ambient-light").innerHTML = parseFloat(sensors[sensor].weather_current.light_current).toFixed(1) + "%";

    var sunrise_dt = new Date(api_data[sensor].daily.sunrise[0] * 1000);
    document.getElementById("sunrise-time").innerHTML = ((sunrise_dt.getHours() < 10 ? '0' : '').toString() + sunrise_dt.getHours().toString()) + ":" + ((sunrise_dt.getMinutes() < 10 ? '0' : '').toString() + sunrise_dt.getMinutes().toString());

    var sunset_dt = new Date(api_data[sensor].daily.sunset[0] * 1000);
    document.getElementById("sunset-time").innerHTML = ((sunset_dt.getHours() < 10 ? '0' : '').toString() + sunset_dt.getHours().toString()) + ":" + ((sunset_dt.getMinutes() < 10 ? '0' : '').toString() + sunset_dt.getMinutes().toString());
}

function updateWeatherIcon(weather) {
// Update the weather icon based on the weather status within the JSON.
    switch (weather) {
        case 0: // Clear
            document.getElementById("weather-icon").src = "https://myleschuahiock.files.wordpress.com/2016/02/sunny2.png";
            document.getElementById("weather-status").innerHTML = "Clear";
          break;
        case 1: // Clouds
        case 2:
        case 3:
            document.getElementById("weather-icon").src = "https://myleschuahiock.files.wordpress.com/2016/02/cloudy.png";
            document.getElementById("weather-status").innerHTML = "Cloudy";
            break;
        case 95: // Thunderstorm
        case 96:
        case 99:
            document.getElementById("weather-icon").src = "https://myleschuahiock.files.wordpress.com/2016/02/thunderstorm.png";
            document.getElementById("weather-status").innerHTML = "Thunderstorm";
            break;
        case 51: // Drizzle
        case 53:
        case 55:
        case 56:
        case 57:
            document.getElementById("weather-icon").src = "https://myleschuahiock.files.wordpress.com/2016/02/drizzle.png";
            document.getElementById("weather-status").innerHTML = "Drizzle";
            break;
        case 61: // Rain & Freezing Rain
        case 63:
        case 65:
        case 66:
        case 67:
        case 80:
        case 81:
        case 82:
            document.getElementById("weather-icon").src = "https://myleschuahiock.files.wordpress.com/2016/02/rain.png";
            document.getElementById("weather-status").innerHTML = "Rain";
            break;
        case 71: // Snow
        case 73:
        case 75:
        case 77:
        case 85:
        case 86:
            document.getElementById("weather-icon").src = "https://myleschuahiock.files.wordpress.com/2016/02/snow.png";
            document.getElementById("weather-status").innerHTML = "Snow";
            break;
        case 45: // Fog
        case 48:
            document.getElementById("weather-icon").src = "https://myleschuahiock.files.wordpress.com/2016/02/cloudy.png";
            document.getElementById("weather-status").innerHTML = "Fog";
            break;
      }
}


function updateBackPage(sensor) {
    // document.getElementById("high-temp-day-1").innerHTML = api_data[sensor].daily.temperature_2m_max[0];
    // document.getElementById("low-temp-day-1").innerHTML = api_data[sensor].daily.temperature_2m_min[0];

    for (let i = 1; i < 7; i++) {
        var dt = new Date(api_data[sensor].daily.time[i] * 1000);
        document.getElementById("day-" + i).innerHTML = dt.getDate()+"/"+( dt.getMonth() >= 10 ? (dt.getMonth()+1).toString() : "0"+(dt.getMonth()+1).toString());
        updateForecastIcons("icon-day-" + i, api_data[sensor].daily.weathercode[i]);
        document.getElementById("high-temp-day-" + i).innerHTML = api_data[sensor].daily.temperature_2m_max[i];
        document.getElementById("low-temp-day-" + i).innerHTML = api_data[sensor].daily.temperature_2m_min[i];
    }

    document.getElementById("bandwidth").innerHTML = sensors[sensor].sensor.bandwidth;
    document.getElementById("battery-voltage").innerHTML = sensors[sensor].sensor.battery_voltage;
    document.getElementById("coding-rate").innerHTML = sensors[sensor].sensor.coding_rate;
    document.getElementById("frequency").innerHTML = sensors[sensor].sensor.frequency;

    document.getElementById("bandwidth").innerHTML = sensors[sensor].sensor.bandwidth;
    
    // console.log(document.getElementById("signal-image"))
    document.getElementById("signal-strength").innerHTML = "<img id='signal-img' src="+signalStrengthImage(parseInt(sensors[sensor].sensor.rssi))+" alt='no-signal' />";
    // convert RSSI to dBm
    // document.getElementById("signal-strength").innerHTML = (sensors[sensor].sensor.rssi - 157).toString() + " dBm";/
    document.getElementById("snr").innerHTML = sensors[sensor].sensor.snr;
    document.getElementById("spreading-factor").innerHTML = sensors[sensor].sensor.spreading_factor;
}

function updateForecastIcons(element_id, weather) {
    switch (weather) {
        case 0: // Clear
            document.getElementById(element_id).innerHTML = "<i class='wi wi-day-sunny'></i>";
          break;
        case 1: // Clouds
        case 2:
        case 3:
            document.getElementById(element_id).innerHTML = "<i class='wi wi-cloudy'></i>";
            break;
        case 95: // Thunderstorm
        case 96:
        case 99:
            document.getElementById(element_id).innerHTML = "<i class='wi wi-thunderstorm'></i>";
            break;
        case 51: // Drizzle
        case 53:
        case 55:
        case 56:
        case 57:
            document.getElementById(element_id).innerHTML = "<i class='wi wi-sprinkle'></i>";
            break;
        case 61: // Rain & Freezing Rain
        case 63:
        case 65:
        case 66:
        case 67:
        case 80:
        case 81:
        case 82:
            document.getElementById(element_id).innerHTML = "<i class='wi wi-rain'></i>";
            break;
        case 71: // Snow
        case 73:
        case 75:
        case 77:
        case 85:
        case 86:
            document.getElementById(element_id).innerHTML = "<i class='wi wi-snow'></i>";
            break;
        case 45: // Fog
        case 48:
            document.getElementById(element_id).innerHTML = "<i class='wi wi-fog'></i>";
            break;
      }
}

function signalStrengthImage(signal) {
    // alert t
    if (signal <= -90) {
        return './imgs/connect-1bar.png';
    } else if (signal <= -60 && signal > -90) {
        return './imgs/connect-2bar.png';
    } else if (signal > -60) {
        return './imgs/connect-3bar.png';
    }
    return './imgs/connect-none.png';
}

//   //GEOLOCATION and WEATHER API//
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//       var myLatitude = parseFloat(Math.round(position.coords.latitude * 100) / 100).toFixed(2);
//       var myLongitude = parseFloat(Math.round(position.coords.longitude * 100) / 100).toFixed(2);
//       //var utcTime = Math.round(new Date().getTime()/1000.0);

//       // $('.geo').html(position.coords.latitude + " " + position.coords.longitude);
//       $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + myLatitude + "&lon=" + myLongitude + "&id=524901&appid=ca8c2c7970a09dc296d9b3cfc4d06940", function(json) {
//         $('#city').html(json.name + ", " + json.sys.country);
//         $('#weather-status').html(json.weather[0].main + " / " + json.weather[0].description);
        
//         //WEATHER CONDITIONS FOUND HERE: http://openweathermap.org/weather-conditions
        // switch (json.weather[0].main) {
        //   case "Clouds":
        //     $('.weather-icon').attr("src","https://myleschuahiock.files.wordpress.com/2016/02/cloudy.png");
        //     break;
        //   case "Clear":
        //     $('.weather-icon').attr("src","https://myleschuahiock.files.wordpress.com/2016/02/sunny2.png");
        //     break;
        //   case "Thunderstorm":
        //      $('.weather-icon').attr("src","https://myleschuahiock.files.wordpress.com/2016/02/thunderstorm.png");
        //     break;
        //   case "Drizzle":
        //      $('.weather-icon').attr("src","https://myleschuahiock.files.wordpress.com/2016/02/drizzle.png");
        //     break;
        //   case "Rain":
        //      $('.weather-icon').attr("src","https://myleschuahiock.files.wordpress.com/2016/02/rain.png");
        //     break;
        //   case "Snow":
        //      $('.weather-icon').attr("src","https://myleschuahiock.files.wordpress.com/2016/02/snow.png");
        //     break;
        //   case "Extreme":
        //      $('.weather-icon').attr("src","https://myleschuahiock.files.wordpress.com/2016/02/warning.png");
        //     break;
        // }

//         temp = (json.main.temp -273);
//         $('#temperature').html(Math.round(temp));
//         $('.humidity').html(json.main.humidity + " %");
//         $('.pressure').html(json.main.pressure + " hPa");
//         var sunriseUTC = json.sys.sunrise * 1000;
//         var sunsetUTC = json.sys.sunset * 1000;
//         var sunriseDt = new Date(sunriseUTC);
//         var sunsetDt = new Date (sunsetUTC);
//         $('.sunrise-time').html((sunriseDt.getHours()>12?(sunriseDt.getHours()-12):sunriseDt.getHours()).toString() + ":" + ((sunriseDt.getMinutes() < 10 ? '0' : '').toString() + sunriseDt.getMinutes().toString()) + (sunriseDt.getHours() < 12 ? ' AM' : ' PM').toString());
//         $('.sunset-time').html((sunsetDt.getHours()>12?(sunsetDt.getHours()-12):sunsetDt.getHours()).toString() + ":" + ((sunsetDt.getMinutes() < 10 ? '0' : '').toString() + sunsetDt.getMinutes().toString()) + (sunsetDt.getHours() < 12 ? ' AM' : ' PM').toString());
//         // $('.sunrise-time').html(json.sys.sunrise);
//         // $('.sunset-time').html(json.sys.sunset);
//       });

//     });
//   } else {
//     $("#city").html("Please turn on Geolocator on Browser.")
//   }
// });