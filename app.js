const mongoose = require("mongoose");
const express = require("express");
const { router } = require("./routers/root.router");
require('dotenv').config();
const AuthRequired = require("./middleware/auth.middleware.js");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static("public"));
app.use(express.json());

app.use((_req, res, next) => {
    res.append('Access-Control-Allow-Origin', '*');
    res.append('Access-Control-Allow-Headers', '*');
    res.append('Access-Control-Allow-Methods', ['POST', 'GET', 'PUT']);
    next();
});

app.models = {
    Form: require("./models/Form").model,
    Staff: require("./models/Staff").model,
    Youth: require("./models/Youth").model,
    Event: require("./models/Event").model,
}

app.use("/api", router); // to enable auth, add AuthRequired as second parameter

app.listen(PORT, () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MONGODB, () => {
        console.log(`Server starting @ PORT ${PORT}`);
    });
});
