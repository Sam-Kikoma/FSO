const SearchFilter = ({ nameFilter, updateSearchName }) => {
	return (
		<div>
			filter: <input value={nameFilter} onChange={updateSearchName} />
		</div>
	);
};

export default SearchFilter;
