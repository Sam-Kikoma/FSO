const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	const total = blogs.reduce((sum, item) => {
		return sum + item.likes;
	}, 0);
	return total;
};

const favouriteBlog = (blogs) => {
	if (blogs.length === 0) {
		return null;
	}

	return blogs.reduce((favBlog, currentBlog) => {
		return currentBlog.likes > favBlog.likes ? currentBlog : favBlog;
	});
};

module.exports = {
	dummy,
	totalLikes,
	favouriteBlog,
};
