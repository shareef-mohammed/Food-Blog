require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const dbConfig = require("./config/dbConfig");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");

app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// app.use(cors());
app.use(logger("dev"));

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter");
const postRouter = require("./routes/postRouter");
const chatRouter = require('./routes/chatRouter')
const messageRouter = require('./routes/messageRouter')

app.use("/", userRouter);
app.use("/auth", require("./routes/authRouter"));
app.use("/admin", adminRouter);
app.use("/", postRouter);
app.use("/chat", chatRouter)
app.use('/message', messageRouter)

dbConfig();
app.listen(process.env.PORT, () => {
  console.log("Listening to the server !!!");
});
