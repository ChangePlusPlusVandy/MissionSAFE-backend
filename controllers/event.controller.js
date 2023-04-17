const Event = require("../models/Event").model;

const getEventByCode = async (eventCode) => {

    // get all events with a code field that contains the param eventCode
    const events = await Event.find({ code: { $regex: eventCode, $options: "i" } });

	if (!events) throw new Error("Event not found");

	return events;
};

const getAllEvents = async () => {
    const events = await Event.find();
    if(!events) throw new Error("Events not found");
    return events;
}

module.exports = {
	getEventByCode,
    getAllEvents
};
