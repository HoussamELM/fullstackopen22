const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  // const arto = {
  //   name: 'Arto Hellas',
  //   greet: function() {
  //     console.log('hello, my name is ' + this.name)
  //   },
  // }
  // setTimeout(arto.greet.bind(arto), 1000)

  const Header = (name) => {
   
    return <h1>{course.name}</h1>
  }

const Content = ({ parts }) =>
  parts.map((part,i) => (
    <p key={i}> Name: {part.name} <br/> exercises: {part.exercises}</p>
  ));


  const Total = ({ parts }) => {
    
    var result = parts.reduce(function (acc, obj) { return acc + obj.exercises; }, 0);
    
    return(<p>Total exercices : {result}</p>)

  }

  return (
    <div>
      <Header name={course}/>
      <Content  parts={course.parts}/>
      <Total parts={course.parts}/>
  </div>
  )

  
}

export default App