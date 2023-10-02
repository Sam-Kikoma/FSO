const Filter = ({ newSearch, handleSearchValue, searchResults }) => {
	return (
		<div>
			Search: <input value={newSearch} onChange={handleSearchValue} />
			<ul>
				{searchResults.map((result) => (
					<li key={result.id}>
						{result.name} : {result.number}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Filter;
