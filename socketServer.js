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
        // socket.on("incoming", (room, data)=>{
        // 	socket.to(room).emit("outgoing", {data: data});
        // });

        const onMessage = (sensorId, message) => {
            var metrics = JSON.parse(message).metrics;
            for (let i = 0; i < metrics.length; i++) {
                let room = `${sensorId}_${metrics[i].metricId}`;
                socket.to(room).emit("outgoing", { data: { value: metrics[i].value } })
            }
        }

        client.getSensors().then((sensors) => {
            for (let i = 0; i < sensors.length; i++){
                client.getData(sensors[i].sensorId, onMessage);
            }
        });
    });
}