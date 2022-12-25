const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Youth = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, index: {unique: true}},
    fireID:  { type: String, required: true, index: {unique: true}},
    programs: { type: [String] },
    active: { type: Boolean, default: false },
    attended_events: { type: [String], default: []} // by event _id
})

module.exports = {
    model: mongoose.models.Youth || mongoose.model("Youth", Youth),
    schema: Youth,
}