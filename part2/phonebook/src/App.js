import { useEffect, useState } from 'react'
import { AddPersonForm, DisplayPersons, SearchFilter, Notification } from './Misc'
import { add, getAll, update, deleteDoc } from './services'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState(null)
  const url = "http://localhost:3000/persons"

  useEffect(() => {
    getAll(url).then(response => {
      console.log(response.data)
      setPersons(response.data);

    });


  }, []);
  const handleNameChange = (event) => {

    const value = event.target.value;
    console.log("Name is ", value);
    setNewName(value);


  }
  const handleNumberChange = (event) => {

    const value = event.target.value;
    console.log("Number is ", value);
    setNewNumber(value);

  }
  const handleDelete = (event) => {

    event.preventDefault();
    console.log("Person to delete is ", event.target.value)
    let person = persons.filter(p => p.name === event.target.value)[0]
    let personsArray = persons.filter(p => p.name !== event.target.value)
    console.log("Person is ", person)

    if (window.confirm(`Delete ${person.name}`)) {
      let tempUrl = `${url}/${person.id}`
      deleteDoc(tempUrl).then(response => console.log(response.data));
      setPersons(personsArray)
    }

  }
  const addPerson = (event) => {
    event.preventDefault();
    let obj = { name: newName, number: newNumber };
    let result = persons.find(person => person.name === newName)
    console.log(result)
    if (result) {

      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        console.log("Updating to ", obj)
        update(url, result.id, obj).then(response => {
          console.log(response.data)
          let newArray = persons.filter(p => p.name !== newName)
          setPersons(newArray.concat(obj))
          setMessage(`Added ${newName}`)

        }).catch(error => { setMessage(`Information of ${newName} has already been removed from server`) })


      }

    }

    else {

      add(url, obj).then(response => console.log(response.data))
      setPersons(persons.concat(obj))
      setMessage(`Added ${newName}`)

    }

    setNewName('')
    setNewNumber('')
    setTimeout(() => { setMessage(null) }, 10000);

  }
  const handleSearchTermChange = (event) => {
    const value = event.target.value;

    setSearchTerm(value);
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}></Notification>

      <SearchFilter searchTerm={searchTerm} handleSearchTermChange={handleSearchTermChange}></SearchFilter>

      <h2>add a new</h2>
      <AddPersonForm name={newName} number={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} onSubmit={addPerson}>

      </AddPersonForm>
      <h2>Numbers</h2>
      <DisplayPersons persons={persons} handleDelete={handleDelete} searchTerm={searchTerm}></DisplayPersons>

    </div>
  )
}

export default App