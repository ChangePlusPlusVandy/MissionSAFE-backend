const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Event = new Schema({
    code: { type: String, required: true},
    date: { type: Date, required: true}, 
    programs: { type: [String], required: true},
    staff: { type: [String], required: true}, // by Staff.fireID
    attended_youth: { type: [String], default: []}, // by Youth.fireID
    attached_forms: { type: [String], default: []}, // by Note._id
})

module.exports = {
    model: mongoose.models.Event || mongoose.model("Event", Event),
    schema: Event,
}
