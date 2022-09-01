const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const wishlistRoute = require("./routes/wishlist")
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

//const { createServer } = require("http");
// const { Server } = require("socket.io");

//const httpServer = createServer(app);
// const io = new Server(httpServer, { cors: { origin: "*", credentials: true } });

// io.on("connection", (socket) => {
//   socket.on("display_user", (data) => {
//     console.log("User " + data + " is connected !" + socket.id);
//     addNewUser(data);
//   });
//   socket.on("disconnect_user", (data) => {
//     console.log("User " + data.id + " is disconnected !");
//     removeUser(socket.id);
//   });

//   socket.on("admin_conn", () => {
//     io.emit("admin_get", onlineUsers);
//   });
// });

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/wishlist",wishlistRoute)

// httpServer.listen(process.env.PORT || 5000, () => {
//   console.log(`Backend server is running on Port: ${process.env.PORT}`);
// });

/////////////////////////////////////////////////////////
// const express = require("express");
// const app = express();


const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

/*server.listen(3001, () => {
  console.log("SERVER RUNNING");
});*/

server.listen(process.env.PORT || 5000, () => {
  console.log(`Backend server is running on Port: ${process.env.PORT}`);
});
