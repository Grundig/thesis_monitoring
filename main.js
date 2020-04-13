let TESTER = document.getElementById('tester');

Plotly.newPlot( TESTER, [{
y: [1, 2, 4, 8, 16] }], {
margin: { t: 0 } } );

let message_count = 0;
setInterval(function () {
    getData()
    // Plotly.extendTraces(TESTER,{ y:[[getData()]]}, [0]);
    // message_count++;
    //
    // if (message_count > 100){
    //     Plotly.releyout(TESTER, {
    //         xaxis:{
    //             range: [message_count-100, message_count]
    //         }
    //     })
    // }
}, 3000);

function getData(){
    $.getJSON("data/message.json", function (data) {
        console.log(data);
    });
}