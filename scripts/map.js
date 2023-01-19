const path = require('path')
var fs = require('fs');

var tooltip_front = fs.readFileSync(path.join(__dirname, "pages", "tooltip_front.html"), 'utf8');
var tooltip_back = fs.readFileSync(path.join(__dirname, "pages", "tooltip_back.html"), 'utf8');

var corner1 = L.latLng(52.512, 6.092),
    corner2 = L.latLng(51.962, 7.623),
    bounds = L.latLngBounds(corner1, corner2);


// Array of markers to keep track of them.
var markers = [];


var map = L.map('map', {
    center: [52.223, 6.868],
    zoom: 14,
    zoomControl: false,
    doubleClickZoom: false,
    maxBounds: bounds,
    maxBoundsViscosity: 1.0,
    maxZoom: 17,
    minZoom: 11,
    attributionControl: false
});


var unselectedIcon = L.icon({
    iconUrl: path.join(__dirname, 'imgs', 'pin.png'),
    iconSize: [38, 38]
});


var selectedIcon = L.icon({
    iconUrl: path.join(__dirname, 'imgs', 'pin-selected.png'),
    iconSize: [38, 38]
});


// Add the OpenStreetMap tile layer to the map.
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// Loop through the dictionary of sensors and add markers to the map.
for (let sensor in sensors) {
    lat = sensors[sensor].location.latitude_longitude[0];
    lon = sensors[sensor].location.latitude_longitude[1];
    addMarker(lat, lon);
}


function addMarker(lat, lng) {
    marker = L.marker([lat, lng], {icon: unselectedIcon})
    markers.push(marker)
    marker.addTo(map)
        .on('click', onMarkerClick);
}


function onMarkerClick(e) {
    let clickedMarkerLat = e.latlng.lat;
    let clickedMarkerLon = e.latlng.lng;
    let clickedMarker;

    for (let sensor in sensors) {
        lat = sensors[sensor].location.latitude_longitude[0];
        lon = sensors[sensor].location.latitude_longitude[1];
        if (lat == clickedMarkerLat && lon == clickedMarkerLon) {
            clickedMarker = sensor;
            break;
        }
    }

    if (document.getElementById("mySidebar").classList.contains("open")) {
        if (e.target.getIcon() == selectedIcon) {
// When a marker is unselected...
            e.target.setIcon(unselectedIcon);
// Remove the dataset from the chart(s).
            for (let i = 0; i < temp_data.datasets.length; i++) {
                if (temp_data.datasets[i].label == sensors[clickedMarker].sensor.source_id) {
                    temp_data.datasets.splice(i, 1);
                    press_data.datasets.splice(i, 1);
                    humid_data.datasets.splice(i, 1);
                    light_data.datasets.splice(i, 1);
                    t_chart.update();
                    p_chart.update();
                    h_chart.update();
                    l_chart.update();

                    band_data.datasets.splice(i, 1);
                    spread_data.datasets.splice(i, 1);
                    freq_data.datasets.splice(i, 1);
                    rssi_data.datasets.splice(i, 1);
                    snr_data.datasets.splice(i, 1);
                    b_chart.update();
                    s_chart.update();
                    f_chart.update();
                    r_chart.update();
                    snr_chart.update();
                    break;
                }
            }
        } else {
// This check will still allow users to deselect pins.
            if (temp_data.datasets.length == 4) {
                alert("You can only compare two locations at a time. Please deselect one of the locations.");
                return;
            }
// When a marker is selected...
            e.target.setIcon(selectedIcon);
// Tooltip that shows the address of the selected marker.
            var tp = L.tooltip({
                direction: 'top',
                offset: [0, -20]
            })
            .setLatLng(e.latlng)
            .setContent(sensors[clickedMarker].sensor.source_id)
            .addTo(map);

// Add the dataset to the chart(s).
            setTempDataset(clickedMarker);
            setPressureDataset(clickedMarker);
            setHumidityDataset(clickedMarker);
            setLightDataset(clickedMarker);

            setBandwidthDataset(clickedMarker);
            setSpreadingFactorDataset(clickedMarker);
            setFrequencyDataset(clickedMarker);
            setRSSIDataset(clickedMarker);
            setSNRDataset(clickedMarker);
        }    
    } else {
// Tooltip that shows the address of the selected marker.
        var tp = L.popup({
            offset: [0, -20],
            closeButton: false
        })
        .setLatLng(e.latlng)
        .setContent(generateContent())
        .addTo(map);
        var el = tp.getElement();
        el.style.pointerEvents = 'auto';
        el.addEventListener('click', tooltipClick);

        updateFrontPage(clickedMarker);
        updateBackPage(clickedMarker);
        tp._updated = true;
    }
}


function generateContent() {
    return "<html>"
    + "<div id='flip-container'>"
    + "<figure class='front'>"
    + tooltip_front
    + "</figure>"

    + "<figure class='back'>"
    + tooltip_back
    + "</figure>" 
    + "</div>";
}

function tooltipClick(e) {
    document.getElementById("flip-container").classList.toggle('flipped')
}

