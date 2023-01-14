// Generate number from 1 to 24, skip 2.
let labels = [];

// Generate x-axis labels for the chart.
for (let i = 0; i < 24; i += 2) {
    num = i.toString();
    while (num.length < 2) num = "0" + num;
    labels.push(num + ":00");
} 

// The data for the chart, including the labels.
let data = {
    labels: labels,
    datasets: []
  };


const temperature_chart = document.getElementById('temperature_chart');

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


let chart = new Chart(temperature_chart, {
    type: 'line',
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
                            return context.dataset.label + ": " + context.parsed.y + ' \u00B0C';
                        }
                    }
                },
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'TEMPERATURE'
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


const data_chart = document.getElementById('data_chart');

let d_chart = new Chart(data_chart, {
  type: 'line',
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
                          return context.dataset.label + ": " + context.parsed.y + ' \u00B0C';
                      }
                  }
              },
              legend: {
                  display: false
              },
              title: {
                  display: true,
                  text: 'BANDWIDTH'
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


// TODO: Integrate function that will fetch data from the server.
// async function fetchData() {
//     // Will send a GET request to the server in the future.
//     const data = await fetch('data.json');

// }

