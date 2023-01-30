// User Database Functionality Testing

const users = require('./users');
const db = require('../db');
const { User } = require('../models/user');

// db(); // need a database connection

const userData = {
    firstName: "Ina",
    lastName: "Garten",
    email: "barefootcontessa@foodnetwork.com",
    password: "JEFFREY!"
};

// create a user
describe("User model", () => {
    it("validate user successfully", async () => {
        const validUser = new User(userData);
        expect(validUser.firstName).toBe("Ina");
        expect(validUser.lastName).toBe("Garten");
        expect(validUser.email).toBe("barefootcontessa@foodnetwork.com");
        expect(validUser.password).toBe("JEFFREY!");
    })
});