function setTempDataset(sensor) {
    let temperatureInformation = Array.from(sensors[sensor].weather_past.temperature_past_2);
    temperatureInformation.push(sensors[sensor].weather_current.temperature_current);

    let curr_hour = new Date().getHours();
    for (let i = curr_hour+1; i < curr_hour+7; i++) {
        temperatureInformation.push(api_data[sensor].hourly.temperature_2m[i]);
    }
    temperatureInformation = temperatureInformation.map(Number);

    let dataset = {
        label: sensors[sensor].sensor.source_id,
        data: temperatureInformation,
        borderColor: sensors[sensor].color,
        backgroundColor: sensors[sensor].color
    }
    temp_data.datasets.push(dataset);
    t_chart.update();
}

function setPressureDataset(sensor) {
    let pressureInformation = Array.from(sensors[sensor].weather_past.pressure_past_2);
    pressureInformation.push(sensors[sensor].weather_current.pressure_current);

    let curr_hour = new Date().getHours();
    for (let i = curr_hour+1; i < curr_hour+7; i++) {
        pressureInformation.push(api_data[sensor].hourly.surface_pressure[i]);
    }
    pressureInformation = pressureInformation.map(Number);

    let dataset = {
        label: sensors[sensor].sensor.source_id,
        data: pressureInformation,
        borderColor: sensors[sensor].color,
        backgroundColor: sensors[sensor].color
    }
    press_data.datasets.push(dataset);
    p_chart.update();
}

function setHumidityDataset(sensor) {
    let humidityInformation = Array.from(sensors[sensor].weather_past.humidity_past_2);
    humidityInformation.push(sensors[sensor].weather_current.humidity_current);

    let curr_hour = new Date().getHours();
    for (let i = curr_hour+1; i < curr_hour+7; i++) {
        humidityInformation.push(api_data[sensor].hourly.relativehumidity_2m[i]);
    }
    humidityInformation = humidityInformation.map(Number);

    let dataset = {
        label: sensors[sensor].sensor.source_id,
        data: humidityInformation,
        borderColor: sensors[sensor].color,
        backgroundColor: sensors[sensor].color
    }
    humid_data.datasets.push(dataset);
    h_chart.update();
}

function setLightDataset(sensor) {
    let lightInformation = Array.from(sensors[sensor].weather_past.light_past_2);
    lightInformation.push(sensors[sensor].weather_current.light_current);
    lightInformation = lightInformation.map(Number);

    let dataset = {
        label: sensors[sensor].sensor.source_id,
        data: lightInformation,
        borderColor: sensors[sensor].color,
        backgroundColor: sensors[sensor].color
    }
    light_data.datasets.push(dataset);
    l_chart.update();
}

// Backside of the sidebar.

function setBandwidthDataset(sensor) {
    let bandwidthInformation = [];
    bandwidthInformation.push(sensors[sensor].sensor.bandwidth);
    bandwidthInformation = bandwidthInformation.map(Number);

    let dataset = {
        label: sensors[sensor].sensor.source_id,
        data: bandwidthInformation,
        borderColor: sensors[sensor].color,
        backgroundColor: sensors[sensor].color
    }
    band_data.datasets.push(dataset);
    b_chart.update();
}

function setSpreadingFactorDataset(sensor) {
    let spreadingFactorInformation = [];
    spreadingFactorInformation.push(sensors[sensor].sensor.spreading_factor);
    spreadingFactorInformation = spreadingFactorInformation.map(Number);

    let dataset = {
        label: sensors[sensor].sensor.source_id,
        data: spreadingFactorInformation,
        borderColor: sensors[sensor].color,
        backgroundColor: sensors[sensor].color
    }
    spread_data.datasets.push(dataset);
    s_chart.update();
}

function setFrequencyDataset(sensor) {
    let frequencyInformation = [];
    frequencyInformation.push(sensors[sensor].sensor.frequency);
    frequencyInformation = frequencyInformation.map(Number);

    let dataset = {
        label: sensors[sensor].sensor.source_id,
        data: frequencyInformation,
        borderColor: sensors[sensor].color,
        backgroundColor: sensors[sensor].color
    }
    freq_data.datasets.push(dataset);
    f_chart.update();
}

function setRSSIDataset(sensor) {
    let rssiInformation = [];
    rssiInformation.push(sensors[sensor].sensor.rssi);
    rssiInformation = rssiInformation.map(Number);

    let dataset = {
        label: sensors[sensor].sensor.source_id,
        data: rssiInformation,
        borderColor: sensors[sensor].color,
        backgroundColor: sensors[sensor].color
    }
    rssi_data.datasets.push(dataset);
    r_chart.update();
}

function setSNRDataset(sensor) {
    let snrInformation = [];
    snrInformation.push(sensors[sensor].sensor.snr);
    snrInformation = snrInformation.map(Number);

    let dataset = {
        label: sensors[sensor].sensor.source_id,
        data: snrInformation,
        borderColor: sensors[sensor].color,
        backgroundColor: sensors[sensor].color
    }
    snr_data.datasets.push(dataset);
    snr_chart.update();
}