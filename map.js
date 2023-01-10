const path = require('path')
let json = require('./data.json');

var corner1 = L.latLng(52.378, 6.549),
    corner2 = L.latLng(52.186, 7.058),
    bounds = L.latLngBounds(corner1, corner2);

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

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

for (let coord in json) {
    latlon = coord.split(',');
    addMarker(latlon[0], latlon[1]);
}

// L.marker([52.223, 6.868], {icon: unselectedIcon}).addTo(map)
//     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//     .openPopup()
//     .on('click', onMarkerClick);

function addMarker(lat, lng) {
    marker = L.marker([lat, lng], {icon: unselectedIcon})
    markers.push(marker)
    marker.addTo(map)
        .on('click', onMarkerClick);
}

function onMarkerClick(e) {
    if (document.getElementById("mySidebar").classList.contains("open")) {
        clickedMarker = e.latlng.lat+","+e.latlng.lng;
        if (e.target.getIcon() == selectedIcon) {
            // when unselected
            e.target.setIcon(unselectedIcon);
            // remove the dataset from the chart
            for (let i = 0; i < data.datasets.length; i++) {
                if (data.datasets[i].label == clickedMarker) {
                    data.datasets.splice(i, 1);
                    chart.update();
                    break;
                }
            }
        } else {
            // when selected
            e.target.setIcon(selectedIcon);
            // add the dataset to the chart
            let dataset = {
                label: clickedMarker,
                data: json[clickedMarker].temp,
                borderColor: json[clickedMarker].color,
                backgroundColor: json[clickedMarker].color
            }
            data.datasets.push(dataset);
            chart.update();
        }    
    }
    console.log(e.latlng.lat+","+e.latlng.lng);
}