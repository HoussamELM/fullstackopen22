import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personService from './services/persons'
import Success from './components/Success'
import NoSuccess from './components/NoSuccess'
import axios from 'axios'


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState(persons)
  const [success, setSuccess] = useState(null)
  const [err, setErr] = useState(null)




  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setFilter(initialPersons)
        console.log(initialPersons)
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
      setSearch(searchPerson);
    const newPersons = persons.filter(
      (person) =>
        person.name.toLowerCase().search(searchPerson.toLowerCase()) !== -1
    );
    setFilter(newPersons)
  };

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    const current = persons.find(obj => obj.name.toUpperCase() === personObject.name.toUpperCase());
    console.log(current);
    const currentPerson = persons.filter((person) => person.name.toUpperCase() === newName.toUpperCase());


    if (currentPerson.length === 1) {

      if (window.confirm(`${current.name} is already in your contacts, would you like to replace the number ?`)) {
        console.log(current.id)
        personService
        .update(current.id, personObject)
        .then((returnedPerson) => {
          const updatedPersons = persons.map((person) =>
          person.id !== returnedPerson.id ? person : returnedPerson
        );
        setPersons(updatedPersons);
        setFilter(updatedPersons);
        
        setTimeout(() => {
        }, 5000)
        setSuccess(`Updated ${personObject.name}'s number`)
        setTimeout(() => {
          setSuccess(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
        })
        .catch(error => {
          setErr(`Contact was recently deleted!`)
          setTimeout(() => {
            setErr(null)
            window.location.reload();
          }, 5000)
          
        })
      }
    } else {
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setFilter(filter.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const removePerson = (person) => {
    personService.remove(person)
    .then(response => {
      const newPersons = persons.filter((persons) => persons.id !== person.id);
      setPersons(newPersons);
      setFilter(newPersons);
      setTimeout(() => {
      }, 5000)
      setSuccess(`${person.name} was deleted from your contacts!`)
      setTimeout(() => {
        setSuccess(null)
      }, 5000)
    })
  }

  const formdata = { addPerson, newName, handleNumberChange, newNumber, handleNameChange }

  return (
    <div>
      <Filter handleSearchChange={handleSearchChange} />
      <Success message={success}/>
      <NoSuccess errmessage={err}/>
      <h1>Phonebook</h1>
      <PersonForm data={formdata} />
      <h1>Numbers</h1>
      <Persons value={filter} remove={removePerson} />
    </div>
  )
}

export default App