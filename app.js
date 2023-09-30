const express = require("express");
const app = express();
const path = require("path");
const userRoutes = require("./routes/user.js")
const adminRoutes = require("./routes/admin.js")

app.use(express.urlencoded({extended: false}));

app.set("view-engine", "ejs");

app.use(express.static("public"));

app.use(adminRoutes);  

app.use(userRoutes);

const port = 3000;
app.listen(port, () => {
    console.log("listening to " + port);
})

