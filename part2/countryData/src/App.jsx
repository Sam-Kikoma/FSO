import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
	const [countries, setCountries] = useState([]);
	const [search, setSearch] = useState("");

	// Handle input value
	const handleSearch = (event) => {
		setSearch(event.target.value);
	};

	// Fetching data from the API
	const fetchData = () => {
		axios.get(`https://restcountries.com/v3.1/all`).then((response) => {
			setCountries(response.data);
		});
	};
	useEffect(fetchData, []);

	// Filter countries based on the search input
	const filteredCountries = countries.filter((country) =>
		country.name.common.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<>
			<div>
				<p>Find country: </p>
				<input type="text" value={search} onChange={handleSearch} />
				<ul>
					{filteredCountries.map((country, index) => (
						<li key={index}>{country.name.common}</li>
					))}
				</ul>
			</div>
		</>
	);
}

export default App;
