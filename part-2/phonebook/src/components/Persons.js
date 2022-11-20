import React from 'react'
const Persons = ({value,remove}) => {


  return (
    <>
{value.map(person => <h5 key={person.id}>{person.name} : {person.number} <button onClick={
  ()=>
  {
    if (window.confirm(`Are you sure you want to delete ${person.name} ?`)) {
      remove(person)
    }
}}
>delete</button></h5>)}
    </>
  )
}

export default Persons