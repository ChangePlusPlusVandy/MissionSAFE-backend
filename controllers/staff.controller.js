const Staff = require("../models/Staff").model;

const staffExample = (req, res) => {
    res.status(200).send("Hi from /users/staff/")
}

const updateActiveStaff = async (fireID, update) => {
    try {
        const staff = await Staff.findOneAndUpdate({fireID: fireID}, {active: update});
        if(!staff) throw new Error("Staff not found");
    } catch (err) {
        throw err;
    }
}

module.exports = { 
    staffExample, updateActiveStaff,
}