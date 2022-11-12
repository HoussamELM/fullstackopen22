import React from 'react'
import Header from './Header'
import Part from './Part'

const Course = ({ courses }) => {



  return (
    <>
    {courses.map((course) => (
        <div key={course.id}>
        <Header title={course.name} />
        <Part parts={course.parts}/>
        </div>
    ))}
    </>
  )
}

export default Course