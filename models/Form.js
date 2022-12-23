const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Form = new Schema({
    date: {type: Date},
})

module.exports = {
    model: mongoose.models.Form || mongoose.model("Form", Form),
    schema: Form,
}