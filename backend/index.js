const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: ["http://127.0.0.1:4200", "http://de6156222ffe.eu.ngrok.io"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", require("./api"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
