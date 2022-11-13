import { useState } from 'react'

import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {
  
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newId, setId] = useState(5)
  const [search, setSearch] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) =>{
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) =>{
    setSearch(event.target.value)
  }
  const addPerson = (event) => {

    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: newId,
    }
    const currentPerson = persons.filter((person) => person.name.toUpperCase() === newName.toUpperCase());
    
    if (currentPerson.length === 1){
      alert(`${newName} is already added!`)
      setNewName('')
      setNewNumber('')
    }else{
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      setId(newId+1)
    }



  }
  const currentSearch = persons.filter((person) => person.name.toLowerCase().includes(search));
  console.log(currentSearch)
  return (
    <div>
    <h2>Search: <input onChange={handleSearchChange}/></h2>
    
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>name : <input onChange={handleNameChange} value={newName} required/></div>
        <div>number: <input type={"number"} onChange={handleNumberChange} value={newNumber} required/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
{currentSearch.map(person => <h5 key={person.id}>{person.name} : {person.number}</h5>)}
    </div>
  )
}

export default App