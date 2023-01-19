var available_sensors = ["py-saxion", "py-wierden", "lht-wierden", "lht-saxion", "lht-gronau"];

// Make a dictionary of sensors
var sensors = {};
var api_data = {};

for (let sensor of available_sensors) {
    // create a new request object
    var request = new XMLHttpRequest();
    // set the request url
    // request.open('GET', 'http://192.168.1.157:5000/' + sensor, false);
    request.open('GET', 'http://34.141.179.166:8080/' + sensor, false);
    // set the callback function and handle exceptions
    request.onerror = function() {
        console.log("Error fetching data");
    };
    request.onload = function() {
        // check if the request is done
        if (request.readyState == 4 && request.status == 200) {
            // parse the json response
            var data = JSON.parse(request.responseText);
            // store the data in the sensors dictionary
            sensors[data.sensor.source_id] = data;

            if (sensor == "py-saxion" || sensor == "py-wierden") {
                sensors[sensor].location.latitude_longitude[0] = (parseFloat(sensors[sensor].location.latitude_longitude[0])+0.002).toString();
                sensors[sensor].location.latitude_longitude[1] = (parseFloat(sensors[sensor].location.latitude_longitude[1])+0.002).toString();
            }

            // create a new request object
            var api_request = new XMLHttpRequest();
            // set the request url
            api_request.open('GET', 'https://api.open-meteo.com/v1/forecast?latitude='+data.location.latitude_longitude[0]+'&longitude='+data.location.latitude_longitude[1]+'&hourly=temperature_2m,relativehumidity_2m,surface_pressure&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&timeformat=unixtime&timezone=auto', true);
            // set the callback function and handle exceptions
            api_request.onerror = function() {
                console.log("Error fetching data");
            }
            api_request.onload = function() {
                // check if the request is done
                if (api_request.readyState == 4 && api_request.status == 200) {
                    // parse the json response
                    var api_data_json = JSON.parse(api_request.responseText);
                    // store the data in the sensors dictionary
                    api_data[data.sensor.source_id] = api_data_json;
                }
            }
            api_request.send();
        }
    };
    request.send();
}

