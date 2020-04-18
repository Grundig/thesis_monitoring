let labels = [];
let n, node, frame;

const tempCanv = document.getElementById('tempChart').getContext('2d');
const humidCanv = document.getElementById('humidChart').getContext('2d');
const lumiCanv = document.getElementById('lumiChart').getContext('2d');

const tempChart = new Chart(tempCanv, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Node 0',
            borderColor: 'rgb(255, 99, 132)',
            data: [],
            fill: false
        },{
            label: 'Node 1',
            borderColor: 'rgb(132,120,255)',
            data: [],
            fill: false
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Temperature'
        }
    }
});

const humidChart = new Chart(humidCanv, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Node 0',
            borderColor: 'rgb(255, 99, 132)',
            data: [],
            fill: false
        },{
            label: 'Node 1',
            borderColor: 'rgb(132,120,255)',
            data: [],
            fill: false
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Humidity'
        }}
});

const lumiChart = new Chart(lumiCanv, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Node 0',
            borderColor: 'rgb(255, 99, 132)',
            data: [],
            fill: false
        },{
            label: 'Node 1',
            borderColor: 'rgb(132,120,255)',
            data: [],
            fill: false
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Luminosity'
        }}
});

setInterval(function () {
    getData();
}, 900000); //get data every 15 minutes


function getData(){
    $.getJSON("data/message.json", function(d) {
        frame = d; //The newest data frame
        plotting(); //Call the plotting function inside to avoid unexpected behaviour due to race time conditions
        }
    );
}

function getDate() {
    const date = new Date(Date.now());
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    if (day < 10){
        day = "0" + day;
    }

    if (month < 10){
        month = "0" + month;
    }

    if (hour < 10){
        hour = "0" + hour;
    }

    if (minute < 10){
        minute = "0" + minute;
    }

    if (second < 10){
        second = "0" + second;
    }

    return  day + "-" + month + " " + hour + ":" + minute + ":" + second;
}

function plotting(){
    const node_id = frame.dev_id;
    const dateLabel = getDate();
    labels.push(dateLabel); // add the newest date/time to the x-axis labels

    const data = frame.payload_fields;
    const temperature = parseInt([data.Temperature]);
    const humidity = parseInt([data.Humidity]);
    const luminosity = parseInt([data.Luminosity]);


    n = parseInt(node_id.charAt(node_id.length - 1));
    tempChart.data.datasets[n].data.push(temperature);
    humidChart.data.datasets[n].data.push(humidity);
    lumiChart.data.datasets[n].data.push(luminosity);

    if (labels.length >= 192) {
        labels.shift(); //removes the first element from all the graphs.
    }                   //192 is the amount of 15 minute intervals within 48 hours

    tempChart.update();
    humidChart.update();
    lumiChart.update();
}
