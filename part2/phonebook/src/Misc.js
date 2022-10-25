
const SearchFilter = (props) => {
    return (<div>filter shown with <input value={props.searchTerm} onChange={props.handleSearchTermChange} /></div>)

}
const DisplayPersons = (props) => {
    const persons = props.persons;
    const searchTerm = props.searchTerm.toLowerCase();
    const filteredArray = persons.filter(person => person.name.toLowerCase().includes(searchTerm))
    return (<div>
        {filteredArray.map(person => <DisplayPerson key={person.name} person={person} />)}
    </div>)
}
const DisplayPerson = ({ person }) => {

    return (<div key={person.name}>{person.name} {person.number}</div>)
}

const AddPersonForm = (props) => {




    return (
        <form onSubmit={props.onSubmit}>
            <div>
                name: <input value={props.name} onChange={props.handleNameChange} />
            </div>
            <div>
                number: <input value={props.number} onChange={props.handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>)

}
export { SearchFilter, AddPersonForm, DisplayPersons }