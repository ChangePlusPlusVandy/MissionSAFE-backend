const staffExample = (req, res) => {
    res.status(200).send("Hi from /users/staff/")
}

// TODO: pass in fire ID, boolean to set user's active property to false
const deactivateStaff = async (fireID) => {
    try {
        const staff = await Staff.findOneAndUpdate({fireID: fireID}, {active: false});
    if(!staff) throw new Error("Staff not found");

    await staff.save();
    } catch (err) {
        throw err;
    }
}

// TODO: pass in fire ID, boolean to set user's active property to true
const activateStaff = async (fireID) => {
    try {
        const staff = await Staff.findOneAndUpdate({fireID: fireID}, {active: true});
    if(!staff) throw new Error("Staff not found");

    await staff.save();
    } catch (err) {
        throw err;
    }
}

module.exports = { 
    staffExample, deactivateStaff, activateStaff
}