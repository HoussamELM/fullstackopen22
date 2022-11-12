import React from 'react'

const Part = ({parts}) => {

    const total = parts.reduce((sum, part) => sum + part.exercises, 0)

    console.log(total)

  return (
    <>
    {parts.map((part) => (
<h5 key={part.id}>
    {part.name} : {part.exercises}
</h5>
    ))}
    <h4>
    Total courses : {total}
</h4>
    </>
  )
}

export default Part