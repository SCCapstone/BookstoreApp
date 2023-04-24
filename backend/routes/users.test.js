// User Database Functionality Testing

const users = require('./users');
const db = require('../db');
const { User, validate } = require('../models/user');

// db(); // need a database connection

const userData = {
    firstName: "Ina",
    lastName: "Garten",
    email: "barefootcontessa@foodnetwork.com",
    password: "JEFFREY!",
    role: "admin",
    balance: 10000.00,
    favorites: [],
    emailVerified: false
};

// create a user
describe("User model", () => {
    it("validate user successfully", async () => {
        validUser = new User(userData);

        // Validate the new data that's been created
        expect(validate(validUser));
    })
});
