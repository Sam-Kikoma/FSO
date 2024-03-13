// Handles all the routing
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

// Routing

blogsRouter.get("/", async (request, response) => {
	try {
		const blogs = await Blog.find({});
		response.json(blogs);
	} catch (error) {
		response.status(500).json({ error: error.message });
	}
});

blogsRouter.post("/", async (request, response) => {
	try {
		const blog = new Blog(request.body);
		const result = await blog.save();
		response.status(201).json(result);
	} catch (error) {
		response.status(500).json({ error: error.message });
	}
});

blogsRouter.delete("/:id", async (request, response) => {
	try {
		await Blog.findByIdAndDelete(request.params.id);
		response.status(204).end();
	} catch {
		response.status(500).json({ error: error.message });
	}
});

module.exports = blogsRouter;
