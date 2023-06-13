const Persons = ({ newName, newNumber, updateName, updateNumber, addDetails }) => {
	return (
		<form onSubmit={addDetails}>
			<div>
				name: <input value={newName} onChange={updateName} />
			</div>
			<div>
				number: <input value={newNumber} onChange={updateNumber} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};

export default Persons;
