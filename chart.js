// Generate number from 1 to 24 skip 2
let labels = [];
for (let i = 0; i < 24; i += 2) {
    num = i.toString();
    while (num.length < 2) num = "0" + num;
    labels.push(num + ":00");
} 
let data = {
    labels: labels,
    datasets: []
  };

const temperature_chart = document.getElementById('temperature_chart');

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
            }
        },
        scales: {
        y: {
          beginAtZero: true
        }
      }
    }
});


// async function fetchData() {
//     // Will send a GET request to the server in the future.
//     const data = await fetch('data.json');

// }