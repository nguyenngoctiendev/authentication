const express = require("express");
const cors = require("cors");
const userRoute = require("./Router/UserRoute");
const jwtRoute = require("./Router/jwtRoute");
const DbConfig = require("./module/DbConfig");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
DbConfig.connectToDb();
app.use("/jwt/admin", userRoute);
app.use("/api/jwt", jwtRoute)

app.listen(3000, () => {
    console.log("the server is running on port 3000")
})