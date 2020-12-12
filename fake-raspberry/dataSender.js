let socket = require('socket.io-client')('http://localhost:3000');

setInterval(function () {
    let data = {
        value: Math.round(20 + 80 * Math.random())
    };
    socket.emit('join', 'sensor1_metric1');
    socket.emit('incoming', "sensor1_metric1", data);
}, 2000);

setInterval(function () {
    let data = {
        value: Math.round(20 + 80 * Math.random())
    };
    socket.emit('join', 'sensor2_metric2');
    socket.emit('incoming', "sensor2_metric2", data);
}, 5000);