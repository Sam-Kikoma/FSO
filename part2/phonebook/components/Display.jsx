const Display = ({ persons, deletePerson }) => {
	return (
		<>
			<ul>
				{persons.map((person) => (
					<li className="note" key={person.id}>
						{person.name} : {person.phoneNumber}
						<button className="delete-btn" onClick={() => deletePerson(person.id)}>
							Delete
						</button>
					</li>
				))}
			</ul>
		</>
	);
};

export default Display;
