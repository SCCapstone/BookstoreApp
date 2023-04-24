// Blog Database Functionality Testing

const { Blog, validate } = require('../models/blog');

// db(); // need a database connection

const blogData = {
    title: "STring",
    post: "aiosdfiowjaqeofja;wloiefjhailo;wefhjoiajwfasldfjloawjeoi"
};

// create a user
describe("User model", () => {
    it("validate user successfully", async () => {
        validBlog = new Blog(blogData);

        // Validate the new data that's been created
        expect(validate(validBlog));
    })
});
