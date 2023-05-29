// Header component
const Header = ({ courseName }) => <h2>{courseName}</h2>;

// Content component
const Content = ({ parts }) => (
	<div>
		{parts.map((part) => (
			<Part key={part.id} part={part} />
		))}
	</div>
);

// Part component
const Part = ({ part }) => (
	<p>
		{part.name} {part.exercises}
	</p>
);

// Total component
const Total = ({ parts }) => {
	const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);

	return (
		<p>
			<b>total of {totalExercises} exercises</b>
		</p>
	);
};

// Courses component
const Courses = ({ courses }) => {
	return (
		<>
			<h1>Web development curriculum</h1>
			{courses.map((course) => (
				<div key={course.id}>
					<Header courseName={course.name} />
					<Content parts={course.parts} />
					<Total parts={course.parts} />
				</div>
			))}
		</>
	);
};

export default Courses;
