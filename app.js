const mongoose = require("mongoose");
const express = require("express");
const { router } = require("./routers/root.router");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static("public"));
app.use(express.json());

app.use((_req, res, next) => {
    res.append('Access-Control-Allow-Origin', '*');
    res.append('Access-Control-Allow-Headers', '*');
    res.append('Access-Control-Allow-Methods', '*');
    next();
});
    
app.models = {
    Form: require("./models/Form"),
    Staff: require("./models/Staff"),
    Youth: require("./models/Youth"),
    Event: require("./models/Event"),
}

app.use("/api", router);

app.listen(PORT, () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MONGODB);
    console.log(`Server starting @ PORT ${PORT}`);
})