let message_count = [0,0];
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
            label: 'Node 0 Temperature',
            borderColor: 'rgb(255, 99, 132)',
            data: [],
            fill: false
        },{
            label: 'Node 1 Temperature',
            borderColor: 'rgb(132,120,255)',
            data: [],
            fill: false
        }]
    },
    options: {}
});

const humidChart = new Chart(humidCanv, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Node 0 Humidity',
            borderColor: 'rgb(255, 99, 132)',
            data: [],
            fill: false
        },{
            label: 'Node 1 Humidity',
            borderColor: 'rgb(132,120,255)',
            data: [],
            fill: false
        }]
    },
    options: {}
});

const lumiChart = new Chart(lumiCanv, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Node 0 Luminosity',
            borderColor: 'rgb(255, 99, 132)',
            data: [],
            fill: false
        },{
            label: 'Node 1 Luminosity',
            borderColor: 'rgb(132,120,255)',
            data: [],
            fill: false
        }]
    },
    options: {}
});

setInterval(function () {
    getData();
}, 3000);


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
    message_count[n]++;

    tempChart.data.datasets[n].data.push(temperature);
    humidChart.data.datasets[n].data.push(humidity);
    lumiChart.data.datasets[n].data.push(luminosity);

    console.log(tempChart.data.datasets[n].data.length)

    tempChart.update();
    humidChart.update();
    lumiChart.update();

    if (message_count > 100){
        // Plotly.releyout(node_number, {
        //     xaxis:{
        //         range: [message_count-100, message_count]
        //     }
        // })
    }
}
