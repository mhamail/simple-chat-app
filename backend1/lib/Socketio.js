const socketIo = require("socket.io");

let ioInstance;

// function initializeSocket(server) {
ioInstance = socketIo(8000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
ioInstance.on("connection", (socket) => {
  console.log("Socket is connected");

  // Event listener for sending messages
  socket.on("sendMessage", (messageData) => {
    // Process the messageData and save it to the database if needed
    // Then broadcast the message to all connected clients
    ioInstance.emit("message", messageData);
  });

  // Event listener for disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
// }

function getIo() {
  return ioInstance;
}

module.exports = { getIo };
