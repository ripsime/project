const socketIo = require("socket.io");

module.exports.initSockets = function(server) {
    const io = socketIo(server);

    io.on("connection", socket => {
    	socket.on("join", (room)=>{
    		socket.join(room);
    	});
        socket.on("incoming", (room, data)=>{
        	socket.to(room).emit("outgoing", {data: data});
        });
    });
}