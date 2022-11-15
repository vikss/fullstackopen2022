
const SearchFilter = (props) => {
    return (<div>filter shown with <input value={props.searchTerm} onChange={props.handleSearchTermChange} /></div>)

}
const DisplayPersons = (props) => {
    const persons = props.persons;
    const searchTerm = props.searchTerm.toLowerCase();
    const onDelete = props.handleDelete;
    const filteredArray = persons.filter(person => person.name.toLowerCase().includes(searchTerm))
    return (<div>
        {filteredArray.map(person => <DisplayPerson onDelete = {onDelete} person={person} />)}
    </div>)
}
const DisplayPerson = ({ person, onDelete }) => {

    return (<div key={person.name}>{person.name} {person.number} <button onClick={onDelete} value={person.name}>delete</button></div>)
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