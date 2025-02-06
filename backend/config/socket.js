const socketIo = require("socket.io");

exports.initializeSocket = (server) => {
  return socketIo(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
    },
  });
};
