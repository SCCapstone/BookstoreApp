// Blog Database Functionality Testing

const { Event, validate } = require('../models/event');

// db(); // need a database connection

const eventData = {
    title: "bookclub",
    startDate: 'Sun Apr 23 2023 16:43:02 GMT-0400 (Eastern Daylight Time)',
    endDate: 'Sun Apr 23 2023 16:43:02 GMT-0400 (Eastern Daylight Time)'
};

// create a user
describe("User model", () => {
    it("validate user successfully", async () => {
        validBlog = new Event(eventData);

        // Validate the new data that's been created
        expect(validate(eventData));
    })
});
