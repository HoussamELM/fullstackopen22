import React from 'react'

const Header = ({title, key}) => {


  return (
    <h1 key={key}>{title}</h1>
  )
}


export default Header