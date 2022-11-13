import React from 'react'

const PersonForm = ({
  data: { addPerson, newName, handleNumberChange, newNumber, handleNameChange },
}) => {
  return (
    <form onSubmit={addPerson}>
    <div>name : <input onChange={handleNameChange} value={newName} required/></div>
    <div>number: <input type={"number"} onChange={handleNumberChange} value={newNumber} required/></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

export default PersonForm