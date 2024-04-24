const express = require("express");
const dotenv = require("dotenv");

const databaseConnect = require("./config/database");

const bodyParser = require("body-parser");
const http = require("http");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
//socket
// const { initializeSocket } = require("./lib/Socketio");
require("./lib/Socketio");
dotenv.config({
  path: "config/config.env",
});

const app = express();
app.use(logger("dev"));
app.use(cors({}));
app.use(
  cookieParser(null, {
    // Set the SameSite attribute to "None" to allow cross-site requests
    sameSite: "None",
    // Set the Secure attribute to ensure cookies are only sent over HTTPS
  })
);
const server = http.createServer(app);
// initializeSocket(server); // Initialize Socket.IO
app.use(bodyParser.json());
app.use(cookieParser());

const authRouter = require("./routes/authRoute");
const messengerRoute = require("./routes/messengerRoute");

app.use("/api/messenger", authRouter);
app.use("/api/messenger", messengerRoute);

const PORT = process.env.PORT || 5000;
// app.get('/', (req, res)=>{

//      res.send('This is from backend Sever')
// })

databaseConnect();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
