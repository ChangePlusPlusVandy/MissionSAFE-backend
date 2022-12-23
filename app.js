const mongoose = require("mongoose");
const express = require("express");
const { router } = require("./routers/root.router");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB = process.env.MONGODB || "mongodb+srv://alexbawa:Lv!.9Tjvf6Zhxc3@cluster0.mfrbcpa.mongodb.net/?retryWrites=true&w=majority";

app.use(express.static("public"));
app.use(express.json());

app.use((_req, res, next) => {
    res.append('Access-Control-Allow-Origin', '*');
    res.append('Access-Control-Allow-Headers', '*');
    res.append('Access-Control-Allow-Methods', '*');
    next();
});
    
app.models = {
    Form: require("./models/Form").model,
    Staff: require("./models/Staff").model,
    Youth: require("./models/Youth").model,
    Event: require("./models/Event").model,
}

app.use("/api", router);

app.listen(PORT, () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(MONGODB);
    console.log(`Server starting @ PORT ${PORT}`);
})