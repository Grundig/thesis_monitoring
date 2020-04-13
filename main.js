let TESTER = document.getElementById('tester');

Plotly.newPlot( TESTER, [{
y: [1, 2, 4, 8, 16] }], {
margin: { t: 0 } } );

let message_count = 0;
setInterval(function () {
    Plotly.extendTraces(TESTER,{ y:[[getData()]]}, [0]);
    message_count++;

    if (message_count > 100){
        Plotly.releyout(TESTER, {
            xaxis:{
                range: [message_count-100, message_count]
            }
        })
    }
}, 300000);


// Create a client instance
const client = new Paho.Client("eu.thethings.network", Number(1883),"","clientId");

// set callback handlers
client.onMessageArrived = onMessageArrived;

function onConnect(){
    console.log("1");
    client.subscribe("engindividualprojectapplication/devices/dragino_node_0/down");
    client.subscribe("engindividualprojectapplication/devices/dragino_node_1/down");
}

function onFail(){
    console.log(0);
}

// connect the client
client.connect({
    userName: "engindividualprojectapplication",
    password: "87F0CF36B644BA7BEAAC901EA62CEF8E",
    onSuccess: onConnect,
    onFailure: onFail,
    // useSSL: true
    });


// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
}