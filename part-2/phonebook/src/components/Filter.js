import React from 'react'



const Filter = ({ handleSearchChange }) => {

  return (
    <h2>Search: <input onChange={handleSearchChange}/></h2>
  )
}

export default Filter