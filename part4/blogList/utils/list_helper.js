const dummy = (blogs) => {
	return 1;
};

// Return total likes
const totalLikes = (blogs) => {
	return blogs.length == 1
		? blogs[0].likes
		: blogs.reduce((accumulator, object) => {
				return accumulator + object.likes;
		  }, 0);
};
// Check most likes
const favoriteBlog = (blogs) => {
	if (blogs.length === 0) {
		return null;
	}
	let maxLikes = -1;
	let favorite = null;
	for (let i = 0; i < blogs.length; i++) {
		if (blogs[i].likes > maxLikes) {
			maxLikes = blogs[i].likes;
			favorite = blogs[i];
		}
	}

	return favorite; // Return the blog with the most likes
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
};
