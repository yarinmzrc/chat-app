import { Server } from "socket.io";

const io = new Server(5000, {
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  if (id) {
    socket.join(id);
  }

  socket.on("send-message", ({ recipients, message }) => {
    recipients.forEach((recipient) => {
      const newRecipients = recipients.filter((r) => r !== recipient);
      newRecipients.push(id);
      socket.broadcast.to(recipient).emit("recieve-message", {
        recipients: newRecipients,
        id,
        message,
      });
    });
  });
});
