import { useState } from "react";
import SearchFilter from "/components/SearchFilter.jsx";
import Persons from "/components/Persons.jsx";
import Details from "/components/Details.jsx";

const App = () => {
	const [persons, setPersons] = useState([{ name: "Arto Hellas", phoneNumber: 123456789 }]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [nameFilter, setNameFilter] = useState("");

	const updateName = (event) => {
		setNewName(event.target.value);
	};

	const updateNumber = (event) => {
		setNewNumber(event.target.value);
	};

	const updateSearchName = (event) => {
		setNameFilter(event.target.value);
	};

	const addDetails = (event) => {
		event.preventDefault();
		const newPerson = { name: newName, phoneNumber: newNumber };
		if (persons.some((person) => person.name === newName)) {
			alert(`${newName} is already added to the phonebook`);
		} else {
			setPersons([...persons, newPerson]);
			setNewNumber("");
			setNewName("");
		}
	};

	const searchResults = persons.filter((person) => person.name.toLowerCase().includes(nameFilter.toLowerCase()));

	return (
		<div>
			<h2>Phonebook</h2>
			<SearchFilter nameFilter={nameFilter} updateSearchName={updateSearchName} />
			{nameFilter !== "" && (
				<div>
					<h2>Results</h2>
					{searchResults.length > 0 ? <Details persons={searchResults} /> : <p>No results found.</p>}
				</div>
			)}
			<hr />
			<br />
			<Persons
				newName={newName}
				newNumber={newNumber}
				updateName={updateName}
				updateNumber={updateNumber}
				addDetails={addDetails}
			/>
			<Details persons={persons} />
		</div>
	);
};

export default App;
