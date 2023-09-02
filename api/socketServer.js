const http = require("http");
const { Server } = require("socket.io");
const messageService = require("./service/messageService")
const httpServer = http.createServer();
const io = new Server(httpServer, { cors: { origin: '*' } });

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
  
    socket.on("join_room", async(data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
      const history = await messageService.getByParam({key: "username", val: data})
      socket.to(data).emit(history)
    });
  
    socket.on("send_message", async(data) => {
      await messageService.create({ author: data.author, content: data.content })
      console.log("recieved message : " + data.content + " from : " + data.author);
      socket.to(data.room).emit("receive_message", data);
      console.log("sent message : " + data.content + " to : " + data.room);
    });

    socket.on("admin_conn", async() => {
        try {
            const messagesRes = await messageService.getMessagesGroupedByAuthor()
            if (messagesRes.length === 0 || !messagesRes) {
                socket.emit("admin_all_messages", { status: 404 })
                return
            }
            socket.emit("admin_all_messages", {body: messagesRes, status: 200})
        } catch (error) {
            console.log(error);
            socket.emit("admin_all_messages", {status: 500})
        }
    })
  
    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
      socket.disconnect()
    });
});

  httpServer.listen(process.env.SOCKET_PORT || 5001 , () => {
    console.log(`Socket server is running on Port: ${process.env.SOCKET_PORT}`);
  });