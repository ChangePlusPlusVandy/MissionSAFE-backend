const Staff = require("../models/Staff").model;
const Event = require("../models/Event").model;

const getAllStaff = async () => {
    try {
        const allStaff = await Staff.find({});
        if(!allStaff) throw new Error("No staff found");
        return allStaff;
    } catch (err) {
        throw err;
    }
}

const getStaffByID = async (fireID) => {
    try {
        const staff = await Staff.findOne({fireID: fireID});
        if(!staff) throw new Error("Staff not found");
        return staff;
    } catch (err) {
        throw err;
    }
}

const updateStaff = async (fireID, update) => {
    try {
        const staff = await Staff.findOneAndUpdate({fireID: fireID}, update);
        if(!staff) throw new Error("Staff not found");
    } catch (err) {
        throw err;
    }
}

const createEvent = async (fireID) => {
    // create event, get eventID
}

module.exports = { 
    getAllStaff,
    getStaffByID,
    updateStaff,
}