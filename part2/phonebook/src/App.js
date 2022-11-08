import { useEffect, useState } from 'react'
import { AddPersonForm, DisplayPersons, SearchFilter } from './Misc'
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')


  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(response => {
      console.log(response)
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
  const addPerson = (event) => {
    event.preventDefault();
    let obj = { name: newName, number: newNumber };
    let result = persons.find(person => person.name == newName)
    console.log(result)
    if (result) {
      alert(`${newName} is already added to phonebook`)
    }

    else {
      setPersons(persons.concat(obj))
      setNewName('')
      setNewNumber('')
    }

  }
  const handleSearchTermChange = (event) => {
    const value = event.target.value;

    setSearchTerm(value);
  }
  return (
    <div>
      <h2>Phonebook</h2>

      <SearchFilter searchTerm={searchTerm} handleSearchTermChange={handleSearchTermChange}></SearchFilter>

      <h2>add a new</h2>
      <AddPersonForm name={newName} number={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} onSubmit={addPerson}>

      </AddPersonForm>
      <h2>Numbers</h2>
      <DisplayPersons persons={persons} searchTerm={searchTerm}></DisplayPersons>

    </div>
  )
}

export default App