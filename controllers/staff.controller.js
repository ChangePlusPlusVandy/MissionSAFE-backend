const Staff = require("../models/Staff").model;
const Event = require("../models/Event").model;
const codeCharacters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

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

const createEvent = async (fireID, options) => {
    const code = generateValidCode();
    const newEvent = new Event({
        code,
        date: new Date(),
        programs: options.programs,
        staff: [fireID],
    });

    try {
        const savedEvent = await newEvent.save();
        res.status(200).send(savedEvent);
    } catch (err) {
        res.status(500).send(err);
    }
}

const addStaffToEvent = async (fireID, eventCode) => {
    try {
        let event = await Event.findOne({code: eventCode});
        if(!event) throw new Error("Event not found");

        let staff = await Staff.findOne({fireID: fireID});
        if(!staff) throw new Error("Staff not found");

        event.staff.push(fireID);

        await event.save();
    } catch (err) {
        res.status(500).send(err);
    }
}

function generateRandomCode() {
    let newCode = "";
    for(let i = 0; i < 5; i++) {
        let index = Math.floor(Math.random() * 36);
        newCode += codeCharacters[index];
    }
    return newCode;
}

async function generateValidCode() {
    let workingCode = false;
    while(!workingCode) {
        let newCode = generateRandomCode();
        let matchResult = await Event.findOne({code: newCode});
        if(!matchResult) {
            return newCode;
        }
    }
}

module.exports = { 
    getAllStaff,
    getStaffByID,
    updateStaff,
    createEvent,
    addStaffToEvent,
}