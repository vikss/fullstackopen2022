import "./index.css"
const SearchFilter = (props) => {
    return (<div>filter shown with <input value={props.searchTerm} onChange={props.handleSearchTermChange} /></div>)

}
const DisplayPersons = (props) => {
    const persons = props.persons;
    const searchTerm = props.searchTerm.toLowerCase();
    const onDelete = props.handleDelete;
    const filteredArray = persons.filter(person => person.name.toLowerCase().includes(searchTerm))
    return (<div>
        {filteredArray.map(person => <DisplayPerson onDelete={onDelete} person={person} />)}
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
const Notification = ({ message }) => {
    if (message == null) {
        console.log("Message is null.")
        return null;

    }
    else if (message.includes("Added")) {
        console.log("Setting a notification.")
        return (
            <div className='notification'>
                {message}
            </div>
        )
    }
    else if (message.includes("Information of")) {
        console.log("Setting an error.")
        return (
            <div className='error'>
                {message}
            </div>
        )


    }

}
export { SearchFilter, AddPersonForm, DisplayPersons, Notification }