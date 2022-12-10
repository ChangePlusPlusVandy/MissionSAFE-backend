const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Form = new Schema({

})

module.exports = mongoose.models.Form || mongoose.model("Form", Form);