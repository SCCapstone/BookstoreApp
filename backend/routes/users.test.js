// User Database Functionality Testing
// William Hobbs

const users = require('./users');
const db = require('../db');
const { User } = require('../models/user');

db(); // need a database connection

const userData = {
    firstName: "Ina",
    lastName: "Garten",
    email: "barefootcontessa@foodnetwork.com",
    password: "JEFFREY!"
};

// create a user
describe("User model", () => {
    it("create user successfully", async () => {
        const validUser = new User(userData);
        const savedUser = validUser.save();
    })
});
