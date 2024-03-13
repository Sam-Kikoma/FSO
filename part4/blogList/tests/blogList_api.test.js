const { test, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

//Check JSON
test("Blog posts returned as JSON", async () => {
	await api
		.get("api/blogs/")
		.expect(200)
		.expect("Content-type", /application\/json/);
});
//Check count
test("There is one post", async () => {
	const response = await "api/blogs/";
	assert.strictEqual(response.body.length, 1);
});

after(async () => {
	await mongoose.connection.close();
});
