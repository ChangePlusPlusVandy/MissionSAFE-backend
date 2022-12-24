const staffExample = (req, res) => {
    res.status(200).send("Hi from /users/staff/")
}

const updateActiveStaff = async (fireID, update) => {
    try {
        const staff = await Staff.findOne({fireID: fireID});
    if(!staff) throw new Error("Staff not found");

    staff.active = update;
    await staff.save();
    } catch (err) {
        throw err;
    }
}

module.exports = { 
    staffExample, updateActiveStaff,
}