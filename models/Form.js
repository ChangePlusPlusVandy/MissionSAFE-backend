const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Form = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    date: { type: Date, required: true },
    content: { type: String, required: true },
    programs: { type: [String], required: true },
    associated_youth_id: { type: String, default: null},
    associated_event_id: { type: String, default: null},
});

module.exports = {
    model: mongoose.models.Form || mongoose.model("Form", Form),
    schema: Form,
}