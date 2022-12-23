const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Staff = require("./Staff").schema;
const Youth = require("./Youth").schema;
const Form = require("./Form").schema;

let Event = new Schema({
    date: { type: Date, required: true}, 
    programs: { type: [String], required: true},
    staff: { type: [Staff], required: true},
    invited_youth: { type: [Youth], required: true},
    attended_youth: { type: [Youth], required: false},
    attached_notes: { type: [Form], required: false},
})

module.exports = {
    model: mongoose.models.Event || mongoose.model("Event", Event),
    schema: Event,
}
