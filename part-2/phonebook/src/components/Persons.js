import React from 'react'

const Persons = ({value}) => {
  console.log(value)
  return (
    <>
{value.map(person => <h5 key={person.id}>{person.name} : {person.number}</h5>)}
    </>
  )
}

export default Persons