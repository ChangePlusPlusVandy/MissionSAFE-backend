const Staff = require("../models/Staff").model;
const Event = require("../models/Event").model;
const codeCharacters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const getAllStaff = async () => {
    const allStaff = await Staff.find({});
    if(!allStaff) throw new Error("No staff found");
    return allStaff;
}

const createStaff = async (options) => {
    const newStaff = new Staff(options)
    await newStaff.save();
    return newStaff;
}

const getStaffByActive = async (active) => {
    const staff = await Staff.find({active});
    if(!staff) throw new Error("Staff not found");
    return staff;
}

const getStaffByID = async (fireID) => {
    const staff = await Staff.findOne({fireID});
    if(!staff) throw new Error("Staff not found");
    return staff;
}

const getStaffByEmail = async (email) => {
    const staff = await Staff.findOne({email});
    if(!staff) throw new Error("Staff not found");
    return staff;
}

const getStaffByProgram = async (program) => {
    const staff = await Staff.find({programs: program});
    if(!staff) throw new Error("Staff not found");
    return staff;
}

const updateStaff = async (fireID, update) => {
    const staff = await Staff.findOneAndUpdate({fireID}, update);
    if(!staff) throw new Error("Staff not found");
}

const createEvent = async (options) => {
    const code = await generateValidCode();
    const newEvent = new Event({
        code,
        date: new Date(),
        programs: options.programs,
        staff: [options.fireID],
    });

    await newEvent.save();
}

const addStaffToEvent = async (fireID, eventCode) => {
    let event = await Event.findOne({code: eventCode});
    if(!event) throw new Error("Event not found");

    let staff = await Staff.findOne({fireID});
    if(!staff) throw new Error("Staff not found");

    event.staff.push(fireID);

    await event.save();
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
    createStaff,
    getStaffByActive, 
    getStaffByID,
    getStaffByEmail,
    getStaffByProgram, 
    updateStaff,
    createEvent,
    addStaffToEvent,
}