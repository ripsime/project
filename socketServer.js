const socketIo = require("socket.io");

const Client = require("C:\\dev\\project\\api\\modules\\client.js");
const client = new Client();

module.exports.initSockets = function (server) {
    const io = socketIo(server);

    client.connect();

    io.on("connection", socket => {
        socket.on("join", (room) => {
            socket.join(room);
        });

        socket.on('subscribe', (sensorId) => {
            client.subscribe(sensorId, (message) => {
                var messageObject = JSON.parse(message);
                var metrics = messageObject.metrics;

                for (let i = 0; i < metrics.length; i++) {
                    let room = `${sensorId}_${metrics[i].metricId}`;
                    socket.to(room).emit("publish", { data: { value: metrics[i].value, timestamp: messageObject.timestamp } })
                }
            })
        });
    });
}