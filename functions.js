map_button = document.getElementById('comparison');

map_button.addEventListener('click', (e) => {
// add a class to the button
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
        data.datasets = [];
        chart.update();
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


// map_button.addEventListener('mouseup', (e) => {
// // remove the class from the button
//     map_button.classList.remove('button_active');
//     map_button.classList.add('button_shadow');
// });


function OpenOrClose() {
    document.getElementById("mySidebar").classList.toggle("open");
    document.getElementById("map").classList.toggle("open");
    window.setTimeout(function(){window.map.invalidateSize(true);}, 500);
}
