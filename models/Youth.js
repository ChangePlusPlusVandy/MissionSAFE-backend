const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Youth = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, index: {unique: true}},
    ssn: { type: String, required: true},
    fireID:  { type: String, required: true, index: {unique: true}},
    programs: { type: [String] },
    active: { type: Boolean, default: false },
    attached_forms: { type: [String], default: []}, // by Form._id
    attended_events: { type: [String], default: []}, // by Event.code
})

module.exports = {
    model: mongoose.models.Youth || mongoose.model("Youth", Youth),
    schema: Youth,
}