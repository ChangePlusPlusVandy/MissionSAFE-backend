const Youth = require("../models/Youth").model;

const getAllYouth = async () => {
    try {
        const allYouth = await Youth.find({});
        if(!allYouth) throw new Error("No youth found");
        return allYouth;
    } catch (err) {
        throw err;
    }
}

const getYouthByID = async (fireID) => {
    try {
        const youth = await Youth.findOne({fireID: fireID});
        if(!youth) throw new Error("Youth not found");
        return youth;
    } catch (err) {
        throw err;
    }
}

const updateYouth = async (fireID, update) => {
    try {
        const youth = await Youth.findOneAndUpdate({fireID: fireID}, update);
        if(!youth) throw new Error("Youth not found");
    } catch (err) {
        throw err;
    }
}

module.exports = { 
    getAllYouth,
    getYouthByID,
    updateYouth,
}