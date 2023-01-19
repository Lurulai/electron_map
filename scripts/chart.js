var curr_date = new Date();
// Generate number from 1 to 24, skip 2.
let labels = [];

let curr_hour = curr_date.getHours();
// Generate x-axis labels for the chart.
// for (let i = curr_hour-2; i <= curr_hour+6; i++) {
//     num = i.toString();
//     while (num.length < 2) num = "0" + num;
//     labels.push(num + ":00");
// } 
// Generate x-axis labels for the chart for previous 2 hours and next 6 hours from current time.
for (let i = curr_hour-2; i <= curr_hour+6; i++) {
    num = (i < 0 ? 24+i : i).toString();
    while (num.length < 2) num = "0" + num;
    labels.push(num + ":00");
}

// The data for the chart, including the labels.
let temp_data = {
    labels: labels,
    datasets: []
};

// The data for the chart, including the labels.
let press_data = {
    labels: labels,
    datasets: []
};

// The data for the chart, including the labels.
let humid_data = {
    labels: labels,
    datasets: []
};

// The data for the chart, including the labels.
let light_data = {
    labels: labels,
    datasets: []
};

// The data for the chart, including the labels.
let band_data = {
    labels: labels,
    datasets: []
};

// The data for the chart, including the labels.
let spread_data = {
    labels: labels,
    datasets: []
};

// The data for the chart, including the labels.
let freq_data = {
    labels: labels,
    datasets: []
};

// The data for the chart, including the labels.
let rssi_data = {
    labels: labels,
    datasets: []
};

// The data for the chart, including the labels.
let snr_data = {
    labels: labels,
    datasets: []
};

// This is the blocks that create the legend for our graphs.
// <block:plugin:0>
const getOrCreateLegendList = (chart, id) => {
    const legendContainer = document.getElementById(id);
    let listContainer = legendContainer.querySelector('ul');
  
    if (!listContainer) {
      listContainer = document.createElement('ul');
      listContainer.style.display = 'flex';
      listContainer.style.flexDirection = 'row';
      listContainer.style.margin = 0;
      listContainer.style.padding = 0;
      listContainer.style.flexWrap = 'wrap';
      listContainer.style.justifyContent = 'space-evenly';
  
      legendContainer.appendChild(listContainer);
    }
  
    return listContainer;
  };
  
  const htmlLegendPlugin = {
    id: 'htmlLegend',
    afterUpdate(chart, args, options) {
      const ul = getOrCreateLegendList(chart, options.containerID);
  
      // Remove old legend items
      while (ul.firstChild) {
        ul.firstChild.remove();
      }
  
      // Reuse the built-in legendItems generator
      const items = chart.options.plugins.legend.labels.generateLabels(chart);
  
      items.forEach(item => {
        const li = document.createElement('li');
        li.style.alignItems = 'left';
        li.style.cursor = 'pointer';
        li.style.display = 'flex';
        li.style.flexDirection = 'row';
        li.style.marginLeft = '10px';
        li.style.padding = '4px';
  
        // Color box
        const boxSpan = document.createElement('span');
        boxSpan.style.background = item.fillStyle;
        boxSpan.style.borderColor = item.strokeStyle;
        boxSpan.style.borderWidth = item.lineWidth + 'px';
        boxSpan.style.display = 'inline-block';
        boxSpan.style.height = '20px';
        boxSpan.style.marginRight = '10px';
        boxSpan.style.width = '20px';
  
        // Text
        const textContainer = document.createElement('p');
        textContainer.style.color = item.fontColor;
        textContainer.style.margin = 0;
        textContainer.style.padding = 0;
        textContainer.style.textDecoration = item.hidden ? 'line-through' : '';
  
        const text = document.createTextNode(item.text);
        textContainer.appendChild(text);
  
        li.appendChild(boxSpan);
        li.appendChild(textContainer);
        ul.appendChild(li);
      });
    }
  };
  // </block:plugin>
  // End of blocks that create the legend for our graphs.

let t_chart = createChart('temperature_chart', 'line', temp_data, 'TEMPERATURE', '\u00B0C');
let p_chart = createChart('pressure_chart', 'line', press_data, 'PRESSURE', 'hPa');
let h_chart = createChart('humidity_chart', 'line', humid_data, 'HUMIDITY', '%');
let l_chart = createChart('light_chart', 'line', light_data, 'LIGHT', '%');

// Back Page
let b_chart = createChart('band_chart', 'line', band_data, 'BANDWIDTH', 'mbps');
let s_chart = createChart('spread_chart', 'line', spread_data, 'SPREAD', 'db');
let f_chart = createChart('freq_chart', 'line', freq_data, 'FREQUENCY', 'MHz');
let r_chart = createChart('rssi_chart', 'line', rssi_data, 'RSSI', 'dbm');
let snr_chart = createChart('snr_chart', 'line', snr_data, 'SNR', 'db');

// This function creates a chart and returns it.
function createChart(chart_id, chart_type, data, title, unit) {
    const chart_el = document.getElementById(chart_id);
    return new Chart(chart_el, {
      type: chart_type,
      data: data,
      options: {
          responsive: true,
          maintainAspectRatio: false,
          tension: 0.3,
          interaction: {
              intersect: false,
              mode: 'index',
            },
          plugins: {
                  tooltip: {
                      callbacks: {
                          title: function(context) {
                              return "Time: " + context[0].label;
                          },

                          label: function(context) {
                              return context.dataset.label + ": " + context.parsed.y + ' ' + unit;
                          }
                      }
                  },
                  legend: {
                      display: false
                  },
                  title: {
                      display: true,
                      text: title
                  },
                  htmlLegend: {
                      containerID: 'legend'
                  }
              },
          scales: {
          y: {
            beginAtZero: true
          }
        }
      },
      plugins: [htmlLegendPlugin]
    });
}
