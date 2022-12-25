const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Staff = require("./Staff").schema;
const Youth = require("./Youth").schema;
const Form = require("./Form").schema;

let Event = new Schema({
    code: { type: String, required: true},
    date: { type: Date, required: true}, 
    programs: { type: [String], required: true},
    staff: { type: [String], required: true}, // by staff.fireID
    attended_youth: { type: [String], default: []}, // by youth.fireID
    attached_notes: { type: [Form], default: []},
})

module.exports = {
    model: mongoose.models.Event || mongoose.model("Event", Event),
    schema: Event,
}
