const Staff = require("../models/Staff").model;

const updateActiveStaff = async (fireID, update) => {
    try {
        const staff = await Staff.findOneAndUpdate({fireID: fireID}, {active: update});
        if(!staff) throw new Error("Staff not found");
    } catch (err) {
        throw err;
    }
}

module.exports = { 
    updateActiveStaff,
}