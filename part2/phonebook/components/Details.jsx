const Details = ({ persons }) => {
	return (
		<div>
			<h2>Numbers</h2>
			<ul>
				{persons.map((person) => (
					<li key={person.name}>
						{person.name}: {person.phoneNumber}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Details;
