const App = () => {
  const now = new Date()
  const a = 10
  const b = 20
  const name = "James Bond"
  const agent = "007"

  return (
    <>
      <p>Hello world, it is {now.toString()}</p>
      <br/>
      <p>
        {a} plus {b} is {a+b}
      </p>
      <Hello name={name} agent={agent}/>
      <Hello name="James Bond" agent="007"/>
      <Footer/>
    </>
  )
}
const Hello = (props) => {
return (
  <>
    <p>Hello mr {props.name} aka {props.agent}</p>
  </>
)
}
const Footer = (props) => {
  return (
    <>
    <p><strong>REACT COMPONENTS SHOULD ALWAYS BE CAPITALISED!</strong></p>
  </>
  )
}

export default App;
