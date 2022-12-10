// const mongoose = require("mongoose");
const express = require("express");
const {router} = require("./routers/root.router");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static("public"));
app.use(express.json());
    
/*app.models = {
    Form: require("./models/Form"),
    Staff: require("./models/Staff"),
    Youth: require("./models/Youth"),
}*/

app.use("/api", router);

app.listen(PORT, async () => {
    /*await mongoose.connect(conf.mongo)*/
    console.log(`Server starting @ PORT ${PORT}`);
})