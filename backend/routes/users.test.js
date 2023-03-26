// User Database Functionality Testing

const users = require('./users'); //obtains the users
const db = require('../db'); //database - mongoose aka MongoDB
const { User } = require('../models/user'); //necessary user info obtaining from the models folder

// db(); // need a database connection

//example user data which is a unique first name, last name, email, and password
const userData = {
    firstName: "Ina",
    lastName: "Garten",
    email: "barefootcontessa@foodnetwork.com",
    password: "JEFFREY!"
};

// create a user and validates it successfully by storing it in the database as well 
describe("User model", () => {
    it("validate user successfully", async () => {
        const validUser = new User(userData);
        expect(validUser.firstName).toBe("Ina");
        expect(validUser.lastName).toBe("Garten");
        expect(validUser.email).toBe("barefootcontessa@foodnetwork.com");
        expect(validUser.password).toBe("JEFFREY!");
    })
});
