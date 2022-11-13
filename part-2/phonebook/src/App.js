import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newId, setId] = useState(5)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState(persons)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setFilter(response.data)
        console.log(response.data)
      })
  }, [])

  console.log(persons)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (e) => {
    const searchPerson = e.target.value;
      rch(searchPerson);
    const newPersons = persons.filter(
      (person) =>
        person.name.toLowerCase().search(searchPerson.toLowerCase()) !== -1
    );
    setFilter(newPersons);
  };
  const addPerson = (event) => {

    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: newId,
    }
    const currentPerson = persons.filter((person) => person.name.toUpperCase() === newName.toUpperCase());

    if (currentPerson.length === 1) {
      alert(`${newName} is already added!`)
      setNewName('')
      setNewNumber('')
    } else {
      setPersons(persons.concat(personObject))
      setFilter(filter.concat(personObject))
      setNewName('')
      setNewNumber('')
      setId(newId + 1)
    }
  }

  const formdata = { addPerson, newName, handleNumberChange, newNumber, handleNameChange }



  return (
    <div>
      <Filter handleSearchChange={handleSearchChange} />
      <h2>Phonebook</h2>
      <PersonForm data={formdata} />
      <h2>Numbers</h2>
      <Persons value={filter} />
    </div>
  )
}

export default App