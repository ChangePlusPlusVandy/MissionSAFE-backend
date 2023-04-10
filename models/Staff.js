const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Staff = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true},
    fireID:  { type: String, required: true},
    programs: { type: [String], default: []},
    active: { type: Boolean, default: false },
    counselor: { type: Boolean, default: false},
    admin: { type: Boolean, default: false},
})

module.exports = {
    model: mongoose.models.Staff || mongoose.model("Staff", Staff),
    schema: Staff,
};