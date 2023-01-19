map_button = document.getElementById('comparison');


map_button.addEventListener('click', (e) => {
// Add a class to the button. This is used to change the button's appearance.
    map_button.classList.add('button_active');
// change the image of the img tag under the button to the selected image
    if (document.getElementById('comp_img').src.includes('imgs/pin-selected.png')) {
// return the image to the unselected image
// comparison mode OFF (or unselect)
        document.getElementById('comp_img').src = 'imgs/pin.png';
        for (let marker of markers) {
// change the image of all the markers to the unselected image 
            marker.setIcon(unselectedIcon);
        }
// remove all the datasets from the chart
        temp_data.datasets = [];
        press_data.datasets = [];
        humid_data.datasets = [];
        light_data.datasets = [];
        band_data.datasets = [];
        spread_data.datasets = [];
        freq_data.datasets = [];
        rssi_data.datasets = [];
        snr_data.datasets = [];
// update the chart
        t_chart.update();
        p_chart.update();
        h_chart.update();
        l_chart.update();
        b_chart.update();
        s_chart.update();
        f_chart.update();
        r_chart.update();
        snr_chart.update();
    } else {    
// change the image to the selected image
// comparison mode ON (or select)
        document.getElementById('comp_img').src = 'imgs/pin-selected.png';
    }
// remove the hover effect
    map_button.classList.remove('button_shadow');
// remove the class from the button after 0.5 seconds
    window.setTimeout(function() {
        map_button.classList.remove('button_active');
        map_button.classList.add('button_shadow');
    }, 100);
});


// Controls when the sidebar opens and closes.
function OpenOrClose() {
    document.getElementById("mySidebar").classList.toggle("open");
    document.getElementById("mySidebar").classList.toggle("close");
    document.getElementById("map").classList.toggle("open");
// This is what gives a nice "scoot" animation to the left when the sidebar opens.
    window.setTimeout(function(){window.map.invalidateSize(true);}, 500);
}


// ------------------------------

datato_button = document.getElementById('to-data');

datato_button.addEventListener('click', WeatherToData);

function WeatherToData() {
    // Button press down.
    datato_button.classList.add('button_active');
    datato_button.classList.remove('button_shadow');

    if (document.getElementById('data-img').src.includes('imgs/weather.png')) {
// DATA MODE should be here.
        document.getElementById('data-img').src = 'imgs/data.png';
        document.getElementById('top_panel').style.display='none';
        document.getElementById('bottom_panel').style.display='block';
    } else {
// WEATHER MODE should be here.
        document.getElementById('data-img').src = 'imgs/weather.png';
        document.getElementById('top_panel').style.display='block';
        document.getElementById('bottom_panel').style.display='none';
    }

    // Button release - reset state.
        window.setTimeout(function() {
            datato_button.classList.remove('button_active');
            datato_button.classList.add('button_shadow');
        }, 100);
}