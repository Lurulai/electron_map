const path = require('path')
var fs = require('fs');

let json = require('./content/data.json');

var tooltip_front = fs.readFileSync(path.join(__dirname, "pages", "tooltip_front.html"), 'utf8');
var tooltip_back = fs.readFileSync(path.join(__dirname, "pages", "tooltip_back.html"), 'utf8');

var corner1 = L.latLng(52.378, 6.549),
    corner2 = L.latLng(52.186, 7.058),
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


// Add the markers to the map through this function from the JSON data.
for (let coord in json) {
    latlon = coord.split(',');
    addMarker(latlon[0], latlon[1]);
}


function addMarker(lat, lng) {
    marker = L.marker([lat, lng], {icon: unselectedIcon})
    markers.push(marker)
    marker.addTo(map)
        .on('click', onMarkerClick);
}


function onMarkerClick(e) {
    clickedMarker = e.latlng.lat + "," + e.latlng.lng;

    if (document.getElementById("mySidebar").classList.contains("open")) {
        if (e.target.getIcon() == selectedIcon) {
// When a marker is unselected...
            e.target.setIcon(unselectedIcon);
// Remove the dataset from the chart(s).
            for (let i = 0; i < data.datasets.length; i++) {
                if (data.datasets[i].label == json[clickedMarker].zipcode) {
                    data.datasets.splice(i, 1);
                    chart.update();
                    break;
                }
            }
        } else {
// This check will still allow users to deselect pins.
            if (data.datasets.length == 4) {
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
            .setContent(json[clickedMarker].street + ", " + json[clickedMarker].zipcode)
            .addTo(map);
// Add the dataset to the chart(s).
            let dataset = {
                label: json[clickedMarker].zipcode,
                data: json[clickedMarker].temp,
                borderColor: json[clickedMarker].color,
                backgroundColor: json[clickedMarker].color
            }
            data.datasets.push(dataset);
            chart.update();
        }    
    } else {
// Tooltip that shows the address of the selected marker.
        var tp = L.popup({
            offset: [0, -20],
            closeButton: false
        })
        .setLatLng(e.latlng)
        .setContent(generateContent(clickedMarker))
        .addTo(map);
        var el = tp.getElement();
        el.style.pointerEvents = 'auto';
        el.addEventListener('click', tooltipClick);
    }
}


function generateContent(coords) {
    let content = ""
    content += "<html>"

    content += "<div id='flip-container'>"
    content += "<figure class='front'>"
    content += tooltip_front
    content += "</figure>"

    content += "<figure class='back'>"
    content += tooltip_back
    content += "</figure>"
    content += "</div>"

    return content;
}

function tooltipClick(e) {
    document.getElementById("flip-container").classList.toggle('flipped')
    // TODO: Populate the tooltip only when on-click to avoid any overload or lag.
}

function signalStrengthImage(signal) {
    console.log(signal)
    if (signal == 1) {
        return 'imgs/connect-1bar.png';
    } else if (signal == 2) {
        return 'imgs/connect-2bar.png';
    } else if (signal == 3) {
        return 'imgs/connect-3bar.png';
    }
    return 'imgs/connect-none.png';
}
