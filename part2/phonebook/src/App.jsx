import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Display from "/components/Display.jsx";
import Form from "/components/Form.jsx";
import Filter from "/components/Filter.jsx";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [newSearch, setNewSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	// useEffect to fetch data from the json server
	const hook = () => {
		axios.get("http://localhost:3001/persons").then((response) => {
			setPersons(response.data);
		});
	};

	useEffect(hook, []);

	// Add name function
	const addName = (event) => {
		event.preventDefault();
		const nameObject = {
			name: newName,
			number: newNumber,
			// id: persons.length + 2,
		};
		// Post request
		const pushName = () => {
			axios.post("http://localhost:3001/persons", nameObject).then((response) => {
				console.log(response);
				setPersons(persons.concat(response.data));
				setNewName("");
				setNewNumber("");
			});
		};
		persons.some((person) => person.name === nameObject.name) ? `${nameObject.name} already exists` : pushName();
	};
	// Delete function
	const deletePerson = (id) => {
		if (window.confirm("Are you sure you want to delete this entry")) {
			axios.delete(`http://localhost:3001/persons/${id}`).then((response) => {
				console.log(`ID:${id} has been deleted`);
				// Update the persons state after deletion
				setPersons(persons.filter((person) => person.id !== id));
			});
		}
	};
	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handleNumChange = (event) => {
		setNewNumber(event.target.value);
	};

	const handleSearchValue = (event) => {
		setNewSearch(event.target.value);
		// Search function
		const results = persons.filter((person) => person.name.toLowerCase().includes(newSearch.toLowerCase()));
		setSearchResults(results);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter newSearch={newSearch} handleSearchValue={handleSearchValue} searchResults={searchResults} />
			<Form
				newName={newName}
				handleNameChange={handleNameChange}
				newNumber={newNumber}
				handleNumChange={handleNumChange}
				addName={addName}
			/>
			<h2>Numbers</h2>
			<Display persons={persons} deletePerson={deletePerson} />
		</div>
	);
};

export default App;
